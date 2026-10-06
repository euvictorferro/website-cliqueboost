import { CHAT_MODEL, SYSTEM_PROMPT } from "@/lib/chat-prompt";

// Chamada à API da Claude feita só aqui, no servidor: a chave nunca chega ao navegador.
const API_URL = "https://api.anthropic.com/v1/messages";
const MAX_MESSAGES = 20; // histórico enviado ao modelo
const MAX_CHARS = 1000; // por mensagem
const MAX_TOKENS = 450; // resposta curta, estilo chat

// Limite por IP em memória. ponytail: vale por instância do servidor; se o abuso virar problema, trocar por
// um limite compartilhado (Redis/Upstash) ou pelo BotID da Vercel.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 40;
const hits = new Map<string, { n: number; reset: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return false;
  }
  h.n += 1;
  return h.n > MAX_REQUESTS;
}

const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

type Msg = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): Msg[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const msgs: Msg[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    const role = (m as Msg)?.role;
    const content = (m as Msg)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS * 3);
    if (!text) return null;
    msgs.push({ role, content: role === "user" ? text.slice(0, MAX_CHARS) : text });
  }
  while (msgs.length && msgs[0].role !== "user") msgs.shift(); // a API exige começar por "user"
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

export async function POST(request: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: "indisponivel" }, 503);

  // Só aceita chamadas feitas pelo próprio site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "origem" }, 403);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return json({ error: "limite" }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "json" }, 400);
  }
  const messages = parseMessages(body);
  if (!messages) return json({ error: "mensagens" }, 400);

  let upstream: Response;
  try {
    upstream = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
        stream: true,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
  } catch {
    return json({ error: "rede" }, 502);
  }
  if (!upstream.ok || !upstream.body) {
    console.error("chat: resposta da API", upstream.status);
    return json({ error: "upstream" }, 502);
  }

  // Converte o fluxo de eventos da API em texto puro, pedaço por pedaço.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buf = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          let i: number;
          while ((i = buf.indexOf("\n\n")) >= 0) {
            const evt = buf.slice(0, i);
            buf = buf.slice(i + 2);
            const line = evt.split("\n").find((l) => l.startsWith("data:"));
            if (!line) continue;
            try {
              const j = JSON.parse(line.slice(5));
              if (j.type === "content_block_delta" && j.delta?.type === "text_delta") {
                controller.enqueue(encoder.encode(j.delta.text));
              }
            } catch {
              /* evento que não é JSON: ignora */
            }
          }
        }
      } catch {
        /* o cliente fechou a conexão */
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
