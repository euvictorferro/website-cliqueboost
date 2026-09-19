import { Reveal } from "./Reveal";

export function ProblemSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-14">{title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {points.map((p, i) => (
            <Reveal key={p} delay={i * 0.08}>
              <div className="flex items-start gap-4 py-2">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full cb-gradient-bg shrink-0" aria-hidden />
                <p className="text-lg md:text-xl text-[var(--cb-muted)]">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
