import type { Metadata } from "next";
import { poppins } from "../components/ui/fonts";
import "./globals.css";
import { Navbar } from "../components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Guatilla.no",
  description: "Wilkins og Guatilla.no",
  keywords: ["wilkins Ruiz Gomez", "guatilla", "guatilla.no"],
  openGraph: {
    title: "Wilkins og Guatilla.no",
    description: "Wilkins og Guatilla.no",
    url: "https://guatilla.no/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className={`${poppins.className} antialiased`}>
        <Navbar />
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
