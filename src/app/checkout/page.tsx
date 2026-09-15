import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getRequestLocale } from "@/i18n/server";

const META: Record<string, Metadata> = {
  no: { title: "Fullfør bestillingen | Kaffe Guatilla" },
  en: { title: "Checkout | Kaffe Guatilla" },
  es: { title: "Finaliza tu compra | Kaffe Guatilla" },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return { ...META[locale], robots: { index: false, follow: false } };
}

export default function CheckoutPage() {
  return <CheckoutClient />;
}
