import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const path = nextUrl.pathname;

  // Define route rules
  const isApiAuthRoute = path.startsWith("/api/auth");
  const isCustomerRoute = path.startsWith("/dashboard");
  const isAssociateRoute = path.startsWith("/associate") && path !== "/associate/login";
  const isAdminRoute = path.startsWith("/admin") && path !== "/admin/login";
  const isAuthRoute = path === "/login" || path === "/associate/login" || path === "/admin/login";

  if (isApiAuthRoute) return NextResponse.next();

  // If user is accessing login routes while logged in, redirect them to their respective portal
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", nextUrl));
      if (role === "ASSOCIATE") return NextResponse.redirect(new URL("/associate", nextUrl));
      if (role === "CUSTOMER") return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // Check auth requirements (Unauthenticated)
  if (!isLoggedIn) {
    if (isCustomerRoute) return NextResponse.redirect(new URL("/login", nextUrl));
    if (isAssociateRoute) return NextResponse.redirect(new URL("/associate/login", nextUrl));
    if (isAdminRoute) return NextResponse.redirect(new URL("/admin/login", nextUrl));
    return NextResponse.next();
  }

  // RBAC checks (Authenticated)
  if (isCustomerRoute && role !== "CUSTOMER") {
    if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", nextUrl));
    if (role === "ASSOCIATE") return NextResponse.redirect(new URL("/associate", nextUrl));
  }
  
  if (isAssociateRoute && role !== "ASSOCIATE") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
