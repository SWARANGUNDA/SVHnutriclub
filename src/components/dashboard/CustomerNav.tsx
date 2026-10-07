"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { 
  Home, 
  Activity, 
  Apple, 
  TrendingUp, 
  Compass, 
  UserCircle,
  Sun,
  Moon,
  LogOut
} from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";

const NAV_LINKS = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "My Wellness", href: "/dashboard/wellness", icon: Activity },
  { name: "Nutrition", href: "/dashboard/nutrition", icon: Apple },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Discover", href: "/dashboard/discover", icon: Compass },
];

export function CustomerNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="hidden font-heading text-lg font-bold sm:inline-block text-foreground drop-shadow-sm">
            SVH Wellness
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? "text-primary drop-shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="customer-nav-indicator"
                    className="absolute -bottom-5 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_theme('colors.primary.DEFAULT')]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card/50 border border-border/50 text-muted-foreground transition-all hover:bg-muted/80 hover:text-foreground hover:scale-105"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <button 
            onClick={() => signOutAction()}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 transition-all hover:bg-destructive/20 hover:scale-105"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 transition-all hover:bg-primary/20 hover:scale-105">
            <UserCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Visible only on small screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border/40 bg-background/80 backdrop-blur-xl pb-safe md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 px-2 transition-all ${
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? "drop-shadow-md" : ""}`} />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
