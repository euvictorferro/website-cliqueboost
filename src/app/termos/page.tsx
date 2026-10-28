import type { Metadata } from "next";
import { TermsDocument } from "@/components/TermsDocument";

export const metadata: Metadata = {
  title: "Termos de Serviço | Clique Boost",
  description: "Termos de Serviço da Clique Boost.",
};

/** Versão atual. A anterior fica arquivada em /termos/v1-0 (quem comprou nela continua nela). */
export default function TermosPage() {
  return <TermsDocument file="termos-v1.1.md" />;
}
