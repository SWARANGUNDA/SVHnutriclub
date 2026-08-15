import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { Role } from "@prisma/client";

/**
 * Get the current authenticated user session (server components / actions).
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require authentication — redirects to login if not authenticated.
 * Use in server components and server actions.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Require specific role — redirects if role doesn't match.
 * Use in server components and server actions.
 */
export async function requireRole(role: Role) {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect("/");
  }
  return user;
}

/**
 * Require admin role.
 */
export async function requireAdmin() {
  return requireRole("ADMIN");
}

/**
 * API route helper — returns 401 JSON if not authenticated.
 * Use in route handlers (GET, POST, etc.).
 */
export async function requireAuthApi() {
  const session = await auth();
  if (!session?.user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
  return { user: session.user, error: null };
}

/**
 * API route helper — returns 403 JSON if not admin.
 */
export async function requireAdminApi() {
  const { user, error } = await requireAuthApi();
  if (error) return { user: null, error };
  if (user?.role !== "ADMIN") {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Forbidden — admin access required" },
        { status: 403 }
      ),
    };
  }
  return { user, error: null };
}
