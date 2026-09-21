import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { AIAssistant } from "@/components/ui/AIAssistant";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your AI-powered wellness dashboard with body analytics, health score, and personalized insights.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <>
      <div className="relative flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 w-full lg:pl-72 transition-all duration-300">
          <div className="pt-12 lg:pt-0 min-h-screen">
            {children}
          </div>
        </main>
        <AIAssistant />
      </div>
    </>
  );
}
