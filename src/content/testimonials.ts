/**
 * Depoimentos de clientes. Só entram aqui depoimentos REAIS e autorizados pelo cliente.
 * Enquanto a lista estiver vazia, a seção só aparece em desenvolvimento, com texto de espaço reservado,
 * e fica oculta no site publicado (depoimento inventado é proibido pelo COPY.md e pela regra da FTC).
 */
export type Testimonial = { quote: string; name: string; role: string };

export const TESTIMONIALS_TITLE = ""; // título da seção: texto do Marketing

export const TESTIMONIALS: Testimonial[] = [];
