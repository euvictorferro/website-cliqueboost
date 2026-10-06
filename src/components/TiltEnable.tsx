"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { requestTilt, startTilt, tiltNeedsPermission } from "@/lib/device-tilt";
import { useSmall } from "@/lib/use-small";

/**
 * Liga o efeito de inclinação no celular. No Android o sensor já está livre; no iPhone aparece um botão pequeno
 * para o visitante liberar o movimento (exigência do Safari) e some depois que ele libera.
 */
export function TiltEnable() {
  const small = useSmall();
  const [done, setDone] = useState(false);
  // Só no iPhone (sensor com permissão) e em tela de toque; no servidor, false.
  const iosTouch = useSyncExternalStore(
    () => () => {},
    () => "ontouchstart" in window && tiltNeedsPermission(),
    () => false
  );

  useEffect(() => {
    if (small && "ontouchstart" in window && !tiltNeedsPermission()) startTilt();
  }, [small]);

  if (!small || !iosTouch || done) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        if (await requestTilt()) setDone(true);
      }}
      aria-label="Ativar o efeito de inclinação do celular"
      className="cb-glass fixed right-4 bottom-[4.75rem] z-50 w-11 h-11 rounded-full border border-[var(--cb-border-strong)] bg-[var(--cb-panel)]/70 text-[var(--cb-fg)] flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="8" y="3" width="8" height="18" rx="2" transform="rotate(18 12 12)" />
        <path d="M3 7c1.5-2 3.5-3 6-3M21 17c-1.500 2-3.500 3-6 3" />
      </svg>
    </button>
  );
}
