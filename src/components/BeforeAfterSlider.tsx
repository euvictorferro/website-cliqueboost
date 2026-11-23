"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { PhotoProject } from "@/content/photo-projects";

/**
 * Comparação antes/depois. O arrasto vale na foto inteira (Pointer Events), com `touch-action: pan-y`: no celular o
 * movimento horizontal move o controle e o vertical continua rolando a página. Um input range invisível fica só para
 * o teclado e leitores de tela. Ao entrar na tela, o controle faz um vai e vem para mostrar que dá para arrastar.
 */
export function BeforeAfterSlider({ project }: { project: PhotoProject }) {
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const caption = `${project.room}: ${project.adjust}.`;
  const hasPair = Boolean(project.before && project.after);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || !hasPair || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          if (touched.current) return;
          const p = (t - start) / 1800;
          if (p >= 1) return setPos(50);
          setPos(50 + 20 * Math.sin(p * Math.PI * 2));
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hasPair]);

  const move = (clientX: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r || !r.width) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    touched.current = true;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) move(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  if (!hasPair) {
    return (
      <figure className={project.large ? "md:col-span-2" : ""}>
        <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-[var(--cb-border-strong)] text-sm text-[var(--cb-muted)]">
          Sample pair coming soon
        </div>
        <figcaption className="mt-3 text-sm text-[var(--cb-muted)]">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={project.large ? "md:col-span-2" : ""}>
      <div
        ref={boxRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ touchAction: "pan-y" }}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl bg-[var(--cb-panel-raised)]"
      >
        <Image src={project.after} alt={`${project.alt}, after`} fill draggable={false} sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={project.before} alt={`${project.alt}, before`} fill draggable={false} sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} aria-hidden>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => {
            touched.current = true;
            setPos(Number(e.target.value));
          }}
          aria-label={`Compare before and after: ${project.room}`}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-[var(--cb-muted)]">{caption}</figcaption>
      {project.credit && <p className="mt-1 text-xs text-[var(--cb-muted)]/80">Photo: {project.credit}</p>}
    </figure>
  );
}
