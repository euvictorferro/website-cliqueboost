"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

const SERVICES = [
  { href: "/servicos/websites", label: "Websites" },
  { href: "/servicos/trafego", label: "Tráfego Pago" },
  { href: "/servicos/social-media", label: "Social Media" },
  { href: "/servicos/automacoes", label: "Automação" },
  { href: "/servicos/design-grafico", label: "Design" },
  { href: "/servicos/brand-guide", label: "Brand Guidelines" },
  { href: "/aplicativo", label: "Aplicativo" },
];

const SPRING = { type: "spring" as const, bounce: 0.15, duration: 0.35 };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "cb-glass border-b border-[var(--cb-border)]" : "bg-transparent"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo size={26} />
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[var(--cb-muted)]">
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className="flex items-center gap-1.5 hover:text-[var(--cb-fg)] transition-colors cb-press"
            >
              Serviços
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -6 }}
                  transition={SPRING}
                  style={{ transformOrigin: "top left" }}
                  className="absolute top-full left-0 mt-3 w-64 cb-panel cb-glass p-2 shadow-2xl shadow-black/40"
                >
                  {SERVICES.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 rounded-xl text-[var(--cb-fg)] hover:bg-white/5 transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="https://wa.me/12393750915"
            target="_blank"
            className="cb-gradient-bg cb-press hidden sm:inline-block text-sm font-semibold text-white px-5 py-2.5 rounded-full"
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
        className={`lg:hidden overflow-hidden border-b border-[var(--cb-border)] cb-glass transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-[32rem]" : "max-h-0 border-b-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1 text-sm">
          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            aria-expanded={mobileServicesOpen}
            className="py-3 flex items-center justify-between text-[var(--cb-fg)] font-medium border-b border-[var(--cb-border)]"
          >
            Serviços
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              mobileServicesOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="block pl-4 py-3 text-[var(--cb-muted)] hover:text-[var(--cb-fg)] transition-colors border-b border-[var(--cb-border)] last:border-b-0"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <Link
            href="https://wa.me/12393750915"
            target="_blank"
            onClick={() => setOpen(false)}
            className="cb-gradient-bg mt-3 text-center font-semibold text-white px-4 py-3 rounded-full"
          >
            Falar com consultor
          </Link>
        </div>
      </div>
    </header>
  );
}
