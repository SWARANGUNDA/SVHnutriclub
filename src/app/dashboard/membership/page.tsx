"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Sparkles, User, Calendar, CheckCircle2, Shield, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MembershipPage() {
  const [showQR, setShowQR] = useState(true);
  const memberId = "SVH-2026-0042";
  const memberSince = "April 2026";

  // Generate a simple SVG QR-like pattern
  const qrPattern = Array.from({ length: 25 }, (_, i) => ({
    x: (i % 5) * 20 + 10,
    y: Math.floor(i / 5) * 20 + 10,
    filled: [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 6, 12, 18, 8, 16].includes(i),
  }));

  const visits = [
    { date: "May 18, 2026", time: "10:30 AM", type: "Wellness Session" },
    { date: "May 15, 2026", time: "09:00 AM", type: "Consultation" },
    { date: "May 11, 2026", time: "11:00 AM", type: "Body Scan" },
    { date: "May 7, 2026", time: "10:00 AM", type: "Wellness Session" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">QR Membership</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">My Membership</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your digital membership card and attendance history</p>
        </div>
      </section>

      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Membership Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white shadow-premium-lg"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
          <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-white/5" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-heading text-lg font-bold">SVH Nutrition Club</span>
              </div>
              <Shield className="h-6 w-6 text-white/50" />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <User className="h-7 w-7" />
              </div>
              <div>
                <p className="font-heading text-xl font-bold">Premium Member</p>
                <p className="text-sm text-white/70">ID: {memberId}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <div>
                <p className="text-white/50 text-xs">Member Since</p>
                <p className="font-semibold">{memberSince}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Status</p>
                <p className="flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active
                </p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Visits</p>
                <p className="font-semibold">{visits.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <h3 className="font-heading text-sm font-bold text-foreground mb-4">Scan for Check-in</h3>
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl bg-white p-4 shadow-inner">
            <svg viewBox="0 0 110 110" className="h-full w-full">
              {qrPattern.map((cell, i) => (
                <rect
                  key={i}
                  x={cell.x}
                  y={cell.y}
                  width="16"
                  height="16"
                  rx="2"
                  fill={cell.filled ? "#0a0a0f" : "#f0f0f0"}
                />
              ))}
              {/* Center logo area */}
              <rect x="35" y="35" width="40" height="40" rx="8" fill="#10b981" />
              <text x="55" y="60" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">S</text>
            </svg>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Show this QR code at the club for quick check-in</p>
          <p className="mt-1 font-mono text-xs font-bold text-foreground">{memberId}</p>
        </motion.div>

        {/* Visit History */}
        <div className="glass rounded-2xl p-6">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground mb-4">
            <Calendar className="h-4 w-4 text-primary" /> Recent Visits
          </h3>
          <div className="space-y-3">
            {visits.map((visit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{visit.type}</p>
                  <p className="text-xs text-muted-foreground">{visit.date}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {visit.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
