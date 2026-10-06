"use client";

import { useSyncExternalStore } from "react";

const KEY = "cb-theme";
const root = () => document.documentElement;

// O tema vive no atributo data-theme do <html> (definido antes da pintura pelo script do layout).
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = () => (root().dataset.theme === "light" ? "light" : "dark");

/** Botão fixo no canto direito: mostra o ícone do tema para onde o clique leva (lua no claro, sol no escuro). */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const toLight = theme === "dark";

  const toggle = () => {
    const next = toLight ? "light" : "dark";
    root().dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={toLight ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      className="cb-glass fixed right-4 bottom-5 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full border border-[var(--cb-border-strong)] bg-[var(--cb-panel)]/70 text-[var(--cb-fg)] flex items-center justify-center hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {toLight ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
