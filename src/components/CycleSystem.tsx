"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "./Reveal";

const C = 200;
const R = 130;
const CIRC = 2 * Math.PI * R;
const at = (deg: number) => ({
  x: C + R * Math.cos((deg * Math.PI) / 180),
  y: C + R * Math.sin((deg * Math.PI) / 180),
});

/** O ciclo do contato: um pulso percorre o anel e acende cada etapa em ordem. */
export function CycleSystem({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; description: string }[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  // null = sem animação (reduced-motion ou antes de entrar na tela): tudo legível.
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: CIRC },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        }
      );

      const o = { a: -90 };
      const move = () => {
        const p = at(o.a);
        for (const el of [dotRef.current, haloRef.current]) {
          el?.setAttribute("cx", String(p.x));
          el?.setAttribute("cy", String(p.y));
        }
      };
      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.set(o, { a: -90, onComplete: move });
      steps.forEach((_, i) => {
        tl.call(() => setActive(i));
        tl.to({}, { duration: 1.1 });
        tl.to(o, { a: -90 + (360 / steps.length) * (i + 1), duration: 1.2, ease: "power2.inOut", onUpdate: move });
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 20%",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    }, root);

    return () => ctx.revert();
  }, [steps]);

  const nodes = steps.map((_, i) => at(-90 + (360 / steps.length) * i));

  return (
    <section ref={rootRef} className="relative py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-16 max-w-3xl">{title}</h2>
        </Reveal>

        <div className="grid md:grid-cols-[minmax(0,400px)_1fr] gap-12 md:gap-24 items-center">
          <Reveal y={30}>
            <div className="relative mx-auto w-full max-w-[380px] aspect-square">
              <div
                className="absolute inset-[18%] rounded-full opacity-40 blur-3xl"
                style={{ background: "var(--cb-gradient)" }}
                aria-hidden
              />
              <svg viewBox="0 0 400 400" className="relative w-full h-full" aria-hidden>
                <defs>
                  <linearGradient id="cyc-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8a2be2" />
                    <stop offset="100%" stopColor="#007bff" />
                  </linearGradient>
                </defs>
                <circle cx={C} cy={C} r={R + 36} fill="none" stroke="var(--cb-border)" strokeDasharray="2 8" strokeLinecap="round" />
                <circle cx={C} cy={C} r={R} fill="none" stroke="var(--cb-border-strong)" strokeWidth="1.5" />
                <circle
                  ref={ringRef}
                  cx={C}
                  cy={C}
                  r={R}
                  fill="none"
                  stroke="url(#cyc-g)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  transform={`rotate(-90 ${C} ${C})`}
                />
                {nodes.map((p, i) => {
                  const on = active === null || active === i;
                  return (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="26" fill="var(--cb-panel)" stroke="var(--cb-border-strong)" />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="26"
                        fill="url(#cyc-g)"
                        style={{ opacity: on ? 1 : 0, transition: "opacity 400ms" }}
                      />
                      <text
                        x={p.x}
                        y={p.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#fff"
                        fontWeight="700"
                        fontSize="18"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
                {active !== null && (
                  <>
                    <circle ref={haloRef} cx={nodes[0].x} cy={nodes[0].y} r="14" fill="#fff" opacity="0.18" />
                    <circle ref={dotRef} cx={nodes[0].x} cy={nodes[0].y} r="6" fill="#fff" />
                  </>
                )}
              </svg>
              <Image
                src="/brand/favicon.png"
                alt=""
                width={64}
                height={64}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 object-contain opacity-90"
              />
            </div>
          </Reveal>

          <ol className="flex flex-col gap-3">
            {steps.map((step, i) => {
              const on = active === null || active === i;
              return (
                <li key={step.title}>
                  <Reveal delay={i * 0.08}>
                    <div
                      className="flex gap-5 rounded-2xl border p-5 md:p-6 transition-all duration-500"
                      style={{
                        borderColor: active === i ? "var(--cb-border-strong)" : "transparent",
                        background: active === i ? "var(--cb-panel)" : "transparent",
                        opacity: on ? 1 : 0.45,
                      }}
                    >
                      <span
                        className="cb-gradient-bg shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-xl md:text-2xl mb-1.5">{step.title}</h3>
                        <p className="text-[var(--cb-muted)] max-w-md leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
