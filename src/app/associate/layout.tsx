import { AssociateSidebar } from "@/components/associate/AssociateSidebar";

export default function AssociateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AssociateSidebar />
      <main className="ml-64 flex-1">
        <div className="mx-auto max-w-6xl p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
