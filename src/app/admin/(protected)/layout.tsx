import AdminShell from "@/components/admin/AdminShell";
import { requireAdminPage } from "@/lib/adminPageAuth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminPage();
  return <AdminShell>{children}</AdminShell>;
}
