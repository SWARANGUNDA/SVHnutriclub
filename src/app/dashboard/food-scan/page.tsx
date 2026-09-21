"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Utensils, CheckCircle2, AlertCircle, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export default function FoodScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "scanning" | "success" | "error">("idle");
  const [results, setResults] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setStatus("idle");
      setResults(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setStatus("scanning");
      const res = await fetch("/api/ai/food-scan", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Scan failed");
      
      const data = await res.json();
      setResults(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Utensils className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">AI Food Scanner</h1>
          <p className="mt-2 text-muted-foreground">
            Snap a photo of your meal. Our AI will estimate the calories and macronutrients instantly.
          </p>
        </div>

        <div className="glass overflow-hidden rounded-3xl p-6 sm:p-10">
          {!preview ? (
            <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-20 transition-all hover:bg-muted/50 hover:border-primary/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
              />
              <Camera className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">Click or drag photo to upload</p>
              <p className="mt-1 text-sm text-muted-foreground">PNG, JPG, up to 10MB</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-black/5">
                <img src={preview} alt="Food preview" className="w-full object-contain" />
                {(status === "uploading" || status === "scanning") && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <Utensils className="mb-4 h-10 w-10 animate-bounce text-primary" />
                    <p className="font-semibold text-primary">
                      {status === "uploading" ? "Uploading image..." : "Analyzing meal..."}
                    </p>
                  </div>
                )}
              </div>

              {status === "idle" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setPreview(null)}
                    className="flex-1 rounded-xl border border-border bg-transparent py-3 font-semibold text-foreground hover:bg-muted"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={handleScan}
                    className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    Analyze Food
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
                  <AlertCircle className="mx-auto mb-2 h-6 w-6 text-red-500" />
                  <p className="font-semibold text-red-500">Failed to analyze food</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-3 text-sm font-medium text-foreground hover:underline"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {status === "success" && results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-card p-6 shadow-premium border border-border"
                >
                  <div className="mb-4 text-center">
                    <h3 className="font-heading text-xl font-bold text-foreground">{results.foodName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{results.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
                    <div className="rounded-lg bg-orange-500/10 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase text-orange-600">Calories</p>
                      <p className="font-heading text-xl font-bold text-foreground">{results.calories}</p>
                    </div>
                    <div className="rounded-lg bg-blue-500/10 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase text-blue-600">Protein</p>
                      <p className="font-heading text-xl font-bold text-foreground">{results.protein}g</p>
                    </div>
                    <div className="rounded-lg bg-emerald-500/10 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase text-emerald-600">Carbs</p>
                      <p className="font-heading text-xl font-bold text-foreground">{results.carbs}g</p>
                    </div>
                    <div className="rounded-lg bg-amber-500/10 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase text-amber-600">Fats</p>
                      <p className="font-heading text-xl font-bold text-foreground">{results.fats}g</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-muted/50 p-3 rounded-lg">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      This is an AI estimation based on standard portion sizes. Confidence level: {results.confidence}%. Do not use for medical tracking.
                    </p>
                  </div>

                  <Link
                    href="/dashboard/meals"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    Add to Journal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
