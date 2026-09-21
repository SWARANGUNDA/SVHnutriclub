"use client";

import { motion } from "framer-motion";
import { Sparkles, Activity, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function BodyAnalysisPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Intelligence</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">AI Body Analysis</h1>
          <p className="mt-1 text-sm text-muted-foreground">Deep insights based on your confirmed body metrics.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="glass glow-green rounded-3xl p-8 text-center border border-border">
          <Activity className="h-12 w-12 text-primary mx-auto mb-4 opacity-80" />
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">Analysis Engine Ready</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your metrics are being compiled. Connect a new body scan to generate your personalized wellness explanation in English, Hindi, or Telugu.
          </p>
          <Link href="/dashboard/scan" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">
            <FileText className="h-4 w-4" /> Go to Body Scan
          </Link>
        </div>
      </div>
    </div>
  );
}
