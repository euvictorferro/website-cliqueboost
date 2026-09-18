"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const SERVICES = [
  { href: "/servicos/websites", label: "Websites" },
  { href: "/servicos/trafego", label: "Tráfego / Ads" },
  { href: "/servicos/social-media", label: "Social Media" },
  { href: "/servicos/automacoes", label: "Automações com IA" },
  { href: "/servicos/design-grafico", label: "Design Gráfico" },
  { href: "/servicos/brand-guide", label: "Brand Guide" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--cb-bg)]/60 border-b border-[var(--cb-border)]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo size={26} />
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm text-[var(--cb-muted)]">
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className="hover:text-[var(--cb-fg)] transition-colors">
              {s.label}
            </Link>
          ))}
          <Link href="/metodo" className="text-[var(--cb-fg)] font-semibold">
            BoostConnect
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://wa.me/12393750915"
            target="_blank"
            className="hidden sm:inline-block text-sm font-semibold px-4 py-2.5 rounded-full cb-gradient-bg"
          >
            Falar com consultor
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 -mr-2"
          >
            <span
              className={`block h-0.5 w-6 bg-[var(--cb-fg)] transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--cb-fg)] transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[var(--cb-fg)] transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden border-b border-[var(--cb-border)] bg-[var(--cb-bg)] transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-[28rem]" : "max-h-0 border-b-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[var(--cb-muted)] hover:text-[var(--cb-fg)] transition-colors border-b border-[var(--cb-border)] last:border-b-0"
            >
              {s.label}
            </Link>
          ))}
          <Link
            href="/metodo"
            onClick={() => setOpen(false)}
            className="py-3 font-semibold text-[var(--cb-fg)]"
          >
            BoostConnect
          </Link>
          <Link
            href="https://wa.me/12393750915"
            target="_blank"
            onClick={() => setOpen(false)}
            className="sm:hidden mt-2 text-center font-semibold px-4 py-3 rounded-full cb-gradient-bg"
          >
            Falar com consultor
          </Link>
        </div>
      </div>
    </header>
  );
}
