import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ["400", "500", "600", "700", "800", "900"],
});

const vianor = localFont({
  src: '../../public/fonts/Vianor-Rough.woff2',
  variable: '--font-vianor',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kaffe Guatilla | 100% Colombiano",
  description: "Café artesanal inspirado en la Serranía del Perijá. Un encuentro cultural en cada taza.",
  icons: {
    icon: "/favicon-trimmed.png",
    shortcut: "/favicon-trimmed.png",
    apple: "/favicon-trimmed.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable} ${vianor.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
