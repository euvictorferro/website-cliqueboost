import type { Metadata } from "next";
import { TermsDocument } from "@/components/TermsDocument";
import { TERMS_CURRENT, termsOldLinks } from "@/content/versions";

export const metadata: Metadata = {
  title: "Termos de Serviço | Clique Boost",
  description: "Termos de Serviço da Clique Boost.",
};

/** Versão atual. As anteriores ficam arquivadas em /termos/<versão>. */
export default function TermosPage() {
  return <TermsDocument file={TERMS_CURRENT.file} versions={termsOldLinks} />;
}
