"use server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  console.log(accessToken);
  if (!accessToken) {
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|manifest.json|manifest.webmanifest|sw.js|firebase-messaging-sw.js|web-app-manifest-192x192.png|web-app-manifest-512x512.png).*)",
  ],
};
