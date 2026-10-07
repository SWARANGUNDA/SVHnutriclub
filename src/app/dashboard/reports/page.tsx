"use client";

import { Download, Share2, Sparkles, Image as ImageIcon, FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Reports & Transformations
        </h1>
        <p className="mt-2 text-muted-foreground">
          Generate professional AI health reports and shareable transformation cards.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Transformation Card Generator */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-bold text-foreground">Transformation Card</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              SVH AI automatically stitches your starting metrics and current metrics into a highly shareable social media graphic.
            </p>

            {/* Mock Output Card */}
            <div className="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white border border-zinc-800">
              <div className="absolute right-0 top-0 h-32 w-32 bg-primary/20 blur-[50px]" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="font-heading text-xs font-bold tracking-widest text-primary uppercase">SVH Nutrition Club</span>
                <h3 className="mt-2 font-heading text-2xl font-bold">12-Week Transformation</h3>
                
                <div className="mt-6 flex w-full justify-around border-t border-zinc-800 pt-6">
                  <div>
                    <p className="text-xs uppercase text-zinc-400">Day 1</p>
                    <p className="font-heading text-xl font-bold mt-1">26.5% <span className="text-xs font-normal text-zinc-500">Fat</span></p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-500 uppercase">
                      -8.0% Body Fat
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-zinc-400">Today</p>
                    <p className="font-heading text-xl font-bold mt-1 text-primary">18.5% <span className="text-xs font-normal text-zinc-500">Fat</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-semibold text-background hover:opacity-90">
                <Download className="h-4 w-4" /> Download 
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground hover:bg-muted">
                <Share2 className="h-4 w-4" /> Share to Instagram
              </button>
            </div>
          </div>
        </div>

        {/* AI Health Reports */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <h2 className="font-heading text-xl font-bold text-foreground">AI Health Reports</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Download comprehensive PDF reports detailing your metabolic changes, macro adherence, and AI-predicted outcomes. Perfect for sharing with your doctor or Associate.
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-orange-500/10 p-2 text-orange-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">September 2026 Summary</h4>
                    <p className="text-xs text-muted-foreground">Generated Oct 1, 2026</p>
                  </div>
                </div>
                <button className="text-primary hover:underline text-sm font-semibold">Download PDF</button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-orange-500/10 p-2 text-orange-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">August 2026 Summary</h4>
                    <p className="text-xs text-muted-foreground">Generated Sep 1, 2026</p>
                  </div>
                </div>
                <button className="text-primary hover:underline text-sm font-semibold">Download PDF</button>
              </div>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-3 text-sm font-semibold text-primary hover:bg-primary/10">
              <Sparkles className="h-4 w-4" /> Generate New Report Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
