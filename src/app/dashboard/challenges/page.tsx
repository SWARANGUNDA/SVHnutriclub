"use client";

import { Sparkles, Trophy, Star } from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Community</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Challenges & Streaks</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join wellness challenges and earn achievements.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Active Challenges */}
          <div className="glass glow-green rounded-3xl p-6 border border-border">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
              <Trophy className="h-5 w-5 text-primary" /> Active Challenges
            </h2>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Trophy className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">You are not participating in any active challenges.</p>
              <button className="mt-4 rounded-xl bg-primary/20 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/30">
                Browse Challenges
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="glass rounded-3xl p-6 border border-border">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
              <Star className="h-5 w-5 text-primary" /> Achievements
            </h2>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Star className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Complete challenges and habits to earn badges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
