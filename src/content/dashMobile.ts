/**
 * Modelos do app no celular (modos escuro e claro), desenhados no Claude Design e exportados em PDF.
 * São modelos, não prints do app publicado: a legenda abaixo deles precisa dizer isso (texto do Marketing).
 */
export type MobileScreen = { key: string; alt: string; src: string; light?: string };

export const MOBILE_SCREENS: MobileScreen[] = [
  { key: "tasks", alt: "Modelo do app do Dash no celular com a lista de tarefas", src: "/dash/mobile/tasks.png", light: "/dash/mobile/claro-tasks.png" },
  { key: "dashboard", alt: "Modelo do app do Dash no celular com as métricas do Instagram", src: "/dash/mobile/dash.png", light: "/dash/mobile/claro-dash.png" },
  { key: "conteudos", alt: "Modelo do app do Dash no celular com o quadro de conteúdos", src: "/dash/mobile/conteudos.png", light: "/dash/mobile/claro-conteudos.png" },
];
