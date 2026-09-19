import { Reveal } from "./Reveal";

export function DashProofSection({
  angle,
}: {
  /** Texto contextual de acordo com o serviço da página que renderiza esta seção. */
  angle: string;
}) {
  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <div className="md:sticky md:top-28">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-6">Tecnologia que os concorrentes não têm</h2>
            <p className="text-[var(--cb-muted)] text-lg leading-relaxed">
              {angle} Nossos clientes acompanham tudo em tempo real, direto pelo{" "}
              <strong className="text-[var(--cb-fg)]">Clique Boost Dash</strong> — nosso
              painel próprio, já em produção real, com métricas de Instagram,
              conteúdo, tarefas e calendário em um só lugar.
            </p>
          </Reveal>
        </div>
        <Reveal y={60} delay={0.15}>
          {/* ponytail: mockup placeholder — substituir por prints reais do Dash quando disponíveis */}
          <div className="cb-panel cb-glass aspect-video flex items-center justify-center shadow-2xl shadow-black/40">
            <span className="text-[var(--cb-muted)] text-sm">Mockup do painel — em produção</span>
          </div>
          <div className="cb-panel cb-glass aspect-video flex items-center justify-center mt-6 shadow-2xl shadow-black/40">
            <span className="text-[var(--cb-muted)] text-sm">Mockup do calendário — em produção</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
