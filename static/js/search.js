// /hledat/: searches the index the build writes (/hledat/index.json); accents and case are ignored.
(function () {
  var q = new URLSearchParams(location.search).get("q") || "", input = document.getElementById("q");
  var status = document.getElementById("search-status"), list = document.getElementById("search-results");
  input.value = q;
  if (!q.trim()) return;
  var norm = function (s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
  var words = norm(q).split(/\s+/).filter(Boolean);
  fetch("/hledat/index.json").then(function (r) { return r.json(); }).then(function (items) {
    var hits = items.map(function (it) {
      var t = norm(it.t), x = norm(it.x);
      if (!words.every(function (w) { return t.includes(w) || x.includes(w); })) return null;
      return { it: it, score: words.filter(function (w) { return t.includes(w); }).length };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; });
    status.textContent = hits.length ? "Nalezeno výsledků: " + hits.length : "Pro „" + q + "“ jsme nic nenašli.";
    hits.slice(0, 50).forEach(function (h) {
      var li = document.createElement("li"), a = document.createElement("a"), b = document.createElement("b"), sp = document.createElement("span");
      a.href = h.it.u; b.textContent = h.it.t; sp.textContent = (h.it.d ? h.it.d + " · " : "") + h.it.x.slice(0, 160) + "…";
      a.append(b, sp); li.append(a); list.append(li);
    });
  }).catch(function () { status.textContent = "Vyhledávání se nepodařilo načíst."; });
})();
