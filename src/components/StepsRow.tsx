import { Reveal } from "./Reveal";

/** Etapas em linha no desktop, em coluna no celular, presas por um fio de gradiente. */
export function StepsRow({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-16">{title}</h2>
        </Reveal>

        <ol className="relative grid md:grid-cols-4 gap-10 md:gap-8">
          <span
            className="absolute left-6 top-6 bottom-6 w-px md:hidden"
            style={{ background: "linear-gradient(180deg, var(--cb-purple), #0a6ef0)" }}
            aria-hidden
          />
          <span
            className="absolute hidden md:block top-6 left-6 right-[calc(25%-1.5rem)] h-px"
            style={{ background: "linear-gradient(90deg, var(--cb-purple), #0a6ef0)" }}
            aria-hidden
          />
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.1} className="flex md:block gap-5">
                <span className="cb-gradient-bg relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {i + 1}
                </span>
                <div className="pt-1.5 md:pt-0 md:mt-7">
                  <h3 className="text-xl md:text-2xl mb-2">{step.title}</h3>
                  <p className="text-[var(--cb-muted)] leading-relaxed max-w-xs">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
