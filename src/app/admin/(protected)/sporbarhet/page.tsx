import type { Metadata } from "next";
import AdminSporbarhetClient from "@/app/admin/sporbarhet/AdminSporbarhetClient";
import { requireAdminPage } from "@/lib/adminPageAuth";

export const metadata: Metadata = {
  title: "Lotes y trazabilidad · administración | Kaffe Guatilla",
  robots: { index: false, follow: false },
};

export default async function AdminSporbarhetPage() {
  await requireAdminPage();
  return <AdminSporbarhetClient />;
}
