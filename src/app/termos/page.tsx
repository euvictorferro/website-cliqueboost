import type { Metadata } from "next";
import { TermsDocument } from "@/components/TermsDocument";

export const metadata: Metadata = {
  title: "Termos de Serviço | Clique Boost",
  description: "Termos de Serviço da Clique Boost.",
};

export default function TermosPage() {
  return <TermsDocument />;
}
