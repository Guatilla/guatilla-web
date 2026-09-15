import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SPORBARHET_COOKIE,
  verifySessionToken,
} from "@/lib/sporbarhetAuth";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SPORBARHET_COOKIE)?.value);
}

export async function requireAdminPage(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
