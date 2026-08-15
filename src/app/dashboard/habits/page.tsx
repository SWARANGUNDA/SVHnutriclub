"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Dumbbell,
  Moon,
  Utensils,
  Pill,
  Flame,
  CheckCircle2,
  Circle,
  TrendingUp,
  Sparkles,
  Calendar,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Habit {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  target: number;
  unit: string;
  current: number;
  completed: boolean;
}

const defaultHabits: Habit[] = [
  { id: "water", name: "Water Intake", icon: Droplets, color: "from-sky-500 to-blue-500", target: 8, unit: "glasses", current: 5, completed: false },
  { id: "workout", name: "Workout", icon: Dumbbell, color: "from-orange-500 to-red-500", target: 1, unit: "session", current: 0, completed: false },
  { id: "sleep", name: "Sleep", icon: Moon, color: "from-indigo-500 to-purple-500", target: 8, unit: "hours", current: 7, completed: false },
  { id: "meals", name: "Healthy Meals", icon: Utensils, color: "from-emerald-500 to-teal-500", target: 5, unit: "meals", current: 3, completed: false },
  { id: "supplements", name: "Supplements", icon: Pill, color: "from-pink-500 to-rose-500", target: 3, unit: "doses", current: 2, completed: false },
  { id: "steps", name: "Steps", icon: Flame, color: "from-amber-500 to-yellow-500", target: 10000, unit: "steps", current: 6500, completed: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mockWeekData = [true, true, true, false, true, true, false]; // streak data

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [streak, setStreak] = useState(5);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, current: h.completed ? 0 : h.target, completed: !h.completed }
          : h
      )
    );
  };

  const incrementHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const next = Math.min(h.current + 1, h.target);
        return { ...h, current: next, completed: next >= h.target };
      })
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Daily Habit Tracker</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Track Your Habits</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Build consistency and crush your wellness goals every day
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Streak & Progress */}
        <div className="grid gap-4 sm:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass glow-green rounded-2xl p-5 text-center">
            <Zap className="mx-auto h-8 w-8 text-amber-500" />
            <p className="mt-2 font-heading text-3xl font-bold text-foreground">{streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak 🔥</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-emerald-500" />
            <p className="mt-2 font-heading text-3xl font-bold text-foreground">{completedCount}/{habits.length}</p>
            <p className="text-xs text-muted-foreground">Habits Done Today</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-5 text-center">
            <div className="relative mx-auto h-16 w-16">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${progressPercent}, 100` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-heading text-sm font-bold text-foreground">
                {progressPercent}%
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Daily Progress</p>
          </motion.div>
        </div>

        {/* Week view */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> This Week
            </h3>
          </div>
          <div className="flex items-center justify-between gap-2">
            {weekDays.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-muted-foreground">{day}</span>
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                  i === 6 ? "border-2 border-primary bg-primary/10" :
                  mockWeekData[i] ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {mockWeekData[i] ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Habit Cards */}
        <div className="space-y-3">
          {habits.map((habit, i) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn("glass rounded-2xl p-4 transition-all", habit.completed && "ring-2 ring-emerald-500/30")}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-all",
                    habit.completed ? "from-emerald-500 to-teal-500 scale-105 shadow-lg shadow-emerald-500/20" : habit.color
                  )}
                >
                  {habit.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  ) : (
                    <habit.icon className="h-6 w-6 text-white" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={cn("text-sm font-semibold", habit.completed ? "text-emerald-500 line-through" : "text-foreground")}>
                      {habit.name}
                    </h3>
                    <span className="text-xs font-medium text-muted-foreground">
                      {habit.current}/{habit.target} {habit.unit}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((habit.current / habit.target) * 100, 100)}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full",
                        habit.completed ? "bg-emerald-500" : "bg-gradient-to-r " + habit.color.replace("from-", "from-").replace("to-", "to-")
                      )}
                    />
                  </div>
                </div>

                {!habit.completed && (
                  <button
                    onClick={() => incrementHabit(habit.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                  >
                    +
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
