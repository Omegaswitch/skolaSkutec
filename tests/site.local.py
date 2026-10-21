"""A local stand-in for the hosting: serves dist/ and hands every other address to api/page.py, which renders it from
the shared database exactly as on Vercel. Build first (python3 build.py), then:
    python3 tests/site.local.py [port]      → http://127.0.0.1:8090/
The staff page (/pridat-aktualitu/) talks to the database directly, so publishing can be tried here too, with a
real account (the database decides what that account may do)."""
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "api"))
import page  # noqa: E402

DIST = ROOT / "dist"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(DIST), **kw)

    def do_GET(self):
        path = self.path.split("?")[0]
        target = DIST / unquote(path).lstrip("/")
        if path.startswith("/api/page"):
            path = self.path.split("path=", 1)[1] if "path=" in self.path else "/"
        elif target.is_file() or (target / "index.html").is_file():
            return super().do_GET()
        status, ctype, body = page.render(path)
        data = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8090
    print(f"local site at http://127.0.0.1:{port}/ (dist/ plus pages rendered from the database)")
    HTTPServer(("127.0.0.1", port), Handler).serve_forever()
