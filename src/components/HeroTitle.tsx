"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Título do hero: cada linha sobe de uma máscara. O texto vem de fora, aqui só há movimento.
 * As primeiras linhas (antes de `accentFrom`) ficam em cinza e as demais em branco. `srAfter` coloca
 * pontuação só para leitores de tela, para a frase continuar lida como frase mesmo quebrada em linhas.
 */
export function HeroTitle({
  lines,
  accentFrom = 1,
  srAfter = [],
}: {
  lines: string[];
  accentFrom?: number;
  srAfter?: string[];
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-line]", { yPercent: 110, duration: 1.1, stagger: 0.16, ease: "power4.out", delay: 0.1 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={ref} className="text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[4.5rem] mb-8">
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.12em]">
          <span data-line className={`inline-block ${i >= accentFrom ? "" : "text-[var(--cb-muted)]"}`}>
            {line}
            {srAfter[i] && <span className="sr-only">{srAfter[i]}</span>}
          </span>
        </span>
      ))}
    </h1>
  );
}
