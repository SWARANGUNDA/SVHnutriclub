import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }

  interface User {
    role: Role;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

// Demo users for local development (when no real DB is available)
const DEMO_USERS = [
  {
    id: "demo-admin-001",
    name: "SVH Admin",
    email: "admin@svh.com",
    hashedPassword: "$2a$12$LQv3c1yqBo9SkvXS7QTJPOoGq7B0lBvTW5K5m5t5p5k5m5t5p5k5m", // will be generated
    role: "ADMIN" as Role,
    image: null,
  },
  {
    id: "demo-user-001",
    name: "Demo User",
    email: "demo@svh.com",
    hashedPassword: "$2a$12$LQv3c1yqBo9SkvXS7QTJPOoGq7B0lBvTW5K5m5t5p5k5m5t5p5k5m", // will be generated
    role: "CUSTOMER" as Role,
    image: null,
  },
];

// Pre-hash demo passwords at module load
let demoPasswordHash: string | null = null;
async function getDemoHash(): Promise<string> {
  if (!demoPasswordHash) {
    demoPasswordHash = await bcrypt.hash("demo123", 12);
  }
  return demoPasswordHash;
}

const isMockDB = (process.env.DATABASE_URL ?? "").includes("mock");

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Only use PrismaAdapter when we have a real database
  // adapter: isMockDB ? undefined : PrismaAdapter(db),
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const normalizedEmail = email.toLowerCase();

        // ----- Mock/Demo mode -----
        if (isMockDB) {
          const demoHash = await getDemoHash();
          // Accept any of these demo logins:
          // admin@svh.com / demo123
          // demo@svh.com / demo123
          // OR any email with password "demo123"
          if (password === "demo123") {
            const demoUser = DEMO_USERS.find((u) => u.email === normalizedEmail);
            if (demoUser) {
              return {
                id: demoUser.id,
                name: demoUser.name,
                email: demoUser.email,
                image: demoUser.image,
                role: demoUser.role,
              };
            }
            // Allow any email with demo123 as a customer
            return {
              id: `user-${Date.now()}`,
              name: normalizedEmail.split("@")[0],
              email: normalizedEmail,
              image: null,
              role: "CUSTOMER" as Role,
            };
          }
          return null;
        }

        // ----- Real database mode -----
        try {
          const { db } = await import("@/lib/db");
          const user = await db.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!user || !user.hashedPassword) return null;

          const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword
          );
          if (!isPasswordValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("[Auth] Database lookup failed, falling back to demo mode:", error);
          // Fallback to demo if DB fails
          if (password === "demo123") {
            return {
              id: `user-${Date.now()}`,
              name: normalizedEmail.split("@")[0],
              email: normalizedEmail,
              image: null,
              role: "CUSTOMER" as Role,
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
