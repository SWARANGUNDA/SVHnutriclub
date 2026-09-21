"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, ScanLine, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BodyScanPage() {
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
      formData.append("performOCR", "true");

      // 1. Upload & Simulate OCR
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");
      setStatus("scanning");
      
      const { extractedData } = await uploadRes.json();
      
      if (!extractedData) throw new Error("OCR Failed");

      // 2. Save extracted metrics to database
      const metricRes = await fetch("/api/body-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...extractedData,
          source: "ocr",
          measuredAt: new Date().toISOString()
        })
      });

      if (!metricRes.ok) throw new Error("Failed to save metrics");

      setResults(extractedData);
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
            <ScanLine className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Smart Scale Scanner</h1>
          <p className="mt-2 text-muted-foreground">
            Upload a screenshot from your smart scale app. Our AI will extract the metrics automatically.
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
              <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">Click or drag image to upload</p>
              <p className="mt-1 text-sm text-muted-foreground">PNG, JPG, up to 10MB</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-black/5">
                <img src={preview} alt="Scan preview" className="w-full object-contain" />
                {(status === "uploading" || status === "scanning") && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <ScanLine className="mb-4 h-10 w-10 animate-pulse text-primary" />
                    <p className="font-semibold text-primary">
                      {status === "uploading" ? "Uploading image..." : "Extracting metrics..."}
                    </p>
                    {status === "scanning" && (
                      <motion.div
                        className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
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
                    Start Scan
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
                  <AlertCircle className="mx-auto mb-2 h-6 w-6 text-red-500" />
                  <p className="font-semibold text-red-500">Failed to extract data</p>
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
                  className="rounded-2xl bg-emerald-500/10 p-6 border border-emerald-500/20"
                >
                  <div className="mb-4 flex items-center justify-center gap-2 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                    <h3 className="font-bold">Extraction Successful!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(results).map(([key, val]) => (
                      <div key={key} className="rounded-lg bg-background p-3 text-center shadow-sm">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="font-heading text-lg font-bold text-foreground">{String(val)}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/dashboard"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-semibold text-white shadow-lg hover:bg-emerald-600"
                  >
                    View in Dashboard
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
