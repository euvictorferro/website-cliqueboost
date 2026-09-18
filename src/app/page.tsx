import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { LogoMark } from "@/components/Logo";
import { Squiggle } from "@/components/Squiggle";

const SERVICE_CARDS = [
  { href: "/servicos/websites", title: "Websites", description: "Sites que convertem, não só existem.", rotate: "[transform:rotate(-6deg)]" },
  { href: "/servicos/trafego", title: "Tráfego / Ads", description: "Investimento com estratégia e retorno claro.", rotate: "[transform:rotate(5deg)]" },
  { href: "/servicos/social-media", title: "Social Media", description: "Conteúdo com sistema, não achismo.", rotate: "[transform:rotate(-4deg)]" },
  { href: "/servicos/automacoes", title: "Automações com IA", description: "Processos que rodam sem depender de gente.", rotate: "[transform:rotate(6deg)]" },
  { href: "/servicos/design-grafico", title: "Design Gráfico", description: "Identidade visual consistente em tudo.", rotate: "[transform:rotate(-5deg)]" },
  { href: "/servicos/brand-guide", title: "Brand Guide", description: "A marca documentada e pronta para escalar.", rotate: "[transform:rotate(4deg)]" },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 cb-noise overflow-hidden">
        <div className="absolute -right-32 -top-32 opacity-20 pointer-events-none">
          <LogoMark size={480} />
        </div>
        <Reveal className="relative">
          <span className="cb-script text-3xl md:text-4xl cb-gradient-text block -mb-2 md:-mb-4 [transform:rotate(-3deg)]">
            Clique Boost apresenta
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-[0.9] mb-8 max-w-6xl uppercase">
            Marketing que <span className="cb-script lowercase cb-gradient-text text-[0.7em]">conecta</span> tudo
          </h1>
          <p className="text-xl md:text-2xl text-[var(--cb-muted)] max-w-2xl mb-10">
            Websites, Tráfego, Social Media, Automações com IA, Design Gráfico e Brand Guide —
            integrados em um único método, com um único ponto de contato.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/metodo"
              className="cb-gradient-bg text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Conheça o BoostConnect
            </Link>
            <Link
              href="https://wa.me/12393750915"
              target="_blank"
              className="border border-[var(--cb-border)] font-bold px-8 py-4 rounded-full hover:border-[var(--cb-fg)] transition-colors"
            >
              Falar com um consultor
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="relative mb-20 max-w-2xl">
            <span className="cb-script text-2xl cb-gradient-text absolute -top-8 left-1 [transform:rotate(-4deg)]">
              Escolha a sua
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">
              Frente que mais dói agora
            </h2>
            <Squiggle className="absolute -right-24 top-0 hidden lg:block" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10">
            {SERVICE_CARDS.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className={`group block p-8 rounded-2xl border border-[var(--cb-border)] bg-[var(--cb-bg-soft)] h-full shadow-xl shadow-black/30 transition-all duration-300 ${s.rotate} hover:[transform:rotate(0deg)_translateY(-8px)] hover:shadow-2xl hover:shadow-[var(--cb-violet)]/20 hover:border-[var(--cb-violet)]`}
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:cb-gradient-text transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[var(--cb-muted)] leading-relaxed">{s.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
