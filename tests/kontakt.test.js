// Checks api/kontakt.js with Resend stubbed: validation, honeypot, origin check, the e-mail sent.
//   node tests/kontakt.test.js
const assert = require("assert");
process.env.RESEND_API_KEY = "test";
const handler = require("../api/kontakt.js");

const sent = [];
let fail = false;
global.fetch = async (url, opts) => { sent.push(JSON.parse(opts.body)); return { ok: !fail, status: fail ? 500 : 200 }; };

const call = (body, headers = {}) => new Promise((done) => {
  const res = { statusCode: 200, h: {}, setHeader(k, v) { this.h[k.toLowerCase()] = v; }, end() { done({ status: this.statusCode, to: this.h.location }); } };
  handler({ method: "POST", headers: { host: "www.gymskutec.cz", ...headers }, body }, res);
});

(async () => {
  const ok = { jmeno: "Jana Nováková", kontakt: "jana@example.cz", predmet: "Přijímačky\r\nX", zprava: "Dobrý den,\n<b>dotaz</b>" };
  let r = await call(ok, { origin: "https://www.gymskutec.cz" });
  assert.deepStrictEqual([r.status, r.to], [303, "/kontakty/napiste-nam/odeslano/"]);
  assert.strictEqual(sent[0].reply_to, "jana@example.cz");
  assert.deepStrictEqual(sent[0].to, ["info@gymskutec.cz"]);
  assert.strictEqual(sent[0].subject, "Dotaz z webu: Přijímačky X");
  assert.ok(sent[0].html.includes("&lt;b&gt;dotaz&lt;/b&gt;") && sent[0].html.includes("Dobrý den,<br>"));

  r = await call({ ...ok, kontakt: "739 000 000" });
  assert.strictEqual(r.to, "/kontakty/napiste-nam/odeslano/");
  assert.strictEqual(sent[1].reply_to, undefined);

  assert.strictEqual((await call({ ...ok, zprava: "  " })).to, "/kontakty/napiste-nam/?chyba=1#formular");
  assert.strictEqual((await call({ ...ok, web: "spam" })).to, "/kontakty/napiste-nam/odeslano/");
  assert.strictEqual(sent.length, 2);  // neither the empty message nor the bot was sent
  assert.strictEqual((await call(ok, { origin: "https://evil.example" })).status, 403);
  fail = true;
  assert.strictEqual((await call(ok)).to, "/kontakty/napiste-nam/?chyba=2#formular");
  console.log("kontakt api ok");
})();
