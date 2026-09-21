"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { NAV_LINKS, LANGUAGES } from "@/lib/constants";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";
import { SmartSearch } from "@/components/shared/SmartSearch";
import { UserNav } from "@/components/auth/UserNav";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, language, setLanguage } =
    useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong shadow-premium py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold leading-tight tracking-tight text-foreground">
                  SVH
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Nutrition Club
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* AI Smart Search */}
              <div className="hidden sm:block">
                <SmartSearch />
              </div>

              {/* Language Toggle */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                  aria-label="Change language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">{currentLang.flag}</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", langOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="glass-strong absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl p-1.5 shadow-premium-lg"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            language === lang.code
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span>{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mounted ? (
                      <motion.div
                        key={theme}
                        initial={{ y: -10, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 10, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {theme === "dark" ? (
                          <Sun className="h-4.5 w-4.5" />
                        ) : (
                          <Moon className="h-4.5 w-4.5" />
                        )}
                      </motion.div>
                    ) : (
                      <div className="h-4.5 w-4.5 opacity-0" />
                    )}
                  </AnimatePresence>
              </button>

              {/* User Navigation */}
              <div className="hidden sm:block">
                <UserNav />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground lg:hidden"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isMobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="glass-strong fixed right-0 top-0 z-50 flex h-full w-80 flex-col p-6 shadow-premium-lg lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-heading text-lg font-bold text-foreground">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                {/* Mobile Language Selector */}
                <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        "flex-1 rounded-lg px-2 py-2 text-center text-xs font-medium transition-all",
                        language === lang.code
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center mt-2">
                  <UserNav />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
