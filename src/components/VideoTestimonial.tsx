"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { TestimonialVideo } from "@/content/testimonials";

const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Cartão vertical (9:16) de vídeo de depoimento. Começa sozinho, com som, quando o cartão aparece na tela, e pausa
 * quando ele sai da tela ou a aba fica em segundo plano. Sem controles: a pessoa só assiste (decisão do Victor, sem
 * botão de som). Se o navegador barrar o áudio automático, começa mudo e o som entra no primeiro toque da pessoa na
 * página. Com "reduzir movimento" ligado, não começa sozinho e usa os controles normais.
 * Sem `video`, mostra o espaço reservado (só em desenvolvimento).
 */
export function VideoTestimonial({ video }: { video: TestimonialVideo | null }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const vref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [progress, setProgress] = useState(0);
  const reduce = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);

  useEffect(() => {
    const box = boxRef.current;
    const v = vref.current;
    if (!box || !v || reduce) return;

    const start = () => {
      if (!inView.current || document.hidden) return;
      if (v.ended) v.currentTime = 0; // voltou à seção depois de terminar: recomeça
      v.play().catch(() => {
        // Sem toque prévio, o navegador barra o áudio: começa sem som e o botão de som libera.
        v.muted = true;
        v.play().catch(() => {});
        // Sem botão de som: o áudio é liberado no primeiro toque, clique ou tecla da pessoa em qualquer lugar da página.
        const unmute = () => {
          v.muted = false;
          for (const ev of ["pointerdown", "keydown", "touchend"]) window.removeEventListener(ev, unmute);
        };
        for (const ev of ["pointerdown", "keydown", "touchend"]) window.addEventListener(ev, unmute, { once: true });
      });
    };
    const io = new IntersectionObserver(
      ([e]) => {
        // "Na seção" = metade do cartão visível, ou mais da metade da altura da janela (janelas baixas nunca mostram 50% de um cartão alto).
        inView.current = e.isIntersecting && (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.55);
        if (inView.current) start();
        else v.pause();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(box);
    const onVisibility = () => (document.hidden ? v.pause() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <div className="mx-auto w-[min(78vw,300px)] md:w-[300px] shrink-0">
      <div
        ref={boxRef}
        className="cb-panel relative aspect-[9/16] overflow-hidden rounded-3xl shadow-2xl shadow-black/40 [:root[data-theme=light]_&]:shadow-black/10"
      >
        {video ? (
          <>
            <video
              ref={vref}
              src={video.src}
              poster={video.poster}
              playsInline
              preload="metadata"
              controls={reduce}
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
              onPause={(e) => {
                // Pausa que não veio de a pessoa sair da seção (ex.: tecla de mídia do fone) é desfeita.
                const v = e.currentTarget;
                if (!reduce && inView.current && !document.hidden && !v.ended) v.play().catch(() => {});
              }}
              aria-label={`Depoimento em vídeo de ${video.brand}`}
              className="absolute inset-0 h-full w-full object-cover bg-black"
            >
              {video.captions && <track kind="captions" src={video.captions} srcLang="pt-BR" label="Português" default />}
            </video>
            {!reduce && (
              <>
                <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/15">
                  <span className="block h-full bg-gradient-to-r from-[#a45cf0] to-[#3b8cff]" style={{ width: `${progress * 100}%` }} />
                </span>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg, rgba(138,43,226,0.25), rgba(10,110,240,0.2) 60%, rgba(10,90,230,0.08))" }}
              aria-hidden
            />
            <span className="cb-neon relative flex h-16 w-16 items-center justify-center rounded-full">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden className="ml-0.5">
                <path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" />
              </svg>
            </span>
            <span className="absolute bottom-4 left-0 right-0 px-4 text-center text-xs text-[var(--cb-fg)]/80">Vídeo de depoimento, 9:16, 30 s</span>
          </div>
        )}
      </div>
      {video?.logo && (
        <div className="mt-4 flex justify-center">
          <Image src={video.logo} alt={video.brand} width={160} height={64} className="cb-client-logo h-10 w-auto max-w-[10rem] object-contain opacity-80" />
        </div>
      )}
    </div>
  );
}
