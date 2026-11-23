import type { Metadata } from "next";
import Link from "next/link";
import { CancelForm } from "@/components/CancelForm";

export const metadata: Metadata = {
  title: "Cancelar ou pedir reembolso | Clique Boost",
  description: "Formulário de cancelamento e de pedido de reembolso da Clique Boost.",
};

/** Texto da página e do formulário: `Textos_de_apoio_v1.2.md`, seção 1. */
export default function CancelarPage() {
  return (
    <div className="px-6 md:px-10 pt-32 md:pt-40 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl">Cancelar ou pedir reembolso</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--cb-fg)]/85">
          <p>
            Use este formulário para <strong className="font-semibold text-[var(--cb-fg)]">cancelar um serviço</strong> ou{" "}
            <strong className="font-semibold text-[var(--cb-fg)]">pedir o reembolso da garantia de entrega</strong>. O envio vale como aviso por escrito, a contar do dia
            em que você o enviar (cláusulas <Link href="/termos#s-5" className="underline underline-offset-2">5</Link> e{" "}
            <Link href="/termos#s-6" className="underline underline-offset-2">6</Link> dos Termos de Serviço).
          </p>
          <div>
            <p className="font-semibold text-[var(--cb-fg)]">Antes de enviar, saiba:</p>
            <ul className="mt-3 space-y-2">
              {[
                <>O cancelamento vale ao <strong className="font-semibold text-[var(--cb-fg)]">fim do mês já pago</strong>.</>,
                <>Para <strong className="font-semibold text-[var(--cb-fg)]">não ser cobrado no mês seguinte</strong>, envie o pedido com pelo menos <strong className="font-semibold text-[var(--cb-fg)]">7 dias de antecedência</strong> da próxima cobrança.</>,
                <>Se você cancelar antes dos 6 meses, pode haver <strong className="font-semibold text-[var(--cb-fg)]">multa de 20% sobre as parcelas que faltam</strong> (ou, no pagamento à vista, desconto de 20% sobre os meses não usados). Calculamos o valor e confirmamos por e-mail antes de cobrar qualquer coisa.</>,
                <>A <strong className="font-semibold text-[var(--cb-fg)]">garantia de entrega</strong> vale só no 1º mês, se deixarmos de entregar um item no prazo (cláusula <Link href="/termos#s-5" className="underline underline-offset-2">5</Link>).</>,
              ].map((li, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3b8cff]" aria-hidden />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>
            Também aceitamos pedidos por e-mail em <a href="mailto:contato@cliqueboost.io" className="underline underline-offset-2 text-[var(--cb-fg)]">contato@cliqueboost.io</a>.
          </p>
        </div>
        <div className="mt-10">
          <CancelForm />
        </div>
      </div>
    </div>
  );
}
