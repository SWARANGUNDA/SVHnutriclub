"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, FileText, Camera, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OcrResult {
  weight?: number;
  height?: number;
  bmi?: number;
  bmr?: number;
  bodyFat?: number;
  muscleMass?: number;
  visceralFat?: number;
  waterPercent?: number;
  boneMass?: number;
  metabolicAge?: number;
}

// Mock OCR extraction (simulates AI processing)
function mockExtractMetrics(): OcrResult {
  return {
    weight: 72.5,
    height: 170,
    bmi: 25.1,
    bmr: 1620,
    bodyFat: 24.3,
    muscleMass: 38.7,
    visceralFat: 9,
    waterPercent: 52.4,
    boneMass: 2.9,
    metabolicAge: 30,
  };
}

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<OcrResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [step, setStep] = useState<"upload" | "processing" | "results">("upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selected);
  };

  const handleScan = async () => {
    if (!file) return;
    setStep("processing");
    setProcessing(true);

    // Simulate AI OCR processing
    await new Promise((r) => setTimeout(r, 2500));
    const extracted = mockExtractMetrics();
    setResult(extracted);
    try {
      const response = await fetch("/api/body-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...extracted, source: "ocr-upload" }),
      });
      if (!response.ok) {
        const payload = await response.json();
        setSaveError(payload.error || "Metrics could not be saved.");
      }
    } catch {
      setSaveError("Metrics could not be saved. Please try again later.");
    }
    setProcessing(false);
    setStep("results");
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setSaveError("");
    setStep("upload");
  };

  const metricLabels: Record<string, string> = {
    weight: "Weight (kg)",
    height: "Height (cm)",
    bmi: "BMI",
    bmr: "BMR (cal)",
    bodyFat: "Body Fat (%)",
    muscleMass: "Muscle Mass (%)",
    visceralFat: "Visceral Fat",
    waterPercent: "Water (%)",
    boneMass: "Bone Mass (kg)",
    metabolicAge: "Metabolic Age",
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">OCR Body Report</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Scan Your Body Report
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a smart scale screenshot or body composition report — AI extracts your metrics automatically
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Step: Upload */}
        {step === "upload" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              onClick={() => fileRef.current?.click()}
              className={cn(
                "glass cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all hover:border-primary/50",
                preview ? "border-primary/30" : "border-border"
              )}
            >
              {preview ? (
                <div className="space-y-4">
                  <img src={preview} alt="Report preview" className="mx-auto max-h-64 rounded-xl object-contain" />
                  <p className="text-sm font-medium text-foreground">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">Click to change file</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Upload Body Report</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Drag & drop or click — supports PNG, JPG, PDF
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Camera className="h-3 w-3" /> Screenshot</span>
                    <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> PDF Report</span>
                  </div>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleFileSelect} className="hidden" />
            </div>

            {file && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleScan}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25"
              >
                <Sparkles className="h-4 w-4" />
                Analyze with AI
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Step: Processing */}
        {step === "processing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <h2 className="mt-4 font-heading text-xl font-bold text-foreground">Analyzing Report...</h2>
            <p className="mt-2 text-sm text-muted-foreground">AI is extracting body metrics from your report</p>
            <div className="mt-6 mx-auto max-w-xs">
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step: Results */}
        {step === "results" && result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">Extraction Complete</h2>
                  <p className="text-xs text-muted-foreground">10 metrics extracted from your report</p>
                </div>
              </div>
            </div>
            {saveError && <p className="text-sm text-amber-600">{saveError}</p>}

            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
              {Object.entries(result).filter(([, v]) => v != null).map(([key, value], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-4"
                >
                  <p className="text-xs font-medium text-muted-foreground">{metricLabels[key] || key}</p>
                  <p className="mt-1 font-heading text-xl font-bold text-foreground">{value}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg"
              >
                View Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleReset}
                className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                Scan Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Info note */}
        <div className="mt-8 flex items-start gap-3 rounded-xl bg-muted/50 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            <strong>Privacy:</strong> Your report is processed locally and not stored on our servers. 
            Only the extracted metrics are saved to your profile for wellness tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
