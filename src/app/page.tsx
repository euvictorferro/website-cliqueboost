import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ValuesSlider } from "@/components/ValuesSlider";
import { SolutionSection } from "@/components/SolutionSection";
import { DashProofSection } from "@/components/DashProofSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FinalCTA } from "@/components/FinalCTA";

const SERVICES = [
  { href: "/servicos/websites", title: "Websites", description: "Sites que convertem, não só existem." },
  { href: "/servicos/trafego", title: "Tráfego Pago", description: "Investimento com estratégia e retorno claro." },
  { href: "/servicos/social-media", title: "Social Media", description: "Conteúdo com sistema, não achismo." },
  { href: "/servicos/automacoes", title: "Automação", description: "Processos que rodam sem depender de gente." },
  { href: "/servicos/design-grafico", title: "Design", description: "Identidade visual consistente em tudo." },
  { href: "/servicos/brand-guide", title: "Brand Guidelines", description: "A marca documentada e pronta para escalar." },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 cb-noise overflow-hidden">
        <Reveal className="relative max-w-4xl">
          <h1 className="text-6xl md:text-8xl mb-8">
            Todo o seu marketing, integrado, com um só ponto de contato
          </h1>
          <p className="text-xl md:text-2xl text-[var(--cb-muted)] max-w-2xl mb-4">
            Em vez de contratar 6 fornecedores diferentes que não conversam entre si, você
            tem um único time cuidando de tudo — com visão completa do seu negócio.
          </p>
          <p className="text-lg cb-gradient-text font-semibold mb-10">
            Acelerando o seu sonho americano.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://wa.me/12393750915"
              target="_blank"
              className="cb-gradient-bg cb-press text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Falar com um consultor
            </Link>
            <Link
              href="/aplicativo"
              className="cb-press border border-[var(--cb-border-strong)] font-bold px-8 py-4 rounded-full hover:border-[var(--cb-fg)] transition-colors"
            >
              Conheça o Aplicativo
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-6xl">Seis frentes, uma só estratégia</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.06} className="h-full">
                <ServiceCard href={s.href} title={s.title} description={s.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ValuesSlider />

      <SolutionSection
        title="Um único time, responsável pelo resultado completo"
        items={[
          {
            title: "Sem ruído entre fornecedores",
            description: "Site, tráfego, conteúdo e automação nascem da mesma estratégia.",
          },
          {
            title: "Um ponto de contato",
            description: "Você fala com um time só, que enxerga o negócio inteiro.",
          },
          {
            title: "Visão unificada de dados",
            description: "Tudo acompanhado em um único painel de métricas.",
          },
        ]}
      />

      <DashProofSection angle="No BoostConnect, isso significa ver todas as frentes do seu marketing em um único painel." />

      <ProcessSteps
        title="Como funciona o BoostConnect"
        steps={[
          { title: "Diagnóstico completo", description: "Mapeamos todas as frentes do seu marketing atual." },
          { title: "Plano integrado", description: "Desenhamos a estratégia conectando as seis frentes." },
          { title: "Execução conjunta", description: "Todos os times trabalhando com a mesma visão." },
          { title: "Acompanhamento único", description: "Um painel, um time, um resultado." },
        ]}
      />

      <FinalCTA
        title="Pronto para integrar todo o seu marketing?"
        subtitle="Fale com um consultor e entenda como o BoostConnect funciona para o seu negócio."
      />
    </>
  );
}
