"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Activity, Users, Database, LogOut } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";

const NAV_LINKS = [
  { name: "System Health", href: "/admin", icon: Activity },
  { name: "Global Network", href: "/admin/network", icon: Users },
  { name: "Database", href: "/admin/database", icon: Database },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 flex w-64 flex-col border-r border-destructive/20 bg-black">
      <div className="flex h-16 items-center px-6 border-b border-destructive/20">
        <div className="flex items-center gap-2 text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/20">
            <Shield className="h-4 w-4 text-destructive" />
          </div>
          <span className="font-heading font-bold tracking-wider text-white">SVH ADMIN</span>
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
                  ? "bg-white text-black" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-destructive/20 p-4">
        <button 
          onClick={() => signOutAction()}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
}
