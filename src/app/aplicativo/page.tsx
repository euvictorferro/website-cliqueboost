import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

const FEATURES = [
  { title: "Métricas em tempo real", description: "Dado real do Instagram via Meta Graph API — não é maquete, é produção." },
  { title: "Board de conteúdo", description: "Aprovação e organização de conteúdo integradas ao fluxo do cliente." },
  { title: "Tarefas", description: "Tarefas do time centralizadas e visíveis pro cliente, sem planilha solta." },
  { title: "Calendário", description: "Calendário de postagens compartilhado entre agência e cliente." },
  { title: "Atas de reunião", description: "Reuniões documentadas e conectadas ao Google Drive/Calendar do cliente." },
  { title: "Booster AI", description: "Assistente de IA dentro do painel do cliente, para dúvidas e acompanhamento." },
  { title: "Bunker de arquivos", description: "Repositório de arquivos do cliente, organizado por conta." },
  { title: "Conta e faturamento", description: "Faturamento e indicações do cliente integrados ao painel." },
];

const WHATSAPP_B2B =
  "https://wa.me/12393750915?text=" +
  encodeURIComponent("Quero saber mais sobre o Aplicativo da Clique Boost para minha agência.");

export default function AplicativoPage() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 cb-noise overflow-hidden">
        <div className="cb-panel absolute top-24 right-6 md:right-10 px-4 py-2">
          <span className="text-xs font-semibold cb-gradient-text">Para agências de marketing</span>
        </div>
        <Reveal className="relative max-w-4xl">
          <h1 className="text-5xl md:text-8xl mb-8">
            O software que já roda a Clique Boost. Agora, para a sua agência.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--cb-muted)] max-w-2xl mb-10">
            Um hub onde o cliente acompanha tudo da própria agência num só lugar, e a agência
            opera com um agente de IA cuidando da estratégia — o mesmo software que já roda a
            Clique Boost, em produção real, abrindo para outras agências usarem com a própria
            marca.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={WHATSAPP_B2B}
              target="_blank"
              className="cb-gradient-bg cb-press text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Entrar na lista de espera
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14 max-w-2xl">
            <h2 className="text-3xl md:text-5xl mb-4">Um hub, dois lados</h2>
            <p className="text-[var(--cb-muted)] text-lg">
              Para onde o Aplicativo está indo — parte já em produção, parte em construção.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="cb-panel bg-[var(--cb-panel-raised)] p-8 h-full">
                <h3 className="text-xl mb-4">Para o cliente da agência</h3>
                <ul className="space-y-3 text-[var(--cb-muted)]">
                  <li>Acompanha as tarefas que a agência está executando</li>
                  <li>Vê os conteúdos em produção, sem pedir satisfação por mensagem</li>
                  <li>Métricas orgânicas e pagas em um só painel</li>
                  <li>Conversa com um chatbot de IA sobre métricas e sobre o plano da agência</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="cb-panel bg-[var(--cb-panel-raised)] p-8 h-full">
                <h3 className="text-xl mb-4">Para o dono da agência</h3>
                <ul className="space-y-3 text-[var(--cb-muted)]">
                  <li>Conecta a conta Meta/Business Manager com todos os clientes</li>
                  <li>Um agente de IA aprende produto, estratégia, budget e nicho de cada cliente a partir do briefing</li>
                  <li>Roteiros e campanhas seguindo o padrão viral do nicho, gerados pelo agente</li>
                  <li>A agência foca em captar cliente e executar (edição de vídeo, design)</li>
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="text-sm text-[var(--cb-muted)] mt-8 max-w-2xl">
              Hoje, tarefas, conteúdo e métricas orgânicas já rodam em produção; métricas
              pagas, conexão de Business Manager de terceiros e geração automática de
              campanha por IA são a próxima fase. O aplicativo mobile (iOS) também está em
              desenvolvimento, ainda sem lançamento na App Store.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-6 max-w-3xl">
              Testado em produção, não em teoria
            </h2>
            <p className="text-lg text-[var(--cb-muted)] max-w-2xl">
              O painel roda hoje em <strong className="text-[var(--cb-fg)]">dash.cliqueboost.io</strong>,
              atendendo clientes reais da Clique Boost com dado real do Instagram — cada
              funcionalidade abaixo já está em uso, não é conceito.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-8 px-6 md:px-10 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="cb-panel bg-[var(--cb-panel-raised)] p-6 h-full">
                  <h3 className="text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--cb-muted)] leading-relaxed">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-6">White-label: a marca é sua</h2>
            <p className="text-[var(--cb-muted)] text-lg leading-relaxed">
              Sua agência licencia o painel com a sua própria identidade — a Clique Boost é a
              tecnologia por trás, invisível para o seu cliente final. A base multi-tenant já
              está em construção sobre a mesma infraestrutura que atende nossos clientes hoje;
              a abertura para novas agências parceiras acontece em ondas, não em cadastro
              aberto imediato.
            </p>
          </Reveal>
          <Reveal y={40} delay={0.1}>
            <div className="cb-panel cb-glass aspect-video flex items-center justify-center shadow-2xl shadow-black/40">
              <span className="text-[var(--cb-muted)] text-sm">Mockup do painel white-label — em produção</span>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title="Quer ser uma das primeiras agências parceiras?"
        subtitle="Entre na lista de espera e a gente avisa assim que abrir uma vaga para a sua agência."
        ctaLabel="Entrar na lista de espera"
        href={WHATSAPP_B2B}
      />
    </>
  );
}
