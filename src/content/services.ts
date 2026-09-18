export type ServiceContent = {
  slug: string;
  eyebrow: string;
  title: string;
  painHook: string;
  problem: { title: string; points: string[] };
  solution: { title: string; items: { title: string; description: string }[] };
  dashAngle: string;
  process: { title: string; steps: { title: string; description: string }[] };
  cta: { title: string; subtitle: string };
};

export const SERVICES: Record<string, ServiceContent> = {
  websites: {
    slug: "websites",
    eyebrow: "Websites",
    title: "Seu site hoje afasta cliente antes da primeira mensagem",
    painHook:
      "Se o seu site ainda parece um cartão de visitas de 2015, é isso que o mercado está lendo sobre o seu negócio.",
    problem: {
      title: "Um site lento e genérico custa oportunidades todos os dias",
      points: [
        "Visitante sai antes de entender o que você faz",
        "Sem otimização, o Google simplesmente não te mostra",
        "Formulário de contato que ninguém preenche",
        "Nenhuma conexão com o resto da sua operação de marketing",
      ],
    },
    solution: {
      title: "Um site que trabalha junto com sua estratégia, não isolado dela",
      items: [
        { title: "Design sob medida", description: "Identidade visual aplicada com intenção, não template genérico." },
        { title: "Performance real", description: "Carregamento rápido e SEO técnico desde o primeiro deploy." },
        { title: "Integrado ao funil", description: "Conectado às suas campanhas de tráfego e automações." },
      ],
    },
    dashAngle: "No Websites, isso significa ver de onde vêm as visitas e quantas viram lead.",
    process: {
      title: "Como funciona",
      steps: [
        { title: "Diagnóstico", description: "Entendemos seu público, objetivo e concorrência." },
        { title: "Design & Conteúdo", description: "Construímos a narrativa visual do site." },
        { title: "Desenvolvimento", description: "Codamos com performance e SEO desde a base." },
        { title: "Lançamento", description: "Publicamos e acompanhamos os primeiros resultados." },
      ],
    },
    cta: {
      title: "Pronto para ter um site à altura do seu negócio?",
      subtitle: "Fale com um consultor e veja como podemos construir o seu.",
    },
  },
  trafego: {
    slug: "trafego",
    eyebrow: "Tráfego / Ads",
    title: "Investir em anúncio sem estratégia é queimar dinheiro",
    painHook:
      "Você já colocou dinheiro em anúncio e não viu retorno claro — o problema quase nunca é o orçamento, é a estrutura por trás dele.",
    problem: {
      title: "Campanhas sem estratégia geram cliques, não clientes",
      points: [
        "Verba alta, resultado imprevisível",
        "Sem rastreamento correto, você não sabe o que funciona",
        "Criativos que não conversam com o público certo",
        "Ninguém olhando a campanha todos os dias",
      ],
    },
    solution: {
      title: "Gestão de tráfego com método, não achismo",
      items: [
        { title: "Segmentação precisa", description: "Público certo, na plataforma certa, na hora certa." },
        { title: "Testes constantes", description: "Criativos e públicos testados em ciclo contínuo." },
        { title: "Rastreamento completo", description: "Cada real investido rastreado até a conversão." },
      ],
    },
    dashAngle: "No Tráfego, isso significa ver o desempenho das campanhas ao vivo, sem esperar relatório mensal.",
    process: {
      title: "Como funciona",
      steps: [
        { title: "Auditoria", description: "Analisamos histórico e potencial de investimento." },
        { title: "Estrutura de campanhas", description: "Montamos a arquitetura de contas e públicos." },
        { title: "Criativos & Testes", description: "Produzimos e testamos variações continuamente." },
        { title: "Otimização contínua", description: "Ajustes semanais com base em dado real." },
      ],
    },
    cta: {
      title: "Quer parar de queimar verba com anúncio?",
      subtitle: "Fale com um consultor e entenda como estruturamos sua operação de tráfego.",
    },
  },
  "social-media": {
    slug: "social-media",
    eyebrow: "Social Media",
    title: "Postar sem estratégia é só ruído, não crescimento",
    painHook:
      "Você posta, mas o perfil não cresce e não gera venda — o problema é a ausência de um sistema por trás do conteúdo.",
    problem: {
      title: "Conteúdo sem consistência não constrói autoridade",
      points: [
        "Postagens esporádicas, sem calendário",
        "Ganchos genéricos que não param o scroll",
        "Nenhuma métrica acompanhada de perto",
        "Marca pessoal ou de negócio sem direção clara",
      ],
    },
    solution: {
      title: "Um sistema de conteúdo, não só posts avulsos",
      items: [
        { title: "Calendário estratégico", description: "Planejamento mensal com pilares de conteúdo definidos." },
        { title: "Roteiros orientados a dado", description: "Ganchos validados por performance real, não achismo." },
        { title: "Gestão de comunidade", description: "Resposta e engajamento tratados como parte da estratégia." },
      ],
    },
    dashAngle: "No Social Media, isso significa acompanhar conteúdo, calendário e métricas de Instagram no mesmo lugar.",
    process: {
      title: "Como funciona",
      steps: [
        { title: "Diagnóstico de perfil", description: "Analisamos histórico, nicho e concorrência." },
        { title: "Linha editorial", description: "Definimos pilares, tom de voz e formatos." },
        { title: "Produção", description: "Roteiro, gravação/edição e agenda de publicação." },
        { title: "Análise de performance", description: "Ajustes semanais com base em métricas reais." },
      ],
    },
    cta: {
      title: "Pronto para transformar seu perfil em ativo de negócio?",
      subtitle: "Fale com um consultor e veja como estruturamos sua presença digital.",
    },
  },
  automacoes: {
    slug: "automacoes",
    eyebrow: "Automações com IA",
    title: "Seu time perde tempo com tarefa que a IA já resolve",
    painHook:
      "Enquanto sua equipe responde manualmente o mesmo lead pela quinta vez, seus concorrentes já automatizaram isso.",
    problem: {
      title: "Processos manuais custam tempo e vendas",
      points: [
        "Lead esperando resposta por horas",
        "Time repetindo a mesma tarefa todos os dias",
        "Nenhuma automação entre as ferramentas que você já usa",
        "Dado espalhado, sem centralização",
      ],
    },
    solution: {
      title: "IA aplicada a processos reais do seu negócio",
      items: [
        { title: "Atendimento automatizado", description: "Respostas e qualificação de lead 24/7." },
        { title: "Fluxos integrados", description: "Suas ferramentas conversando entre si, sem trabalho manual." },
        { title: "Automação sob medida", description: "Construída para o seu processo, não um template genérico." },
      ],
    },
    dashAngle: "Nas Automações, isso significa tarefas e fluxos centralizados, sem perder rastro do que já foi feito.",
    process: {
      title: "Como funciona",
      steps: [
        { title: "Mapeamento", description: "Identificamos os processos com maior potencial de automação." },
        { title: "Desenho do fluxo", description: "Estruturamos a lógica e as integrações necessárias." },
        { title: "Implementação", description: "Construímos e testamos a automação." },
        { title: "Acompanhamento", description: "Monitoramos e ajustamos com o uso real." },
      ],
    },
    cta: {
      title: "Quer tirar tarefa repetitiva da mão do seu time?",
      subtitle: "Fale com um consultor e veja o que pode ser automatizado hoje.",
    },
  },
  "design-grafico": {
    slug: "design-grafico",
    eyebrow: "Design Gráfico",
    title: "Visual inconsistente faz sua marca parecer amadora",
    painHook:
      "Cada peça parece de uma empresa diferente — isso corrói a confiança antes mesmo do cliente falar com você.",
    problem: {
      title: "Sem padrão visual, a marca perde força",
      points: [
        "Peças feitas 'na pressa', sem identidade",
        "Materiais que não conversam entre si",
        "Zero consistência entre redes, site e material comercial",
        "Marca que não é lembrada",
      ],
    },
    solution: {
      title: "Design consistente em todos os pontos de contato",
      items: [
        { title: "Peças sob medida", description: "Social media, apresentações e materiais comerciais." },
        { title: "Padrão visual aplicado", description: "Toda peça reforçando a mesma identidade." },
        { title: "Agilidade de produção", description: "Demandas atendidas dentro do ritmo do seu negócio." },
      ],
    },
    dashAngle: "No Design Gráfico, isso significa ver o conteúdo entregue e o calendário de peças em um só painel.",
    process: {
      title: "Como funciona",
      steps: [
        { title: "Briefing", description: "Entendemos o objetivo de cada demanda." },
        { title: "Direção de arte", description: "Aplicamos a identidade visual da marca." },
        { title: "Produção", description: "Criamos as peças dentro do padrão definido." },
        { title: "Entrega & ajustes", description: "Refinamos com base no seu feedback." },
      ],
    },
    cta: {
      title: "Quer uma marca visualmente consistente?",
      subtitle: "Fale com um consultor e veja como padronizamos sua comunicação visual.",
    },
  },
  "brand-guide": {
    slug: "brand-guide",
    eyebrow: "Brand Guide",
    title: "Sem um guia de marca, cada pessoa interpreta sua identidade do jeito que quiser",
    painHook:
      "Se você precisa explicar sua marca do zero pra cada fornecedor novo, é sinal de que ela nunca foi documentada de verdade.",
    problem: {
      title: "Marca sem documentação não escala",
      points: [
        "Cores e fontes aplicadas de forma inconsistente",
        "Tom de voz que muda dependendo de quem escreve",
        "Retrabalho toda vez que alguém novo entra no time",
        "Identidade fraca diante da concorrência",
      ],
    },
    solution: {
      title: "Um guia completo para escalar sua marca com consistência",
      items: [
        { title: "Identidade documentada", description: "Cores, tipografia, logo e aplicações definidas." },
        { title: "Tom de voz", description: "Diretrizes claras de como a marca se comunica." },
        { title: "Aplicações práticas", description: "Exemplos reais para orientar qualquer fornecedor." },
      ],
    },
    dashAngle: "No Brand Guide, isso significa que toda a operação de conteúdo segue o mesmo padrão, visível no painel.",
    process: {
      title: "Como funciona",
      steps: [
        { title: "Imersão", description: "Entendemos a essência e os valores da marca." },
        { title: "Construção da identidade", description: "Definimos elementos visuais e verbais." },
        { title: "Documentação", description: "Reunimos tudo em um guia de marca completo." },
        { title: "Aplicação", description: "Orientamos a aplicação em todos os pontos de contato." },
      ],
    },
    cta: {
      title: "Pronto para documentar sua marca de vez?",
      subtitle: "Fale com um consultor e veja como construímos seu Brand Guide.",
    },
  },
};
