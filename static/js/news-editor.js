// /pridat-aktualitu/: the staff page of the three school websites. Sign in with e-mail, password and a one-time code
// (TOTP), then write a new post, edit or delete an existing one, keep the calendar of events and, as an administrator,
// manage who may publish. Everything goes straight to the shared Supabase database (one project for all schools,
// one row per post with the school's site id); the database itself decides who may change what (row level security),
// this page only shows the buttons. Photos are shrunk on this device before upload (1600 px on the long side, WebP
// or JPEG, which also drops location data from the camera) and PDFs over 1 MB are compressed with Ghostscript
// (WebAssembly). The same file runs on every school site; the site id and the database address come from the page.
(function () {
  var root = document.getElementById("news-app");
  if (!root || !window.supabase) return;
  var $ = function (s) { return root.querySelector(s); };
  var SITE = root.dataset.site, BASE = root.dataset.supabaseUrl;
  var sb = supabase.createClient(BASE, root.dataset.supabaseKey, { auth: { storageKey: "sb-" + SITE + "-auth" } });
  var MEDIA = BASE + "/storage/v1/object/public/media/";
  var login = $("#ne-login"), app = $("#ne-app"), editor = $("#ne-editor"), manage = $("#ne-manage"), done = $("#ne-done"), events = $("#ne-events"), members = $("#ne-members");
  var mfa = $("#ne-mfa"), recover = $("#ne-recover");
  // files: {url, role, label, ext, size, w, h}; url is the public address in the media bucket (or /media/… for older posts)
  var state = { files: [], blobs: {}, editing: null, names: {}, defaultCategory: "", role: null, user: null, userId: null, event: null, factor: null };
  var MAX = 3 * 1024 * 1024, DRAFT = "news-draft";
  var PDF_SHRINK_FROM = 1024 * 1024, V = (document.currentScript && document.currentScript.src.split("?")[1]) || "";

  function msg(el, text, kind) { el.textContent = text || ""; el.hidden = !text; el.className = "ne-msg" + (kind ? " ne-msg--" + kind : ""); }
  var ERR = {
    login: "E-mail nebo heslo nesouhlasí.", code: "Kód nesouhlasí. Zkuste znovu kód z aplikace.", session: "Přihlášení vypršelo. Přihlaste se prosím znovu.",
    type: "Lze nahrát jen fotografie (JPG, PNG, WebP) a PDF.", size: "Soubor je i po zmenšení příliš velký (nejvýše 3 MB). PDF prosím rozdělte nebo zmenšete jeho obrázky.",
    missing: "Vyplňte prosím titulek, datum a text.", member: "Váš účet nemá přístup k tomuto webu. Požádejte správce webu, aby vás přidal.",
    forbidden: "Tuto položku může upravit nebo smazat jen ten, kdo ji napsal, nebo správce webu.",
    server: "Něco se nepovedlo. Zkuste to prosím za chvíli znovu.", 0: "Spojení se nezdařilo. Zkontrolujte připojení k internetu."
  };
  function errorOf(e) {
    if (!e) return ERR.server;
    if (e.key) return ERR[e.key];
    var m = String(e.message || e.msg || e.error || "");
    if (/row-level security|42501|administrator|Unauthorized/i.test(m)) return ERR.forbidden;
    if (/JWT|expired|session/i.test(m)) return ERR.session;
    if (/Invalid login|invalid_credentials/i.test(m)) return ERR.login;
    if (/code|otp|TOTP|challenge/i.test(m)) return ERR.code;
    if (/mime|type/i.test(m)) return ERR.type;
    if (/Failed to fetch|NetworkError/i.test(m)) return ERR[0];
    return m ? m : ERR.server;
  }
  function today() { return now().slice(0, 10); }
  function now() { var n = new Date(); n.setMinutes(n.getMinutes() - n.getTimezoneOffset()); return n.toISOString().slice(0, 16); }
  function slugify(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70).replace(/-$/, "") || "aktualita";
  }
  function rand() { var a = new Uint8Array(4); crypto.getRandomValues(a); return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }

  // ---- screens: sign-in → second factor → the app (or the recovery form after a "forgotten password" link)
  function screen(which) {
    login.hidden = which !== "login"; mfa.hidden = which !== "mfa"; recover.hidden = which !== "recover"; app.hidden = which !== "app"; done.hidden = true;
  }
  function start() {
    sb.auth.getSession().then(function (r) {
      var s = r.data.session;
      if (!s) return screen("login");
      return afterSignIn();
    });
  }
  sb.auth.onAuthStateChange(function (event) { if (event === "PASSWORD_RECOVERY") screen("recover"); });

  login.addEventListener("submit", function (e) {
    e.preventDefault();
    var b = login.querySelector("button[type=submit]"); b.disabled = true; msg($("#ne-login-msg"));
    sb.auth.signInWithPassword({ email: login.email.value.trim(), password: login.password.value }).then(function (r) {
      if (r.error) throw r.error;
      login.password.value = "";
      return afterSignIn();
    }).catch(function (err) { msg($("#ne-login-msg"), errorOf(err), "error"); }).then(function () { b.disabled = false; });
  });
  $("#ne-forgot").addEventListener("click", function () {
    var email = login.email.value.trim();
    if (!email) return msg($("#ne-login-msg"), "Napište svůj e-mail do pole výše a klepněte znovu.", "error");
    sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname }).then(function (r) {
      msg($("#ne-login-msg"), r.error ? errorOf(r.error) : "Pokud účet existuje, poslali jsme na " + email + " odkaz pro nastavení nového hesla.", r.error ? "error" : "");
    });
  });
  recover.addEventListener("submit", function (e) {
    e.preventDefault();
    var p = $("#ne-new-password").value;
    if (p.length < 10) return msg($("#ne-recover-msg"), "Heslo musí mít alespoň 10 znaků.", "error");
    sb.auth.updateUser({ password: p }).then(function (r) {
      if (r.error) return msg($("#ne-recover-msg"), errorOf(r.error), "error");
      history.replaceState(null, "", location.pathname);
      return afterSignIn();
    });
  });

  // the second factor is required: without it the database refuses every change
  function afterSignIn() {
    return sb.auth.mfa.getAuthenticatorAssuranceLevel().then(function (r) {
      if (r.error) throw r.error;
      if (r.data.currentLevel === "aal2") return loadMe();
      return sb.auth.mfa.listFactors().then(function (f) {
        if (f.error) throw f.error;
        var verified = (f.data.totp || []).filter(function (x) { return x.status === "verified"; });
        if (verified.length) return askCode(verified[0].id);
        // an enrolment abandoned half-way leaves an unverified factor behind; clear those before offering a new one
        var stale = (f.data.all || []).filter(function (x) { return x.status !== "verified"; });
        return Promise.all(stale.map(function (x) { return sb.auth.mfa.unenroll({ factorId: x.id }); })).then(enrol);
      });
    });
  }
  function askCode(factorId) {
    state.factor = factorId; screen("mfa");
    $("#ne-mfa-enrol").hidden = true; $("#ne-mfa-code").value = ""; $("#ne-mfa-code").focus(); msg($("#ne-mfa-msg"));
  }
  function enrol() {
    return sb.auth.mfa.enroll({ factorType: "totp", friendlyName: "Aplikace " + new Date().toISOString().slice(0, 16).replace("T", " ") }).then(function (r) {
      if (r.error) throw r.error;
      state.factor = r.data.id; screen("mfa");
      $("#ne-mfa-enrol").hidden = false; $("#ne-mfa-qr").src = r.data.totp.qr_code; $("#ne-mfa-secret").textContent = r.data.totp.secret;
      $("#ne-mfa-code").value = ""; msg($("#ne-mfa-msg"));
    });
  }
  mfa.addEventListener("submit", function (e) {
    e.preventDefault();
    var b = mfa.querySelector("button[type=submit]"); b.disabled = true; msg($("#ne-mfa-msg"));
    sb.auth.mfa.challengeAndVerify({ factorId: state.factor, code: $("#ne-mfa-code").value.replace(/\s/g, "") }).then(function (r) {
      if (r.error) throw r.error;
      return loadMe();
    }).catch(function (err) { msg($("#ne-mfa-msg"), errorOf(err), "error"); }).then(function () { b.disabled = false; });
  });
  $("#ne-mfa-cancel").addEventListener("click", function () { sb.auth.signOut().then(function () { location.reload(); }); });

  // who am I on this site: the membership row decides the role; no row, no access
  function loadMe() {
    return sb.auth.getUser().then(function (u) {
      if (u.error) throw u.error;
      state.userId = u.data.user.id; state.user = (u.data.user.user_metadata || {}).name || u.data.user.email;
      return Promise.all([sb.from("site_members").select("site_id, role").eq("site_id", SITE).maybeSingle(), sb.from("profiles").select("name").eq("user_id", state.userId).maybeSingle()]);
    }).then(function (rs) {
      if (rs[0].error) throw rs[0].error;
      if (!rs[0].data) { screen("login"); return msg($("#ne-login-msg"), ERR.member, "error"); }
      if (rs[1].data && rs[1].data.name) state.user = rs[1].data.name;
      state.role = rs[0].data.role;
      show();
    });
  }
  function show() {
    screen("app");
    $("#ne-user").textContent = state.user + (state.role === "admin" ? " (správce)" : "");
    $("#ne-pin-field").hidden = state.role !== "admin";
    $("#ne-tab-members").hidden = state.role !== "admin";
    categories(); setup(); tab("new");
  }
  $("#ne-logout").addEventListener("click", function () { sb.auth.signOut().then(function () { location.reload(); }); });

  function categories() {
    var box = $("#ne-cats");
    if (box.childElementCount) return;
    var cats = JSON.parse(root.dataset.categories || "{}");
    state.names = cats; state.defaultCategory = Object.keys(cats)[0] || "";
    Object.keys(cats).forEach(function (c) { addCategory(c, cats[c]); });
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

  // ---- tabs
  function tab(which) {
    ["new", "list", "events", "members"].forEach(function (t) { $("#ne-tab-" + t).setAttribute("aria-selected", String(t === which)); });
    editor.hidden = which !== "new"; manage.hidden = which !== "list"; events.hidden = which !== "events"; members.hidden = which !== "members";
    if (which === "list") loadList();
    if (which === "events") loadEvents();
    if (which === "members") loadMembers();
  }
  $("#ne-tab-new").addEventListener("click", function () { if (state.editing) reset(); tab("new"); });
  $("#ne-tab-list").addEventListener("click", function () { tab("list"); });
  $("#ne-tab-events").addEventListener("click", function () { tab("events"); });
  $("#ne-tab-members").addEventListener("click", function () { tab("members"); });

  // ---- the list of posts, straight from the database
  var posts = null;
  function loadList() {
    msg($("#ne-list-msg"), "Načítá se…");
    sb.from("posts").select("id, url, title, date, author, author_id, edited_by, draft, pinned").eq("site_id", SITE).order("date", { ascending: false }).limit(2000)
      .then(function (r) { if (r.error) return msg($("#ne-list-msg"), errorOf(r.error), "error"); posts = r.data; msg($("#ne-list-msg")); render(); });
  }
  function fmt(d) { var p = d.slice(0, 10).split("-"); return +p[2] + ". " + +p[1] + ". " + p[0]; }
  function mine(p) { return state.role === "admin" || (!!p.author_id && p.author_id === state.userId); }  // imported posts have no author account: administrators only
  function render() {
    var q = $("#ne-search").value.trim().toLowerCase(), ul = $("#ne-list");
    var items = posts.filter(function (p) { return !q || (p.title + " " + p.date).toLowerCase().indexOf(q) >= 0; });
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
    if (!confirm("Opravdu smazat aktualitu „" + p.title + "“?")) return;
    var b = li.querySelector(".ne-del"); b.disabled = true; b.textContent = "Maže se…";
    sb.from("posts").delete().eq("id", p.id).select("id").then(function (r) {
      if (r.error || !r.data.length) { b.disabled = false; b.textContent = "Smazat"; return msg($("#ne-list-msg"), errorOf(r.error || { key: "forbidden" }), "error"); }
      posts = posts.filter(function (x) { return x.id !== p.id; });
      li.remove(); msg($("#ne-list-msg"), "Smazáno: " + p.title + ". Z webu zmizí do minuty.");
    });
  }

  var editable = function (html) { return !/<(figure|figcaption|table|hr|h4|h5|div|iframe|video)\b/i.test(html); };
  function edit(p) {
    msg($("#ne-list-msg"), "Načítá se…");
    sb.from("posts").select("*").eq("id", p.id).single().then(function (r) {
      if (r.error) return msg($("#ne-list-msg"), errorOf(r.error), "error");
      msg($("#ne-list-msg"));
      var d = r.data; reset(); state.editing = d;
      $("#ne-title").value = d.title; $("#ne-date").value = d.date.slice(0, 16); $("#ne-excerpt").value = d.excerpt || "";
      $("#ne-draft-flag").checked = !!d.draft; $("#ne-pin").checked = !!d.pinned;
      setCategories(d.categories || []);
      var locked = !editable(d.body);
      $("#ne-text").parentNode.hidden = locked; $("#ne-locked").hidden = !locked;
      $("#ne-text-hint").hidden = locked;
      if (locked) $("#ne-locked-text").innerHTML = d.body; // the site's own published HTML
      else quill.clipboard.dangerouslyPasteHTML(d.body);
      if (d.image) existingPhoto(d.image, d.image_w, d.image_h);
      (d.attachments || []).forEach(function (a) { attachmentRow({ name: a.label + "." + String(a.ext || "pdf").toLowerCase() }, { url: a.url, role: "attachment", label: a.label, ext: a.ext, size: a.size }); });
      $("#ne-editing").hidden = false; var link = $("#ne-editing-link"); link.href = d.url; link.textContent = d.title;
      $("#ne-readonly").hidden = mine(d);
      $("#ne-publish").textContent = "Uložit změny"; $("#ne-publish").disabled = !mine(d);
      tab("new"); window.scrollTo(0, root.offsetTop);
    });
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

  // ---- files: shrink photos and large PDFs, then upload into the site's folder of the media bucket
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
      var s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height)), c = document.createElement("canvas");
      c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
      var g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height);
      var as = function (type, q) { return new Promise(function (ok) { c.toBlob(ok, type, q); }); };
      return as("image/webp", 0.8).then(function (b) { return b && b.type === "image/webp" ? b : as("image/jpeg", 0.82); })
        .then(function (b) {
          var f = b && b.size < file.size ? new File([b], file.name.replace(/\.\w+$/, "") + (b.type === "image/webp" ? ".webp" : ".jpg"), { type: b.type }) : file;
          f.w = c.width; f.h = c.height; return f;
        });
    }).catch(function () { return file; });
  }
  function upload(file, role, row) {
    var bar = row && row.querySelector("progress"), note = row && row.querySelector(".ne-file-state");
    if (note) note.textContent = file.type === "application/pdf" ? (file.size >= PDF_SHRINK_FROM ? "Zmenšuje se PDF…" : "Připravuje se…") : "Zmenšuje se fotografie…";
    return shrink(file).then(function (f) {
      if (!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(f.type)) throw { key: "type" };
      if (f.size > MAX) throw { key: "size" };
      if (note) note.textContent = "Nahrává se…";
      var ext = f.type === "application/pdf" ? "pdf" : f.type.slice(6).replace("jpeg", "jpg");
      var path = SITE + "/" + today().slice(0, 7).replace("-", "/") + "/" + slugify(f.name.replace(/\.\w+$/, "")).slice(0, 40) + "-" + rand() + "." + ext;
      return sb.storage.from("media").upload(path, f, { contentType: f.type, cacheControl: "31536000" }).then(function (r) {
        if (r.error) throw r.error;
        var item = { url: MEDIA + path, role: role, label: file.name.replace(/\.\w+$/, ""), ext: ext.toUpperCase(), size: f.size, w: f.w, h: f.h };
        state.files.push(item);
        if (bar) bar.value = 100;
        if (note) note.textContent = "Nahráno";
        return item;
      });
    }).catch(function (err) {
      if (note) { note.textContent = errorOf(err); row.classList.add("is-error"); }
      throw err;
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

  var photoInput = $("#ne-photo"), photoBox = $("#ne-photo-box");
  function clearPhoto() { state.files = state.files.filter(function (x) { return x.role !== "image"; }); photoBox.innerHTML = ""; }
  function photoRow(name, src) {
    clearPhoto();
    var row = fileRow(name, photoBox), img = document.createElement("img"); img.src = src; img.alt = ""; row.prepend(img);
    row.querySelector("button").onclick = clearPhoto;
    return row;
  }
  function existingPhoto(url, w, h) {
    var row = photoRow(decodeURIComponent(url.split("/").pop()), url);
    row.querySelector("progress").hidden = true; row.querySelector(".ne-file-state").textContent = "Na webu";
    state.files.push({ url: url, role: "image", w: w, h: h });
  }
  photoInput.addEventListener("change", function () {
    var f = photoInput.files[0]; photoInput.value = "";
    if (f) upload(f, "image", photoRow(f.name, URL.createObjectURL(f))).catch(function () {});
  });

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

  // ---- the text editor (Quill): only formats the site already styles
  var quill = null;
  function setDate() { $("#ne-date").value = now(); }
  function setup() {
    if (quill || !window.Quill) return;
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
    quill.clipboard.addMatcher("IMG", function (node, delta) { return /^(blob:|\/media\/)/.test(node.getAttribute("src") || "") || node.getAttribute("src").indexOf(MEDIA) === 0 ? delta : new (Quill.import("delta"))(); });
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
      var at = quill.getSelection(true).index, note = $("#ne-inline-msg"), left = files.length;
      msg(note, files.length > 1 ? "Fotografie se nahrávají… (" + files.length + ")" : "Fotografie se nahrává…");
      files.forEach(function (f) {
        var local = URL.createObjectURL(f);
        quill.insertEmbed(at, "image", local, "user"); at += 1;
        if (files.length > 1) { quill.insertText(at, "\n", "user"); at += 1; }
        upload(f, "inline").then(function (it) { state.blobs[local] = it; if (--left === 0) msg(note); }, function (err) { msg(note, errorOf(err), "error"); });
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
  function freeUrl(url) {
    // the address must be unique on this site; a second post with the same title and day gets -2, -3 …
    return sb.from("posts").select("url").eq("site_id", SITE).like("url", url.replace(/\/$/, "") + "%").then(function (r) {
      var taken = (r.data || []).map(function (x) { return x.url; });
      if (taken.indexOf(url) < 0) return url;
      for (var n = 2; ; n++) { var u = url.replace(/\/$/, "") + "-" + n + "/"; if (taken.indexOf(u) < 0) return u; }
    });
  }
  function plain(html) { return html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim(); }
  editor.addEventListener("submit", function (e) {
    e.preventDefault();
    var out = $("#ne-msg"), b = $("#ne-publish"), ed = state.editing, locked = ed && !editable(ed.body);
    var uploading = root.querySelectorAll(".ne-files li:not(.is-error) progress:not([hidden])").length >
      state.files.filter(function (f) { return f.size && f.role !== "inline"; }).length
      || Object.keys(state.blobs).length < quill.root.querySelectorAll('img[src^="blob:"]').length;
    if (uploading) return msg(out, "Počkejte prosím, až se dokončí nahrávání souborů.", "error");
    var html = locked ? ed.body : quill.getSemanticHTML().replace(/&nbsp;/g, " ");
    Object.keys(state.blobs).forEach(function (k) {
      var it = state.blobs[k];
      html = html.split('src="' + k + '"').join('src="' + it.url + '"' + (it.w ? ' width="' + it.w + '" height="' + it.h + '"' : ""));
    });
    var text = plain(html), image = state.files.filter(function (f) { return f.role === "image"; })[0];
    var row = {
      site_id: SITE, title: $("#ne-title").value.trim().slice(0, 200), date: $("#ne-date").value, excerpt: $("#ne-excerpt").value.trim().slice(0, 300) || null, body: html,
      categories: Array.prototype.map.call(editor.querySelectorAll('input[name="cat"]:checked'), function (c) { return c.value; }),
      image: image ? image.url : null, image_w: image && image.w || null, image_h: image && image.h || null,
      attachments: state.files.filter(function (f) { return f.role === "attachment"; }).map(function (f) { return { url: f.url, label: (f.label || "Soubor").slice(0, 120), ext: f.ext || "PDF", size: f.size || null }; }),
      draft: $("#ne-draft-flag").checked
    };
    if (state.role === "admin") row.pinned = $("#ne-pin").checked;
    if (!row.title || !row.date || (!locked && !text)) return msg(out, ERR.missing, "error");
    b.disabled = true; msg(out, ed ? "Ukládá se…" : "Zveřejňuje se…");
    var q = ed ? sb.from("posts").update(row).eq("id", ed.id).select("url, draft, date")
      : freeUrl("/" + row.date.slice(0, 10).replace(/-/g, "/") + "/" + slugify(row.title) + "/").then(function (url) { row.url = url; return sb.from("posts").insert(row).select("url, draft, date"); });
    Promise.resolve(q).then(function (r) {
      if (r.error) throw r.error;
      if (!r.data.length) throw { key: "forbidden" };
      var p = r.data[0], scheduled = p.date.slice(0, 10) > today();
      if (!ed) try { localStorage.removeItem(DRAFT); } catch (er) {}
      app.hidden = true; done.hidden = false;
      $("#ne-done-title").textContent = p.draft ? "Uloženo jako koncept" : scheduled ? "Naplánováno" : ed ? "Uloženo" : "Zveřejněno";
      $("#ne-done-text").firstChild.textContent = p.draft ? "Koncept není na webu vidět; zveřejníte ho úpravou (zrušte „Koncept“). Adresa bude: "
        : scheduled ? "Aktualita se na webu objeví v uvedený den: " : "Změna je na webu do minuty: ";
      var a = $("#ne-done-link"); a.href = p.url; a.textContent = location.origin + p.url;
    }).catch(function (err) { msg(out, errorOf(err), "error"); }).then(function () { b.disabled = false; });
  });
  $("#ne-again").addEventListener("click", function () { location.reload(); });

  // ---- events
  var evForm = $("#ne-event-form"), evList = $("#ne-event-list"), evMsg = $("#ne-event-msg"), eventsCache = null;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtWhen(e) {
    var s = e.starts_at.slice(0, 10).split("-"), t = e.ends_at.slice(0, 10).split("-"), a = +s[2] + ". " + +s[1] + ". " + s[0], b = +t[2] + ". " + +t[1] + ". " + t[0];
    return (a === b ? a : a + " – " + b) + (e.all_day ? "" : ", " + e.starts_at.slice(11, 16));
  }
  function loadEvents() {
    msg(evMsg, "Načítá se…");
    sb.from("events").select("id, url, title, starts_at, ends_at, all_day, place, description, author_id").eq("site_id", SITE).order("starts_at", { ascending: false }).limit(1000)
      .then(function (r) { if (r.error) return msg(evMsg, errorOf(r.error), "error"); eventsCache = r.data; msg(evMsg); renderEvents(); });
  }
  function renderEvents() {
    var t = today();
    evList.innerHTML = "";
    var upcoming = eventsCache.filter(function (e) { return e.ends_at.slice(0, 10) >= t; }).reverse(), past = eventsCache.filter(function (e) { return e.ends_at.slice(0, 10) < t; });
    upcoming.concat(past).forEach(function (e) {
      var li = document.createElement("li");
      li.innerHTML = '<time></time><div><span class="ne-list-title"></span><span class="ne-list-meta"></span></div><button type="button" class="btn btn--ghost ne-small">Upravit</button><button type="button" class="link-btn ne-del">Smazat</button>';
      li.querySelector("time").textContent = fmtWhen(e);
      li.querySelector(".ne-list-title").textContent = e.title;
      li.querySelector(".ne-list-meta").textContent = (e.place ? e.place + " · " : "") + (e.ends_at.slice(0, 10) < t ? "proběhlo" : "nadcházející");
      li.querySelector(".btn").onclick = function () { editEvent(e); };
      var delBtn = li.querySelector(".ne-del");
      if (mine(e)) delBtn.onclick = function () { delEvent(e, li); }; else delBtn.remove();
      evList.appendChild(li);
    });
    if (!eventsCache.length) evList.innerHTML = '<li class="ne-list-empty">Zatím žádné události.</li>';
  }
  function editEvent(e) {
    state.event = e;
    $("#ne-ev-title").value = e.title; $("#ne-ev-place").value = e.place || "";
    $("#ne-ev-start").value = e.starts_at.slice(0, 16); $("#ne-ev-end").value = e.ends_at.slice(0, 16);
    $("#ne-ev-allday").checked = !!e.all_day; $("#ne-ev-desc").value = e.description.replace(/<\/p>\s*<p>/g, "\n\n").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
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
    sb.from("events").delete().eq("id", e.id).select("id").then(function (r) {
      if (r.error || !r.data.length) return msg(evMsg, errorOf(r.error || { key: "forbidden" }), "error");
      eventsCache = eventsCache.filter(function (x) { return x.id !== e.id; }); li.remove(); msg(evMsg, "Smazáno: " + e.title + ". Z webu zmizí do minuty.");
    });
  }
  evForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var start = $("#ne-ev-start").value, end = $("#ne-ev-end").value || start, b = $("#ne-ev-save");
    if (!$("#ne-ev-title").value.trim() || !start) return msg(evMsg, "Vyplňte prosím název a začátek události.", "error");
    if (end < start) return msg(evMsg, "Konec události nemůže být před začátkem.", "error");
    var desc = $("#ne-ev-desc").value.trim().split(/\n{2,}/).filter(Boolean).map(function (p) {
      return "<p>" + p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") + "</p>"; }).join("");
    var row = { site_id: SITE, title: $("#ne-ev-title").value.trim().slice(0, 200), starts_at: start, ends_at: end, all_day: $("#ne-ev-allday").checked, place: $("#ne-ev-place").value.trim().slice(0, 120) || null, description: desc };
    b.disabled = true; msg(evMsg, "Ukládá se…");
    var q = state.event ? sb.from("events").update(row).eq("id", state.event.id).select("id, url, title, starts_at, ends_at, all_day, place, description, author_id")
      : (function () {
        var base = "/udalost/" + slugify(row.title).slice(0, 60) + "-" + start.slice(0, 10) + "/";
        return sb.from("events").select("url").eq("site_id", SITE).like("url", base.replace(/\/$/, "") + "%").then(function (r) {
          var taken = (r.data || []).map(function (x) { return x.url; }); row.url = base;
          for (var n = 2; taken.indexOf(row.url) >= 0; n++) row.url = base.replace(/\/$/, "") + "-" + n + "/";
          return sb.from("events").insert(row).select("id, url, title, starts_at, ends_at, all_day, place, description, author_id");
        });
      })();
    Promise.resolve(q).then(function (r) {
      if (r.error) throw r.error;
      if (!r.data.length) throw { key: "forbidden" };
      var saved = r.data[0];
      eventsCache = eventsCache.filter(function (x) { return x.id !== saved.id; }).concat([saved]).sort(function (a, c) { return a.starts_at < c.starts_at ? 1 : -1; });
      msg(evMsg, (state.event ? "Uloženo: " : "Přidáno: ") + saved.title + ". Na webu do minuty."); resetEvent(); renderEvents();
    }).catch(function (err) { msg(evMsg, errorOf(err), "error"); }).then(function () { b.disabled = false; });
  });
  $("#ne-ev-allday").addEventListener("change", function () {
    var all = this.checked; ["#ne-ev-start", "#ne-ev-end"].forEach(function (s) { var i = $(s); if (all && i.value) i.value = i.value.slice(0, 10) + (s.indexOf("start") > 0 ? "T00:00" : "T23:59"); });
  });
  resetEvent();

  // ---- members (administrators): who may publish on this site; accounts themselves are created by invitation in Supabase
  var memForm = $("#ne-member-form"), memList = $("#ne-member-list"), memMsg = $("#ne-member-msg");
  function loadMembers() {
    msg(memMsg, "Načítá se…");
    sb.rpc("site_members_of", { s: SITE }).then(function (r) {
      if (r.error) return msg(memMsg, errorOf(r.error), "error");
      msg(memMsg); memList.innerHTML = "";
      r.data.forEach(function (m) {
        var li = document.createElement("li");
        li.innerHTML = '<div><span class="ne-list-title"></span><span class="ne-list-meta"></span></div><button type="button" class="link-btn ne-del">Odebrat</button>';
        li.querySelector(".ne-list-title").textContent = m.name || m.email;
        li.querySelector(".ne-list-meta").textContent = m.email + " · " + (m.role === "admin" ? "správce" : "redaktor");
        var rm = li.querySelector(".ne-del");
        if (m.user_id === state.userId) rm.remove();
        else rm.onclick = function () {
          if (!confirm("Odebrat " + m.email + " z tohoto webu?")) return;
          sb.rpc("remove_member", { member: m.user_id, s: SITE }).then(function (x) { if (x.error) return msg(memMsg, errorOf(x.error), "error"); loadMembers(); });
        };
        memList.appendChild(li);
      });
    });
  }
  memForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var b = memForm.querySelector("button[type=submit]"); b.disabled = true; msg(memMsg, "Ukládá se…");
    sb.rpc("add_member", { member_email: $("#ne-member-email").value.trim(), s: SITE, member_role: $("#ne-member-role").value }).then(function (r) {
      if (r.error) return msg(memMsg, /no account/.test(r.error.message) ? "Účet s tímto e-mailem neexistuje. Nejdřív pozvěte osobu v administraci Supabase (Authentication → Users → Invite), pak ji sem přidejte." : errorOf(r.error), "error");
      memForm.reset(); loadMembers();
    }).then(function () { b.disabled = false; });
  });

  start();
})();
