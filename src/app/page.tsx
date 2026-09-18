import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { LogoMark } from "@/components/Logo";

const SERVICE_CARDS = [
  { href: "/servicos/websites", title: "Websites", description: "Sites que convertem, não só existem." },
  { href: "/servicos/trafego", title: "Tráfego / Ads", description: "Investimento com estratégia e retorno claro." },
  { href: "/servicos/social-media", title: "Social Media", description: "Conteúdo com sistema, não achismo." },
  { href: "/servicos/automacoes", title: "Automações com IA", description: "Processos que rodam sem depender de gente." },
  { href: "/servicos/design-grafico", title: "Design Gráfico", description: "Identidade visual consistente em tudo." },
  { href: "/servicos/brand-guide", title: "Brand Guide", description: "A marca documentada e pronta para escalar." },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 cb-noise overflow-hidden">
        <div className="absolute -right-32 -top-32 opacity-20 pointer-events-none">
          <LogoMark size={480} />
        </div>
        <Reveal className="relative">
          <span className="text-sm font-semibold cb-gradient-text uppercase tracking-wider">
            Clique Boost
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-[0.9] mt-4 mb-8 max-w-6xl">
            Marketing que <span className="cb-gradient-text">conecta</span> tudo
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

      <section className="py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 leading-tight max-w-2xl">
              Escolha a frente que mais dói agora
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICE_CARDS.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="group block p-8 rounded-2xl border border-[var(--cb-border)] h-full hover:border-[var(--cb-violet)] transition-colors"
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
