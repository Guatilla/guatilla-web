import AdminSporbarhetClient from "./AdminSporbarhetClient";

export const metadata = {
  title: "Sporbarhet · Admin | Kaffe Guatilla",
  robots: { index: false, follow: false },
};

export default function AdminSporbarhetPage() {
  return <AdminSporbarhetClient />;
}
