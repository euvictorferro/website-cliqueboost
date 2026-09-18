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
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[var(--cb-bg)]/60 border-b border-[var(--cb-border)]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <Link href="/">
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
        <Link
          href="https://wa.me/12393750915"
          target="_blank"
          className="text-sm font-semibold px-4 py-2 rounded-full cb-gradient-bg"
        >
          Falar com consultor
        </Link>
      </nav>
    </header>
  );
}
