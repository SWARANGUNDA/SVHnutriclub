"use client";

import { useState, useEffect } from "react";
import { Sparkles, Target, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");
      if (res.ok) {
        const data = await res.json();
        setGoals(data.goals || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setCreating(true);
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, targetValue: newTarget, type: "GENERAL" })
      });
      if (res.ok) {
        setNewTitle("");
        setNewTarget("");
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const completeGoal = async (id: string) => {
    try {
      const res = await fetch(`/api/goals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" })
      });
      if (res.ok) fetchGoals();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Targets</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">My Goals</h1>
          <p className="mt-1 text-sm text-muted-foreground">Set, track, and achieve your wellness milestones.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Create Form */}
        <form onSubmit={createGoal} className="glass rounded-2xl p-6 border border-border flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Goal Title (e.g. Lose 5kg)" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary"
            required
          />
          <input 
            type="number" 
            placeholder="Target Value" 
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            className="sm:w-32 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button disabled={creating} type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 disabled:opacity-50">
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add Goal
          </button>
        </form>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="font-heading text-xl font-bold text-foreground">Active Goals</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : goals.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center border border-border">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-heading text-lg font-bold text-foreground mb-1">No Active Goals</h3>
            <p className="text-muted-foreground text-sm">Create your first wellness target to start tracking progress.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {goals.filter(g => g.status === 'ACTIVE').map(goal => (
              <div key={goal.id} className="glass glow-green rounded-2xl p-6 flex justify-between items-center border border-border transition-all hover:border-primary/50">
                <div>
                  <h4 className="font-bold text-lg text-foreground">{goal.title}</h4>
                  {goal.targetValue && (
                    <p className="text-sm text-muted-foreground mt-1">Target: {goal.targetValue} {goal.unit}</p>
                  )}
                </div>
                <button 
                  onClick={() => completeGoal(goal.id)}
                  className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-colors group"
                >
                  <CheckCircle2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
