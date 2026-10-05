"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const STEP_MS = 1500; // intervalo entre uma etapa e a seguinte
const PURPLE = [138, 43, 226];
const BLUE = [10, 110, 240];
const mix = (t: number) => `rgb(${PURPLE.map((c, i) => Math.round(c + (BLUE[i] - c) * t)).join(",")})`;

/**
 * Etapas em linha no desktop e em coluna no celular. Ao entrar na tela, a sequência roda sozinha:
 * cada etapa sobe e acende com o degradê da marca, a linha se preenche até a seguinte e, no fim,
 * as quatro ficam acesas juntas (estado "alinhado").
 */
export function StepsRow({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; description: string }[];
}) {
  const n = steps.length;
  const [phase, setPhase] = useState(-1); // -1 parado, 0..n-1 etapa alcançada, n = tudo alinhado
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.5) setInView(true);
        else if (e.intersectionRatio === 0) setInView(false); // só reinicia quando sai por completo
      },
      { threshold: [0, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t: number[] = [];
    if (!inView) {
      t.push(window.setTimeout(() => setPhase(-1), 0));
      return () => t.forEach((id) => window.clearTimeout(id));
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t.push(window.setTimeout(() => setPhase(n), 0));
      return () => t.forEach((id) => window.clearTimeout(id));
    }
    for (let k = 0; k < n; k++) t.push(window.setTimeout(() => setPhase(k), 400 + k * STEP_MS));
    t.push(window.setTimeout(() => setPhase(n), 400 + (n - 1) * STEP_MS + 1300));
    return () => t.forEach((id) => window.clearTimeout(id));
  }, [inView, n]);

  const aligned = phase === n;

  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-16">{title}</h2>
        </Reveal>

        <ol ref={ref} className="relative grid md:grid-cols-4 gap-10 md:gap-8">
          {steps.map((step, k) => {
            const reached = phase >= k;
            const filled = phase > k; // o trecho até a próxima etapa já foi percorrido
            const glow = aligned ? `0 0 14px ${mix((k + 0.5) / n)}` : "none";
            return (
              <li key={step.title} className="relative">
                {k < n - 1 && (
                  <>
                    {/* conector vertical (celular) e horizontal (desktop) até a próxima etapa */}
                    <span className="absolute md:hidden left-6 top-12 -bottom-10 w-px bg-[var(--cb-border-strong)]" aria-hidden>
                      <span
                        className="block w-full h-full origin-top"
                        style={{
                          background: `linear-gradient(180deg, ${mix(k / (n - 1))}, ${mix((k + 1) / (n - 1))})`,
                          transform: `scaleY(${filled ? 1 : 0})`,
                          transition: "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms",
                          boxShadow: glow,
                        }}
                      />
                    </span>
                    <span className="absolute hidden md:block top-6 left-12 -right-8 h-px bg-[var(--cb-border-strong)]" aria-hidden>
                      <span
                        className="block w-full h-full origin-left"
                        style={{
                          background: `linear-gradient(90deg, ${mix(k / (n - 1))}, ${mix((k + 1) / (n - 1))})`,
                          transform: `scaleX(${filled ? 1 : 0})`,
                          transition: "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms",
                          boxShadow: glow,
                        }}
                      />
                    </span>
                  </>
                )}

                <div
                  className="flex md:block gap-5"
                  style={{
                    opacity: reached ? 1 : 0.28,
                    transform: reached ? "translateY(0)" : "translateY(16px)",
                    transition: "opacity 700ms ease-out, transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span
                    className="relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white border border-[var(--cb-border-strong)] bg-[var(--cb-panel-raised)] overflow-hidden"
                    style={{
                      boxShadow: aligned ? `0 0 0 6px rgba(138,43,226,0.14), 0 0 26px ${mix(k / (n - 1))}` : "none",
                      transition: "box-shadow 800ms",
                    }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${mix(k / n)}, ${mix((k + 1) / n)})`,
                        opacity: reached ? 1 : 0,
                        transition: "opacity 600ms",
                      }}
                      aria-hidden
                    />
                    <span className="relative" style={{ opacity: aligned ? 0 : 1, transition: "opacity 400ms" }}>
                      {k + 1}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute"
                      style={{ opacity: aligned ? 1 : 0, transition: "opacity 500ms 150ms" }}
                      aria-hidden
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <div className="pt-1.5 md:pt-0 md:mt-7">
                    <h3 className="text-xl md:text-2xl mb-2">{step.title}</h3>
                    <p className="text-[var(--cb-muted)] leading-relaxed max-w-xs">{step.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
