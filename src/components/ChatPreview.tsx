"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ScheduleButton } from "./ScheduleButton";

type Msg = { role: "user" | "assistant"; content: string };

const ERROR_TEXT = "Não consegui responder agora. Tente de novo em instantes ou clique em Agendar para falar com uma pessoa.";

// A resposta da IA é uma sequência de balões separados por linha em branco; dois marcadores têm função especial.
function parseAssistant(text: string, streaming: boolean) {
  const clean = streaming ? text.replace(/\[\[[A-Z_]*\]?$/, "") : text; // esconde marcador ainda pela metade
  return clean
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      if (p.includes("[[FIM_DA_SIMULACAO]]")) return { kind: "divider" as const, text: p.replace("[[FIM_DA_SIMULACAO]]", "").trim() };
      const schedule = p.includes("[[AGENDAR]]");
      return { kind: "bubble" as const, text: p.replace("[[AGENDAR]]", "").trim(), schedule };
    });
}

const bubble = "self-start max-w-[88%] rounded-2xl rounded-bl-md bg-[var(--cb-panel-raised)] px-4 py-3.5 leading-relaxed whitespace-pre-wrap";

/**
 * Chat com a assistente virtual, ligado à rota /api/chat (Claude Haiku, resposta em streaming).
 * O avatar é um símbolo, nunca um rosto. A saudação é local e não é enviada à API.
 */
export function ChatPreview({
  name,
  badge,
  status,
  greeting,
  replies,
  privacy,
  placeholder,
}: {
  name: string;
  badge: string;
  status?: string;
  greeting: string;
  replies: string[];
  privacy: string;
  placeholder: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, failed]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setFailed(false);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("vazio");
    } catch {
      setMessages(history);
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const last = messages.length - 1;

  return (
    <div className="relative">
      <div className="cb-panel cb-glass relative overflow-hidden shadow-2xl shadow-black/40 [:root[data-theme=light]_&]:shadow-black/10 rounded-3xl">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--cb-border)]">
          <span className="cb-chip w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <Image src="/brand/favicon.png" alt="" width={22} height={22} className="cb-mark-fg w-[22px] h-[22px] object-contain" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-tight flex items-center gap-2">
              {name}
              <span className="text-xs font-bold tracking-wider rounded-full px-2 py-0.5 border border-[var(--cb-border-strong)] text-[var(--cb-fg)]">
                {badge}
              </span>
            </p>
            {status && (
              <p className="text-xs text-[var(--cb-muted)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cb-muted)]" aria-hidden />
                {status}
              </p>
            )}
          </div>
        </div>

        <div ref={scroller} className="px-5 py-6 flex flex-col gap-3 h-[26rem] overflow-y-auto" aria-live="polite">
          <p className={bubble}>{greeting}</p>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {replies.slice(0, 3).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => send(r)}
                  className="min-h-11 rounded-full border border-[var(--cb-border-strong)] px-4 text-sm font-medium text-[var(--cb-fg)] hover:bg-[var(--cb-panel-raised)] transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <p key={i} className="self-end max-w-[88%] rounded-2xl rounded-br-md bg-[var(--cb-fg)] text-[var(--cb-bg)] px-4 py-3.5 leading-relaxed whitespace-pre-wrap">
                {m.content}
              </p>
            ) : m.content === "" ? (
              <p key={i} className={`${bubble} text-[var(--cb-muted)]`} aria-label="Digitando">
                <span className="animate-pulse">...</span>
              </p>
            ) : (
              parseAssistant(m.content, busy && i === last).map((part, k) =>
                part.kind === "divider" ? (
                  <div key={`${i}-${k}`} className="my-1 flex items-center gap-3 text-xs text-[var(--cb-muted)]" role="separator">
                    <span className="h-px flex-1 bg-[var(--cb-border-strong)]" />
                    {part.text || "Fim da simulação"}
                    <span className="h-px flex-1 bg-[var(--cb-border-strong)]" />
                  </div>
                ) : (
                  <div key={`${i}-${k}`} className="flex flex-col items-start gap-2">
                    {part.text && <p className={bubble}>{part.text}</p>}
                    {part.schedule && !(busy && i === last) && (
                      <ScheduleButton className="min-h-11 rounded-full bg-[var(--cb-fg)] px-5 text-sm font-semibold text-[var(--cb-bg)]">
                        Agendar conversa
                      </ScheduleButton>
                    )}
                  </div>
                )
              )
            )
          )}

          {failed && <p className={`${bubble} text-[var(--cb-muted)]`}>{ERROR_TEXT}</p>}
        </div>

        <div className="px-5 pb-5">
          <form onSubmit={onSubmit} className="flex items-center gap-3 rounded-full border border-[var(--cb-border)] bg-[var(--cb-bg)]/60 pl-5 pr-2 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder={placeholder}
              aria-label={placeholder}
              className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-[var(--cb-muted)] outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Enviar"
              className="bg-[var(--cb-fg)] w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--cb-bg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </form>
          <p className="mt-3 text-xs text-[var(--cb-muted)] flex items-start gap-2">
            <svg viewBox="0 0 24 24" width="14" height="14" className="mt-px shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
            {privacy}
          </p>
        </div>
      </div>
    </div>
  );
}
