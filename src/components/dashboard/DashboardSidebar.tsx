"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  User, 
  ScanLine, 
  Brain, 
  View, 
  LineChart, 
  Activity, 
  Target, 
  Map, 
  CheckSquare, 
  UtensilsCrossed, 
  Apple, 
  Search, 
  ShoppingBag, 
  Trophy, 
  BookA, 
  BarChart3, 
  Camera, 
  GraduationCap, 
  Bell, 
  Mic,
  ChevronRight,
  Menu
} from "lucide-react";

const DASHBOARD_ROUTES = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Wellness Profile", icon: User },
  { href: "/dashboard/scan", label: "Body Scan", icon: ScanLine },
  { href: "/dashboard/body-analysis", label: "Body Analysis", icon: Brain },
  { href: "/dashboard/3d-body", label: "3D Body", icon: View },
  { href: "/dashboard/progress", label: "Progress Trends", icon: LineChart },
  { href: "/dashboard/wellness-score", label: "Wellness Score", icon: Activity },
  { href: "/dashboard/goals", label: "Goals", icon: Target },
  { href: "/dashboard/plan", label: "Wellness Plan", icon: Map },
  { href: "/dashboard/habits", label: "Habit Tracker", icon: CheckSquare },
  { href: "/dashboard/nutrition", label: "Nutrition Diary", icon: UtensilsCrossed },
  { href: "/dashboard/meals", label: "AI Meals", icon: Apple },
  { href: "/dashboard/scanner", label: "Food Scanner", icon: Search },
  { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/challenges", label: "Challenges", icon: Trophy },
  { href: "/dashboard/journal", label: "Journal", icon: BookA },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/transformations", label: "Transformations", icon: Camera },
  { href: "/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const currentRoute = DASHBOARD_ROUTES.find(r => r.href === pathname) || DASHBOARD_ROUTES[0];

  return (
    <>
      {/* Mobile Sidebar Toggle - Positioned below main header */}
      <div className="lg:hidden fixed top-[72px] left-0 right-0 z-40 glass border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-medium text-sm">
          <currentRoute.icon className="h-4 w-4" />
          <span>{currentRoute.label}</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs font-bold text-foreground"
        >
          <Menu className="h-4 w-4" /> Menu
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Drawer */}
      <AnimatePresence>
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex w-72 flex-col glass-strong border-r border-border pt-24 lg:pt-[88px] pb-6",
              !isOpen && "hidden lg:flex"
            )}
          >
            {/* Scrollable Nav Content */}
            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
              <div className="mb-4">
                <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Customer Portal
                </h3>
              </div>
              
              <nav className="flex flex-col gap-1 pb-10">
                {DASHBOARD_ROUTES.map((route) => {
                  const isActive = pathname === route.href;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <route.icon className={cn(
                        "h-4 w-4 transition-colors", 
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                      {route.label}
                      {isActive && (
                        <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            {/* Mobile close overlay */}
            {isOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-[-1] lg:hidden"
                onClick={() => setIsOpen(false)}
              />
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
