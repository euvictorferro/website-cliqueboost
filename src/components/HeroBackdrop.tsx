/** Fundo do hero: grade, brilhos à deriva e um anel com um ponto em órbita (eco do ciclo). Sem texto. */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        className="cb-blob absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--cb-purple)" }}
      />
      <div
        className="cb-blob absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--cb-blue)", animationDelay: "-9s" }}
      />
      <svg
        viewBox="0 0 400 400"
        className="cb-orbit absolute right-[-12rem] top-1/2 -translate-y-1/2 w-[34rem] md:right-[-4rem] md:w-[40rem] lg:right-[2%] lg:w-[44rem] opacity-40 md:opacity-60"
      >
        <defs>
          <linearGradient id="hero-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8a2be2" />
            <stop offset="100%" stopColor="#007bff" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="none" stroke="var(--cb-border)" strokeDasharray="2 8" strokeLinecap="round" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--cb-border-strong)" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="var(--cb-border)" />
        <circle cx="200" cy="50" r="9" fill="url(#hero-g)" />
        <circle cx="200" cy="50" r="22" fill="url(#hero-g)" opacity="0.25" />
        <circle cx="350" cy="200" r="4" fill="#fff" opacity="0.6" />
        <circle cx="90" cy="310" r="5" fill="#fff" opacity="0.4" />
      </svg>
    </div>
  );
}
