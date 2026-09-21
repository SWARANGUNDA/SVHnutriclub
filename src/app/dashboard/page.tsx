"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Droplets,
  Flame,
  Heart,
  Scale,
  Sparkles,
  TrendingUp,
  Utensils,
  Zap,
  RefreshCw,
  ChevronRight,
  Target,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThreeBodyModel } from "@/components/ui/ThreeBodyModel";
import { FeatureCarousel } from "@/components/dashboard/FeatureCarousel";

// Types
interface HealthInsight {
  category: string;
  status: "excellent" | "good" | "warning" | "critical";
  message: string;
}

interface BodyAnalysis {
  healthScore: number;
  grade: string;
  summary: string;
  insights: HealthInsight[];
  recommendations: string[];
  provider: string;
}

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  description: string;
}

interface MealPlan {
  title: string;
  averageDailyCalories: number;
  averageDailyProtein: number;
  hydration: number;
  days: {
    dayNumber: number;
    totalCalories: number;
    meals: Record<string, MealItem>;
  }[];
  tips: string[];
  provider: string;
}

// Default body metrics for demo
const defaultMetrics = {
  weight: 75,
  height: 175,
  bmi: 24.5,
  bmr: 1680,
  bodyFat: 22,
  muscleMass: 42,
  visceralFat: 8,
  waterPercent: 55,
  metabolicAge: 28,
  boneMass: 3.2,
};

const statusColors = {
  excellent: "text-emerald-500",
  good: "text-blue-500",
  warning: "text-amber-500",
  critical: "text-red-500",
};

const statusIcons = {
  excellent: CheckCircle2,
  good: CheckCircle2,
  warning: AlertCircle,
  critical: AlertCircle,
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [analysis, setAnalysis] = useState<BodyAnalysis | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState({ analysis: false, meal: false });
  const [editingMetrics, setEditingMetrics] = useState(false);

  useEffect(() => {
    async function init() {
      let currentMetrics = metrics;
      try {
        const res = await fetch("/api/body-metrics");
        if (res.ok) {
          const data = await res.json();
          if (data.metric) {
            currentMetrics = { ...defaultMetrics, ...data.metric };
            setMetrics(currentMetrics);
          }
        }
      } catch (err) {
        console.error("Failed to load metrics:", err);
      }
      fetchAnalysis(currentMetrics);
      fetchMealPlan(currentMetrics);
    }
    init();
  }, []);

  async function fetchAnalysis(currentMetrics = metrics) {
    setLoading((p) => ({ ...p, analysis: true }));
    try {
      const res = await fetch("/api/ai/body-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics: currentMetrics }),
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setLoading((p) => ({ ...p, analysis: false }));
    }
  }

  async function fetchMealPlan(currentMetrics = metrics) {
    setLoading((p) => ({ ...p, meal: true }));
    try {
      const res = await fetch("/api/ai/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: "weight management", bmi: currentMetrics.bmi, bodyFat: currentMetrics.bodyFat }),
      });
      const data = await res.json();
      setMealPlan(data);
    } catch (err) {
      console.error("Meal plan error:", err);
    } finally {
      setLoading((p) => ({ ...p, meal: false }));
    }
  }

  async function saveMetrics() {
    try {
      const res = await fetch("/api/body-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...metrics, source: "manual" }),
      });
      if (res.ok) {
        fetchAnalysis(metrics);
      }
    } catch (err) {
      console.error("Failed to save metrics", err);
    }
  }

  const metricCards = [
    { label: "Weight", value: `${metrics.weight} kg`, icon: Scale, color: "from-emerald-500 to-teal-500" },
    { label: "BMI", value: metrics.bmi.toFixed(1), icon: Activity, color: "from-blue-500 to-cyan-500" },
    { label: "Body Fat", value: `${metrics.bodyFat}%`, icon: Flame, color: "from-amber-500 to-orange-500" },
    { label: "Muscle Mass", value: `${metrics.muscleMass}%`, icon: Zap, color: "from-purple-500 to-pink-500" },
    { label: "BMR", value: `${metrics.bmr}`, icon: Heart, color: "from-red-500 to-rose-500" },
    { label: "Hydration", value: `${metrics.waterPercent}%`, icon: Droplets, color: "from-sky-500 to-blue-500" },
    { label: "Visceral Fat", value: `${metrics.visceralFat}`, icon: Target, color: "from-teal-500 to-emerald-500" },
    { label: "Metabolic Age", value: `${metrics.metabolicAge}`, icon: Brain, color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* AI Feature & Offers Carousel */}
      <div className="mx-auto max-w-[1400px]">
        <FeatureCarousel />
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  AI Body Dashboard
                </span>
              </div>
              <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
                Your Wellness Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                AI-powered insights based on your body metrics
              </p>
            </div>
            <button
              suppressHydrationWarning
              onClick={() => { fetchAnalysis(); fetchMealPlan(); }}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              <RefreshCw className={cn("h-4 w-4", (loading.analysis || loading.meal) && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Health Score & 3D Body Card */}
        <div className="grid gap-6 lg:grid-cols-2">
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass glow-green flex flex-col justify-between rounded-3xl p-6 sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                    <span className="font-heading text-3xl font-bold text-white">
                      {analysis.healthScore}
                    </span>
                    <span className="absolute -bottom-1 rounded-full bg-background px-2 py-0.5 text-xs font-bold text-primary shadow-sm">
                      {analysis.grade}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground">Health Score</h2>
                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                      {analysis.summary}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      AI Provider: {analysis.provider}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/dashboard/meals"
                    className="flex items-center gap-1 rounded-xl bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Utensils className="h-3.5 w-3.5" />
                    Meal Plan
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3D Body Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex h-full w-full items-center justify-center rounded-3xl"
          >
            <ThreeBodyModel metrics={{ ...metrics, score: analysis?.healthScore || 85 }} />
          </motion.div>
        </div>

        {/* Metric Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-foreground">Body Metrics</h2>
            <button
              suppressHydrationWarning
              onClick={() => {
                if (editingMetrics) saveMetrics();
                setEditingMetrics(!editingMetrics);
              }}
              className="text-xs font-medium text-primary hover:underline"
            >
              {editingMetrics ? "Save" : "Edit Metrics"}
            </button>
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {metricCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass group rounded-xl p-4 transition-all duration-300 hover:shadow-premium"
              >
                <div className="flex items-center gap-2">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br", card.color)}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{card.label}</span>
                </div>
                {editingMetrics ? (
                  <input
                    type="number"
                    value={Object.values(metrics)[i]}
                    onChange={(e) => {
                      const key = Object.keys(metrics)[i];
                      setMetrics((p) => ({ ...p, [key]: parseFloat(e.target.value) || 0 }));
                    }}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-2 py-1 text-lg font-bold text-foreground"
                  />
                ) : (
                  <p className="mt-2 font-heading text-xl font-bold text-foreground">{card.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        {analysis && analysis.insights && (
          <div>
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">
              AI Insights
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {analysis.insights.map((insight, i) => {
                const StatusIcon = statusIcons[insight.status] || CheckCircle2;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="glass rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn("h-4 w-4", statusColors[insight.status])} />
                      <span className="text-sm font-semibold text-foreground">{insight.category}</span>
                      <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", 
                        insight.status === "excellent" ? "bg-emerald-500/10 text-emerald-500" :
                        insight.status === "good" ? "bg-blue-500/10 text-blue-500" :
                        insight.status === "warning" ? "bg-amber-500/10 text-amber-500" :
                        "bg-red-500/10 text-red-500"
                      )}>
                        {insight.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{insight.message}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysis && analysis.recommendations && (
          <div className="glass rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              AI Recommendations
            </h2>
            <ul className="mt-4 space-y-3">
              {analysis.recommendations.map((rec, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {rec}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Meal Plan Preview */}
        {mealPlan && mealPlan.days && mealPlan.days[0] && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold text-foreground">
                Today&apos;s Meal Plan (Day 1)
              </h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {mealPlan.days[0].totalCalories} cal
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(mealPlan.days[0].meals).map(([key, meal], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{meal.calories} cal</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-foreground">{meal.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{meal.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href="/dashboard/meals"
                className="text-xs font-medium text-primary hover:underline"
              >
                View Full 7-Day Plan &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Loading states */}
        {(loading.analysis || loading.meal) && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm">AI is analyzing your data...</span>
            </div>
          </div>
        )}

        {/* Quick Actions — All Dashboard Features */}
        <div className="mt-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { href: "/dashboard/meals", label: "Meal Plan", emoji: "🍽️", color: "from-emerald-500 to-teal-500" },
              { href: "/dashboard/scan", label: "Body Scan", emoji: "📸", color: "from-blue-500 to-cyan-500" },
              { href: "/dashboard/food-scan", label: "Food Scan", emoji: "🥗", color: "from-green-500 to-emerald-600" },
              { href: "/dashboard/recommendations", label: "Product Recs", emoji: "🎯", color: "from-purple-500 to-pink-500" },
              { href: "/dashboard/report", label: "AI Report", emoji: "📊", color: "from-amber-500 to-orange-500" },
              { href: "/dashboard/habits", label: "Habit Tracker", emoji: "✅", color: "from-sky-500 to-blue-500" },
              { href: "/dashboard/challenges", label: "Challenges", emoji: "🏆", color: "from-orange-500 to-red-500" },
              { href: "/dashboard/progress", label: "Progress", emoji: "📈", color: "from-indigo-500 to-purple-500" },
              { href: "/dashboard/journal", label: "Journal", emoji: "📝", color: "from-pink-500 to-rose-500" },
              { href: "/dashboard/reminders", label: "Reminders", emoji: "🔔", color: "from-teal-500 to-emerald-500" },
              { href: "/dashboard/membership", label: "Membership", emoji: "💳", color: "from-slate-500 to-gray-600" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass group flex items-center gap-3 rounded-xl p-3 transition-all hover-lift"
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg", item.color)}>
                  {item.emoji}
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</span>
                  <ChevronRight className="inline ml-1 h-3 w-3 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
