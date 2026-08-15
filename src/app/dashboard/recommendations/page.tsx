"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  RefreshCw,
  ShoppingBag,
  Star,
  ChevronRight,
  Target,
  Zap,
  Heart,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductRec {
  slug: string;
  reason: string;
  match: number;
}

interface RecommendationResponse {
  recommendations: ProductRec[];
  provider: string;
}

// Product display data
const productInfo: Record<string, { name: string; image: string; price: string; category: string }> = {
  "formula-1-shake": { name: "Formula 1 Nutritional Shake", image: "🥤", price: "₹1,999", category: "Core Nutrition" },
  "herbal-tea-concentrate": { name: "Herbal Tea Concentrate", image: "🍵", price: "₹1,499", category: "Energy & Metabolism" },
  "protein-drink-mix": { name: "Protein Drink Mix", image: "💪", price: "₹2,199", category: "Protein" },
  "skin-collagen-booster": { name: "Skin Collagen Booster", image: "✨", price: "₹2,499", category: "Beauty & Skin" },
  "cell-activator": { name: "Cell Activator", image: "🧬", price: "₹1,299", category: "Cellular Health" },
  "aloe-vera-concentrate": { name: "Aloe Vera Concentrate", image: "🌿", price: "₹999", category: "Digestive Health" },
  "personalized-protein": { name: "Personalized Protein Powder", image: "⚡", price: "₹1,799", category: "Protein" },
  "total-control-tablets": { name: "Total Control Tablets", image: "💊", price: "₹1,599", category: "Weight Management" },
};

const goalOptions = [
  { value: "weight loss", label: "Weight Loss", icon: Target, color: "from-orange-500 to-red-500" },
  { value: "muscle gain", label: "Muscle Gain", icon: Zap, color: "from-purple-500 to-pink-500" },
  { value: "general wellness", label: "General Wellness", icon: Heart, color: "from-emerald-500 to-teal-500" },
  { value: "energy boost", label: "Energy Boost", icon: TrendingUp, color: "from-amber-500 to-yellow-500" },
];

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["general wellness"]);
  const [bmi, setBmi] = useState(24.5);
  const [bodyFat, setBodyFat] = useState(22);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  async function fetchRecommendations() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goals: selectedGoals,
          bmi,
          bodyFat,
          concerns: [],
        }),
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Recommendations error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              AI Product Recommendations
            </span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Personalized For You
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI analyzes your body metrics and goals to recommend the best products
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Goal Selector */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-heading text-sm font-semibold text-foreground mb-3">Select Your Goals</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {goalOptions.map((opt) => {
              const isSelected = selectedGoals.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleGoal(opt.value)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3 transition-all",
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  )}
                >
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br", opt.color)}>
                    <opt.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Metrics sliders */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>BMI</span>
                <span className="text-foreground font-semibold">{bmi}</span>
              </label>
              <input
                type="range"
                min="15"
                max="40"
                step="0.1"
                value={bmi}
                onChange={(e) => setBmi(parseFloat(e.target.value))}
                className="mt-1 w-full accent-primary"
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>Body Fat %</span>
                <span className="text-foreground font-semibold">{bodyFat}%</span>
              </label>
              <input
                type="range"
                min="5"
                max="45"
                step="0.5"
                value={bodyFat}
                onChange={(e) => setBodyFat(parseFloat(e.target.value))}
                className="mt-1 w-full accent-primary"
              />
            </div>
          </div>

          <button
            onClick={fetchRecommendations}
            disabled={loading || selectedGoals.length === 0}
            className="mt-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25 disabled:opacity-60"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            Get AI Recommendations
          </button>
        </div>

        {/* Recommendations */}
        {recommendations && recommendations.recommendations && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Recommended Products
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                via {recommendations.provider}
              </span>
            </h2>

            {recommendations.recommendations.map((rec, i) => {
              const product = productInfo[rec.slug] || {
                name: rec.slug,
                image: "📦",
                price: "—",
                category: "Product",
              };
              return (
                <motion.div
                  key={rec.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass group rounded-2xl p-5 hover-lift"
                >
                  <div className="flex items-start gap-4">
                    {/* Product icon */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-3xl">
                      {product.image}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                          <Star className="h-2.5 w-2.5 fill-current" />
                          {rec.match}% match
                        </div>
                      </div>
                      <h3 className="mt-1 font-heading text-base font-bold text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {rec.reason}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-heading text-lg font-bold text-primary">{product.price}</span>
                        <Link
                          href="/products"
                          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          View Product <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Match meter */}
                    <div className="hidden sm:flex flex-col items-center gap-1">
                      <div className="relative h-20 w-3 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${rec.match}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                          className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-emerald-500 to-teal-400"
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-muted-foreground">{rec.match}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm">AI is finding your perfect products...</span>
            </div>
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
