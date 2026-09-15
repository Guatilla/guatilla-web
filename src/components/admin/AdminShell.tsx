"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MENU = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/catalogo", label: "Catálogo" },
  { href: "/admin/sporbarhet", label: "Lotes y trazabilidad" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/pagos", label: "Pagos" },
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function logout() {
    setLoggingOut(true);
    setLogoutError(null);
    try {
      const response = await fetch("/api/admin/auth", { method: "DELETE" });
      if (!response.ok) throw new Error("logout-failed");
      window.location.replace("/admin/login");
    } catch {
      setLogoutError("No se pudo cerrar la sesión. Inténtalo de nuevo.");
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#FDF1E5] text-[#2E2018]">
      <div className="border-b-2 border-[#2E2018] bg-[#1F4B4B] px-4 py-3 text-[#FFF7EF] lg:hidden">
        <p className="font-heading text-lg font-extrabold">Guatilla · Administración</p>
      </div>

      <div className="lg:grid lg:min-h-dvh lg:grid-cols-[260px_1fr]">
        <aside className="border-b-2 border-[#2E2018] bg-[#2E2018] text-[#FFF7EF] lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r-2">
          <div className="hidden border-b border-[#FFF7EF]/20 px-6 py-7 lg:block">
            <p className="font-heading text-xl font-extrabold italic">Kaffe Guatilla</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FFF7EF]/60">
              Administración
            </p>
          </div>

          <nav
            aria-label="Administración"
            className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:gap-1 lg:p-4"
          >
            {MENU.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDA83A] ${
                    active
                      ? "bg-[#DDA83A] text-[#2E2018]"
                      : "text-[#FFF7EF] hover:bg-[#FFF7EF]/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 pb-3 lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-4">
            {logoutError && (
              <p role="alert" className="mb-2 bg-[#A94B2F] px-3 py-2 text-xs">
                {logoutError}
              </p>
            )}
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="w-full border border-[#FFF7EF]/35 px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#FFF7EF] hover:bg-[#A94B2F] disabled:opacity-60"
            >
              {loggingOut ? "Cerrando…" : "Cerrar sesión"}
            </button>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-7 sm:px-7 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
