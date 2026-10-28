/**
 * Versões dos Termos. A mais nova fica em /termos; cada antiga fica em /termos/<slug>, com o texto original intacto
 * (quem comprou numa versão continua nela). Ao publicar uma versão nova: criar src/content/termos-vX.Y.md, mover a
 * atual para esta lista e trocar CURRENT.
 */
export const TERMS_CURRENT = { version: "1.2", file: "termos-v1.2.md" };
export const TERMS_OLD = [
  { slug: "v1-1", version: "1.1", file: "termos-v1.1.md" },
  { slug: "v1-0", version: "1.0", file: "termos-v1.0.md" },
];
export const termsOldLinks = TERMS_OLD.map((v) => ({ label: `Versão ${v.version}`, href: `/termos/${v.slug}` }));
