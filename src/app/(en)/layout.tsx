import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import "../globals.css";

export const metadata: Metadata = {
  title: "Clique Boost | Marketing for Brazilian professionals in the US",
  description:
    "Ads, AI customer follow-up, social media, websites, design and brand guidelines in one system, the BoostConnect method, for Brazilian professionals in the United States.",
  icons: {
    icon: "/brand/favicon-tab.png",
  },
  alternates: { languages: { "pt-BR": "/" } },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
