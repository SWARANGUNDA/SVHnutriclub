"use client";

import { useState, useEffect } from "react";
import { Sparkles, UtensilsCrossed, Plus, Search, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NutritionLog {
  id: string;
  mealType: string;
  foodName: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  date: string;
}

export default function NutritionPage() {
  const [logs, setLogs] = useState<NutritionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showManualLog, setShowManualLog] = useState(false);
  const [newLog, setNewLog] = useState({ mealType: "BREAKFAST", foodName: "", calories: "", protein: "", carbs: "", fats: "" });

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    try {
      const res = await fetch("/api/nutrition");
      const data = await res.json();
      if (data.logs) setLogs(data.logs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLog(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLog),
      });
      if (res.ok) {
        setShowManualLog(false);
        setNewLog({ mealType: "BREAKFAST", foodName: "", calories: "", protein: "", carbs: "", fats: "" });
        fetchLogs();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/nutrition/${id}`, { method: "DELETE" });
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  }

  const totalCalories = logs.reduce((sum, log) => sum + (log.calories || 0), 0);
  const totalProtein = logs.reduce((sum, log) => sum + (log.protein || 0), 0);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Intake</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Nutrition Diary</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log your meals and track your macros.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        <div className="flex gap-4">
          <Link href="/dashboard/scanner" className="flex-1 glass rounded-2xl p-6 text-center hover:ring-1 hover:ring-primary/50 transition-all group">
            <Search className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading font-bold text-foreground">AI Food Scanner</h3>
            <p className="text-xs text-muted-foreground mt-1">Scan a photo to log instantly</p>
          </Link>
          <div onClick={() => setShowManualLog(!showManualLog)} className="flex-1 glass rounded-2xl p-6 text-center cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all group">
            <Plus className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading font-bold text-foreground">Manual Log</h3>
            <p className="text-xs text-muted-foreground mt-1">Search food database</p>
          </div>
        </div>

        {showManualLog && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleAddLog} className="glass rounded-2xl p-6 border border-border">
            <h3 className="font-bold mb-4">Add Nutrition Log</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground">Meal Type</label>
                <select value={newLog.mealType} onChange={e => setNewLog({...newLog, mealType: e.target.value})} className="w-full bg-background rounded-lg border border-border px-3 py-2 text-sm">
                  <option>BREAKFAST</option><option>LUNCH</option><option>DINNER</option><option>SNACK</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Food Name</label>
                <input required placeholder="e.g. Grilled Chicken" value={newLog.foodName} onChange={e => setNewLog({...newLog, foodName: e.target.value})} className="w-full bg-background rounded-lg border border-border px-3 py-2 text-sm" />
              </div>
              <div><label className="text-xs text-muted-foreground">Calories (kcal)</label><input type="number" value={newLog.calories} onChange={e => setNewLog({...newLog, calories: e.target.value})} className="w-full bg-background rounded-lg border border-border px-3 py-2 text-sm" /></div>
              <div><label className="text-xs text-muted-foreground">Protein (g)</label><input type="number" step="0.1" value={newLog.protein} onChange={e => setNewLog({...newLog, protein: e.target.value})} className="w-full bg-background rounded-lg border border-border px-3 py-2 text-sm" /></div>
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold">Save Log</button>
          </motion.form>
        )}

        {loading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
        ) : logs.length === 0 ? (
          <div className="glass glow-green rounded-3xl p-8 border border-border text-center">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-bold text-foreground mb-1">No Meals Logged Today</h3>
            <p className="text-muted-foreground text-sm">Add your first meal to see your daily macro breakdown.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-4 flex justify-between items-center bg-primary/10 border-primary/20">
              <span className="font-bold">Today's Summary</span>
              <div className="flex gap-4 text-sm">
                <span><strong className="text-emerald-500">{totalCalories}</strong> kcal</span>
                <span><strong className="text-primary">{totalProtein}g</strong> Protein</span>
              </div>
            </div>
            {logs.map((log) => (
              <div key={log.id} className="glass rounded-xl p-4 flex justify-between items-center border border-border/50">
                <div>
                  <div className="text-xs text-primary font-bold mb-1">{log.mealType}</div>
                  <div className="font-bold text-foreground">{log.foodName}</div>
                  <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                    <span>{log.calories || 0} kcal</span>
                    <span>{log.protein || 0}g protein</span>
                    <span>{log.carbs || 0}g carbs</span>
                    <span>{log.fats || 0}g fat</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(log.id)} className="text-muted-foreground hover:text-red-500 p-2">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
