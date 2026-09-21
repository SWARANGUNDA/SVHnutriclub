"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, TrendingDown, Minus, Sparkles, Scale, Activity, Flame, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
interface ProgressEntry {
  id: string;
  measuredAt: string;
  weight: number;
  bmi: number;
  bodyFat: number;
  muscleMass: number;
  notes: string | null;
}

function getTrend(current: number, previous: number): "up" | "down" | "same" {
  const diff = current - previous;
  if (Math.abs(diff) < 0.1) return "same";
  return diff > 0 ? "up" : "down";
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/body-metrics?history=true");
        const data = await res.json();
        if (data.metrics) {
          setProgressData(data.metrics);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const latest = progressData[0];
  const oldest = progressData[progressData.length - 1];
  
  let weightChange = "0.0";
  let fatChange = "0.0";
  let muscleChange = "0.0";

  if (latest && oldest && progressData.length > 1) {
    weightChange = (latest.weight - oldest.weight).toFixed(1);
    fatChange = (latest.bodyFat - oldest.bodyFat).toFixed(1);
    muscleChange = (latest.muscleMass - oldest.muscleMass).toFixed(1);
  }

  // Reverse progress data so chronological order is left to right for charts
  const chartData = [...progressData].reverse().map(d => ({
    ...d,
    date: new Date(d.measuredAt || new Date()).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
  }));

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
        {progressData.length > 1 && (
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
        )}

        {/* Charts */}
        {chartData.length > 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-6">
            <h2 className="mb-6 font-heading text-lg font-bold text-foreground">Body Metrics Trend</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" name="Weight (kg)" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="Body Fat (%)" dataKey="bodyFat" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="relative">
          {progressData.length > 0 && <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />}

          <div className="space-y-6">
            {progressData.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No progress data logged yet. Add your first metrics on the Dashboard!</p>
            ) : (
              progressData.map((entry, i) => {
                const prev = progressData[i + 1];
                const weightTrend = prev ? getTrend(entry.weight, prev.weight) : "same";
                const isLatest = i === 0;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div className={cn(
                      "absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2",
                      isLatest ? "border-primary bg-primary" : "border-border bg-background"
                    )}>
                      {isLatest && <Sparkles className="h-2.5 w-2.5 text-white" />}
                    </div>

                    <div className={cn("glass rounded-2xl p-5", isLatest && "ring-1 ring-primary/20")}>
                      {/* Milestone badge */}
                      {isLatest && (
                        <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          Latest Entry
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.measuredAt || new Date()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
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
                          { label: "Weight", value: `${entry.weight || 0} kg` },
                          { label: "BMI", value: entry.bmi?.toFixed(1) || "0" },
                          { label: "Body Fat", value: `${entry.bodyFat || 0}%` },
                          { label: "Muscle", value: `${entry.muscleMass || 0}%` },
                        ].map((m) => (
                          <div key={m.label} className="text-center">
                            <p className="font-heading text-sm font-bold text-foreground">{m.value}</p>
                            <p className="text-[10px] text-muted-foreground">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      {entry.notes && (
                        <p className="mt-3 text-xs text-muted-foreground italic">📝 {entry.notes}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
