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
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-14 leading-tight">
            {title}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {points.map((p, i) => (
            <Reveal key={p} delay={i * 0.08}>
              <div className="border-l-2 border-[var(--cb-violet)] pl-6 py-2">
                <p className="text-lg md:text-xl text-[var(--cb-muted)]">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
