import Image from "next/image";
import { Reveal } from "./Reveal";
import { TESTIMONIALS, TESTIMONIALS_TITLE, type Testimonial } from "@/content/testimonials";

const PLACEHOLDERS: Testimonial[] = Array.from({ length: 4 }, () => ({
  quote: "Espaço reservado para o depoimento do cliente, com a autorização dele.",
  brand: "Cliente",
  logo: "",
}));

// Grade pontilhada atrás do logo, esmaecida nas bordas.
const GRID = {
  backgroundImage:
    "linear-gradient(to right, var(--cb-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--cb-muted) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  opacity: 0.14,
  maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
  WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
} as const;

function Card({ t, flip }: { t: Testimonial; flip: boolean }) {
  return (
    <li className={`flex w-[22rem] shrink-0 flex-col ${flip ? "flex-col-reverse" : ""}`}>
      <figure className="cb-panel p-6 rounded-2xl">
        <blockquote className="text-lg leading-snug">“{t.quote}”</blockquote>
      </figure>
      <div className="relative flex h-36 items-center justify-center p-6">
        <div className="absolute inset-0 -z-10" style={GRID} aria-hidden />
        {t.logo ? (
          <Image src={t.logo} alt={t.brand} width={160} height={64} className="cb-client-logo h-14 w-auto max-w-[14rem] object-contain opacity-80" />
        ) : (
          <span className="text-xs text-[var(--cb-muted)]">Logo do cliente</span>
        )}
      </div>
    </li>
  );
}

/**
 * Seção de depoimentos em faixa contínua (pausa ao passar o mouse). O cliente aparece só pelo logo, sem nome nem
 * foto. Sem depoimentos reais, só aparece em desenvolvimento (espaço reservado) e fica oculta no site publicado.
 */
export function Testimonials() {
  const real = TESTIMONIALS.length > 0;
  const dev = process.env.NODE_ENV !== "production";
  if (!real && !dev) return null;
  const items = real ? TESTIMONIALS : PLACEHOLDERS;
  const title = real ? TESTIMONIALS_TITLE : "Título da seção de depoimentos";
  // A faixa é duplicada e o alternado (cima/baixo) segue o índice: com quantidade ímpar, a emenda entre as duas
  // cópias repetiria a mesma posição. Poucos itens também deixariam a faixa curta. Repetir a lista resolve os dois.
  let list = items;
  while (list.length < 4 || list.length % 2) list = [...list, ...items];

  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {!real && (
          <p className="mb-8 inline-block rounded-full border border-dashed border-[var(--cb-border-strong)] px-4 py-1.5 text-xs text-[var(--cb-muted)]">
            Espaço reservado (aparece só em desenvolvimento)
          </p>
        )}
        {title && (
          <Reveal>
            <h2 className="mb-16 max-w-3xl">{title}</h2>
          </Reveal>
        )}
      </div>
      <div
        className="cb-marquee-wrap"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="cb-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-5 pr-5" aria-hidden={copy === 1}>
              {list.map((t, i) => (
                <Card key={i} t={t} flip={i % 2 === 0} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
