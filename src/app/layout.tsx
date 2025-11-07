import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Footer from "@/components/organisms/Footer";
import { NavigationWrapper } from "@/wrapper/NavigationWrapper";
import { ThemeSetter } from "@/components/atoms/theme-setter";
import { getFooterData } from "@/services/footer";
import { Header } from "../components/organisms/Header";
import { Suspense } from "react";
import ScrollToTopButton from "@/components/atoms/ScrollToTopButton";

import { GoogleAnalytics } from '@next/third-parties/google';
import * as process from "node:process";
import AppIa from "@/components/template/ChatBot-IA";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Kre +",
    template: "Kre + | %s",
  },
  description:
    "Kre + é a plataforma de formação, emprego e orientação profissional para jovens cabo-verdianos. Descobre novas oportunidades, simula a tua trajetória profissional e encontra recursos para construir o teu futuro.",
  keywords: [
    "Kre +",
    "Kre Plus",
    "formação profissional",
    "emprego Cabo Verde",
    "orientação profissional",
    "empreendedorismo",
    "juventude Cabo Verde",
    "plataforma de formação",
    "mediatéca",
    "trajetória profissional",
    "Kre mais",
    "governo de Cabo Verde",
  ],
  applicationName: "Kre +",
  authors: [{ name: "Direção Geral de Emprego, Formação Profissional e Estudos" }],
  creator: "Governo de Cabo Verde",
  publisher: "Governo de Cabo Verde",
  openGraph: {
    title: "Kre + | Plataforma de Formação e Emprego de Cabo Verde",
    description:
      "Encontra oportunidades de formação, emprego, empreendedorismo e orientação profissional na plataforma Kre +, criada para apoiar a juventude cabo-verdiana.",
    url: process.env.NEXT_PUBLIC_URL ||"https://kremais.gov.cv",
    siteName: "Kre +",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "/assets/featuredImage.png",
        width: 1200,
        height: 630,
        alt: "Kre + Plataforma de Formação e Emprego de Cabo Verde",
      },
    ],
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await getFooterData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}  antialiased`}>
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500" />
            </div>
          }
        >
          <NavigationWrapper>
            <Header />
            <AppIa/>
            <main className="">
              <ThemeSetter theme="dark" />
              {children}
            </main>
            {footerData && <Footer {...footerData} />}
          </NavigationWrapper>
        </Suspense>
        <Toaster position="top-right" />
        <ScrollToTopButton />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />

      </body>
    </html>
  );
}
