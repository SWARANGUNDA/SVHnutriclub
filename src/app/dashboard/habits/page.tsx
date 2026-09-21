"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Plus, Loader2, Sparkles, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitLog {
  id: string;
  date: string;
  completed: boolean;
}

interface Habit {
  id: string;
  title: string;
  streak: number;
  logs: HabitLog[];
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      const res = await fetch("/api/habits");
      const data = await res.json();
      if (data.habits) setHabits(data.habits);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(habitId: string, currentlyCompleted: boolean) {
    const today = new Date().toISOString();
    try {
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id === habitId) {
            const todayLogIdx = h.logs.findIndex(
              (l) => new Date(l.date).toDateString() === new Date().toDateString()
            );
            const newLogs = [...h.logs];
            if (todayLogIdx >= 0) {
              newLogs[todayLogIdx] = { ...newLogs[todayLogIdx], completed: !currentlyCompleted };
            } else {
              newLogs.push({ id: "temp", date: today, completed: !currentlyCompleted });
            }
            return { ...h, logs: newLogs, streak: currentlyCompleted ? Math.max(0, h.streak - 1) : h.streak + 1 };
          }
          return h;
        })
      );

      await fetch(`/api/habits/${habitId}/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: today, completed: !currentlyCompleted }),
      });
    } catch (err) {
      console.error(err);
      fetchHabits(); // Revert on failure
    }
  }

  async function createHabit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (res.ok) {
        setNewTitle("");
        fetchHabits();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Consistency</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Habit Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your daily wellness goals to build consistency.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <form onSubmit={createHabit} className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="E.g., Drink 3L Water"
            className="flex-1 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add Habit
          </button>
        </form>

        <div className="glass glow-green rounded-3xl p-6 sm:p-8 border border-border">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : habits.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">No habits created yet. Start building good routines!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {habits.map((habit) => {
                const todayLog = habit.logs.find(
                  (l) => new Date(l.date).toDateString() === new Date().toDateString()
                );
                const isCompleted = todayLog?.completed || false;

                return (
                  <div key={habit.id} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border/50 transition-colors hover:border-primary/50">
                    <div>
                      <span className={cn("font-medium text-lg transition-colors", isCompleted ? "text-primary line-through opacity-70" : "text-foreground")}>
                        {habit.title}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-orange-500 mt-1">
                        <Flame className="h-3 w-3" /> {habit.streak} Day Streak
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(habit.id, isCompleted)}
                      className="hover:scale-110 transition-transform"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      ) : (
                        <Circle className="h-8 w-8 text-muted-foreground/50 hover:text-primary/50" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
