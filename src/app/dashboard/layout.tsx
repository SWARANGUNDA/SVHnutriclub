import { CustomerNav } from "@/components/dashboard/CustomerNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-primary/30">
      
      {/* 
        GLASSMORPHISM DYNAMIC BACKGROUND 
        This is what makes the translucent cards look so premium. 
        It places glowing, animated orbs behind the UI.
      */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-primary/10 blur-[100px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] -right-[10%] h-[40vw] w-[40vw] rounded-full bg-emerald-500/10 blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] h-[60vw] w-[60vw] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen animate-blob animation-delay-4000" />
        
        {/* Subtle noise pattern to give it texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      {/* Main UI Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <CustomerNav />
        <main className="flex-1 pb-20 md:pb-0">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
