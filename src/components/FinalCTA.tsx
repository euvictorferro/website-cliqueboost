import Link from "next/link";
import { Reveal } from "./Reveal";

export function FinalCTA({
  title = "Vamos conversar sobre o seu próximo passo?",
  subtitle = "Fale com um consultor da Clique Boost e descubra o melhor caminho para o seu negócio.",
  ctaLabel = "Falar com um consultor",
  href = "https://wa.me/12393750915",
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <section className="relative py-32 px-6 md:px-10 text-center overflow-hidden">
      <div className="absolute inset-0 cb-noise opacity-60" />
      <Reveal className="relative max-w-3xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-4xl md:text-6xl">{title}</h2>
        <p className="text-lg text-[var(--cb-muted)] max-w-xl">{subtitle}</p>
        <Link
          href={href}
          target="_blank"
          className="cb-gradient-bg cb-press text-white font-bold text-lg px-10 py-4 rounded-full hover:scale-105 transition-transform"
        >
          {ctaLabel}
        </Link>
      </Reveal>
    </section>
  );
}
