"use client";

import { Sparkles, BarChart3, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Analytics</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">AI Wellness Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">View your generated weekly and monthly summary reports.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="glass rounded-3xl p-10 text-center border border-border">
          <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-heading text-lg font-bold text-foreground mb-1">No Reports Available</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Log enough data over a week to generate your first comprehensive wellness report.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-6 py-3 text-sm font-bold text-muted-foreground cursor-not-allowed">
            <Download className="h-4 w-4" /> Download Latest Report
          </button>
        </div>
      </div>
    </div>
  );
}
