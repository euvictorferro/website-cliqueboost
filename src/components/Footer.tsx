import Link from "next/link";
import { Logo } from "./Logo";
import { UI, type Lang } from "@/lib/i18n";

const PHONE = "+1 (239) 821-4737";
const EMAIL = "contato@cliqueboost.io";

export function Footer({ lang = "pt" }: { lang?: Lang }) {
  const t = UI[lang];
  return (
    <footer className="border-t border-[var(--cb-border)] bg-[var(--cb-panel)] py-12 px-6 md:px-10 pb-24 md:pb-12 md:pr-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-[var(--cb-muted)]">
        <Logo size={44} />
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="hover:text-[var(--cb-fg)] transition-colors">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-[var(--cb-fg)] transition-colors">{EMAIL}</a>
          <span className="flex gap-4">
            <Link href="/termos" className="hover:text-[var(--cb-fg)] transition-colors">{t.terms}</Link>
            <Link href="/privacidade" className="hover:text-[var(--cb-fg)] transition-colors">{t.privacy}</Link>
          </span>
          <p className="mt-2">© {new Date().getFullYear()} Clique Boost, {t.rights}</p>
          <Link href={t.switchHref} className="hover:text-[var(--cb-fg)] transition-colors">{t.switchTo}</Link>
        </div>
      </div>
    </footer>
  );
}
