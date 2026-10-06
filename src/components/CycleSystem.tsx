"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const PURPLE = [138, 43, 226];
const BLUE = [10, 110, 240];
const mix = (t: number) => PURPLE.map((c, i) => Math.round(c + (BLUE[i] - c) * t));

const WAVE_S = 3; // uma nova leva de contatos a cada 3 s
const TRAVEL_S = 9; // tempo para uma leva atravessar o funil
const LANES = [-0.85, -0.55, -0.25, 0.05, 0.3, 0.55, 0.85, -0.05, -0.7, 0.18, 0.7, -0.4]; // posição vertical de cada contato na entrada
const DELAY = [0, 0.06, 0.02, 0.09, 0.04, 0.1, 0.07, 0.12, 0.03, 0.11, 0.05, 0.08]; // atraso de cada um, para não irem em bloco
const FILTERED = new Set([1, 5, 6, 8, 11]); // contatos que a etapa "Atender" não leva adiante (só ilustração)

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * O contato no caminho: vários contatos entram pelo lado largo do funil, passam pelas quatro etapas e só
 * parte deles segue até o fim (a IA qualifica na etapa 3). Cada etapa acende quando um contato passa por ela.
 * Desenhado em canvas, pausa fora da tela e, com "reduzir movimento", mostra um quadro parado.
 */
export function CycleSystem({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; description: string }[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const n = steps.length;
    let W = 0;
    let H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(last);
    });
    ro.observe(wrap);

    // Meia altura do funil em cada ponto: larga na entrada, estreita depois da etapa 3.
    const half = (x: number) => (H / 2) * (0.92 - 0.62 * smooth(0.1, 0.7, x));
    const nodeX = (i: number) => ((i + 0.5) / n) * W;

    let last = 6; // instante usado no quadro parado
    function draw(t: number) {
      const css = getComputedStyle(wrap!);
      const fg = css.getPropertyValue("--cb-fg").trim() || "#fff";
      const bg = css.getPropertyValue("--cb-bg").trim() || "#0b0b0d";
      const line = css.getPropertyValue("--cb-border-strong").trim() || "rgba(255,255,255,0.2)";
      const cy = H / 2;
      ctx!.clearRect(0, 0, W, H);

      // Contorno do funil.
      ctx!.strokeStyle = line;
      ctx!.lineWidth = 1.5;
      ctx!.setLineDash([2, 7]);
      ctx!.lineCap = "round";
      for (const sign of [-1, 1]) {
        ctx!.beginPath();
        for (let px = 0; px <= W; px += 6) {
          const y = cy + sign * half(px / W);
          if (px === 0) ctx!.moveTo(px, y);
          else ctx!.lineTo(px, y);
        }
        ctx!.stroke();
      }
      ctx!.setLineDash([]);
      ctx!.beginPath();
      ctx!.moveTo(0, cy);
      ctx!.lineTo(W, cy);
      ctx!.strokeStyle = line;
      ctx!.globalAlpha = 0.5;
      ctx!.stroke();
      ctx!.globalAlpha = 1;

      // Contatos.
      const glow = new Array(n).fill(0);
      const firstWave = Math.floor(t / WAVE_S) - Math.floor(TRAVEL_S / WAVE_S);
      for (let k = firstWave; k <= Math.floor(t / WAVE_S); k++) {
        const wp = (t - k * WAVE_S) / TRAVEL_S; // 0..1 ao longo do funil
        if (wp < 0 || wp > 1.15) continue;
        LANES.forEach((lane, i) => {
          const p = (wp - DELAY[i]) / (1 - 0.12);
          if (p < 0 || p > 1) return;
          const filtered = FILTERED.has(i);
          // etapa 3: quem não qualifica some; quem qualifica segue para o centro.
          const gone = filtered ? smooth(0.5, 0.62, p) : 0;
          const squeeze = filtered ? 0 : 0.75 * smooth(0.5, 0.75, p);
          const x = p * W;
          const y = cy + lane * half(p) * (1 - squeeze) + (filtered ? gone * lane * 14 : 0);
          const fade = (1 - gone) * smooth(0, 0.06, p) * (1 - smooth(0.94, 1, p));
          if (fade <= 0.01) return;
          const [r, g, b] = mix(p);
          ctx!.globalAlpha = fade * 0.25;
          ctx!.fillStyle = `rgb(${r},${g},${b})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 10, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = fade;
          ctx!.fillStyle = p > 0.78 && !filtered ? fg : `rgb(${r},${g},${b})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, Math.PI * 2);
          ctx!.fill();
          for (let s = 0; s < n; s++) {
            const d = (x - nodeX(s)) / (W * 0.05);
            glow[s] = Math.max(glow[s], fade * Math.exp(-d * d));
          }
        });
      }
      ctx!.globalAlpha = 1;

      // Etapas.
      ctx!.font = "700 16px var(--font-body), sans-serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (let s = 0; s < n; s++) {
        const x = nodeX(s);
        const g = Math.min(1, glow[s]);
        ctx!.fillStyle = bg;
        ctx!.strokeStyle = line;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(x, cy, 20, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
        ctx!.globalAlpha = g;
        ctx!.fillStyle = fg;
        ctx!.beginPath();
        ctx!.arc(x, cy, 20, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = g > 0.5 ? bg : fg;
        ctx!.fillText(String(s + 1), x, cy + 1);
      }
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(last);
      return () => ro.disconnect();
    }

    let raf = 0;
    let t0 = 0;
    const frame = (now: number) => {
      if (!t0) t0 = now - last * 1000;
      last = (now - t0) / 1000;
      draw(last);
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      t0 = 0;
      if (e.isIntersecting) raf = requestAnimationFrame(frame);
      else draw(last);
    });
    io.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [steps]);

  return (
    <section className="relative py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-5xl mb-14 max-w-3xl">{title}</h2>
        </Reveal>

        <Reveal y={30}>
          <div ref={wrapRef} className="relative w-full h-56 md:h-72" aria-hidden>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-0">
          {steps.map((step, i) => (
            <li key={step.title} className="md:px-4 md:text-center">
              <Reveal delay={i * 0.08}>
                <div className="flex gap-4 md:block">
                  <span className="cb-chip shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold md:hidden" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-2">{step.title}</h3>
                    <p className="text-[var(--cb-muted)] leading-relaxed md:mx-auto max-w-xs">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
