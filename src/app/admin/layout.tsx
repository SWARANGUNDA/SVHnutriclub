import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-helpers";

export const metadata: Metadata = {
  title: "Admin Analytics Dashboard",
  description: "AI-powered platform analytics and insights.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}
