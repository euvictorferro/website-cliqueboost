// Recebe o formulário de amostra grátis de /photos. Com RESEND_API_KEY, envia para contato@ com o cliente em reply-to.
// Sem a chave, responde sent:false e a página abre o e-mail já preenchido (o pedido nunca se perde).
const TO = "contato@cliqueboost.io";
const FROM = process.env.CANCEL_FROM_EMAIL || "Clique Boost <contato@cliqueboost.io>";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const json = (b: unknown, status = 200) => Response.json(b, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "origem" }, 403);

  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "json" }, 400);
  }
  if (b.website) return json({ ok: true, sent: true }); // campo-isca: robô preencheu, finge sucesso

  const str = (k: string, max: number) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, max) : "");
  const name = str("name", 120);
  const email = str("email", 160);
  const link = str("link", 500);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^https?:\/\//.test(link)) return json({ error: "dados" }, 400);

  const key = process.env.RESEND_API_KEY;
  if (!key) return json({ ok: true, sent: false });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Free photo sample request: ${name}`,
      html: `<p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p><strong>Listing link:</strong> ${esc(link)}</p>`,
    }),
  });
  if (!r.ok) {
    console.error("fotos: Resend respondeu", r.status);
    return json({ error: "envio" }, 502);
  }
  return json({ ok: true, sent: true });
}
