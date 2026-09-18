import { Reveal } from "./Reveal";

export function SolutionSection({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-bg-soft)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 leading-tight max-w-3xl">
            {title}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="p-8 rounded-2xl border border-[var(--cb-border)] h-full">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--cb-muted)] leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
