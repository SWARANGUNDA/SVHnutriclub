"use client";

import { useState, useEffect } from "react";
import { Sparkles, Map, Calendar, Loader2 } from "lucide-react";

export default function PlanPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const res = await fetch("/api/plan");
      if (res.ok) {
        const data = await res.json();
        setPlan(data.plan || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generatePlan = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/plan", { method: "POST" });
      if (res.ok) fetchPlan();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Strategy</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">AI Wellness Plan</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your personalized roadmap to achieve your goals.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-xl font-bold text-foreground">Current Plan</h2>
          <button 
            onClick={generatePlan}
            disabled={generating}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} 
            Generate New Plan
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : !plan ? (
          <div className="glass rounded-3xl p-10 text-center border border-border">
            <Map className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-bold text-foreground mb-1">No Active Plan</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Generate an AI wellness plan based on your profile, goals, and latest body scan.
            </p>
          </div>
        ) : (
          <div className="glass glow-green rounded-3xl p-6 sm:p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="font-heading text-xl font-bold text-foreground">{plan.title}</h3>
            </div>
            
            <p className="text-muted-foreground mb-8 border-b border-border pb-6">{plan.planData?.summary}</p>
            
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-foreground">Daily Schedule</h4>
              {plan.planData?.dailySchedule?.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                  <div className="font-bold text-primary whitespace-nowrap">{item.time}</div>
                  <div className="text-foreground">{item.activity}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-heading font-bold text-foreground mb-3">Key Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {plan.planData?.focusAreas?.map((area: string, i: number) => (
                  <span key={i} className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
