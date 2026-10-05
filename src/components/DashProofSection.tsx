import { Reveal } from "./Reveal";
import { DashShowcase } from "./DashShowcase";
import { screensFor } from "@/content/dashScreens";

export function DashProofSection({
  angle,
  tone = "panel",
  screens,
}: {
  /** Chaves das telas a mostrar (ver content/dashScreens). Sem valor, mostra todas. */
  screens?: string[];
  /** "base" usa o preto do site, para quebrar sequência de seções cinza. */
  tone?: "panel" | "base";
  /** Texto contextual de acordo com o serviço da página que renderiza esta seção. */
  angle: string;
}) {
  return (
    <section className={`py-28 px-6 md:px-10 ${tone === "panel" ? "bg-[var(--cb-panel)]" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <DashShowcase screens={screensFor(screens)}>
          <Reveal className="grid md:grid-cols-[1fr_1.6fr] gap-6 md:gap-12 items-end mb-8">
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 3.25rem)" }}>Você acompanha o trabalho em um painel próprio</h2>
            <div>
              <p className="text-[var(--cb-muted)] text-base leading-relaxed">
                {angle} Nossos clientes acompanham o andamento direto pelo{" "}
                <strong className="text-[var(--cb-fg)]">Clique Boost Dash</strong>, nosso
                painel próprio, já em produção: métricas do Instagram, conteúdos, tarefas,
                calendário de postagens, atas das reuniões, arquivos e a Booster AI, um chat
                com IA sobre a sua conta. O módulo de anúncios está em desenvolvimento.
              </p>
            </div>
          </Reveal>
        </DashShowcase>
      </div>
    </section>
  );
}
