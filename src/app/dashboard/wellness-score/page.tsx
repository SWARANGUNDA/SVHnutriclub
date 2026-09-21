"use client";

import { Sparkles, ShieldCheck } from "lucide-react";

export default function WellnessScorePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Overview</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Wellness Score</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your deterministic overall health indicator.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="glass glow-green rounded-3xl p-10 text-center border border-border flex flex-col items-center">
          <div className="relative mb-8">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
              <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="440" strokeDashoffset="44" className="text-primary" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-4xl font-black text-foreground">90</span>
              <span className="text-[10px] uppercase font-bold text-primary">Score</span>
            </div>
          </div>
          
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">Excellent Wellness Status</h2>
          <p className="text-muted-foreground max-w-md">
            This score is calculated deterministically from your body metrics, habit consistency, and daily activity.
            <br/><br/>
            <span className="text-xs italic opacity-70">Note: This is a wellness indicator, not a medical diagnosis.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
