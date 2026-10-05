import { Reveal } from "./Reveal";

/** Perguntas em acordeão nativo (`<details>`): teclado e leitor de tela de graça, uma aberta por vez. */
export function FaqList({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24">
        <Reveal className="md:sticky md:top-28 self-start">
          <h2 className="text-3xl md:text-5xl">{title}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-y border-[var(--cb-border)] divide-y divide-[var(--cb-border)]">
            {items.map((item, i) => (
              <details key={item.title} name="faq" open={i === 0} className="group">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-xl md:text-2xl">{item.title}</h3>
                  <span className="shrink-0 w-10 h-10 rounded-full border border-[var(--cb-border-strong)] flex items-center justify-center transition-[transform,background] duration-300 group-open:rotate-45 group-open:bg-[var(--cb-fg)] group-open:text-[#0b0b0d] group-open:border-transparent">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="cb-faq-body pb-7 pr-16 text-[var(--cb-muted)] text-lg leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
