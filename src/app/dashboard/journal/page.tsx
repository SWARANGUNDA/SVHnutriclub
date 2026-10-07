"use client";

import { BookOpen, Trophy, PlayCircle, Edit3, Lock } from "lucide-react";
import Link from "next/link";

export default function JournalAndEducationPage() {
  return (
    <div className="flex flex-col gap-10">
      
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Journal & Education
        </h1>
        <p className="mt-2 text-muted-foreground">
          Log your journey, join challenges, and learn from SVH experts.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* LEFT COL: JOURNAL & CHALLENGES */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          
          {/* Active Challenge */}
          <section className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-xl font-bold text-foreground">21-Day Summer Shred</h2>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Day 12
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              You are over halfway through! Today's challenge is to replace your afternoon snack with a Formula 1 Shake and hit 10,000 steps.
            </p>
            
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Mark as Completed
              </button>
              <button className="flex-1 rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground hover:bg-muted">
                View Leaderboard
              </button>
            </div>
          </section>

          {/* Daily Journal */}
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">Daily Journal</h2>
              <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                <Edit3 className="h-4 w-4" /> New Entry
              </button>
            </div>

            <div className="space-y-4 border-l-2 border-muted pl-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                <span className="text-xs font-bold text-primary">Today, 09:00 AM</span>
                <p className="mt-1 text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                  Felt incredibly energetic during the morning workout. The Afresh drink is definitely making a difference before cardio.
                </p>
              </div>
              <div className="relative opacity-60">
                <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">Yesterday, 10:00 PM</span>
                <p className="mt-1 text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                  Missed my protein goal by a few grams today. Need to prep better for tomorrow's lunch.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COL: EDUCATION (SVH ACADEMY) */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              <h2 className="font-heading text-xl font-bold text-foreground">SVH Academy</h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Video Card 1 */}
              <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="h-32 w-full bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <PlayCircle className="mb-2 h-6 w-6 text-white" />
                  <h3 className="font-heading text-sm font-bold text-white">Mastering Macros</h3>
                  <p className="text-xs text-zinc-300">Learn how to balance your plate.</p>
                </div>
              </div>

              {/* Video Card 2 */}
              <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="h-32 w-full bg-[url('https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <PlayCircle className="mb-2 h-6 w-6 text-white" />
                  <h3 className="font-heading text-sm font-bold text-white">The Power of Protein</h3>
                  <p className="text-xs text-zinc-300">Why muscle mass matters.</p>
                </div>
              </div>

              {/* Locked Module */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/50 p-4 text-center">
                <Lock className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                <h3 className="font-heading text-sm font-bold text-muted-foreground">Advanced Metabolism</h3>
                <p className="text-xs text-muted-foreground">Unlocks at Wellness Score 85</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
