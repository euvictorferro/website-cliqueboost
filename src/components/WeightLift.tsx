"use client";

import { useEffect, useRef, useState } from "react";
import ParticleObject from "@/components/canvasui/ParticleObject";
import { useSmall } from "@/lib/use-small";
import { Reveal } from "./Reveal";

const ITEMS = [
  { title: "Responder tudo na mão", description: "A IA responde e qualifica o contato. Você entra quando ele está pronto." },
  { title: "Juntar fornecedores", description: "Anúncio, conteúdo, site e atendimento com um time só." },
  { title: "Montar relatório", description: "Você acompanha pelo Dash: métricas do Instagram, conteúdo, tarefas e calendário." },
  { title: "Correr atrás de prazo", description: "Prazos combinados e retorno rápido dentro do horário comercial." },
  { title: "Aprender tecnologia", description: "A gente cuida da IA e das ferramentas. Você cuida do seu negócio." },
];

const STEP_MS = 1200; // intervalo entre um bloco sair da pilha e o seguinte
const BLOCK_H = 60; // altura de cada bloco da pilha, em px
const OVERLAP = 44; // quanto cada bloco desce em relação ao de cima, em px (menor que a altura = empilhados)
const TILT = [1.6, -1.2, 1.0, -1.6, 0.8]; // inclinação de cada bloco na pilha, em graus
const SHIFT = [10, -12, 6, -8, 4]; // deslocamento lateral de cada bloco na pilha, em px

/**
 * "O que você deixa de carregar": uma pilha de pesos que se desfaz. Ao entrar na tela, os blocos saem da pilha
 * um a um (de cima para baixo) e cada linha da lista acende com o título riscado. No fim a pilha fica vazia e o
 * símbolo da marca aparece no lugar.
 */
export function WeightLift({ title }: { title: string }) {
  const n = ITEMS.length;
  const small = useSmall();
  const [phase, setPhase] = useState(-1); // -1 parado, 0..n-1 blocos já retirados (inclusive), n = tudo livre
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.45) setInView(true);
        else if (e.intersectionRatio === 0) setInView(false); // só reinicia quando sai por completo
      },
      { threshold: [0, 0.45] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t: number[] = [];
    if (!inView) {
      t.push(window.setTimeout(() => setPhase(-1), 0));
    } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t.push(window.setTimeout(() => setPhase(n), 0));
    } else {
      for (let k = 0; k < n; k++) t.push(window.setTimeout(() => setPhase(k), 700 + k * STEP_MS));
      t.push(window.setTimeout(() => setPhase(n), 700 + (n - 1) * STEP_MS + 900));
    }
    return () => t.forEach((id) => window.clearTimeout(id));
  }, [inView, n]);

  const free = phase === n;

  return (
    <section className="py-28 px-6 md:px-10 bg-[var(--cb-panel)]">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 max-w-3xl">
          <h2>{title}</h2>
        </Reveal>

        <div ref={ref} className="grid md:grid-cols-[1fr_1.15fr] gap-12 md:gap-20 items-center">
          {/* A pilha. O primeiro item é o bloco do topo, então sai primeiro. */}
          <div className="relative mx-auto w-full max-w-lg md:max-w-xl h-[27.5rem] md:h-[38rem]" aria-hidden>
            <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--cb-border-strong)]" />
            {ITEMS.map((it, k) => {
              const lifted = phase >= k;
              const bottom = (n - 1 - k) * OVERLAP;
              return (
                <div
                  key={it.title}
                  className="absolute left-[6%] right-[6%] flex items-center rounded-2xl border border-[var(--cb-border-strong)] bg-[var(--cb-panel-raised)] px-6 font-semibold shadow-xl shadow-black/50 [:root[data-theme=light]_&]:shadow-black/8"
                  style={{
                    bottom,
                    height: BLOCK_H,
                    zIndex: n - k,
                    opacity: lifted ? 0 : 1,
                    transform: lifted
                      ? `translate(${SHIFT[k] * 3}px, -190px) rotate(${TILT[k] * 6}deg) scale(0.9)`
                      : `translate(${SHIFT[k]}px, 0) rotate(${TILT[k]}deg)`,
                    transition: "transform 1000ms cubic-bezier(0.55, 0, 0.8, 0.2), opacity 800ms ease-in",
                  }}
                >
                  {it.title}
                </div>
              );
            })}
            {/* O símbolo da marca, em partículas e grande, no espaço que ficou livre. */}
            <div
              className="absolute inset-0"
              style={{
                opacity: free ? 1 : 0,
                transform: free ? "scale(1)" : "scale(0.8)",
                pointerEvents: free && !small ? "auto" : "none",
                transition: "opacity 1200ms ease-out, transform 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              // O componente guarda a posição do quadro para ler o mouse e só a atualiza em resize e scroll.
              // Quando a animação de entrada termina, avisamos que o quadro mudou de tamanho.
              onTransitionEnd={(e) => {
                if (e.propertyName === "transform") window.dispatchEvent(new Event("resize"));
              }}
            >
              <ParticleObject
                className="h-full w-full"
                src="/brand/favicon.png"
                count={small ? 6000 : 13000}
                size={small ? 2 : 2.4}
                sizeVariance={0.5}
                radius={small ? 0 : 150}
                strength={1.5}
                swirl={1}
                spring={0.8}
                damping={0.3}
                drift={0.7}
                scale={4.5}
                cameraDistance={4.2}
                floatIntensity={0.8}
                rotationIntensity={0.7}
                floatSpeed={1.3}
                orbit={false}
                zoom={false}
                tilt={small}
              />
            </div>
          </div>

          {/* A lista: cada linha acende quando o bloco dela sai da pilha. */}
          <ol className="flex flex-col gap-2">
            {ITEMS.map((it, k) => {
              const on = phase >= k;
              return (
                <li
                  key={it.title}
                  className="flex gap-5 rounded-2xl p-4 md:p-5"
                  style={{
                    opacity: on ? 1 : 0.22,
                    transform: on ? "translateX(0)" : "translateX(14px)",
                    transition: "opacity 700ms ease-out, transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <span
                    className="cb-chip shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: on ? "var(--cb-fg)" : undefined, color: on ? "var(--cb-bg)" : undefined, transition: "background 500ms, color 500ms" }}
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base mb-1 text-[var(--cb-muted)] line-through decoration-[var(--cb-muted)]/70">{it.title}</h3>
                    <p className="text-lg leading-snug">{it.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
