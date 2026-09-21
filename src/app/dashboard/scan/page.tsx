"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, FileText, CheckCircle2, ChevronRight, UploadCloud, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [uploadState, setUploadState] = useState<"idle" | "scanning" | "review">("idle");
  
  // Form State
  const [metrics, setMetrics] = useState({
    weight: "",
    height: "",
    bodyFat: "",
    visceralFat: "",
    muscleMass: "",
    waterPercent: "",
    metabolicAge: "",
  });

  const [aiExplanation, setAiExplanation] = useState<{
    summary: string;
    metrics: { name: string; value: string; range: string; status: "good" | "warning" | "critical"; explanation: string }[];
  } | null>(null);
  
  const [language, setLanguage] = useState("EN");

  const handleMockUpload = async () => {
    setUploadState("scanning");
    try {
      const res = await fetch("/api/scan/upload", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.extractedData) {
        setMetrics({
          weight: data.extractedData.weight || "",
          height: data.extractedData.height || "",
          bodyFat: data.extractedData.bodyFat || "",
          visceralFat: data.extractedData.visceralFat || "",
          muscleMass: data.extractedData.muscleMass || "",
          waterPercent: data.extractedData.waterPercent || "",
          metabolicAge: data.extractedData.metabolicAge || "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadState("review");
    }
  };

  const handleSaveAndAnalyze = async () => {
    setUploadState("scanning");
    try {
      // 1. Save Metrics
      const saveRes = await fetch("/api/body-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight: parseFloat(metrics.weight),
          height: parseFloat(metrics.height),
          bodyFat: parseFloat(metrics.bodyFat),
          visceralFat: parseFloat(metrics.visceralFat),
          muscleMass: parseFloat(metrics.muscleMass),
          waterPercent: parseFloat(metrics.waterPercent),
          metabolicAge: parseInt(metrics.metabolicAge)
        })
      });

      if (!saveRes.ok) throw new Error("Failed to save metrics");

      // 2. Fetch Analysis
      const analysisRes = await fetch("/api/body-metrics/analysis");
      const analysisData = await analysisRes.json();
      
      if (analysisRes.ok && analysisData.analysis) {
        setAiExplanation({
          summary: analysisData.analysis.summary,
          metrics: analysisData.analysis.metrics
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadState("idle");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary mb-4 inline-block flex items-center gap-1">
            <ChevronRight className="h-4 w-4 rotate-180" /> Back to Dashboard
          </Link>
          <h1 className="font-heading text-3xl font-bold text-foreground">Body Composition Scan</h1>
          <p className="mt-2 text-muted-foreground">Upload your scan results or enter them manually for AI wellness analysis.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex rounded-xl bg-muted/50 p-1">
          <button
            onClick={() => setActiveTab("upload")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all",
              activeTab === "upload" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Camera className="h-4 w-4" /> Smart Upload (OCR)
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all",
              activeTab === "manual" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="h-4 w-4" /> Manual Entry
          </button>
        </div>

        {/* Content Area */}
        <div className="glass glow-green rounded-3xl p-6 sm:p-8">
          
          {activeTab === "upload" && uploadState === "idle" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border/50 rounded-2xl bg-background/30 hover:bg-background/50 transition-colors cursor-pointer" onClick={handleMockUpload}>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Upload Scan Document</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">Drag and drop your smart scale screenshot, PDF, or image here. Our AI will automatically extract the values.</p>
              <button className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                Browse Files
              </button>
            </motion.div>
          )}

          {uploadState === "scanning" && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6" />
              <h3 className="text-lg font-bold text-foreground">AI is analyzing your data...</h3>
              <p className="mt-2 text-sm text-muted-foreground">Extracting body metrics and computing health scores.</p>
            </div>
          )}

          {(activeTab === "manual" || uploadState === "review") && !aiExplanation && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {uploadState === "review" && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">Data extracted successfully! Please review and confirm the values below.</p>
                </div>
              )}
              
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: "weight", label: "Weight (kg)", placeholder: "e.g., 75.5" },
                  { id: "height", label: "Height (cm)", placeholder: "e.g., 175" },
                  { id: "bodyFat", label: "Body Fat (%)", placeholder: "e.g., 22.4" },
                  { id: "visceralFat", label: "Visceral Fat (1-59)", placeholder: "e.g., 8" },
                  { id: "muscleMass", label: "Muscle Mass (%)", placeholder: "e.g., 42.1" },
                  { id: "waterPercent", label: "Water (%)", placeholder: "e.g., 55.2" },
                  { id: "metabolicAge", label: "Metabolic Age (yrs)", placeholder: "e.g., 28" },
                ].map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{field.label}</label>
                    <input
                      type="number"
                      value={metrics[field.id as keyof typeof metrics]}
                      onChange={(e) => setMetrics({ ...metrics, [field.id]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">AI Language:</span>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground outline-none"
                  >
                    <option value="EN">English</option>
                    <option value="TE">Telugu (తెలుగు)</option>
                    <option value="HI">Hindi (हिंदी)</option>
                  </select>
                </div>
                
                <button 
                  onClick={handleSaveAndAnalyze}
                  className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
                >
                  Save & Generate AI Analysis
                </button>
              </div>
            </motion.div>
          )}

          {/* AI Explanation Result */}
          {aiExplanation && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">AI Wellness Analysis</h3>
                  <p className="text-sm text-muted-foreground">Personalized insights based on your recent scan</p>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/30 p-5 border border-border">
                <p className="text-sm leading-relaxed text-foreground">{aiExplanation.summary}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">Detailed Metrics</h4>
                {aiExplanation.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 rounded-xl bg-background/50 p-4 border border-border/50">
                    <div className="sm:w-1/3">
                      <div className="flex items-center gap-2">
                        {m.status === "good" ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
                        <span className="font-bold text-foreground">{m.name}</span>
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-foreground">{m.value}</span>
                        <span className="text-xs text-muted-foreground">Ref: {m.range}</span>
                      </div>
                    </div>
                    <div className="sm:w-2/3 flex items-center">
                      <p className="text-sm text-muted-foreground">{m.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-muted-foreground mt-8 text-center max-w-2xl mx-auto opacity-70">
                <strong>Wellness Disclaimer:</strong> This AI analysis is for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making significant changes to your diet or exercise routine.
              </div>

              <div className="flex justify-center pt-4">
                <Link href="/dashboard" className="rounded-full bg-primary/10 px-8 py-3 text-sm font-bold text-primary hover:bg-primary/20 transition-colors">
                  Return to Dashboard
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
