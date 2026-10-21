// /pridat-aktualitu/: sign in, then write a new post or edit / delete an existing one, and keep the calendar of
// events (api/news.js). Photos are shrunk on this device before upload (1600 px on the long side, WebP or JPEG,
// which also drops location data from the camera) and PDFs over 1 MB are compressed with Ghostscript (WebAssembly);
// every file goes up in its own request. The same file runs on every Order of Malta site.
(function () {
  var root = document.getElementById("news-app");
  if (!root) return;
  var API = "/api/news";
  var $ = function (s) { return root.querySelector(s); };
  var login = $("#ne-login"), app = $("#ne-app"), editor = $("#ne-editor"), manage = $("#ne-manage"), done = $("#ne-done"), events = $("#ne-events");
  // files: {sha, path, url, role, label} for new uploads, {url, role, label, ext} for files already on the site
  var state = { files: [], blobs: {}, editing: null, names: {}, defaultCategory: "", role: null, features: {}, user: null, event: null };
  var MAX = 3 * 1024 * 1024, DRAFT = "news-draft", GONE = "news-deleted";
  var PDF_SHRINK_FROM = 1024 * 1024, V = (document.currentScript && document.currentScript.src.split("?")[1]) || "";

  function call(data, onProgress) {
    return new Promise(function (ok, fail) {
      var x = new XMLHttpRequest();
      x.open(data ? "POST" : "GET", API);
      x.setRequestHeader("Content-Type", "application/json");
      x.responseType = "json";
      if (onProgress) x.upload.onprogress = function (e) { if (e.lengthComputable) onProgress(e.loaded / e.total); };
      x.onload = function () { var r = x.response || {}; (x.status < 300 ? ok : fail)({ status: x.status, body: r }); };
      x.onerror = function () { fail({ status: 0, body: {} }); };
      x.send(data ? JSON.stringify(data) : null);
    });
  }
  function msg(el, text, kind) { el.textContent = text || ""; el.hidden = !text; el.className = "ne-msg" + (kind ? " ne-msg--" + kind : ""); }
  var ERR = {
    login: "Jméno nebo heslo nesouhlasí.", session: "Přihlášení vypršelo. Přihlaste se prosím znovu.",
    type: "Lze nahrát jen fotografie (JPG, PNG, WebP) a PDF.", size: "Soubor je i po zmenšení příliš velký (nejvýše 3 MB). PDF prosím rozdělte nebo zmenšete jeho obrázky.",
    missing: "Vyplňte prosím titulek, datum a text.", config: "Formulář ještě není nastavený (chybí přístupové údaje na serveru).",
    gone: "Tato položka už neexistuje (možná ji mezitím někdo smazal).",
    forbidden: "Tuto položku může upravit nebo smazat jen ten, kdo ji napsal, nebo správce webu.",
    server: "Něco se nepovedlo na straně serveru. Zkuste to prosím za chvíli znovu.", 0: "Spojení se nezdařilo. Zkontrolujte připojení k internetu."
  };
  var errorOf = function (r) { return ERR[r.body && r.body.error] || ERR[r.status] || ERR.server; };
  function signedOut(r) { if (r && r.status === 401) show(null); }
  function today() { return now().slice(0, 10); }
  function now() { var n = new Date(); n.setMinutes(n.getMinutes() - n.getTimezoneOffset()); return n.toISOString().slice(0, 16); }

  // ---- sign-in
  function show(user, info) {
    login.hidden = !!user; app.hidden = !user; done.hidden = true;
    if (!user) return;
    state.user = user;
    if (info) {
      state.names = info.allCategories || {}; state.defaultCategory = info.defaultCategory || ""; state.role = info.role; state.features = info.features || {};
      categories(info.categories || []);
    }
    $("#ne-user").textContent = user + (state.role === "admin" ? " (správce)" : "");
    $("#ne-pin-field").hidden = !state.features.pin;
    $("#ne-tab-events").hidden = !state.features.events;
    setup(); tab("new");
  }
  call().then(function (r) { show(r.body.user, r.body); }, function () { show(null); });
  login.addEventListener("submit", function (e) {
    e.preventDefault();
    var b = login.querySelector("button"); b.disabled = true; msg($("#ne-login-msg"));
    call({ action: "login", name: login.name.value, password: login.password.value }).then(function (r) {
      login.password.value = ""; show(r.body.user, r.body);
    }, function (r) { msg($("#ne-login-msg"), errorOf(r), "error"); }).then(function () { b.disabled = false; });
  });
  $("#ne-logout").addEventListener("click", function () { call({ action: "logout" }).then(function () { location.reload(); }); });

  function categories(cats) {
    var box = $("#ne-cats");
    if (box.childElementCount) return;
    cats.forEach(function (c) { addCategory(c[0], c[1]); });
  }
  function addCategory(key, name) {
    if ($('#ne-cats input[value="' + key + '"]')) return;
    var l = document.createElement("label");
    l.innerHTML = '<input type="checkbox" name="cat"> <span></span>';
    l.querySelector("input").value = key; l.querySelector("span").textContent = name || key;
    $("#ne-cats").appendChild(l);
  }
  function setCategories(list) {
    list.forEach(function (c) { addCategory(c, state.names[c]); });
    root.querySelectorAll('#ne-cats input').forEach(function (i) { i.checked = list.indexOf(i.value) >= 0; });
  }

  // ---- tabs: write a new post / pick one to edit or delete / events
  function tab(which) {
    ["new", "list", "events"].forEach(function (t) { $("#ne-tab-" + t).setAttribute("aria-selected", String(t === which)); });
    editor.hidden = which !== "new"; manage.hidden = which !== "list"; events.hidden = which !== "events";
    if (which === "list") loadList();
    if (which === "events") loadEvents();
  }
  $("#ne-tab-new").addEventListener("click", function () { if (state.editing) reset(); tab("new"); });
  $("#ne-tab-list").addEventListener("click", function () { tab("list"); });
  $("#ne-tab-events").addEventListener("click", function () { tab("events"); });

  // ---- the list of posts (written by the build; a minute behind after changes)
  var posts = null;
  function gone() { try { return JSON.parse(sessionStorage.getItem(GONE) || "[]"); } catch (e) { return []; } }
  function loadList() {
    if (posts) return render();
    fetch("/pridat-aktualitu/news.json", { cache: "no-store" }).then(function (r) { return r.json(); })
      .then(function (d) { posts = d; render(); }, function () { msg($("#ne-list-msg"), ERR[0], "error"); });
  }
  function fmt(d) { var p = d.slice(0, 10).split("-"); return +p[2] + ". " + +p[1] + ". " + p[0]; }
  function mine(p) { return state.role === "admin" || !p.author || p.author === state.user || p.editedBy === state.user; }
  function render() {
    var q = $("#ne-search").value.trim().toLowerCase(), hidden = gone(), ul = $("#ne-list");
    var items = posts.filter(function (p) { return hidden.indexOf(p.path) < 0 && (!q || (p.title + " " + p.date).toLowerCase().indexOf(q) >= 0); });
    ul.innerHTML = "";
    items.slice(0, 60).forEach(function (p) {
      var li = document.createElement("li");
      li.innerHTML = '<time></time><div><a class="ne-list-title" target="_blank" rel="noopener"></a><span class="ne-list-meta"></span></div>' +
        '<button type="button" class="btn btn--ghost ne-small">Upravit</button><button type="button" class="link-btn ne-del">Smazat</button>';
      li.querySelector("time").textContent = fmt(p.date);
      var a = li.querySelector("a"); a.href = p.url; a.textContent = p.title;
      var flags = [];
      if (p.draft) flags.push("koncept"); else if (p.date.slice(0, 10) > today()) flags.push("naplánováno na " + fmt(p.date));
      if (p.pinned) flags.push("připnuto na úvodní stránce");
      li.querySelector(".ne-list-meta").textContent = (p.author ? "Přidal(a): " + p.author : "") + (flags.length ? (p.author ? " · " : "") + flags.join(" · ") : "");
      if (p.draft || p.date.slice(0, 10) > today()) li.classList.add("ne-unpublished");
      li.querySelector(".btn").onclick = function () { edit(p); };
      var delBtn = li.querySelector(".ne-del");
      if (mine(p)) delBtn.onclick = function () { del(p, li); }; else delBtn.remove();
      ul.appendChild(li);
    });
    if (!items.length) ul.innerHTML = '<li class="ne-list-empty">Nic nenalezeno.</li>';
    else if (items.length > 60) { var more = document.createElement("li"); more.className = "ne-list-empty"; more.textContent = "… a dalších " + (items.length - 60) + ". Upřesněte hledání."; ul.appendChild(more); }
  }
  $("#ne-search").addEventListener("input", function () { if (posts) render(); });

  function del(p, li) {
    if (!confirm("Opravdu smazat aktualitu „" + p.title + "“? Zmizí z webu asi za minutu.")) return;
    var b = li.querySelector(".ne-del"); b.disabled = true; b.textContent = "Maže se…";
    call({ action: "delete", path: p.path }).then(function () {
      try { sessionStorage.setItem(GONE, JSON.stringify(gone().concat(p.path))); } catch (e) {}
      li.remove(); msg($("#ne-list-msg"), "Smazáno: " + p.title + ". Z webu zmizí asi za minutu.");
    }, function (r) { b.disabled = false; b.textContent = "Smazat"; msg($("#ne-list-msg"), errorOf(r), "error"); signedOut(r); });
  }

  function edit(p) {
    msg($("#ne-list-msg"), "Načítá se…");
    call({ action: "load", path: p.path }).then(function (r) {
      msg($("#ne-list-msg"));
      var d = r.body; reset(); state.editing = d;
      $("#ne-title").value = d.title; $("#ne-date").value = d.date; $("#ne-excerpt").value = d.excerpt || "";
      $("#ne-draft-flag").checked = !!d.draft; $("#ne-pin").checked = !!d.pinned;
      setCategories(d.categories);
      var locked = !d.editable;
      $("#ne-text").parentNode.hidden = locked; $("#ne-locked").hidden = !locked;
      $("#ne-text-hint").hidden = locked;
      if (locked) $("#ne-locked-text").innerHTML = d.body; // the site's own published HTML
      else quill.clipboard.dangerouslyPasteHTML(d.body);
      if (d.image) existingPhoto(d.image);
      d.attachments.forEach(function (a) { attachmentRow({ name: a.label + "." + a.ext.toLowerCase() }, { url: a.url, role: "attachment", label: a.label, ext: a.ext }); });
      $("#ne-editing").hidden = false; var link = $("#ne-editing-link"); link.href = d.url; link.textContent = d.title;
      $("#ne-readonly").hidden = d.mayChange !== false;
      $("#ne-publish").textContent = "Uložit změny"; $("#ne-publish").disabled = d.mayChange === false;
      tab("new"); window.scrollTo(0, root.offsetTop);
    }, function (r) { msg($("#ne-list-msg"), errorOf(r), "error"); signedOut(r); });
  }
  function reset() {
    state.files = []; state.blobs = {}; state.editing = null;
    editor.reset(); setDate(); setCategories([state.defaultCategory]);
    if (quill) quill.setText("");
    $("#ne-photo-box").innerHTML = ""; $("#ne-file-list").innerHTML = "";
    $("#ne-text").parentNode.hidden = false; $("#ne-locked").hidden = true; $("#ne-text-hint").hidden = false;
    $("#ne-editing").hidden = true; $("#ne-readonly").hidden = true; $("#ne-publish").textContent = "Zveřejnit"; $("#ne-publish").disabled = false;
    ["#ne-msg", "#ne-draft", "#ne-inline-msg"].forEach(function (s) { msg($(s)); });
  }
  $("#ne-cancel").addEventListener("click", function () { reset(); restore(); tab("list"); });

  // ---- files: shrink photos and large PDFs, then upload with a progress bar
  // PDFs over 1 MB go through Ghostscript compiled to WebAssembly (/js/pdf-worker.js, as on lurdy.eu), in this browser;
  // one worker per file, dropped afterwards. The smaller file is used only if Ghostscript actually made it smaller.
  function shrinkPdf(file) {
    if (file.size < PDF_SHRINK_FROM || !window.Worker) return Promise.resolve(file);
    return file.arrayBuffer().then(function (buf) {
      return new Promise(function (ok) {
        var w = new Worker("/js/pdf-worker.js?" + V, { type: "module" });
        var done = function (out) { w.terminate(); ok(out && out.length && out.length < file.size ? new File([out], file.name, { type: "application/pdf" }) : file); };
        w.onmessage = function (e) { done(e.data); };
        w.onerror = function () { done(null); };
        w.postMessage(buf, [buf]);
      });
    }).catch(function () { return file; });
  }
  function shrink(file) {
    if (file.type === "application/pdf") return shrinkPdf(file);
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || !window.createImageBitmap) return Promise.resolve(file);
    return createImageBitmap(file).then(function (bmp) {
      var s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height)), c = document.createElement("canvas");  // the pages never show a photo larger
      c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
      var g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height);
      var as = function (type, q) { return new Promise(function (ok) { c.toBlob(ok, type, q); }); };
      return as("image/webp", 0.8).then(function (b) { return b && b.type === "image/webp" ? b : as("image/jpeg", 0.82); }) // Safari cannot write WebP
        .then(function (b) { return b && b.size < file.size ? new File([b], file.name.replace(/\.\w+$/, "") + (b.type === "image/webp" ? ".webp" : ".jpg"), { type: b.type }) : file; });  // keep the original if it was already smaller
    }).catch(function () { return file; });
  }
  function toBase64(blob) {
    return new Promise(function (ok, fail) { var r = new FileReader(); r.onload = function () { ok(String(r.result).split(",")[1]); }; r.onerror = fail; r.readAsDataURL(blob); });
  }
  function upload(file, role, row) {
    var bar = row && row.querySelector("progress"), note = row && row.querySelector(".ne-file-state");
    if (note) note.textContent = file.type === "application/pdf" ? (file.size >= PDF_SHRINK_FROM ? "Zmenšuje se PDF…" : "Připravuje se…") : "Zmenšuje se fotografie…";
    return shrink(file).then(function (f) {
      if (!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(f.type)) throw { status: 400, body: { error: "type" } };
      if (f.size > MAX) throw { status: 413, body: { error: "size" } };
      return toBase64(f).then(function (data) {
        if (note) note.textContent = "Nahrává se…";
        return call({ action: "upload", name: f.name, type: f.type, data: data }, function (p) { if (bar) bar.value = p * 100; });
      });
    }).then(function (r) {
      var item = { sha: r.body.sha, path: r.body.path, url: r.body.url, role: role, label: file.name.replace(/\.\w+$/, "") };
      state.files.push(item);
      if (bar) bar.value = 100;
      if (note) note.textContent = "Nahráno";
      return item;
    }, function (r) {
      if (note) { note.textContent = errorOf(r); row.classList.add("is-error"); }
      signedOut(r);
      throw r;
    });
  }
  function fileRow(name, list) {
    var li = document.createElement("li");
    li.innerHTML = '<span class="ne-file-name"></span><progress max="100" value="0"></progress><span class="ne-file-state"></span><button type="button" class="link-btn">Odebrat</button>';
    li.querySelector(".ne-file-name").textContent = name;
    list.appendChild(li);
    return li;
  }
  function drop(item) { var i = state.files.indexOf(item); if (i >= 0) state.files.splice(i, 1); }

  // main photo (a new one replaces the current one)
  var photoInput = $("#ne-photo"), photoBox = $("#ne-photo-box");
  function clearPhoto() { state.files = state.files.filter(function (x) { return x.role !== "image"; }); photoBox.innerHTML = ""; }
  function photoRow(name, src) {
    clearPhoto();
    var row = fileRow(name, photoBox), img = document.createElement("img"); img.src = src; img.alt = ""; row.prepend(img);
    row.querySelector("button").onclick = clearPhoto;
    return row;
  }
  function existingPhoto(url) {
    var row = photoRow(decodeURIComponent(url.split("/").pop()), url);
    row.querySelector("progress").hidden = true; row.querySelector(".ne-file-state").textContent = "Na webu";
    state.files.push({ url: url, role: "image" });
  }
  photoInput.addEventListener("change", function () {
    var f = photoInput.files[0]; photoInput.value = "";
    if (f) upload(f, "image", photoRow(f.name, URL.createObjectURL(f))).catch(function () {});
  });

  // attachments, also by drag and drop
  var attInput = $("#ne-files"), attList = $("#ne-file-list"), dropZone = $("#ne-drop");
  function attachmentRow(f, existing) {
    var row = fileRow(f.name, attList), item = existing || null;
    var label = document.createElement("input"); label.type = "text"; label.value = existing ? existing.label : f.name.replace(/\.\w+$/, "");
    label.setAttribute("aria-label", "Název odkazu ke stažení");
    row.insertBefore(label, row.querySelector("progress"));
    row.querySelector(".ne-file-name").hidden = true;
    label.addEventListener("input", function () { if (item) item.label = label.value; });
    row.querySelector("button").onclick = function () { if (item) drop(item); row.remove(); };
    if (existing) { state.files.push(existing); row.querySelector("progress").hidden = true; row.querySelector(".ne-file-state").textContent = "Na webu"; }
    else upload(f, "attachment", row).then(function (it) { item = it; it.label = label.value; }, function () {});
  }
  attInput.addEventListener("change", function () { Array.prototype.forEach.call(attInput.files, function (f) { attachmentRow(f); }); attInput.value = ""; });
  ["dragenter", "dragover"].forEach(function (t) { dropZone.addEventListener(t, function (e) { e.preventDefault(); dropZone.classList.add("is-over"); }); });
  ["dragleave", "drop"].forEach(function (t) { dropZone.addEventListener(t, function (e) { e.preventDefault(); dropZone.classList.remove("is-over"); }); });
  dropZone.addEventListener("drop", function (e) { if (e.dataTransfer) Array.prototype.forEach.call(e.dataTransfer.files, function (f) { attachmentRow(f); }); });

  // ---- the text editor (Quill): only formats the site already styles, so every post looks like the rest of the site
  var quill = null;
  function setDate() { $("#ne-date").value = now(); }
  function setup() {
    if (quill || !window.Quill) return;
    // Quill's image format accepts only http(s) and data sources and turns anything else into "//:0"; the preview of a
    // photo being uploaded is a blob: URL, which must survive until it is swapped for the uploaded /media/ address
    var Img = Quill.import("formats/image");
    Quill.register(class extends Img { static sanitize(url) { return /^blob:/.test(url) ? url : Img.sanitize(url); } }, true);
    setDate(); setCategories([state.defaultCategory]);
    quill = new Quill("#ne-text", {
      theme: "snow", placeholder: "Text aktuality…",
      formats: ["header", "bold", "italic", "underline", "strike", "link", "list", "blockquote", "image"],
      modules: { toolbar: { container: [[{ header: [2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], ["blockquote", "link", "image"], ["clean"]],
        handlers: { image: insertImage } } }
    });
    var tips = { "ql-bold": "Tučně", "ql-italic": "Kurzíva", "ql-underline": "Podtržení", "ql-strike": "Přeškrtnutí", "ql-blockquote": "Citace", "ql-link": "Odkaz", "ql-image": "Vložit fotografii", "ql-clean": "Zrušit formátování" };
    Object.keys(tips).forEach(function (c) { var b = editor.querySelector("." + c); if (b) { b.title = tips[c]; b.setAttribute("aria-label", tips[c]); } });
    editor.querySelectorAll(".ql-list").forEach(function (b) { var t = b.value === "ordered" ? "Číslovaný seznam" : "Odrážky"; b.title = t; b.setAttribute("aria-label", t); });
    // pasted pictures would arrive as huge inline data; they are left out, photos go in through the photo button
    quill.clipboard.addMatcher("IMG", function (node, delta) { return /^(blob:|\/media\/)/.test(node.getAttribute("src") || "") ? delta : new (Quill.import("delta"))(); });
    restore();
    var t; quill.on("text-change", function () { clearTimeout(t); t = setTimeout(save, 800); });
    editor.querySelectorAll("#ne-title, #ne-excerpt").forEach(function (el) { el.addEventListener("input", function () { clearTimeout(t); t = setTimeout(save, 800); }); });
    $("#ne-date").addEventListener("input", dateHint); dateHint();
  }
  function dateHint() { var d = $("#ne-date").value; $("#ne-date-hint").textContent = d && d.slice(0, 10) > today() ? "Budoucí datum: aktualita se na webu objeví až v tento den." : ""; }
  function insertImage() {
    var i = document.createElement("input"); i.type = "file"; i.accept = "image/jpeg,image/png,image/webp"; i.multiple = true;
    i.onchange = function () {
      var files = Array.prototype.slice.call(i.files); if (!files.length) return;
      // each photo on its own line: two or more in a row become a photo grid on the site (and the post is listed in the gallery)
      var at = quill.getSelection(true).index, note = $("#ne-inline-msg"), left = files.length;
      msg(note, files.length > 1 ? "Fotografie se nahrávají… (" + files.length + ")" : "Fotografie se nahrává…");
      files.forEach(function (f) {
        var local = URL.createObjectURL(f);
        quill.insertEmbed(at, "image", local, "user"); at += 1;
        if (files.length > 1) { quill.insertText(at, "\n", "user"); at += 1; }
        upload(f, "inline").then(function (it) { state.blobs[local] = it.url; if (--left === 0) msg(note); }, function (r) { msg(note, errorOf(r), "error"); });
      });
      quill.setSelection(at);
    };
    i.click();
  }

  // ---- draft of a new post kept in this browser until published (text only, not files)
  function save() {
    if (state.editing) return;
    try { localStorage.setItem(DRAFT, JSON.stringify({ t: Date.now(), title: $("#ne-title").value, excerpt: $("#ne-excerpt").value, html: quill.root.innerHTML.replace(/<img[^>]+src="blob:[^"]*"[^>]*>/g, "") })); } catch (e) {}
  }
  function restore() {
    try {
      var d = JSON.parse(localStorage.getItem(DRAFT) || "null");
      if (!d || Date.now() - d.t > 14 * 864e5 || !(d.title || d.html.replace(/<[^>]+>/g, "").trim())) return;
      $("#ne-title").value = d.title || ""; $("#ne-excerpt").value = d.excerpt || ""; quill.clipboard.dangerouslyPasteHTML(d.html || "");
      msg($("#ne-draft"), "Obnoven rozepsaný koncept z tohoto prohlížeče.");
    } catch (e) {}
  }

  // ---- publish a new post or save changes
  editor.addEventListener("submit", function (e) {
    e.preventDefault();
    var out = $("#ne-msg"), b = $("#ne-publish"), ed = state.editing, locked = ed && !ed.editable;
    var uploading = root.querySelectorAll(".ne-files li:not(.is-error) progress:not([hidden])").length >
      state.files.filter(function (f) { return f.sha && f.role !== "inline"; }).length
      || Object.keys(state.blobs).length < quill.root.querySelectorAll('img[src^="blob:"]').length;
    if (uploading) return msg(out, "Počkejte prosím, až se dokončí nahrávání souborů.", "error");
    var html = locked ? "" : quill.getSemanticHTML().replace(/&nbsp;/g, " ");
    Object.keys(state.blobs).forEach(function (k) { html = html.split(k).join(state.blobs[k]); });
    var data = { action: "publish", title: $("#ne-title").value, date: $("#ne-date").value, excerpt: $("#ne-excerpt").value, body: html,
      categories: Array.prototype.map.call(editor.querySelectorAll('input[name="cat"]:checked'), function (c) { return c.value; }), files: state.files,
      draft: $("#ne-draft-flag").checked };
    if (state.features.pin) data.pinned = $("#ne-pin").checked;
    if (ed) data.path = ed.path;
    if (!data.title.trim() || (!locked && !quill.getText().trim())) return msg(out, ERR.missing, "error");
    b.disabled = true; msg(out, ed ? "Ukládá se…" : "Zveřejňuje se…");
    call(data).then(function (r) {
      if (!ed) try { localStorage.removeItem(DRAFT); } catch (er) {}
      app.hidden = true; done.hidden = false;
      $("#ne-done-title").textContent = r.body.draft ? "Uloženo jako koncept" : r.body.scheduled ? "Naplánováno" : ed ? "Uloženo" : "Zveřejněno";
      $("#ne-done-text").firstChild.textContent = r.body.draft ? "Koncept není na webu vidět; zveřejníte ho úpravou (zrušte „Koncept“). Adresa bude: "
        : r.body.scheduled ? "Aktualita se na webu objeví v uvedený den (po sestavení webu): " : "Změna bude na webu asi za minutu: ";
      var a = $("#ne-done-link"); a.href = r.body.url; a.textContent = location.origin + r.body.url;
    }, function (r) { msg(out, errorOf(r), "error"); signedOut(r); }).then(function () { b.disabled = false; });
  });
  $("#ne-again").addEventListener("click", function () { location.reload(); });

  // ---- events: the calendar kept in content/events.json
  var evForm = $("#ne-event-form"), evList = $("#ne-event-list"), evMsg = $("#ne-event-msg"), eventsCache = null;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtWhen(e) {
    var s = e.start.slice(0, 10).split("-"), t = e.end.slice(0, 10).split("-"), a = +s[2] + ". " + +s[1] + ". " + s[0], b = +t[2] + ". " + +t[1] + ". " + t[0];
    return (a === b ? a : a + " – " + b) + (e.allDay ? "" : ", " + e.start.slice(11));
  }
  function loadEvents() {
    msg(evMsg, "Načítá se…");
    call({ action: "events" }).then(function (r) { eventsCache = r.body.events || []; msg(evMsg); renderEvents(); }, function (r) { msg(evMsg, errorOf(r), "error"); signedOut(r); });
  }
  function renderEvents() {
    var today = now().slice(0, 10);
    evList.innerHTML = "";
    var items = eventsCache.slice().sort(function (a, b) { return a.start < b.start ? 1 : -1; });
    var upcoming = items.filter(function (e) { return e.end.slice(0, 10) >= today; }).reverse(), past = items.filter(function (e) { return e.end.slice(0, 10) < today; });
    upcoming.concat(past).forEach(function (e) {
      var li = document.createElement("li");
      li.innerHTML = '<time></time><div><span class="ne-list-title"></span><span class="ne-list-meta"></span></div><button type="button" class="btn btn--ghost ne-small">Upravit</button><button type="button" class="link-btn ne-del">Smazat</button>';
      li.querySelector("time").textContent = fmtWhen(e);
      li.querySelector(".ne-list-title").textContent = e.title;
      li.querySelector(".ne-list-meta").textContent = (e.place ? e.place + " · " : "") + (e.end.slice(0, 10) < today ? "proběhlo" : "nadcházející");
      li.querySelector(".btn").onclick = function () { editEvent(e); };
      var delBtn = li.querySelector(".ne-del");
      if (mine(e)) delBtn.onclick = function () { delEvent(e, li); }; else delBtn.remove();
      evList.appendChild(li);
    });
    if (!items.length) evList.innerHTML = '<li class="ne-list-empty">Zatím žádné události.</li>';
  }
  function editEvent(e) {
    state.event = e;
    $("#ne-ev-title").value = e.title; $("#ne-ev-place").value = e.place || "";
    $("#ne-ev-start").value = e.start.replace(" ", "T"); $("#ne-ev-end").value = e.end.replace(" ", "T");
    $("#ne-ev-allday").checked = !!e.allDay; $("#ne-ev-desc").value = e.description.replace(/<\/p>\s*<p>/g, "\n\n").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
    $("#ne-ev-editing").hidden = false; $("#ne-ev-editing-title").textContent = e.title; $("#ne-ev-save").textContent = "Uložit změny";
    window.scrollTo(0, evForm.offsetTop);
  }
  function resetEvent() {
    state.event = null; evForm.reset(); $("#ne-ev-editing").hidden = true; $("#ne-ev-save").textContent = "Přidat událost";
    var d = new Date(); $("#ne-ev-start").value = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "T08:00"; $("#ne-ev-end").value = "";
  }
  $("#ne-ev-cancel").addEventListener("click", resetEvent);
  function delEvent(e, li) {
    if (!confirm("Opravdu smazat událost „" + e.title + "“?")) return;
    call({ action: "event-delete", url: e.url }).then(function () { eventsCache = eventsCache.filter(function (x) { return x.url !== e.url; }); li.remove(); msg(evMsg, "Smazáno: " + e.title + ". Z webu zmizí asi za minutu."); },
      function (r) { msg(evMsg, errorOf(r), "error"); signedOut(r); });
  }
  evForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var start = $("#ne-ev-start").value, end = $("#ne-ev-end").value || start, b = $("#ne-ev-save");
    if (!$("#ne-ev-title").value.trim() || !start) return msg(evMsg, "Vyplňte prosím název a začátek události.", "error");
    if (end < start) return msg(evMsg, "Konec události nemůže být před začátkem.", "error");
    var desc = $("#ne-ev-desc").value.trim().split(/\n{2,}/).filter(Boolean).map(function (p) {
      return "<p>" + p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") + "</p>"; }).join("");
    var data = { action: "event", title: $("#ne-ev-title").value, start: start.replace("T", " "), end: end.replace("T", " "), allDay: $("#ne-ev-allday").checked, place: $("#ne-ev-place").value, description: desc };
    if (state.event) data.url = state.event.url;
    b.disabled = true; msg(evMsg, "Ukládá se…");
    call(data).then(function (r) {
      eventsCache = eventsCache.filter(function (x) { return x.url !== r.body.url; }).concat([r.body.event]);
      msg(evMsg, (state.event ? "Uloženo: " : "Přidáno: ") + r.body.event.title + ". Na webu asi za minutu."); resetEvent(); renderEvents();
    }, function (r) { msg(evMsg, errorOf(r), "error"); signedOut(r); }).then(function () { b.disabled = false; });
  });
  $("#ne-ev-allday").addEventListener("change", function () {
    var all = this.checked; ["#ne-ev-start", "#ne-ev-end"].forEach(function (s) { var i = $(s); if (all && i.value) i.value = i.value.slice(0, 10) + (s.indexOf("start") > 0 ? "T00:00" : "T23:59"); });
  });
  resetEvent();
})();
