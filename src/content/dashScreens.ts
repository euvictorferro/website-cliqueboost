/** Telas de exemplo do Dash (conta Demo). `light` é a captura do tema claro. */
export type DashScreen = { key: string; label: string; title: string; alt: string; dark: string; light?: string; caption?: string; description?: string };

import type { Lang } from "@/lib/i18n";

/** `description` (uma frase sobre o que a tela mostra) e `caption` (legenda) são texto do Marketing. */
export const DEFAULT_CAPTION = "Tela de exemplo do Dash.";

export const DASH_SCREENS: DashScreen[] = [
  { key: "dashboard", title: "Métricas do Instagram em um lugar", label: "Dashboard", alt: "Tela de exemplo do Dash com métricas do Instagram", dark: "/dash/escuro/dashboard.png", light: "/dash/claro/dashboard.png", description: "Veja as métricas do seu Instagram, como alcance, seguidores e engajamento, em um só lugar." },
  { key: "ads", title: "Anúncios, em desenvolvimento", label: "Ads", alt: "Tela de exemplo do Dash com métricas de anúncios", dark: "/dash/escuro/ads.png", light: "/dash/claro/ads.png", caption: "Módulo de anúncios em desenvolvimento.", description: "Módulo em desenvolvimento: aqui você verá seus anúncios e o orçamento investido." },
  { key: "tasks", title: "Tarefas do time, com prazo", label: "Tasks", alt: "Tela de exemplo do Dash com tarefas por status", dark: "/dash/escuro/tasks.png", light: "/dash/claro/tasks.png", description: "Acompanhe o que o time está produzindo, com responsável, prazo e status." },
  { key: "conteudos", title: "Conteúdos em cada etapa", label: "Conteúdos", alt: "Tela de exemplo do Dash com o quadro de conteúdos por semana", dark: "/dash/escuro/conteudos-v2.png", light: "/dash/claro/conteudos.png", description: "Do que será postado ao que já foi publicado, cada conteúdo na sua etapa." },
  { key: "calendario", title: "Calendário de postagens", label: "Calendário", alt: "Tela de exemplo do Dash com o calendário de postagens", dark: "/dash/escuro/calendario-v2.png", light: "/dash/claro/calendario.png", description: "Veja o que está agendado para cada dia e cada semana." },
  { key: "bunker", title: "Arquivos do seu negócio", label: "Bunker", alt: "Tela de exemplo do Dash com ideias e referências", dark: "/dash/escuro/bunker.png", light: "/dash/claro/bunker.png", description: "Os arquivos do seu negócio, como logos e materiais, guardados em um só lugar." },
  { key: "atas", title: "Atas das reuniões", label: "Atas", alt: "Tela de exemplo do Dash com a lista de atas de reunião", dark: "/dash/escuro/atas.png", light: "/dash/claro/atas.png", description: "Cada reunião com o seu registro, para consultar quando precisar." },
  { key: "booster", title: "Pergunte à IA sobre a sua conta", label: "Booster AI", alt: "Tela de exemplo do Dash com o assistente Booster AI", dark: "/dash/escuro/booster.png", light: "/dash/claro/booster.png", description: "Tire dúvidas sobre a sua conta, os conteúdos e as métricas conversando com a IA." },
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

/** Textos em inglês das telas (mesmas imagens; só título, rótulo, legenda e descrição). */
const DASH_SCREENS_EN: Record<string, Partial<DashScreen>> = {
  dashboard: { title: "Instagram metrics in one place", label: "Dashboard", alt: "Example Dash screen with Instagram metrics", description: "See your Instagram metrics, such as reach, followers and engagement, in one place." },
  ads: { title: "Ads, in development", label: "Ads", alt: "Example Dash screen with ad metrics", caption: "Ads module in development.", description: "Module in development: here you will see your ads and the budget invested." },
  tasks: { title: "Team tasks, with deadlines", label: "Tasks", alt: "Example Dash screen with tasks by status", description: "Follow what the team is producing, with owner, deadline and status." },
  conteudos: { title: "Content at every stage", label: "Content", alt: "Example Dash screen with the weekly content board", description: "From what will be posted to what was already published, each piece at its stage." },
  calendario: { title: "Posting calendar", label: "Calendar", alt: "Example Dash screen with the posting calendar", description: "See what is scheduled for each day and each week." },
  bunker: { title: "Your business files", label: "Bunker", alt: "Example Dash screen with ideas and references", description: "Your business files, such as logos and materials, kept in one place." },
  atas: { title: "Meeting notes", label: "Minutes", alt: "Example Dash screen with the meeting minutes list", description: "Each meeting with its record, to check whenever you need." },
  booster: { title: "Ask the AI about your account", label: "Booster AI", alt: "Example Dash screen with the Booster AI assistant", description: "Get answers about your account, content and metrics by chatting with the AI." },
};

export const DEFAULT_CAPTION_EN = "Example Dash screen.";

export function screensFor(keys?: string[], lang: Lang = "pt"): DashScreen[] {
  const list = keys
    ? keys.map((k) => DASH_SCREENS.find((s) => s.key === k)).filter((s): s is DashScreen => Boolean(s))
    : DASH_SCREENS;
  return lang === "en" ? list.map((s) => ({ ...s, ...DASH_SCREENS_EN[s.key] })) : list;
}
