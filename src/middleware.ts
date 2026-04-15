import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (!isPublic) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
