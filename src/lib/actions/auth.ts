"use server";

import { signIn, signOut } from "@/lib/auth";
import { signupSchema, loginSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import { logAudit } from "@/lib/audit";

export type AuthResult = {
  success: boolean;
  error?: string;
};

const isMockDB = (process.env.DATABASE_URL ?? "").includes("mock");

/**
 * Server action: Sign up a new user with email/password
 */
export async function signUpAction(formData: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  try {
    const parsed = signupSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    if (isMockDB) {
      // In mock mode, just sign in directly (any signup becomes a login)
      try {
        await signIn("credentials", {
          email: normalizedEmail,
          password: "demo123", // In mock mode, use demo password
          expectedRole: "CUSTOMER",
          redirect: false,
        });
        return { success: true };
      } catch (error) {
        if (error instanceof AuthError) {
          return { success: false, error: "Sign up failed. Try using demo@svh.com / demo123" };
        }
        throw error;
      }
    }

    // Real database mode
    const { db } = await import("@/lib/db");
    const bcrypt = await import("bcryptjs");

    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return { success: false, error: "An account with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        name,
        email: normalizedEmail,
        hashedPassword,
        role: "CUSTOMER",
      },
    });

    await logAudit({
      userId: newUser.id,
      action: "USER_SIGNUP",
      entity: "USER",
      entityId: newUser.id,
    });

    await signIn("credentials", {
      email: normalizedEmail,
      password,
      expectedRole: "CUSTOMER",
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Something went wrong. Please try again." };
    }
    // Re-throw NEXT_REDIRECT
    throw error;
  }
}

/**
 * Server action: Sign in with email/password
 */
export async function signInAction(formData: {
  email: string;
  password: string;
  expectedRole?: string;
}): Promise<AuthResult> {
  try {
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      expectedRole: formData.expectedRole || "CUSTOMER",
      redirect: false,
    });

    // Fire-and-forget log (we don't have the user ID easily accessible here because NextAuth hides it until session is fetched, 
    // but we log the attempt by email).
    logAudit({
      action: "USER_LOGIN_SUCCESS",
      entity: "AUTH",
      metadata: { email: parsed.data.email.toLowerCase() }
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      logAudit({
        action: "USER_LOGIN_FAILED",
        entity: "AUTH",
        metadata: { email: formData.email.toLowerCase(), error: error.type }
      });
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: isMockDB
              ? "Invalid credentials. Use demo@svh.com / demo123 or admin@svh.com / demo123"
              : "Invalid email or password",
          };
        default:
          return { success: false, error: "Authentication failed" };
      }
    }
    throw error; // Re-throw non-auth errors (e.g., NEXT_REDIRECT)
  }
}

/**
 * Server action: Sign in with Google OAuth
 */
export async function signInWithGoogleAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

/**
 * Server action: Sign out
 */
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
