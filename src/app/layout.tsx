import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Clique Boost — Acelerando o seu sonho americano",
  description:
    "Websites, Tráfego Pago, Social Media, Automação, Design e Brand Guidelines — integrados no método BoostConnect para empreendedores brasileiros nos EUA.",
  icons: {
    icon: "/brand/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Grain />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
