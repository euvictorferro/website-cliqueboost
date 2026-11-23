import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SERVICES_EN, EN_SERVICE_SLUGS } from "@/content/services-en";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(EN_SERVICE_SLUGS).map((slug) => ({ slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = SERVICES_EN[EN_SERVICE_SLUGS[slug]];
  if (!content) return {};
  return {
    title: `${content.title} | Clique Boost`,
    description: content.painHook,
    alternates: { canonical: `/en/services/${slug}` },
  };
}

export default async function ServicePageEn({ params }: Props) {
  const { slug } = await params;
  const content = SERVICES_EN[EN_SERVICE_SLUGS[slug]];
  if (!content) notFound();
  return <ServicePageTemplate content={content} lang="en" />;
}
