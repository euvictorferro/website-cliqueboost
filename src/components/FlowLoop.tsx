import { Reveal } from "./Reveal";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Três etapas ligadas por setas, com o retorno da última para a primeira. Só forma: o texto vem de fora. */
export function FlowLoop({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string }[];
}) {
  const last = items.length - 1;
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-16 max-w-3xl">{title}</h2>
        </Reveal>

        <ol className="grid md:grid-cols-3 gap-12 md:gap-10">
          {items.map((item, i) => (
            <li key={item.title} className="relative">
              <Reveal delay={i * 0.12} className="h-full">
                <div className={`h-full rounded-[20px] p-8 md:p-9 ${i === last ? "cb-border-gradient" : "cb-panel"}`}>
                  <h3 className="text-xl md:text-2xl mb-3">{item.title}</h3>
                  <p className="text-[var(--cb-muted)] leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
              {i < last && (
                <span
                  className="absolute z-10 w-10 h-10 rounded-full bg-[var(--cb-bg)] border border-[var(--cb-border-strong)] flex items-center justify-center text-[var(--cb-fg)] left-1/2 -bottom-[1.75rem] -translate-x-1/2 rotate-90 md:rotate-0 md:left-auto md:-right-[1.25rem] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
                  aria-hidden
                >
                  <Arrow />
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Retorno: da última etapa de volta para a primeira. */}
        <div className="relative hidden md:block h-24 mt-3" aria-hidden>
          <svg viewBox="0 0 1000 96" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="loop-g" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8a2be2" />
                <stop offset="100%" stopColor="#0a6ef0" />
              </linearGradient>
            </defs>
            <path
              className="cb-flow"
              d="M 833 2 C 833 96, 167 96, 167 8"
              fill="none"
              stroke="url(#loop-g)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#0a6ef0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="absolute left-[16.667%] top-0 -translate-x-1/2 -translate-y-1/2">
            <path d="M6 15l6-6 6 6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
