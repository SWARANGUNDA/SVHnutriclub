import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url)); // unauthorized role
    }
  }

  // Protect /associate routes
  if (pathname.startsWith("/associate") && !pathname.startsWith("/associate/login")) {
    if (!token) {
      return NextResponse.redirect(new URL("/associate/login", req.url));
    }
    if (token.role !== "ASSOCIATE") {
      return NextResponse.redirect(new URL("/login", req.url)); // unauthorized role
    }
  }

  // Protect /dashboard routes (CUSTOMER only)
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "CUSTOMER") {
      // If admin/associate tries to access dashboard, send them to their respective portal
      if (token.role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
      if (token.role === "ASSOCIATE") return NextResponse.redirect(new URL("/associate", req.url));
      
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/associate/:path*", "/dashboard/:path*"],
};
