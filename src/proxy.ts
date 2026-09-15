import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  stripLocaleFromPathname,
} from "@/i18n/config";

export function proxy(request: NextRequest) {
  const forwardedLocale = request.headers.get(LOCALE_HEADER);

  if (isLocale(forwardedLocale)) {
    return NextResponse.next({
      request: { headers: new Headers(request.headers) },
    });
  }

  const locale = getLocaleFromPathname(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  const existingCookies = request.headers.get("cookie");
  const localeCookie = `${LOCALE_COOKIE}=${locale}`;
  const cookiesWithoutLocale = existingCookies
    ?.split(";")
    .map((cookie) => cookie.trim())
    .filter((cookie) => !cookie.startsWith(`${LOCALE_COOKIE}=`))
    .join("; ");
  requestHeaders.set(
    "cookie",
    cookiesWithoutLocale
      ? `${cookiesWithoutLocale}; ${localeCookie}`
      : localeCookie,
  );

  if (locale === DEFAULT_LOCALE) {
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const destination = request.nextUrl.clone();
  destination.pathname = stripLocaleFromPathname(request.nextUrl.pathname);

  const response = NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
