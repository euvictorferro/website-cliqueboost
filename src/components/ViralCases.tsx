import { Reveal } from "./Reveal";

/** Casos só em texto e número, sem vídeo, print, nome ou foto. A nota é parte da seção e não some. */
export function ViralCases({
  title,
  cases,
  note,
}: {
  title: string;
  cases: { title: string; metric: string; unit: string; description: string }[];
  note: string;
}) {
  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-16 max-w-3xl">{title}</h2>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="h-full">
              <article className="cb-panel bg-[var(--cb-panel-raised)] p-8 h-full flex flex-col gap-6">
                <h3 className="text-xl md:text-2xl">{c.title}</h3>
                <p className="text-[var(--cb-muted)] leading-relaxed">{c.description}</p>
                <p className="mt-auto pt-6 border-t border-[var(--cb-border)] flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">
                    {c.metric}
                  </span>
                  <span className="text-[var(--cb-muted)]">{c.unit}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-2xl border-l border-[var(--cb-border-strong)] pl-5 text-base text-[#b8b8c0] leading-relaxed">
          {note}
        </p>
      </div>
    </section>
  );
}
