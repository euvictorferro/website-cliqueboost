import { Reveal } from "./Reveal";

export function ServiceHero({
  title,
  painHook,
}: {
  title: string;
  /** Reforça o diagnóstico de dor já feito na call via SPIN Selling — não genérico. */
  painHook: string;
}) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 cb-noise overflow-hidden">
      <Reveal>
        <h1 className="text-5xl md:text-8xl mb-8 max-w-5xl">{title}</h1>
        <p className="text-xl md:text-2xl text-[var(--cb-muted)] max-w-2xl">{painHook}</p>
      </Reveal>
    </section>
  );
}
