import type { Metadata } from "next";
import { TermsDocument } from "@/components/TermsDocument";

export const metadata: Metadata = {
  title: "Termos de Serviço, versão 1.0 | Clique Boost",
  description: "Versão arquivada dos Termos de Serviço da Clique Boost.",
};

export default function TermosV10Page() {
  return <TermsDocument file="termos-v1.0.md" archived />;
}
