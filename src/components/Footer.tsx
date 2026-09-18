import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--cb-border)] py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--cb-muted)]">
        <Logo size={22} />
        <p>© {new Date().getFullYear()} Clique Boost. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
