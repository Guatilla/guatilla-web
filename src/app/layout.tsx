import type { Metadata } from "next";
import { Outfit, Playfair_Display, Shrikhand, Bitter, Karla, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  variable: "--font-shrikhand",
  weight: "400",
  display: "swap",
});

// Produktside ("modern patchwork") — kun tilgjengelig som CSS-variabler,
// brukes bare på produktdetaljsiden.
const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["700"],
  display: "swap",
});

const vianor = localFont({
  src: "../../public/fonts/Vianor-Rough.woff2",
  variable: "--font-vianor",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaffe Guatilla | Colombiansk spesialkaffe",
  description:
    "Familiedyrket spesialkaffe fra Serranía del Perijá, brent i små partier i Stavanger og sporbar fra gård til pose.",
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
    <html
      lang="nb"
      className={`${outfit.variable} ${playfair.variable} ${shrikhand.variable} ${vianor.variable} ${bitter.variable} ${karla.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-brand-linen" suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
