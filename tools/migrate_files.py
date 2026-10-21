#!/usr/bin/env python3
"""Copies the documents and images that content/ still links on the old site (www.gymskutec.cz) into static/media/legacy/
and rewrites the links. Run it before switching the domain to the new site; afterwards the old file URLs no longer exist.

    python3 tools/migrate_files.py --list    count and list the old links, download nothing
    python3 tools/migrate_files.py           download, then rewrite content/ (files already downloaded are skipped)

Standard library only. Needs network access to www.gymskutec.cz.
"""
import hashlib
import re
import sys
import urllib.request
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "static" / "media" / "legacy"
OLD = re.compile(r'https?://(?:www\.)?gymskutec\.cz/(?:e_download\.php|evt_file\.php|evt_image\.php|modules/file_storage/download\.php|data/)[^"\'\s<>]*')
TYPES = {b"%PDF": ".pdf", b"\xff\xd8\xff": ".jpg", b"\x89PNG": ".png", b"GIF8": ".gif", b"PK\x03\x04": ".docx", b"\xd0\xcf\x11\xe0": ".doc"}


def slug(name):
    name = unquote(name).lower()
    name = name.translate(str.maketrans("áčďéěíňóřšťúůýž", "acdeeinorstuuyz"))
    return re.sub(r"[^a-z0-9.]+", "-", name).strip("-.")


def local_name(url, data):
    q = parse_qs(urlsplit(url.replace("&amp;", "&")).query)
    ext = next((e for m, e in TYPES.items() if data.startswith(m)), "")
    base = q.get("original", [""])[0] or Path(urlsplit(url).path).name
    stem = slug(Path(base).stem) if base and not base.endswith(".php") else ""
    h = hashlib.sha1(url.encode()).hexdigest()[:8]
    return f"{stem + '-' if stem else ''}{h}{ext or Path(base).suffix.lower()}"


def main():
    files = sorted(ROOT.glob("content/**/*.html")) + [ROOT / "content" / "site.json"]
    urls = sorted({u for f in files for u in OLD.findall(f.read_text(encoding="utf-8"))})
    print(f"{len(urls)} old file links in {len(files)} content files")
    if "--list" in sys.argv:
        print("\n".join(urls))
        return
    OUT.mkdir(parents=True, exist_ok=True)
    mapping, failed = {}, []
    for u in urls:
        try:
            req = urllib.request.Request(u.replace("&amp;", "&"), headers={"User-Agent": "gymskutec.cz migration"})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read(40_000_000)
            name = local_name(u, data)
            (OUT / name).write_bytes(data)
            mapping[u] = f"/media/legacy/{name}"
            print("ok", mapping[u])
        except Exception as e:
            failed.append((u, e))
            print("FAILED", u, e)
    for f in files:
        t = f.read_text(encoding="utf-8")
        n = OLD.sub(lambda m: mapping.get(m.group(0), m.group(0)), t)
        if n != t:
            f.write_text(n, encoding="utf-8")
    print(f"downloaded {len(mapping)}, failed {len(failed)}")
    sys.exit(1 if failed else 0)


assert local_name("https://gymskutec.cz/e_download.php?file=/data/editor/185cs_3.pdf&original=p%C5%99ihl%C3%A1%C5%A1ka-DM.pdf", b"%PDF-1.4").startswith("prihlaska-dm-")
assert local_name("https://gymskutec.cz/evt_image.php?img=2794", b"\xff\xd8\xff\xe0").endswith(".jpg")

if __name__ == "__main__":
    main()
