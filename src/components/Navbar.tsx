"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { ScheduleButton } from "./ScheduleButton";

/**
 * Cabeçalho flutuante: no topo da página fica solto e largo; ao rolar, encolhe numa pílula de vidro
 * centralizada, com o logo um pouco menor. Só logo e o botão de ação, sem menu.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <nav
        className={`pointer-events-auto mx-auto flex w-full items-center justify-between px-5 md:px-8 transition-all duration-300 ease-out ${
          scrolled
            ? "h-16 md:max-w-4xl md:mt-4 md:rounded-2xl cb-glass border-b md:border border-[var(--cb-border)] shadow-lg shadow-black/30 [:root[data-theme=light]_&]:shadow-black/10"
            : "h-20 md:h-24 max-w-6xl border-b border-transparent"
        }`}
      >
        <Link
          href="/"
          aria-label="Clique Boost, início"
          className="inline-flex items-center"
          style={{
            transform: scrolled ? "scale(0.82)" : "scale(1)",
            transformOrigin: "left center",
            transition: "transform 300ms ease-out",
          }}
        >
          <Logo size={44} />
        </Link>

        <ScheduleButton className="cb-gradient-bg cb-press inline-flex items-center min-h-11 text-sm font-semibold text-white px-5 rounded-full">
          Agendar uma conversa
        </ScheduleButton>
      </nav>
    </header>
  );
}
