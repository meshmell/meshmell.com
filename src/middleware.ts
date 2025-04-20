import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

import { localeArray } from "@/literals/language";

acceptLanguage.languages(localeArray);

export function middleware(req: NextRequest) {
  let lng;

  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|trpc|.*\\..*|ja|en).*)"],
};
