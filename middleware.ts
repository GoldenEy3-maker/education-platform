import { NextRequest, NextResponse } from "next/server";
import { CookiesMap, RoutesMap } from "./lib/enums";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(CookiesMap.SessionToken);
  const url = request.nextUrl.clone();

  if (!token)
    return NextResponse.redirect(
      new URL(`${RoutesMap.Login}?callbackUrl=${url.pathname}`, request.url),
    );
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|login).*)",
  ],
};
