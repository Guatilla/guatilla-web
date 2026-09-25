import type { Metadata } from "next";
import { Outfit, Playfair_Display, Shrikhand, Bitter, Karla, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getLanguageOption } from "@/i18n/config";
import { getRequestLocale } from "@/i18n/server";
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

const SITE_URL = new URL("https://www.guatilla.no");

const SOCIAL_IMAGE = {
  url: "/assets/social-share-guatilla-v2.jpeg",
  width: 1197,
  height: 1201,
  alt: "Kaffe Guatilla – fra Colombia til Norge",
} as const;

const OPEN_GRAPH_LOCALES = {
  no: "nb_NO",
  en: "en_GB",
  es: "es_ES",
} as const;

const METADATA_COPY = {
  no: {
    title: "Kaffe Guatilla – Colombiansk spesialkaffe",
    description:
      "Familiedyrket spesialkaffe fra Serranía del Perijá, brent i små partier i Stavanger og sporbar fra gård til pose.",
  },
  en: {
    title: "Kaffe Guatilla – Colombian specialty coffee",
    description:
      "Family-grown specialty coffee from Serranía del Perijá, roasted in small batches in Stavanger and traceable from farm to bag.",
  },
  es: {
    title: "Kaffe Guatilla – Café colombiano de especialidad",
    description:
      "Café de especialidad cultivado por nuestra familia en la Serranía del Perijá, tostado en pequeños lotes en Stavanger y trazable de la finca a la bolsa.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = METADATA_COPY[locale];
  const canonicalPath = locale === "no" ? "/" : `/${locale}`;

  return {
    ...copy,
    metadataBase: SITE_URL,
    applicationName: "Kaffe Guatilla",
    alternates: {
      canonical: canonicalPath,
      languages: {
        nb: "/",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: copy.title,
      description: copy.description,
      siteName: "Kaffe Guatilla",
      locale: OPEN_GRAPH_LOCALES[locale],
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [SOCIAL_IMAGE],
    },
    icons: {
      icon: "/favicon-trimmed.png",
      shortcut: "/favicon-trimmed.png",
      apple: "/favicon-trimmed.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={getLanguageOption(locale).htmlLang}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${playfair.variable} ${shrikhand.variable} ${vianor.variable} ${bitter.variable} ${karla.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-brand-linen" suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          <CartProvider>
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
