"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Sparkles,
  Users,
  Flame,
  Star,
  Medal,
  Target,
  Clock,
  ChevronRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "weight" | "hydration" | "fitness" | "nutrition";
  duration: string;
  participants: number;
  progress: number;
  reward: string;
  joined: boolean;
  difficulty: "easy" | "medium" | "hard";
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "30-Day Transformation",
    description: "Complete daily workouts and meal plans for 30 days straight",
    type: "fitness",
    duration: "30 days",
    participants: 234,
    progress: 45,
    reward: "Gold Badge + Free Consultation",
    joined: true,
    difficulty: "hard",
  },
  {
    id: "2",
    title: "Hydration Hero",
    description: "Drink 8 glasses of water every day for 2 weeks",
    type: "hydration",
    duration: "14 days",
    participants: 567,
    progress: 70,
    reward: "Silver Badge",
    joined: true,
    difficulty: "easy",
  },
  {
    id: "3",
    title: "Protein Power Week",
    description: "Hit your daily protein target for 7 consecutive days",
    type: "nutrition",
    duration: "7 days",
    participants: 189,
    progress: 0,
    reward: "Bronze Badge",
    joined: false,
    difficulty: "medium",
  },
  {
    id: "4",
    title: "Weight Loss Sprint",
    description: "Follow AI meal plans and track metrics for 21 days",
    type: "weight",
    duration: "21 days",
    participants: 412,
    progress: 0,
    reward: "Gold Badge + Product Discount",
    joined: false,
    difficulty: "hard",
  },
];

const badges = [
  { name: "First Steps", icon: "🏃", earned: true, description: "Complete your first habit" },
  { name: "Week Warrior", icon: "⚔️", earned: true, description: "7-day streak" },
  { name: "Hydration King", icon: "💧", earned: true, description: "Hydration challenge complete" },
  { name: "Iron Will", icon: "💪", earned: false, description: "30-day streak" },
  { name: "Transformer", icon: "🦋", earned: false, description: "Complete transformation challenge" },
  { name: "Guru", icon: "🧘", earned: false, description: "Complete all challenges" },
];

const leaderboard = [
  { rank: 1, name: "Priya S.", points: 2450, avatar: "🥇" },
  { rank: 2, name: "Rahul K.", points: 2280, avatar: "🥈" },
  { rank: 3, name: "Anitha M.", points: 2100, avatar: "🥉" },
  { rank: 4, name: "You", points: 1890, avatar: "⭐", isUser: true },
  { rank: 5, name: "Vijay R.", points: 1750, avatar: "5" },
];

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-500",
  medium: "bg-amber-500/10 text-amber-500",
  hard: "bg-red-500/10 text-red-500",
};

const typeIcons = { weight: Target, hydration: Flame, fitness: Zap, nutrition: TrendingUp };

export default function ChallengesPage() {
  const [tab, setTab] = useState<"active" | "available" | "badges">("active");
  const [challengeList, setChallengeList] = useState(challenges);

  const joinChallenge = (id: string) => {
    setChallengeList((prev) => prev.map((c) => (c.id === id ? { ...c, joined: true } : c)));
  };

  const activeChallenges = challengeList.filter((c) => c.joined);
  const availableChallenges = challengeList.filter((c) => !c.joined);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fitness Challenges</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Challenges & Rewards</h1>
          <p className="mt-1 text-sm text-muted-foreground">Compete, earn badges, and climb the leaderboard</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {(["active", "available", "badges"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "active" ? `Active (${activeChallenges.length})` : t === "available" ? "Available" : `Badges (${badges.filter((b) => b.earned).length}/${badges.length})`}
            </button>
          ))}
        </div>

        {/* Active Challenges */}
        {tab === "active" && (
          <div className="space-y-4">
            {activeChallenges.map((challenge, i) => {
              const Icon = typeIcons[challenge.type];
              return (
                <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-base font-bold text-foreground">{challenge.title}</h3>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", difficultyColors[challenge.difficulty])}>{challenge.difficulty}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{challenge.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{challenge.duration}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{challenge.participants} joined</span>
                        <span className="flex items-center gap-1"><Medal className="h-3 w-3" />{challenge.reward}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground">Progress</span>
                          <span className="text-primary font-semibold">{challenge.progress}%</span>
                        </div>
                        <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${challenge.progress}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Available Challenges */}
        {tab === "available" && (
          <div className="space-y-4">
            {availableChallenges.map((challenge, i) => {
              const Icon = typeIcons[challenge.type];
              return (
                <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-base font-bold text-foreground">{challenge.title}</h3>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize", difficultyColors[challenge.difficulty])}>{challenge.difficulty}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{challenge.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{challenge.duration}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{challenge.participants}</span>
                        </div>
                        <button onClick={() => joinChallenge(challenge.id)} className="flex items-center gap-1 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary/90">
                          Join <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Badges */}
        {tab === "badges" && (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {badges.map((badge, i) => (
              <motion.div key={badge.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className={cn("glass rounded-2xl p-5 text-center transition-all", badge.earned ? "ring-2 ring-primary/20" : "opacity-50 grayscale")}>
                <span className="text-4xl">{badge.icon}</span>
                <h3 className="mt-2 font-heading text-sm font-bold text-foreground">{badge.name}</h3>
                <p className="mt-1 text-[10px] text-muted-foreground">{badge.description}</p>
                {badge.earned && <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">Earned ✓</span>}
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard */}
        <div className="glass rounded-2xl p-6">
          <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground"><Star className="h-5 w-5 text-amber-500" />Leaderboard</h2>
          <div className="mt-4 space-y-2">
            {leaderboard.map((entry, i) => (
              <motion.div key={entry.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 transition-all", entry.isUser ? "bg-primary/5 ring-1 ring-primary/20" : "hover:bg-muted")}>
                <span className="w-8 text-center font-heading text-lg font-bold text-muted-foreground">{entry.avatar}</span>
                <span className={cn("flex-1 text-sm font-medium", entry.isUser ? "text-primary font-bold" : "text-foreground")}>{entry.name}</span>
                <span className="font-heading text-sm font-bold text-foreground">{entry.points.toLocaleString()} pts</span>
              </motion.div>
            ))}
          </div>
        </div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
