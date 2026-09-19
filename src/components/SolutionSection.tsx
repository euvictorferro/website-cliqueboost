import { Reveal } from "./Reveal";

export function SolutionSection({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-16 max-w-3xl">{title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="cb-panel bg-[var(--cb-panel-raised)] p-8 h-full transition-transform duration-300 hover:-translate-y-1">
                <div
                  className="cb-gradient-bg w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white mb-5"
                  aria-hidden
                >
                  {i + 1}
                </div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-[var(--cb-muted)] leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
