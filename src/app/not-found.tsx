"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="h-72 w-72 rounded-full bg-primary/5 blur-[100px]"
        />
      </div>
      <div className="pointer-events-none absolute right-1/4 bottom-1/4">
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="h-80 w-80 rounded-full bg-teal-500/5 blur-[120px]"
        />
      </div>

      <div className="relative text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-heading text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 sm:text-[160px] lg:text-[200px] select-none">
            404
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 backdrop-blur-sm">
            <Search className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track to your wellness journey.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            onClick={() => {
              if (typeof window !== "undefined") window.history.back();
            }}
            className="glass group flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:shadow-premium"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Products", href: "/products" },
              { label: "Services", href: "/services" },
              { label: "Book Consultation", href: "/consultation" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Brand footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-2 text-muted-foreground/60"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-medium">SVH Nutrition Club</span>
        </motion.div>
      </div>
    </div>
  );
}
