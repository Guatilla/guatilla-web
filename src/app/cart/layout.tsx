import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handlekurv | Kaffe Guatilla",
  description: "Se kaffepartiene du har lagt i handlekurven hos Kaffe Guatilla.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
