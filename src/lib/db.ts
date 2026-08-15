import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ?? "postgresql://mock:mock@localhost:5432/svh";

  // Check if we have a real database connection
  const isMock = connectionString.includes("mock");

  if (isMock) {
    // In mock mode, create a client that will fail gracefully
    // This allows the app to build and run without a real DB
    console.warn(
      "[DB] Using mock database URL — database operations will fail. Set DATABASE_URL to a real Supabase connection string."
    );
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
