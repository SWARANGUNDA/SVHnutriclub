"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LineChart, Settings, LogOut } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";

const NAV_LINKS = [
  { name: "Overview", href: "/associate", icon: LayoutDashboard },
  { name: "My Customers", href: "/associate/customers", icon: Users },
  { name: "Analytics", href: "/associate/analytics", icon: LineChart },
  { name: "Settings", href: "/associate/settings", icon: Settings },
];

export function AssociateSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 flex w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2 text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-4 w-4" />
          </div>
          <span className="font-heading font-bold text-foreground">Associate Hub</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button 
          onClick={() => signOutAction()}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
