import { NextRequest, NextResponse } from "next/server";
import { CookiesMap, RoutesMap } from "./lib/enums";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(CookiesMap.SessionToken);
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!token)
    return NextResponse.redirect(
      new URL(`${RoutesMap.Login}?callbackUrl=${url.pathname}`, request.url),
    );

  const origin = url.origin;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|login|restore-password).*)",
  ],
};
