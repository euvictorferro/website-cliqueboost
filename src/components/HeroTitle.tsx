"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Título do hero: cada frase sobe de uma máscara. O texto vem de fora, aqui só há movimento. */
export function HeroTitle({ lines, accentLine }: { lines: string[]; accentLine?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-line]", { yPercent: 110, duration: 1.1, stagger: 0.18, ease: "power4.out", delay: 0.1 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={ref} className="text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-8xl mb-8">
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.12em]">
          <span data-line className={`inline-block ${i === accentLine ? "cb-gradient-text" : ""}`}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
