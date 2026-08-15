"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, TrendingDown, Minus, Sparkles, Scale, Activity, Flame, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProgressEntry {
  date: string;
  weight: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  note: string;
  milestone?: string;
}

const progressData: ProgressEntry[] = [
  { date: "2026-05-18", weight: 75, bmi: 24.5, bodyFat: 22, muscleMass: 42, note: "Started AI meal plan", milestone: "Journey Started 🚀" },
  { date: "2026-05-11", weight: 76.2, bmi: 24.9, bodyFat: 23, muscleMass: 41, note: "Increased water intake" },
  { date: "2026-05-04", weight: 77.5, bmi: 25.3, bodyFat: 24, muscleMass: 40.5, note: "First consultation completed", milestone: "First Consultation ✅" },
  { date: "2026-04-27", weight: 78.1, bmi: 25.5, bodyFat: 24.5, muscleMass: 40, note: "Started supplements" },
  { date: "2026-04-20", weight: 79, bmi: 25.8, bodyFat: 25, muscleMass: 39.5, note: "Joined SVH Nutrition Club", milestone: "Club Member 🌿" },
];

function getTrend(current: number, previous: number): "up" | "down" | "same" {
  const diff = current - previous;
  if (Math.abs(diff) < 0.1) return "same";
  return diff > 0 ? "up" : "down";
}

export default function ProgressPage() {
  const latest = progressData[0];
  const oldest = progressData[progressData.length - 1];
  const weightChange = (latest.weight - oldest.weight).toFixed(1);
  const fatChange = (latest.bodyFat - oldest.bodyFat).toFixed(1);
  const muscleChange = (latest.muscleMass - oldest.muscleMass).toFixed(1);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Body Progress</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Your Transformation Timeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your body changes and milestones over time</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid gap-3 grid-cols-3">
          {[
            { label: "Weight Change", value: `${parseFloat(weightChange) <= 0 ? "" : "+"}${weightChange} kg`, icon: Scale, good: parseFloat(weightChange) <= 0 },
            { label: "Body Fat Change", value: `${parseFloat(fatChange) <= 0 ? "" : "+"}${fatChange}%`, icon: Flame, good: parseFloat(fatChange) <= 0 },
            { label: "Muscle Change", value: `${parseFloat(muscleChange) >= 0 ? "+" : ""}${muscleChange}%`, icon: Activity, good: parseFloat(muscleChange) >= 0 },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-4 text-center">
              <stat.icon className={cn("mx-auto h-6 w-6", stat.good ? "text-emerald-500" : "text-amber-500")} />
              <p className={cn("mt-1 font-heading text-xl font-bold", stat.good ? "text-emerald-500" : "text-amber-500")}>{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {progressData.map((entry, i) => {
              const prev = progressData[i + 1];
              const weightTrend = prev ? getTrend(entry.weight, prev.weight) : "same";

              return (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className={cn(
                    "absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2",
                    entry.milestone ? "border-primary bg-primary" : "border-border bg-background"
                  )}>
                    {entry.milestone && <Sparkles className="h-2.5 w-2.5 text-white" />}
                  </div>

                  <div className={cn("glass rounded-2xl p-5", entry.milestone && "ring-1 ring-primary/20")}>
                    {/* Milestone badge */}
                    {entry.milestone && (
                      <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {entry.milestone}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(entry.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="flex items-center gap-1">
                        {weightTrend === "down" && <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />}
                        {weightTrend === "up" && <TrendingUp className="h-3.5 w-3.5 text-amber-500" />}
                        {weightTrend === "same" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Metrics row */}
                    <div className="mt-3 grid grid-cols-4 gap-3">
                      {[
                        { label: "Weight", value: `${entry.weight} kg` },
                        { label: "BMI", value: entry.bmi.toFixed(1) },
                        { label: "Body Fat", value: `${entry.bodyFat}%` },
                        { label: "Muscle", value: `${entry.muscleMass}%` },
                      ].map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="font-heading text-sm font-bold text-foreground">{m.value}</p>
                          <p className="text-[10px] text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {entry.note && (
                      <p className="mt-3 text-xs text-muted-foreground italic">📝 {entry.note}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
