"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, Activity, ScanLine, Layers, TrendingDown } from "lucide-react";
import { Body3DViewer } from "@/components/dashboard/Body3DViewer";

// Mock historical data
const TIMELINE_DATA = [
  {
    id: "t1",
    date: "Jan 1, 2026",
    label: "START",
    metrics: { weight: 82, bodyFat: 26.5, muscleMass: 52.1, visceralFat: 9 },
    notes: "Initial consultation. Goal set to reduce body fat.",
  },
  {
    id: "t2",
    date: "Feb 15, 2026",
    label: "WEEK 6",
    metrics: { weight: 78.5, bodyFat: 23.2, muscleMass: 53.0, visceralFat: 8 },
    notes: "Consistent with meal plan. Hydration improved.",
  },
  {
    id: "t3",
    date: "Mar 30, 2026",
    label: "WEEK 12",
    metrics: { weight: 75.2, bodyFat: 20.8, muscleMass: 54.5, visceralFat: 7 },
    notes: "Added strength training. Muscle mass increasing.",
  },
  {
    id: "t4",
    date: "Today",
    label: "CURRENT",
    metrics: { weight: 72.5, bodyFat: 18.5, muscleMass: 55.2, visceralFat: 6 },
    notes: "Excellent progress. Visceral fat in very healthy range.",
  },
];

export default function ProgressPage() {
  const [selectedIndex, setSelectedIndex] = useState(TIMELINE_DATA.length - 1);
  const [showVisceral, setShowVisceral] = useState(false);
  
  const currentEntry = TIMELINE_DATA[selectedIndex];

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100vh-10rem)] lg:flex-row">
      
      {/* LEFT PANE: 3D VIEWER */}
      <div className="flex flex-col rounded-3xl border border-border bg-card shadow-sm lg:w-3/5">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Body Visualization</h2>
            <p className="text-sm text-muted-foreground">Reacts to your historical metrics</p>
          </div>
          
          <button
            onClick={() => setShowVisceral(!showVisceral)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              showVisceral 
                ? "border-destructive/50 bg-destructive/10 text-destructive" 
                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            <Layers className="h-4 w-4" />
            X-Ray Mode
          </button>
        </div>
        
        <div className="relative flex-1 p-4">
          <Body3DViewer 
            bodyFat={currentEntry.metrics.bodyFat}
            muscleMass={currentEntry.metrics.muscleMass}
            visceralFat={currentEntry.metrics.visceralFat}
            showVisceral={showVisceral}
          />
        </div>
        
        <div className="border-t border-border bg-muted/20 p-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weight</div>
              <div className="mt-1 font-heading text-xl font-bold text-foreground">{currentEntry.metrics.weight} <span className="text-sm font-normal text-muted-foreground">kg</span></div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Body Fat</div>
              <div className="mt-1 font-heading text-xl font-bold text-foreground">{currentEntry.metrics.bodyFat} <span className="text-sm font-normal text-muted-foreground">%</span></div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Muscle</div>
              <div className="mt-1 font-heading text-xl font-bold text-foreground">{currentEntry.metrics.muscleMass} <span className="text-sm font-normal text-muted-foreground">kg</span></div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visceral</div>
              <div className="mt-1 font-heading text-xl font-bold text-foreground">{currentEntry.metrics.visceralFat}</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: TIMELINE */}
      <div className="flex flex-col gap-6 lg:w-2/5">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-8">
            <h2 className="font-heading text-xl font-bold text-foreground">Transformation Timeline</h2>
            <p className="text-sm text-muted-foreground">Select a milestone to view body changes</p>
          </div>

          <div className="relative border-l-2 border-muted pl-6 pb-4">
            {TIMELINE_DATA.map((entry, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div key={entry.id} className="relative mb-10 last:mb-0">
                  {/* Timeline Node */}
                  <div 
                    className={`absolute -left-[35px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-card transition-colors ${
                      isSelected ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  
                  <button 
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex w-full flex-col items-start text-left transition-opacity ${isSelected ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">{entry.label}</span>
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3"/> {entry.date}</span>
                    </div>
                    
                    <div className={`mt-2 w-full rounded-xl border p-4 transition-colors ${isSelected ? "border-primary/50 bg-primary/5" : "border-border bg-background"}`}>
                      <p className="text-sm text-foreground">{entry.notes}</p>
                      {idx > 0 && (
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-500">
                          <TrendingDown className="h-3 w-3" />
                          Body fat -{(TIMELINE_DATA[idx-1].metrics.bodyFat - entry.metrics.bodyFat).toFixed(1)}% since last scan
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6">
          <div className="mb-2 flex items-center gap-2">
            <ScanLine className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-bold text-foreground">SVH Progress AI</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Based on your timeline trajectory, you are on track to hit your 15% body fat goal by mid-June. Your muscle preservation during weight loss has been highly effective.
          </p>
        </div>
      </div>

    </div>
  );
}
