import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ValuesSlider } from "@/components/ValuesSlider";
import { FlowLoop } from "@/components/FlowLoop";
import { FaqList } from "@/components/FaqList";
import { StepsRow } from "@/components/StepsRow";
import { DashProofSection } from "@/components/DashProofSection";
import { CycleSystem } from "@/components/CycleSystem";
import { HeroTitle } from "@/components/HeroTitle";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ChatPreview } from "@/components/ChatPreview";
import { ViralCases } from "@/components/ViralCases";
import { FinalCTA } from "@/components/FinalCTA";
import { Liquid } from "@/components/canvasui/Liquid";

/** Ligar (true) só quando o app estiver publicado na App Store. Enquanto for false: texto "a caminho" e nenhum selo. */
const APP_STORE_LIVE = false;

export default function Home() {
  return (
    <>
      <section className="relative cb-noise overflow-hidden">
        <HeroBackdrop />
        {/* Canvas UI (MIT + Commons Clause): uso no site é permitido, revenda não. */}
        <Liquid className="cb-liquid relative" color={[0.54, 0.17, 0.89]} radius={0.1} force={0.6} intensity={0.8} densityDissipation={0.93}>
        <div className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24">
        <Reveal className="relative max-w-5xl">
          <HeroTitle
            lines={["O anúncio traz o contato.", "O atendimento decide se vira cliente."]}
            accentLine={1}
          />
          <p className="text-xl md:text-2xl text-[var(--cb-muted)] max-w-2xl mb-12">
            A Clique Boost não vende serviços soltos. Monta o sistema que leva o contato do
            anúncio até a conversa de venda, para profissionais brasileiros nos EUA. A IA
            responde e qualifica. Uma pessoa fecha.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://cal.com/victor-clique-boost-jelawr/30min"
              target="_blank"
              className="cb-gradient-bg cb-press text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Agendar uma conversa
            </Link>
            <Link
              href="https://wa.me/12393750915"
              target="_blank"
              className="cb-press border border-[var(--cb-border-strong)] font-bold px-8 py-4 rounded-full hover:border-[var(--cb-fg)] transition-colors"
            >
              Falar no WhatsApp
            </Link>
          </div>
        </Reveal>
        </div>
        </Liquid>
      </section>

      {/* Ideia única da página: o ciclo do contato (atrair, trazer, atender, acompanhar). */}
      <CycleSystem
        title="Um sistema para o contato não esfriar no caminho"
        steps={[
          { title: "Atrair", description: "Conteúdo em formatos que já funcionaram faz o seu nome ser visto antes do contato." },
          { title: "Trazer", description: "Anúncios levam o contato certo até o seu negócio." },
          { title: "Atender", description: "A IA responde e qualifica. Uma pessoa assume e fecha." },
          { title: "Acompanhar", description: "Você vê o trabalho no Dash: métricas do Instagram, conteúdo, tarefas e calendário." },
        ]}
      />

      {/* ponytail: interface pronta, campo desativado. Ligar ao endpoint da assistente quando existir. */}
      <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-6">Converse com a nossa assistente</h2>
            <p className="text-[var(--cb-muted)] text-lg leading-relaxed">
              Veja como é o atendimento com IA. Aqui, a assistente se apresenta como IA, responde
              sobre a Clique Boost e, quando você quiser, passa para uma pessoa. No seu negócio, a
              gente desenha com você o nome, o tom de voz e o fluxo.
            </p>
          </Reveal>
          <Reveal y={60} delay={0.15}>
            <ChatPreview
              name="Assistente virtual"
              badge="IA"
              status="Chat de teste, em construção"
              greeting="Oi! Sou a assistente virtual da Clique Boost. Posso te explicar como funciona e, se você quiser, passar para uma pessoa. Sobre o que você quer saber?"
              replies={["Como funciona?", "Já tenho agência", "Quero agendar uma conversa"]}
              placeholder="Escreva sua mensagem"
              privacy="Você está falando com uma IA. Não compartilhe senhas nem dados de cartão."
            />
          </Reveal>
        </div>
      </section>

      <FlowLoop
        title="Tráfego e IA trabalham juntos"
        items={[
          {
            title: "O anúncio traz",
            description: "Anúncios levam o contato certo até o seu negócio.",
          },
          {
            title: "A IA atende e qualifica",
            description: "Ela responde ao contato e faz as perguntas-chave. Do primeiro contato até o agendamento, a IA acompanha.",
          },
          {
            title: "O fluxo é desenhado com você",
            description: "Se preferir, a IA só qualifica e uma pessoa continua. Se a reunião não fecha, o follow-up também é com a IA, e o ciclo recomeça.",
          },
        ]}
      />

      <ViralCases
        title="Método Viral: formatos que já funcionaram, adaptados ao seu nicho"
        cases={[
          {
            title: "Corretor em Orlando",
            metric: "230 mil",
            unit: "visualizações",
            description: "Um vídeo passou de 230 mil visualizações, e o perfil foi de cerca de 2.400 para 3.700 seguidores em 2 dias. O vídeo somou mais de 25 mil interações, entre curtidas, comentários, compartilhamentos e salvamentos.",
          },
          {
            title: "Corretora na Flórida",
            metric: "160 mil",
            unit: "visualizações",
            description: "Um vídeo passou de 160 mil visualizações.",
          },
          {
            title: "Planejamento financeiro",
            metric: "16 mil",
            unit: "visualizações",
            description: "Um vídeo passou de 16 mil visualizações, em um perfil pequeno.",
          },
        ]}
        note="Exemplos dos nossos vídeos de melhor desempenho, entre setembro e outubro de 2026. Visualizações medem alcance, não vendas. O resultado de cada perfil varia."
      />

      <DashProofSection
        tone="base"
        appStoreLive={APP_STORE_LIVE}
        angle={APP_STORE_LIVE ? "Funciona no navegador e no celular, e o app está disponível na App Store." : "Funciona no navegador e no celular, e o app para iPhone está a caminho."}
      />

      <ValuesSlider />

      <FaqList
        title="Perguntas que todo mundo faz"
        items={[
          {
            title: "Já tenho agência ou equipe. Preciso trocar?",
            description: "Não necessariamente. A gente começa olhando o que você já tem, e o atendimento com IA pode complementar o trabalho que existe.",
          },
          {
            title: "Isso é robô?",
            description: "É uma assistente virtual. Ela tem o nome e o tom que a gente define com você, e uma pessoa assume a conversa quando chega a hora. Se alguém perguntar, ela diz a verdade.",
          },
          {
            title: "A IA vai soar artificial para o meu cliente?",
            description: "A gente escreve o fluxo junto com você, com o seu jeito de falar e as perguntas certas para o seu negócio, e testa antes de ligar.",
          },
          {
            title: "Para quais negócios funciona?",
            description: "Para profissionais ligados a imóveis, finanças e seguros: corretores, agentes de seguro, mortgage brokers, consultores financeiros, contadores e designers de interiores.",
          },
          {
            title: "Quanto custa e quanto tempo leva?",
            description: "Depende do que o seu negócio precisa. Na conversa a gente mostra o caminho, e os prazos de entrega são combinados desde o começo.",
          },
        ]}
      />

      <StepsRow
        title="Como começamos"
        steps={[
          { title: "Diagnóstico", description: "Mapeamos como está o seu marketing hoje, frente por frente." },
          { title: "Plano", description: "Desenhamos a estratégia conectando as frentes." },
          { title: "Execução", description: "Todos os times trabalhando com a mesma visão." },
          { title: "Acompanhamento", description: "Um painel, um time, uma estratégia." },
        ]}
      />

      <FinalCTA
        title="Vamos olhar como o seu contato é atendido hoje?"
        subtitle="Em 30 minutos, a gente conversa sobre o seu negócio e mostra como o BoostConnect funcionaria para você."
      />
    </>
  );
}
