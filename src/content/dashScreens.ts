/** Telas de exemplo do Dash (conta Demo). `light` entra quando as capturas claras estiverem prontas. */
export type DashScreen = { key: string; label: string; title: string; alt: string; dark: string; light?: string; caption?: string; description?: string };

/** `description` (uma frase sobre o que a tela mostra) e `caption` (legenda) são texto do Marketing. */
export const DEFAULT_CAPTION = "Tela de exemplo do Dash.";

export const DASH_SCREENS: DashScreen[] = [
  { key: "dashboard", title: "Métricas do Instagram em um lugar", label: "Dashboard", alt: "Tela de exemplo do Dash com métricas do Instagram", dark: "/dash/escuro/dashboard.png", description: "Veja as métricas do seu Instagram, como alcance, seguidores e engajamento, em um só lugar." },
  { key: "ads", title: "Anúncios, em desenvolvimento", label: "Ads", alt: "Tela de exemplo do Dash com métricas de anúncios", dark: "/dash/escuro/ads.png", caption: "Módulo de anúncios em desenvolvimento.", description: "Módulo em desenvolvimento: aqui você verá seus anúncios e o orçamento investido." },
  { key: "tasks", title: "Tarefas do time, com prazo", label: "Tasks", alt: "Tela de exemplo do Dash com tarefas por status", dark: "/dash/escuro/tasks.png", description: "Acompanhe o que o time está produzindo, com responsável, prazo e status." },
  { key: "conteudos", title: "Conteúdos em cada etapa", label: "Conteúdos", alt: "Tela de exemplo do Dash com o quadro de conteúdos por semana", dark: "/dash/escuro/conteudos-v2.png", description: "Do que será postado ao que já foi publicado, cada conteúdo na sua etapa." },
  { key: "calendario", title: "Calendário de postagens", label: "Calendário", alt: "Tela de exemplo do Dash com o calendário de postagens", dark: "/dash/escuro/calendario-v2.png", description: "Veja o que está agendado para cada dia e cada semana." },
  { key: "bunker", title: "Arquivos do seu negócio", label: "Bunker", alt: "Tela de exemplo do Dash com ideias e referências", dark: "/dash/escuro/bunker.png", description: "Os arquivos do seu negócio, como logos e materiais, guardados em um só lugar." },
  { key: "atas", title: "Atas das reuniões", label: "Atas", alt: "Tela de exemplo do Dash com a lista de atas de reunião", dark: "/dash/escuro/atas.png", description: "Cada reunião com o seu registro, para consultar quando precisar." },
  { key: "booster", title: "Pergunte à IA sobre a sua conta", label: "Booster AI", alt: "Tela de exemplo do Dash com o assistente Booster AI", dark: "/dash/escuro/booster.png", description: "Tire dúvidas sobre a sua conta, os conteúdos e as métricas conversando com a IA." },
];

/** Quais telas cada página de serviço mostra. */
export const SERVICE_SCREENS: Record<string, string[]> = {
  websites: ["dashboard", "tasks"],
  trafego: ["ads", "dashboard", "tasks"],
  "social-media": ["conteudos", "calendario", "bunker", "dashboard"],
  automacoes: ["booster", "tasks", "atas"],
  "design-grafico": ["conteudos", "bunker"],
  "brand-guide": ["bunker", "atas"],
};

export function screensFor(keys?: string[]): DashScreen[] {
  if (!keys) return DASH_SCREENS;
  return keys.map((k) => DASH_SCREENS.find((s) => s.key === k)).filter((s): s is DashScreen => Boolean(s));
}
