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
          <h2 className="text-3xl md:text-5xl mb-16">{title}</h2>
        </Reveal>
        <div className="relative flex flex-col">
          <div
            className="absolute left-6 top-6 bottom-6 w-px"
            style={{ background: "linear-gradient(180deg, var(--cb-purple), var(--cb-blue))" }}
            aria-hidden
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative flex gap-6 md:gap-10 py-8">
                <span className="cb-gradient-bg relative z-10 flex items-center justify-center shrink-0 w-12 h-12 rounded-full text-white font-bold">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-xl md:text-2xl mb-2">{step.title}</h3>
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
