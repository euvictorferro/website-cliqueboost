import { ServiceHero } from "@/components/ServiceHero";
import { SolutionSection } from "@/components/SolutionSection";
import { DashProofSection } from "@/components/DashProofSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  { title: "Websites", description: "A base digital que sustenta toda a operação." },
  { title: "Tráfego / Ads", description: "Atração qualificada e escalável." },
  { title: "Social Media", description: "Autoridade e relacionamento construídos todos os dias." },
  { title: "Automações com IA", description: "Eficiência operacional sem perder personalização." },
  { title: "Design Gráfico", description: "Consistência visual em todo ponto de contato." },
  { title: "Brand Guide", description: "A identidade que une tudo em um só padrão." },
];

export default function MetodoPage() {
  return (
    <>
      <ServiceHero
        eyebrow="BoostConnect"
        title="Todo o seu marketing, integrado, com um só ponto de contato"
        painHook="Em vez de contratar 6 fornecedores diferentes que não conversam entre si, você tem um único time cuidando de tudo — com visão completa do seu negócio."
      />

      <section className="py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 leading-tight max-w-3xl">
              Seis frentes, uma só estratégia
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="p-8 rounded-2xl border border-[var(--cb-border)] h-full">
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-[var(--cb-muted)] leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
