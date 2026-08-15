import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your AI-powered wellness dashboard with body analytics, health score, and personalized insights.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
