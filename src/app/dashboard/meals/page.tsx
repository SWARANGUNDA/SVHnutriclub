"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Utensils,
  Sparkles,
  RefreshCw,
  Flame,
  Droplets,
  Zap,
  ChevronRight,
  Apple,
  Coffee,
  Moon,
  Sun,
  Sunset,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  description: string;
}

interface MealPlan {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  hydration: number;
  meals: Record<string, MealItem>;
  tips: string[];
  provider: string;
}

import { LucideIcon } from "lucide-react";

const mealIcons: Record<string, LucideIcon> = {
  breakfast: Sun,
  midMorning: Coffee,
  lunch: Utensils,
  evening: Sunset,
  dinner: Moon,
  bedtime: Moon,
};

const goalOptions = [
  { value: "weight loss", label: "Weight Loss", icon: "🔥" },
  { value: "muscle gain", label: "Muscle Gain", icon: "💪" },
  { value: "general wellness", label: "General Wellness", icon: "🌿" },
  { value: "energy boost", label: "Energy Boost", icon: "⚡" },
];

export default function MealsPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState("general wellness");
  const [activityLevel, setActivityLevel] = useState("moderate");

  useEffect(() => {
    generateMealPlan();
  }, []);

  async function generateMealPlan() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, activityLevel }),
      });
      const data = await res.json();
      setMealPlan(data);
    } catch (err) {
      console.error("Meal plan error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI Meal Generator</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Personalized Meal Plan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated vegetarian nutrition plan tailored to your goals
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Goal Selector */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-heading text-sm font-semibold text-foreground">Your Goal</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {goalOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setGoal(opt.value)}
                className={cn(
                  "rounded-xl border-2 p-3 text-left transition-all",
                  goal === opt.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                )}
              >
                <span className="text-xl">{opt.icon}</span>
                <p className="mt-1 text-sm font-semibold text-foreground">{opt.label}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderate</option>
              <option value="active">Very Active</option>
            </select>
            <button
              onClick={generateMealPlan}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25 disabled:opacity-60"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Generate Plan
            </button>
          </div>
        </div>

        {/* Macros Summary */}
        {mealPlan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3 grid-cols-2 sm:grid-cols-5">
            {[
              { label: "Calories", value: mealPlan.calories, unit: "cal", icon: Flame, color: "from-amber-500 to-orange-500" },
              { label: "Protein", value: `${mealPlan.protein}g`, unit: "", icon: Zap, color: "from-purple-500 to-pink-500" },
              { label: "Carbs", value: `${mealPlan.carbs}g`, unit: "", icon: Apple, color: "from-emerald-500 to-teal-500" },
              { label: "Fats", value: `${mealPlan.fats}g`, unit: "", icon: Sun, color: "from-yellow-500 to-amber-500" },
              { label: "Hydration", value: `${mealPlan.hydration}L`, unit: "", icon: Droplets, color: "from-sky-500 to-blue-500" },
            ].map((macro, i) => (
              <motion.div key={macro.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 text-center">
                <div className={cn("mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", macro.color)}>
                  <macro.icon className="h-5 w-5 text-white" />
                </div>
                <p className="mt-2 font-heading text-xl font-bold text-foreground">{macro.value}{macro.unit}</p>
                <p className="text-xs text-muted-foreground">{macro.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Meals Grid */}
        {mealPlan && mealPlan.meals && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(mealPlan.meals).map(([key, meal], i) => {
              const Icon = mealIcons[key] || Utensils;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="glass rounded-2xl p-5 hover-lift"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <p className="text-sm font-semibold text-foreground">{meal.name}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{meal.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-amber-500" />{meal.calories} cal</span>
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-purple-500" />{meal.protein}g protein</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tips */}
        {mealPlan && mealPlan.tips && (
          <div className="glass rounded-2xl p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">💡 Nutrition Tips</h2>
            <ul className="mt-3 space-y-2">
              {mealPlan.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
