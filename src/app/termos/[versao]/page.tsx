import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsDocument } from "@/components/TermsDocument";
import { TERMS_CURRENT, TERMS_OLD } from "@/content/versions";

export const dynamicParams = false;
export const generateStaticParams = () => TERMS_OLD.map((v) => ({ versao: v.slug }));

type Props = { params: Promise<{ versao: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).versao;
  const v = TERMS_OLD.find((o) => o.slug === slug);
  return {
    title: `Termos de Serviço, versão ${v?.version ?? ""} | Clique Boost`,
    description: "Versão arquivada dos Termos de Serviço da Clique Boost.",
  };
}

/** Versão arquivada dos Termos, com o texto original intacto. */
export default async function TermosArquivadoPage({ params }: Props) {
  const slug = (await params).versao;
  const v = TERMS_OLD.find((o) => o.slug === slug);
  if (!v) notFound();
  const others = [
    { label: `Versão ${TERMS_CURRENT.version} (atual)`, href: "/termos" },
    ...TERMS_OLD.filter((o) => o.slug !== slug).map((o) => ({ label: `Versão ${o.version}`, href: `/termos/${o.slug}` })),
  ];
  return <TermsDocument file={v.file} archived versions={others} />;
}
