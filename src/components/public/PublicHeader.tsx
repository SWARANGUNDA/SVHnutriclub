"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold leading-tight tracking-tight text-foreground">
                SVH
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Nutrition Club
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </Link>
            <Link href="#products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Products
            </Link>
            <Link href="#stories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Transformations
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 border-b border-border bg-background px-6 py-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">
                How It Works
              </Link>
              <Link href="#products" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">
                Products
              </Link>
              <Link href="#stories" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground">
                Transformations
              </Link>
              <div className="my-4 h-px w-full bg-border"></div>
              <Link href="/login" className="text-lg font-medium text-foreground">
                Sign In
              </Link>
              <Link href="/login" className="inline-block w-full rounded-full bg-foreground px-6 py-4 text-center text-lg font-medium text-background">
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
