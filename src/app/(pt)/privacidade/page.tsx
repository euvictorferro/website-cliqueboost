import type { Metadata } from "next";
import { TermsDocument } from "@/components/TermsDocument";

export const metadata: Metadata = {
  title: "Política de Privacidade | Clique Boost",
  description: "Política de Privacidade da Clique Boost.",
};

/** Política de Privacidade (texto em src/content/privacidade-v1.0.md). As cláusulas citadas são as dos Termos. */
export default function PrivacidadePage() {
  return <TermsDocument file="privacidade-v1.0.md" refBase="/termos" />;
}
