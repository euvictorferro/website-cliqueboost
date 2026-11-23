import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import "../globals.css";

export const metadata: Metadata = {
  title: "Clique Boost | Marketing para brasileiros nos EUA",
  description:
    "Anúncios, atendimento com IA, social media, sites, design e brand guidelines integrados no método BoostConnect, para profissionais brasileiros nos EUA.",
  icons: {
    icon: "/brand/favicon-tab.png",
  },
  alternates: { languages: { "en-US": "/en" } },
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="pt">{children}</SiteShell>;
}
