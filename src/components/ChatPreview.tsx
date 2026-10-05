import Image from "next/image";

/**
 * Interface do chat com a assistente. Ainda sem endpoint: o campo fica desativado e o corpo
 * mostra só esqueletos (nenhuma fala inventada). O avatar é um símbolo, nunca um rosto.
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
  status: string;
  greeting: string;
  replies: string[];
  privacy: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <div className="cb-panel cb-glass relative overflow-hidden shadow-2xl shadow-black/40 rounded-3xl">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--cb-border)]">
          <span className="cb-chip w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <Image src="/brand/favicon.png" alt="" width={22} height={22} className="w-[22px] h-[22px] object-contain brightness-0 invert" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-tight flex items-center gap-2">
              {name}
              <span className="text-xs font-bold tracking-wider rounded-full px-2 py-0.5 border border-[var(--cb-border-strong)] text-[var(--cb-fg)]">
                {badge}
              </span>
            </p>
            <p className="text-xs text-[var(--cb-muted)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cb-muted)]" aria-hidden />
              {status}
            </p>
          </div>
        </div>

        <div className="px-5 py-6 flex flex-col gap-4 min-h-[260px]">
          <p className="self-start max-w-[88%] rounded-2xl rounded-bl-md bg-[var(--cb-panel-raised)] px-4 py-3.5 leading-relaxed">
            {greeting}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {replies.slice(0, 3).map((r) => (
              <button
                key={r}
                disabled
                className="min-h-11 rounded-full border border-[var(--cb-border-strong)] px-4 text-sm font-medium text-[var(--cb-fg)] opacity-60 cursor-not-allowed"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 rounded-full border border-[var(--cb-border)] bg-[var(--cb-bg)]/60 pl-5 pr-2 py-2">
            <input
              disabled
              placeholder={placeholder}
              aria-label={placeholder}
              className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-[var(--cb-muted)] outline-none disabled:cursor-not-allowed"
            />
            <button
              disabled
              aria-label="Enviar"
              className="bg-[var(--cb-fg)] w-11 h-11 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#0b0b0d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
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
