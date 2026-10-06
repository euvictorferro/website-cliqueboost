/** Fundo do hero: brilhos neutros à deriva. O globo vive em HeroGlobe. Sem texto. */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        className="cb-blob absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "#fff" }}
      />
      <div
        className="cb-blob absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-[0.06]"
        style={{ background: "#a0aac8", animationDelay: "-9s" }}
      />
    </div>
  );
}
