import { Reveal } from "./Reveal";

export function ProcessSteps({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 leading-tight">
            {title}
          </h2>
        </Reveal>
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="flex gap-6 md:gap-10 py-8 border-t border-[var(--cb-border)] last:border-b">
                <span className="text-4xl md:text-5xl font-black cb-gradient-text shrink-0 w-16">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-[var(--cb-muted)] max-w-xl">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
