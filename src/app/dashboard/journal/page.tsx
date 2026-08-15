"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Plus, Smile, Meh, Frown, Zap, Moon, Sun, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface JournalEntry {
  id: string;
  date: string;
  mood: "great" | "good" | "okay" | "low";
  energy: number;
  diet: string;
  workout: string;
  notes: string;
  sleep: number;
}

const moodIcons = { great: Smile, good: Smile, okay: Meh, low: Frown };
const moodColors = { great: "text-emerald-500", good: "text-blue-500", okay: "text-amber-500", low: "text-red-500" };

const mockEntries: JournalEntry[] = [
  { id: "1", date: "2026-05-18", mood: "great", energy: 9, diet: "Had Formula 1 shake for breakfast, salad for lunch, dal rice for dinner", workout: "30 min walk + 15 min yoga", notes: "Feeling great after starting the meal plan!", sleep: 7.5 },
  { id: "2", date: "2026-05-17", mood: "good", energy: 7, diet: "Protein smoothie, roti sabzi, fruits", workout: "Rest day", notes: "Good recovery day. Need more water.", sleep: 8 },
  { id: "3", date: "2026-05-16", mood: "okay", energy: 5, diet: "Skipped breakfast, heavy lunch, light dinner", workout: "20 min cardio", notes: "Low energy in the morning. Must not skip breakfast.", sleep: 6 },
];

export default function JournalPage() {
  const [entries, setEntries] = useState(mockEntries);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ mood: "good" as JournalEntry["mood"], energy: 7, diet: "", workout: "", notes: "", sleep: 7 });

  const addEntry = () => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      ...newEntry,
    };
    setEntries([entry, ...entries]);
    setShowForm(false);
    setNewEntry({ mood: "good", energy: 7, diet: "", workout: "", notes: "", sleep: 7 });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fitness Journal</span>
              </div>
              <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">My Wellness Journal</h1>
              <p className="mt-1 text-sm text-muted-foreground">Record your daily wellness reflections</p>
            </div>
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New Entry
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* New Entry Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-foreground">Today&apos;s Entry</h3>
                <button onClick={() => setShowForm(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
              </div>

              {/* Mood */}
              <div>
                <label className="text-xs font-medium text-muted-foreground">How are you feeling?</label>
                <div className="mt-2 flex gap-3">
                  {(["great", "good", "okay", "low"] as const).map((m) => {
                    const Icon = moodIcons[m];
                    return (
                      <button key={m} onClick={() => setNewEntry((p) => ({ ...p, mood: m }))} className={cn("flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all", newEntry.mood === m ? "border-primary bg-primary/5" : "border-border")}>
                        <Icon className={cn("h-6 w-6", moodColors[m])} />
                        <span className="text-[10px] font-medium capitalize">{m}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Energy & Sleep */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span><Zap className="inline h-3 w-3" /> Energy Level</span><span className="text-foreground font-semibold">{newEntry.energy}/10</span>
                  </label>
                  <input type="range" min="1" max="10" value={newEntry.energy} onChange={(e) => setNewEntry((p) => ({ ...p, energy: parseInt(e.target.value) }))} className="mt-1 w-full accent-primary" />
                </div>
                <div>
                  <label className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span><Moon className="inline h-3 w-3" /> Sleep Hours</span><span className="text-foreground font-semibold">{newEntry.sleep}h</span>
                  </label>
                  <input type="range" min="3" max="12" step="0.5" value={newEntry.sleep} onChange={(e) => setNewEntry((p) => ({ ...p, sleep: parseFloat(e.target.value) }))} className="mt-1 w-full accent-primary" />
                </div>
              </div>

              {/* Text fields */}
              <div>
                <label className="text-xs font-medium text-muted-foreground">Diet Notes</label>
                <textarea value={newEntry.diet} onChange={(e) => setNewEntry((p) => ({ ...p, diet: e.target.value }))} placeholder="What did you eat today?" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" rows={2} />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Workout</label>
                <input value={newEntry.workout} onChange={(e) => setNewEntry((p) => ({ ...p, workout: e.target.value }))} placeholder="What exercise did you do?" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Reflections</label>
                <textarea value={newEntry.notes} onChange={(e) => setNewEntry((p) => ({ ...p, notes: e.target.value }))} placeholder="Any thoughts or observations..." className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" rows={2} />
              </div>

              <button onClick={addEntry} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-2.5 text-sm font-semibold text-white shadow-lg">
                Save Entry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries */}
        {entries.map((entry, i) => {
          const MoodIcon = moodIcons[entry.mood];
          return (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(entry.date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}
                </div>
                <div className="flex items-center gap-2">
                  <MoodIcon className={cn("h-5 w-5", moodColors[entry.mood])} />
                  <span className="text-xs font-semibold capitalize text-foreground">{entry.mood}</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-muted/50 p-2 text-center">
                  <Zap className="mx-auto h-3.5 w-3.5 text-amber-500" />
                  <p className="mt-0.5 font-heading text-sm font-bold text-foreground">{entry.energy}/10</p>
                  <p className="text-[10px] text-muted-foreground">Energy</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2 text-center">
                  <Moon className="mx-auto h-3.5 w-3.5 text-indigo-500" />
                  <p className="mt-0.5 font-heading text-sm font-bold text-foreground">{entry.sleep}h</p>
                  <p className="text-[10px] text-muted-foreground">Sleep</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2 text-center">
                  <Sun className="mx-auto h-3.5 w-3.5 text-emerald-500" />
                  <p className="mt-0.5 font-heading text-sm font-bold text-foreground">{entry.workout || "Rest"}</p>
                  <p className="text-[10px] text-muted-foreground">Workout</p>
                </div>
              </div>

              {entry.diet && <p className="mt-3 text-xs text-muted-foreground">🍽️ {entry.diet}</p>}
              {entry.notes && <p className="mt-2 text-xs text-muted-foreground italic">📝 {entry.notes}</p>}
            </motion.div>
          );
        })}

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
