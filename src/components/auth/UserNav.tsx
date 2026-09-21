"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, LayoutDashboard, Settings, ChevronDown, Shield } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export function UserNav() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 hover:shadow-xl"
      >
        <User className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        <span>Login</span>
      </Link>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : user.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-1 pr-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white shadow-sm">
          {user.image ? (
            <img src={user.image} alt="Avatar" className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <span className="hidden max-w-[100px] truncate sm:block">
          {user.name || user.email?.split("@")[0]}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="glass-strong absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl p-1.5 shadow-premium-lg z-50"
          >
            <div className="border-b border-border px-3 py-2.5 mb-1">
              <p className="text-sm font-medium">{user.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>

            <div className="flex flex-col gap-0.5">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              
              {user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
                >
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}

              <Link
                href="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>

              <div className="my-1 h-px bg-border" />

              <button
                onClick={() => {
                  setIsOpen(false);
                  signOutAction();
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
