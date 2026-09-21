"use client";

import { useState, useEffect } from "react";
import { Sparkles, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { ThreeBodyModel } from "@/components/ui/ThreeBodyModel";

export default function ThreeBodyPage() {
  const [metrics, setMetrics] = useState({ bodyFat: 20, visceralFat: 8, muscleMass: 40, score: 85 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestMetric() {
      try {
        const res = await fetch("/api/body-metrics");
        const data = await res.json();
        if (data.metric) {
          setMetrics({
            bodyFat: data.metric.bodyFat || 20,
            visceralFat: data.metric.visceralFat || 8,
            muscleMass: data.metric.muscleMass || 40,
            score: data.metric.healthScore || 85
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestMetric();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Visualization</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Personalized 3D Body</h1>
          <p className="mt-1 text-sm text-muted-foreground">A visual representation of your body composition and metrics.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="glass glow-green rounded-3xl p-6 border border-border min-h-[500px] flex flex-col justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Loading your 3D visualization...</p>
            </div>
          ) : (
            <>
              <ThreeBodyModel metrics={metrics} />
              
              <div className="mt-6 flex justify-between items-center text-sm border-t border-border/50 pt-4">
                <p className="text-muted-foreground">This model dynamically scales based on your latest scan data.</p>
                <Link href="/dashboard/progress" className="text-primary hover:underline flex items-center gap-1 font-medium">
                  View Metrics History <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
