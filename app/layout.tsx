import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://forma3d.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FORMA3D — Impressão 3D personalizada",
    template: "%s · FORMA3D",
  },
  description:
    "Transformamos ideias em peças reais. Impressão 3D personalizada para sua casa, empresa ou projeto. Solicite um orçamento pelo WhatsApp.",
  keywords: [
    "impressão 3D",
    "impressão 3D personalizada",
    "peças 3D sob encomenda",
    "prototipagem",
    "PLA",
    "PETG",
  ],
  openGraph: {
    title: "FORMA3D — Impressão 3D personalizada",
    description: "Transformamos ideias em peças reais.",
    url: siteUrl,
    siteName: "FORMA3D",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA3D — Impressão 3D personalizada",
    description: "Transformamos ideias em peças reais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
