"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Edit3, ArrowRight, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

type ScanStep = "SELECTION" | "UPLOAD" | "MANUAL_ENTRY" | "REVIEW" | "ANALYSIS";

export default function BodyScanPage() {
  const [step, setStep] = useState<ScanStep>("SELECTION");
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  // Mock state for form data
  const [metrics, setMetrics] = useState({
    weight: "",
    height: "",
    bmi: "",
    bodyFat: "",
    muscleMass: "",
    visceralFat: "",
    waterPercent: "",
    metabolicAge: "",
  });

  const handleFakeUpload = () => {
    setIsProcessingOCR(true);
    setStep("UPLOAD");
    
    // Simulate OCR processing time
    setTimeout(() => {
      setMetrics({
        weight: "72.5",
        height: "178",
        bmi: "22.9",
        bodyFat: "18.5",
        muscleMass: "55.2",
        visceralFat: "6",
        waterPercent: "58.2",
        metabolicAge: "28",
      });
      setIsProcessingOCR(false);
      setStep("REVIEW");
    }, 2500);
  };

  const handleSaveAndAnalyze = () => {
    setStep("ANALYSIS");
    setIsGeneratingAnalysis(true);

    // Simulate AI analysis time
    setTimeout(() => {
      setIsGeneratingAnalysis(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Understand Your Body
        </h1>
        <p className="mt-2 text-muted-foreground">
          Upload your latest body composition report or enter your measurements manually.
        </p>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SELECTION */}
          {step === "SELECTION" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <button
                onClick={handleFakeUpload}
                className="group flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-10 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Upload Report</h3>
                  <p className="mt-1 text-sm text-muted-foreground">PDF or Image (Karada Scan, InBody, etc.)</p>
                </div>
              </button>

              <button
                onClick={() => setStep("MANUAL_ENTRY")}
                className="group flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-10 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-transform group-hover:scale-110">
                  <Edit3 className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Enter Manually</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Type in your measurements directly</p>
                </div>
              </button>
            </motion.div>
          )}

          {/* STEP 2: UPLOAD PROCESSING */}
          {step === "UPLOAD" && isProcessingOCR && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-20 text-center shadow-sm"
            >
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-2 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <ScanLineIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-8 font-heading text-xl font-bold text-foreground">Extracting Data</h3>
              <p className="mt-2 text-muted-foreground">Our AI is reading your body composition report...</p>
            </motion.div>
          )}

          {/* STEP 3: REVIEW / MANUAL ENTRY */}
          {(step === "REVIEW" || step === "MANUAL_ENTRY") && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl border border-border bg-card shadow-sm"
            >
              <div className="border-b border-border p-6 sm:p-8">
                <div className="flex items-center gap-3 rounded-lg bg-orange-500/10 p-4 text-orange-500">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">
                    {step === "REVIEW" 
                      ? "Please verify the extracted numbers carefully before saving. AI extraction is an estimate." 
                      : "Enter your body metrics accurately for the best AI guidance."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <InputField label="Weight (kg)" value={metrics.weight} onChange={(v) => setMetrics({...metrics, weight: v})} />
                <InputField label="Height (cm)" value={metrics.height} onChange={(v) => setMetrics({...metrics, height: v})} />
                <InputField label="Body Fat (%)" value={metrics.bodyFat} onChange={(v) => setMetrics({...metrics, bodyFat: v})} />
                <InputField label="Muscle Mass (kg)" value={metrics.muscleMass} onChange={(v) => setMetrics({...metrics, muscleMass: v})} />
                <InputField label="Visceral Fat" value={metrics.visceralFat} onChange={(v) => setMetrics({...metrics, visceralFat: v})} />
                <InputField label="Water (%)" value={metrics.waterPercent} onChange={(v) => setMetrics({...metrics, waterPercent: v})} />
                <InputField label="Metabolic Age" value={metrics.metabolicAge} onChange={(v) => setMetrics({...metrics, metabolicAge: v})} />
                <InputField label="BMI" value={metrics.bmi} onChange={(v) => setMetrics({...metrics, bmi: v})} />
              </div>

              <div className="flex items-center justify-between border-t border-border bg-muted/20 p-6 sm:p-8">
                <button 
                  onClick={() => setStep("SELECTION")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveAndAnalyze}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  Confirm & Analyze
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AI ANALYSIS */}
          {step === "ANALYSIS" && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-primary/20 bg-card p-8 shadow-lg shadow-primary/5"
            >
              {isGeneratingAnalysis ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">SVH Intelligence is thinking...</h3>
                  <p className="mt-2 text-muted-foreground">Analyzing your body composition and calculating your health score.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4 border-b border-border pb-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <span className="font-heading text-2xl font-bold text-emerald-500">84</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">Excellent Progress!</h3>
                      <p className="text-sm text-muted-foreground">Your Wellness Score is in the top 15% for your age group.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <AnalysisRow 
                      title="Visceral Fat (6)" 
                      status="good"
                      desc="Your visceral fat is in a very healthy range. This significantly lowers your risk of metabolic diseases." 
                    />
                    <AnalysisRow 
                      title="Body Fat (18.5%)" 
                      status="warning"
                      desc="You are approaching your goal of 15%. To accelerate this, we recommend slightly increasing protein intake and adding 1 more resistance session." 
                    />
                    <AnalysisRow 
                      title="Metabolic Age (28)" 
                      status="good"
                      desc="Fantastic! Your body is metabolically 4 years younger than your chronological age." 
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link 
                      href="/dashboard/wellness"
                      className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      View Full Wellness Profile
                    </Link>
                    <Link 
                      href="/dashboard/nutrition"
                      className="flex-1 rounded-xl border border-border bg-transparent px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      Update Meal Plan
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper components
function ScanLineIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 7 3 3 7 3"/>
      <polyline points="17 3 21 3 21 7"/>
      <polyline points="21 17 21 21 17 21"/>
      <polyline points="7 21 3 21 3 17"/>
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function AnalysisRow({ title, desc, status }: { title: string, desc: string, status: "good" | "warning" }) {
  return (
    <div className="flex gap-4 rounded-xl bg-muted/30 p-4">
      <div className="mt-0.5 shrink-0">
        {status === "good" ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-orange-500" />
        )}
      </div>
      <div>
        <h4 className="font-heading text-sm font-bold text-foreground">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
