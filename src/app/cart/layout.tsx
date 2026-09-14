import type { Metadata } from "next";
import { getRequestLocale } from "@/i18n/server";

const META: Record<string, Metadata> = {
  no: {
    title: "Handlekurv | Kaffe Guatilla",
    description: "Se kaffepartiene du har lagt i handlekurven hos Kaffe Guatilla.",
  },
  en: {
    title: "Cart | Kaffe Guatilla",
    description: "Review the coffee lots you have added to your Kaffe Guatilla cart.",
  },
  es: {
    title: "Carrito | Kaffe Guatilla",
    description: "Revisa los lotes de café que añadiste a tu carrito de Kaffe Guatilla.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return META[locale];
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
