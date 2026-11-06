/**
 * Páginas de indicação: cliqueboost.io/indique/<slug>. Uma entrada por cliente que indica.
 * - `nome`: nome que aparece na página. `null` = o cliente não quer o nome público ("Um cliente nosso indicou você").
 * - `ref`: o que vai escrito na mensagem do WhatsApp (assim a equipe sabe a quem dar o desconto). Padrão: o `nome`.
 *   Se o nome é privado, use aqui um apelido ou código, porque a mensagem aparece no link.
 * - `art`: "pela" ou "pelo", para a mensagem do WhatsApp ("Oi, vim pela Lais. Tudo bem?"). Sem ele, a mensagem usa
 *   "vim pela indicação de <ref>".
 * Só os slugs desta lista existem; qualquer outro endereço dá 404.
 */
export type Indicacao = { slug: string; nome: string | null; ref?: string; art?: "pela" | "pelo" };

export const INDICACOES: Indicacao[] = [
  { slug: "lais", nome: "Lais", art: "pela" },
  { slug: "debora", nome: "Débora", art: "pela" },
  { slug: "sam", nome: "Sam", art: "pelo" },
];

// Exemplos só em desenvolvimento, para ver o layout. Não existem no site publicado.
const EXEMPLOS: Indicacao[] =
  process.env.NODE_ENV !== "production"
    ? [
        { slug: "exemplo", nome: "Maria Silva" },
        { slug: "exemplo-anonimo", nome: null, ref: "cliente-exemplo" },
      ]
    : [];

export const TODAS_INDICACOES: Indicacao[] = [...INDICACOES, ...EXEMPLOS];
