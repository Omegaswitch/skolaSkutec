// Contact form at /kontakty/napiste-nam/: validates the message and emails it to the school through Resend
// (as lurdy.eu's applications do). Nothing is stored. Env: RESEND_API_KEY, MAIL_TO (default info@gymskutec.cz), MAIL_FROM.
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const EMAIL = /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/;
const FIELDS = [["jmeno", "Jméno a příjmení", 200], ["kontakt", "Kontakt", 200], ["predmet", "Předmět", 200], ["zprava", "Zpráva", 5000]];
const FORM = "/kontakty/napiste-nam/";

function clean(body) {
  const out = {};
  for (const [k, , max] of FIELDS) {
    let v = typeof body[k] === "string" ? body[k].replace(/\r\n?/g, "\n").trim() : "";
    if (k !== "zprava") v = v.replace(/[\x00-\x1f\x7f]+/g, " ");  // single lines stay single (they go into the subject)
    if (!v || v.length > max) return null;
    out[k] = v;
  }
  return out;
}

const redirect = (res, to) => { res.statusCode = 303; res.setHeader("Location", to); res.end(); };

async function handler(req, res) {
  if (req.method !== "POST") { res.statusCode = 405; res.setHeader("Allow", "POST"); return res.end(); }
  const origin = req.headers.origin;
  if (origin && new URL(origin).host !== req.headers.host) { res.statusCode = 403; return res.end(); }  // no cross-site posts
  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (body.web) return redirect(res, FORM + "odeslano/");  // honeypot filled: a bot; pretend success
  const m = clean(body);
  if (!m) return redirect(res, FORM + "?chyba=1#formular");
  const replyTo = EMAIL.test(m.kontakt) ? m.kontakt : undefined;
  const html = FIELDS.map(([k, label]) => `<p><b>${label}:</b><br>${esc(m[k]).replace(/\n/g, "<br>")}</p>`).join("");
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.MAIL_FROM || "Web gymnázia <web@gymskutec.cz>", to: (process.env.MAIL_TO || "info@gymskutec.cz").split(/[,;\s]+/).filter(Boolean),
        subject: `Dotaz z webu: ${m.predmet}`, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!r.ok) throw new Error(`Resend ${r.status}`);
  } catch (e) {
    console.error(e);
    return redirect(res, FORM + "?chyba=2#formular");
  }
  return redirect(res, FORM + "odeslano/");
}

module.exports = handler;
module.exports.clean = clean;
