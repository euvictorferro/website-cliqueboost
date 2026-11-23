export type Lang = "pt" | "en";

/** Textos fixos de componentes compartilhados. Quem tem texto próprio (home, serviços) recebe por props. */
export const UI = {
  pt: {
    cta: "Agendar uma conversa",
    home: "Clique Boost, início",
    terms: "Termos de Serviço",
    privacy: "Política de Privacidade",
    rights: "todos os direitos reservados.",
    switchTo: "English",
    switchHref: "/en",
    themeLight: "Mudar para o tema claro",
    themeDark: "Mudar para o tema escuro",
  },
  en: {
    cta: "Book a call",
    home: "Clique Boost, home",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    rights: "all rights reserved.",
    switchTo: "Português",
    switchHref: "/",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },
} as const;
