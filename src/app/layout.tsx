import type { Metadata } from "next";
import { poppins } from "./ui/fonts";
import "./globals.css";
import Footer from "./ui/footer";
import Navbar from "./ui/nav-bar";

export const metadata: Metadata = {
  title: "Wilkins og Guatilla.no",
  description: "Wilkins og Guatilla.no",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
