import type { Metadata } from "next";
import AdminCatalogClient from "@/components/admin/AdminCatalogClient";
import { requireAdminPage } from "@/lib/adminPageAuth";
import { getAdminCatalog } from "@/lib/catalog";
import type { AdminCatalog } from "@/types/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo · administración | Kaffe Guatilla",
  robots: { index: false, follow: false },
};

const EMPTY_CATALOG: AdminCatalog = { categories: [], products: [] };

export default async function AdminCatalogPage() {
  await requireAdminPage();

  let catalog = EMPTY_CATALOG;
  let loadError: string | null = null;
  try {
    catalog = await getAdminCatalog();
  } catch {
    loadError = "No se pudo consultar Cloud SQL.";
  }

  return <AdminCatalogClient initialCatalog={catalog} initialError={loadError} />;
}
