import Image from "next/image";
import { Reveal } from "./Reveal";

/** Moldura de navegador. A honestidade fica na legenda abaixo das telas, não sobre a imagem. */
function DashFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="cb-panel overflow-hidden shadow-2xl shadow-black/40">
      <div className="cb-glass flex items-center gap-1.5 px-4 py-3 border-b border-[var(--cb-border)]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-full bg-white/15" />
        ))}
      </div>
      <Image src={src} alt={alt} width={1922} height={937} sizes="(min-width: 768px) 560px, 100vw" className="w-full h-auto" />
    </figure>
  );
}

export function DashProofSection({
  angle,
  tone = "panel",
  appStoreLive = false,
  appStoreHref,
}: {
  /** Selo oficial da App Store só aparece com true. Precisa de public/brand/app-store-badge.svg (arte oficial da Apple) e do link. */
  appStoreLive?: boolean;
  appStoreHref?: string;
  /** "base" usa o preto do site, para quebrar sequência de seções cinza. */
  tone?: "panel" | "base";
  /** Texto contextual de acordo com o serviço da página que renderiza esta seção. */
  angle: string;
}) {
  return (
    <section className={`py-28 px-6 md:px-10 ${tone === "panel" ? "bg-[var(--cb-panel)]" : ""}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <div className="md:sticky md:top-28">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-6">Você acompanha o trabalho em um painel próprio</h2>
            <p className="text-[var(--cb-muted)] text-lg leading-relaxed">
              {angle} Nossos clientes acompanham o andamento direto pelo{" "}
              <strong className="text-[var(--cb-fg)]">Clique Boost Dash</strong>, nosso
              painel próprio, já em produção, com métricas do Instagram,
              conteúdo, tarefas e calendário em um só lugar.
            </p>
            {appStoreLive && appStoreHref && (
              <a href={appStoreHref} target="_blank" rel="noopener" className="inline-block mt-8">
                <Image src="/brand/app-store-badge.svg" alt="Baixar na App Store" width={120} height={40} className="h-11 w-auto" />
              </a>
            )}
          </Reveal>
        </div>
        <Reveal y={60} delay={0.15} className="flex flex-col gap-6">
          <DashFrame src="/dash/dash_organico_exemplo.png" alt="Tela de exemplo do Clique Boost Dash com métricas do Instagram" />
          <DashFrame src="/dash/dash_tasks_exemplo.png" alt="Tela de exemplo do Clique Boost Dash com tarefas" />
          <p className="text-sm text-[var(--cb-muted)]">Tela de exemplo do Dash.</p>
        </Reveal>
      </div>
    </section>
  );
}
