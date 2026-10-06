/**
 * Depoimentos de clientes. Só entram aqui depoimentos REAIS e autorizados pelo cliente.
 * Sem nome nem foto: o cliente é identificado só pela marca (logo em /public/clients).
 * Enquanto a lista estiver vazia, a seção só aparece em desenvolvimento, com texto de espaço reservado,
 * e fica oculta no site publicado (depoimento inventado é proibido pelo COPY.md e pela regra da FTC).
 * Origem: pesquisa de satisfação da própria Clique Boost (out/2026), com autorização de uso no formulário.
 * Frases de resultado (seguidores, clientes novos, retorno) foram cortadas de propósito, para não parecer promessa.
 */
export type Testimonial = { quote: string; brand: string; logo: string };

export const TESTIMONIALS_TITLE = ""; // título da seção: texto do Marketing

export const TESTIMONIALS: Testimonial[] = [
  {
    brand: "Sam Corretor Orlando",
    logo: "/clients/sam-corretor-orlando.png",
    quote: "O trabalho da equipe mudou completamente o jogo por aqui. O atendimento é sensacional e super atencioso.",
  },
  {
    brand: "Avrinda",
    logo: "/clients/avrinda.png",
    quote: "Eles deixaram a minha marca simplesmente maravilhosa! Adorei o novo posicionamento, me trouxe muita autoridade no mercado. E a implementação da inteligência artificial no atendimento por bot foi uma virada de chave: agilizou demais o meu lado.",
  },
  {
    brand: "Frontline Legacy",
    logo: "/clients/frontline-legacy.png",
    quote: "Amei o resultado! Adorei como posicionaram a minha logo e a harmonia que deram para o visual todo. Minhas redes sociais estão muito bonitas e organizadas. Recomendo demais!",
  },
  {
    brand: "Daltrozo",
    logo: "/clients/daltrozo.png",
    quote: "Finalmente minhas redes sociais estão padronizadas e elegantes, exatamente do jeito que eu sempre quis!",
  },
  {
    brand: "RF Finance",
    logo: "/clients/rf-finance.png",
    quote: "Gostamos demais do serviço e do padrão de entrega. O atendimento é ágil, atencioso e muito profissional. É uma parceria que trouxe muita estrutura para a nossa empresa.",
  },
  {
    brand: "Aligned Legacy Partners",
    logo: "/clients/aligned-legacy.png",
    quote: "O Brand Guide que montaram para mim ficou espetacular! Deu uma clareza absurda para a comunicação da minha empresa e facilitou muito a criação dos conteúdos. Ajudou demais a elevar o patamar do negócio.",
  },
  {
    brand: "Vida Bela",
    logo: "/clients/vida-bela.png",
    quote: "O suporte e o acompanhamento que eles dão são diferenciados. Eles não entregam só o post e somem; estão do meu lado no dia a dia, me motivam a gravar os vídeos, me dão orientações práticas e me ajudam de verdade no desenvolvimento da minha carreira nas redes sociais.",
  },
  {
    brand: "Alliance Group",
    logo: "/clients/alliance-group.png",
    quote: "O trabalho de branding que desenvolveram para a gente ficou maravilhoso. Conseguiram traduzir com perfeição o nosso conceito e o posicionamento no mercado ficou impecável. Todos elogiam bastante!",
  },
  {
    brand: "KS Florida Homes",
    logo: "/clients/florida-homes.png",
    quote: "A estratégia visual e o posicionamento da nossa marca ficaram sensacionais. A qualidade das produções e o cuidado no atendimento ao cliente fazem toda a diferença para o nosso mercado. Aprovado 100%!",
  },
];
