"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { DEFAULT_CAPTION, type DashScreen } from "@/content/dashScreens";

const TOP = 80; // 5rem: distância do bloco fixo até o topo, abaixo do navbar
const STEP_VH = 0.55; // rolagem gasta em cada troca de tela, em alturas de janela
const PEEK = 14; // quanto cada cartão coberto espia por cima, em px
const PEEK_MAX = 2; // máximo de cartões espiando (os mais fundos ficam atrás do mesmo)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Mostruário das telas do Dash. `children` é o cabeçalho da seção (título e texto).
 * - Computador (>= 1024px) com 4 telas ou mais: o bloco inteiro (cabeçalho + moldura) fica fixo e cada tela
 *   sobe de baixo para cobrir a anterior, sempre dentro da área da moldura (nunca sobre o texto).
 * - Demais casos: abas, com troca automática enquanto está visível (para quando a pessoa interage).
 */
export function DashShowcase({
  screens,
  pin,
  children,
}: {
  screens: DashScreen[];
  pin?: boolean;
  children?: ReactNode;
}) {
  const n = screens.length;
  const wantPin = pin ?? n >= 4;
  const hasDesc = screens.some((sc) => sc.description);
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 ao longo da seção fixa
  const [reduce, setReduce] = useState(false);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduce(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  // A fixação só vale em tela larga.
  useEffect(() => {
    if (!wantPin) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const f = () => setPinned(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [wantPin]);

  // Rolagem -> progresso -> tela da frente.
  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!pinned || !outer || !inner) return;
    let raf = 0;
    const head = headRef.current;
    const size = () => {
      // Reserva: topo fixo + cabeçalho + margem + faixa dos cartões espiando + barra do cartão + legenda.
      const reserve = (head ? head.offsetHeight : 0) + TOP + 32 + PEEK * PEEK_MAX + 36 + (hasDesc ? 92 : 36) + 28;
      inner.style.setProperty("--dash-reserve", `${reserve}px`);
      outer.style.height = `${inner.offsetHeight + (n - 1) * window.innerHeight * STEP_VH}px`;
    };
    const calc = () => {
      raf = 0;
      const r = outer.getBoundingClientRect();
      const range = r.height - inner.offsetHeight;
      const p = range > 0 ? clamp((TOP - r.top) / range) : 0;
      setProgress(p);
      setI(Math.round(p * (n - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    const onResize = () => {
      size();
      onScroll();
    };
    size();
    calc();
    const ro = head ? new ResizeObserver(onResize) : null;
    if (head && ro) ro.observe(head);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      outer.style.height = "";
    };
  }, [pinned, n, hasDesc]);

  // Modo abas: troca automática enquanto visível.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || pinned) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [pinned]);

  useEffect(() => {
    if (pinned || !auto || !visible || n < 2 || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5200);
    return () => clearInterval(id);
  }, [pinned, auto, visible, n, reduce]);

  const pick = (k: number) => {
    setAuto(false);
    setI(k);
  };

  // s = posição contínua entre as telas: 0 mostra a primeira, 1 já cobriu com a segunda, e assim por diante.
  const s = progress * (n - 1);
  const arrival = (k: number) => {
    if (k === 0) return 1;
    const t = clamp(s - (k - 1));
    return reduce ? (t >= 0.5 ? 1 : 0) : ease(t);
  };

  const cardStyle = (k: number): CSSProperties => {
    if (!pinned) return { opacity: k === i ? 1 : 0 };
    const e = arrival(k);
    let depth = 0; // quantas telas já chegaram por cima desta
    for (let m = k + 1; m < n; m++) depth += arrival(m);
    const peek = Math.min(depth, PEEK_MAX);
    return {
      zIndex: k + 1,
      transformOrigin: "top center",
      transform: `translate3d(0, calc(${(1 - e) * 108}% - ${peek * PEEK}px), 0) scale(${1 - peek * 0.03})`,
      filter: depth > 0 ? `brightness(${Math.max(0.5, 1 - depth * 0.14)})` : undefined,
      boxShadow: e < 1 || depth === 0 ? "0 -24px 60px -20px rgba(0,0,0,0.7)" : undefined,
      visibility: e === 0 ? "hidden" : "visible",
    };
  };

  // Na moldura fixa a largura acompanha a altura da janela, para o bloco inteiro caber sem cortar.
  const fit = pinned ? { width: "min(100%, calc((100vh - var(--dash-reserve, 28rem)) * 1.935))" } : undefined;
  const caption = screens[i]?.caption ?? DEFAULT_CAPTION;

  return (
    <div ref={rootRef}>
      <div ref={outerRef}>
        <div ref={innerRef} style={pinned ? { position: "sticky", top: TOP } : undefined}>
          <div ref={headRef}>{children}</div>

          <div className="mx-auto" style={fit}>
            {!pinned && n > 1 && (
              <div role="tablist" aria-label="Telas do Dash" className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-4 snap-x">
                {screens.map((sc, k) => (
                  <button
                    key={sc.key}
                    role="tab"
                    id={`dash-tab-${sc.key}`}
                    aria-selected={k === i}
                    aria-controls={`dash-panel-${sc.key}`}
                    onClick={() => pick(k)}
                    className={`snap-start shrink-0 min-h-11 rounded-full px-5 text-sm font-medium border transition-colors ${
                      k === i
                        ? "bg-[var(--cb-fg)] text-[#0b0b0d] border-transparent"
                        : "border-[var(--cb-border-strong)] text-[var(--cb-muted)] hover:text-[var(--cb-fg)]"
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            )}

            {/* Pilha de cartões, recortada na área da moldura: os cartões nunca passam por cima do texto. */}
            <div
              className={`relative ${pinned ? "overflow-hidden" : ""}`}
              style={pinned ? { paddingTop: PEEK * PEEK_MAX } : undefined}
            >
              <div className="relative">
                {screens.map((sc, k) => (
                  <figure
                    key={sc.key}
                    role={pinned ? "group" : "tabpanel"}
                    id={`dash-panel-${sc.key}`}
                    aria-label={sc.title}
                    aria-labelledby={pinned ? undefined : `dash-tab-${sc.key}`}
                    aria-hidden={k !== i}
                    className={`cb-panel overflow-hidden flex flex-col bg-[#13151b] ${
                      k === 0 ? "relative" : "absolute inset-0"
                    } ${pinned ? "" : "transition-opacity duration-500 shadow-2xl shadow-black/40"}`}
                    style={cardStyle(k)}
                  >
                    <div className="cb-glass flex items-center gap-1.5 px-4 py-3 border-b border-[var(--cb-border)] shrink-0" aria-hidden>
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      ))}
                      <span className="ml-3 text-sm font-medium text-[var(--cb-fg)]">{sc.title}</span>
                    </div>
                    {/* No celular a captura mantém um tamanho legível e a moldura rola na horizontal. */}
                    <div className="overflow-x-auto md:overflow-visible flex-1 min-h-0">
                      <div
                        className={`relative min-w-[900px] md:min-w-0 ${
                          k === 0 ? "aspect-[1920/992]" : "h-full"
                        }`}
                      >
                        <Image
                          src={sc.dark}
                          alt={sc.alt}
                          fill
                          sizes="(min-width: 1152px) 1100px, 100vw"
                          className="object-contain object-top"
                          priority={k === 0}
                          loading="eager"
                          fetchPriority={k === 0 ? "high" : "low"}
                        />
                      </div>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
            <div className={`mt-4 ${hasDesc ? "min-h-[4.5rem]" : ""}`}>
              {screens[i]?.description && (
                <p className="text-base leading-snug text-[var(--cb-fg)]">{screens[i].description}</p>
              )}
              <p className={`text-sm text-[var(--cb-muted)] ${screens[i]?.description ? "mt-1" : ""}`}>{caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
