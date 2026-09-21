import type { Metadata } from "next";
import { requireAssociate } from "@/lib/auth-helpers";

export const metadata: Metadata = {
  title: "Associate Dashboard",
  description: "Manage your customers and business network.",
};

export default async function AssociateLayout({ children }: { children: React.ReactNode }) {
  await requireAssociate();
  return children;
}
