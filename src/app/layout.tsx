import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Clique Boost | Marketing para brasileiros nos EUA",
  description:
    "Anúncios, atendimento com IA, social media, sites, design e brand guidelines integrados no método BoostConnect, para profissionais brasileiros nos EUA.",
  icons: {
    icon: "/brand/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica o tema salvo antes da primeira pintura, para não piscar. O padrão é o escuro. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("cb-theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Grain />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}
