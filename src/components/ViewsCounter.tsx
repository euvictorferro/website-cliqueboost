"use client";

import { useEffect, useRef, useState } from "react";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

/**
 * Odômetro: ao entrar na tela, cada dígito gira até o valor final (da direita para a esquerda param por último os
 * da esquerda). Antes disso mostra zeros; com "reduzir movimento" já mostra o valor final.
 */
export function ViewsCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [done, setDone] = useState(false); // todos os dígitos já pararam
  const chars = value.toLocaleString("pt-BR").split(""); // "420.000.000"

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setReduce(rm), 0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(() => setDone(true), 2200 + 8 * 160 + 200); // maior duração do giro, com folga
    return () => window.clearTimeout(t);
  }, [run]);

  // posição de cada caractere entre os dígitos (os pontos não contam)
  const pos = chars.map((c, i) => chars.slice(0, i).filter((x) => /\d/.test(x)).length);
  const total = chars.filter((c) => /\d/.test(c)).length;

  return (
    <div ref={ref} className="cb-panel inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-6 py-5">
      <span className="sr-only">{`${value.toLocaleString("pt-BR")} ${label}`}</span>
      <span
        aria-hidden
        className={`inline-flex items-center font-semibold text-3xl md:text-4xl tracking-tight cb-counter ${done || reduce ? "cb-counter-done" : ""}`}
        style={{ fontVariantNumeric: "tabular-nums", lineHeight: 1 }}
      >
        {chars.map((c, i) => {
          if (!/\d/.test(c)) return <span key={i} className="px-0.5 text-[var(--cb-muted)]">{c}</span>;
          const d = pos[i];
          const digit = Number(c);
          const rounds = 2 + (total - 1 - d); // dígitos da direita giram mais voltas
          const index = run || reduce ? rounds * 10 + digit : 0;
          return (
            <span key={i} className="relative inline-block overflow-hidden" style={{ height: "1em", width: "0.62em" }}>
              <span
                className="absolute left-0 top-0 flex flex-col"
                style={{
                  transform: `translateY(-${index}em)`,
                  transition: reduce ? "none" : `transform ${2200 + d * 160}ms cubic-bezier(0.45, 0.05, 0.25, 1)`,
                }}
              >
                {Array.from({ length: (rounds + 1) * 10 }, (_, k) => (
                  <span key={k} style={{ height: "1em", lineHeight: 1, textAlign: "center" }}>
                    {DIGITS[k % 10]}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      <span className="text-[var(--cb-muted)]">{label}</span>
    </div>
  );
}
