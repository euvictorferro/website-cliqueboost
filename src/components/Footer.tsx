import { Logo } from "./Logo";

const PHONE = "+1 (239) 821-4737";
const EMAIL = "contato@cliqueboost.io";

export function Footer() {
  return (
    <footer className="border-t border-[var(--cb-border)] bg-[var(--cb-panel)] py-12 px-6 md:px-10 pb-24 md:pb-12 md:pr-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-[var(--cb-muted)]">
        <Logo size={44} />
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="hover:text-[var(--cb-fg)] transition-colors">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-[var(--cb-fg)] transition-colors">{EMAIL}</a>
          <p className="mt-2">© {new Date().getFullYear()} Clique Boost, todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
