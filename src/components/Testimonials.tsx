import { Reveal } from "./Reveal";
import { TESTIMONIALS, TESTIMONIALS_TITLE, type Testimonial } from "@/content/testimonials";

const PLACEHOLDERS: Testimonial[] = [
  { quote: "Espaço reservado para o depoimento do cliente, com a autorização dele.", name: "Nome do cliente", role: "Profissão, cidade" },
  { quote: "Espaço reservado para o depoimento do cliente, com a autorização dele.", name: "Nome do cliente", role: "Profissão, cidade" },
  { quote: "Espaço reservado para o depoimento do cliente, com a autorização dele.", name: "Nome do cliente", role: "Profissão, cidade" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

/**
 * Seção de depoimentos. Sem depoimentos reais, só aparece em desenvolvimento (espaço reservado) e fica
 * oculta no site publicado. Sem foto: o avatar é só as iniciais.
 */
export function Testimonials() {
  const real = TESTIMONIALS.length > 0;
  const dev = process.env.NODE_ENV !== "production";
  if (!real && !dev) return null;
  const items = real ? TESTIMONIALS : PLACEHOLDERS;
  const title = real ? TESTIMONIALS_TITLE : "Título da seção de depoimentos";

  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {!real && (
          <p className="mb-8 inline-block rounded-full border border-dashed border-[var(--cb-border-strong)] px-4 py-1.5 text-xs text-[var(--cb-muted)]">
            Espaço reservado (aparece só em desenvolvimento)
          </p>
        )}
        <Reveal>
          <h2 className="mb-16 max-w-3xl">{title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <figure className="cb-panel h-full p-8 flex flex-col justify-between gap-10">
                <blockquote
                  className="text-2xl leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span className="cb-chip w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0" aria-hidden>
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-[var(--cb-muted)]">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
