import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(account)/@lawyer/[user_id]/:path*",
    "/(account)/@layman/[user_id]/:path*",
    "/(account)/@layman/submit-case/:path*",
    "/(account)/@forum/:path*",
  ],
};
