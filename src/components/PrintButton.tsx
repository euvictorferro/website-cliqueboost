"use client";

/** Abre a impressão do navegador (que também salva em PDF). Some na própria impressão. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cb-neon cb-press print:hidden inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-6a2 2 0 012-2h14a2 2 0 012 2v6a1 1 0 01-1 1h-2" />
        <rect x="6" y="14" width="12" height="7" rx="1" />
      </svg>
      Imprimir ou salvar em PDF
    </button>
  );
}
