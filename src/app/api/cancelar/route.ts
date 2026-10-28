// Recebe o formulário de /cancelar. Com RESEND_API_KEY, envia o aviso para contato@ e a confirmação para o cliente.
// Sem a chave, responde sent:false e a página abre o e-mail do cliente já preenchido (o pedido nunca se perde).
const TO = "contato@cliqueboost.io";
const FROM = process.env.CANCEL_FROM_EMAIL || "Clique Boost <contato@cliqueboost.io>";
const SERVICES = ["Social media", "Tráfego pago", "Automação com IA", "Complemento", "Método Completo"];

const hits = new Map<string, { n: number; reset: number }>(); // ponytail: por instância; trocar por limite compartilhado se houver abuso
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  return ++h.n > 8;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const json = (b: unknown, status = 200) => Response.json(b, { status, headers: { "Cache-Control": "no-store" } });

async function send(key: string, payload: Record<string, unknown>) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(String(r.status));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "origem" }, 403);
  if (limited(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local")) return json({ error: "limite" }, 429);

  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return json({ error: "json" }, 400);
  }
  if (b.website) return json({ ok: true, sent: true }); // campo-isca: robô preencheu, finge sucesso

  const str = (k: string, max: number) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, max) : "");
  const nome = str("nome", 120);
  const email = str("email", 160);
  const tipo = b.tipo === "reembolso" ? "reembolso" : b.tipo === "cancelar" ? "cancelar" : "";
  const servicos = Array.isArray(b.servicos) ? (b.servicos as unknown[]).filter((s): s is string => typeof s === "string" && SERVICES.includes(s)) : [];
  const item = str("item", 400);
  const motivo = str("motivo", 1500);
  if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !tipo || !servicos.length || b.confirmo !== true || (tipo === "reembolso" && !item))
    return json({ error: "dados" }, 400);

  const key = process.env.RESEND_API_KEY;
  if (!key) return json({ ok: true, sent: false });

  const quando = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const tipoTxt = tipo === "cancelar" ? "cancelamento" : "reembolso pela garantia de entrega";
  const lista = servicos.join(", ");
  try {
    await send(key, {
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Pedido de ${tipoTxt}: ${nome}`,
      html: `<p><b>Pedido de ${tipoTxt}</b> recebido em ${esc(quando)} (horário de Brasília).</p><p>Nome: ${esc(nome)}<br>E-mail da compra: ${esc(email)}<br>Serviço(s): ${esc(lista)}${item ? `<br>Item não entregue: ${esc(item)}` : ""}${motivo ? `<br>Motivo: ${esc(motivo)}` : ""}</p><p>O cliente confirmou ter lido a cláusula 6 dos Termos.</p>`,
    });
    await send(key, {
      from: FROM,
      to: [email],
      reply_to: TO,
      subject: `Recebemos seu pedido de ${tipoTxt}`,
      html: `<p>Olá, ${esc(nome)},</p><p>Recebemos seu pedido em ${esc(quando)} (horário de Brasília) para ${esc(lista)}.</p><p>${
        tipo === "cancelar"
          ? "O cancelamento vale ao fim do mês já pago. Se houver multa, calculamos o valor e confirmamos por e-mail antes de cobrar qualquer coisa."
          : "Analisamos o registro das entregas e respondemos por e-mail. Se for devido, estornamos pela Stripe em até 10 dias úteis."
      }</p><p>Se algo estiver errado, responda a este e-mail.</p><p>Equipe Clique Boost</p>`,
    });
  } catch {
    return json({ error: "envio" }, 502);
  }
  return json({ ok: true, sent: true });
}
