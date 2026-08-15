"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Download,
  RefreshCw,
  Activity,
  Heart,
  Scale,
  Flame,
  Droplets,
  Brain,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const defaultMetrics = {
  weight: 75,
  height: 175,
  bmi: 24.5,
  bmr: 1680,
  bodyFat: 22,
  muscleMass: 42,
  visceralFat: 8,
  waterPercent: 55,
  metabolicAge: 28,
};

export default function ReportPage() {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/body-metrics");
        if (!response.ok) return;
        const { metric } = await response.json();
        if (metric) setMetrics((current) => ({ ...current, ...metric }));
      } catch {
        // The report remains available with the last known/default metrics.
      }
    })();
  }, []);

  const generateReport = async () => {
    setLoading(true);
    setGenerated(false);
    try {
      const res = await fetch("/api/ai/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metrics,
          healthScore: 78,
          grade: "B+",
          name: "User",
        }),
      });
      const data = await res.json();
      setReport(data.report);
      setGenerated(true);
    } catch (err) {
      console.error("Report error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!report) return;

    // Build a styled HTML document for printing as PDF
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>SVH Wellness Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a2e; padding: 40px; line-height: 1.7; }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 3px solid #10b981; margin-bottom: 32px; }
    .header h1 { font-size: 28px; color: #10b981; margin-bottom: 4px; }
    .header p { font-size: 12px; color: #666; }
    .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
    .metric { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; text-align: center; }
    .metric .label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
    .metric .value { font-size: 22px; font-weight: 700; color: #059669; margin-top: 4px; }
    .score { text-align: center; margin: 32px 0; }
    .score .circle { display: inline-flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); color: white; font-size: 32px; font-weight: 800; }
    .score .grade { font-size: 18px; font-weight: 700; color: #059669; margin-top: 8px; }
    .report-body { white-space: pre-wrap; font-size: 14px; line-height: 1.8; color: #333; margin-top: 24px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 10px; color: #999; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>🌿 SVH Nutrition Club</h1>
    <p>AI-Powered Wellness Report • Generated ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>

  <div class="score">
    <div class="circle">78</div>
    <div class="grade">Grade: B+</div>
    <p style="font-size: 12px; color: #666; margin-top: 4px;">Overall Health Score</p>
  </div>

  <h3 style="font-size: 16px; color: #10b981; margin-bottom: 8px;">📊 Body Metrics</h3>
  <div class="metrics-grid">
    <div class="metric"><div class="label">Weight</div><div class="value">75 kg</div></div>
    <div class="metric"><div class="label">BMI</div><div class="value">24.5</div></div>
    <div class="metric"><div class="label">Body Fat</div><div class="value">22%</div></div>
    <div class="metric"><div class="label">Muscle Mass</div><div class="value">42%</div></div>
    <div class="metric"><div class="label">BMR</div><div class="value">1680</div></div>
    <div class="metric"><div class="label">Hydration</div><div class="value">55%</div></div>
    <div class="metric"><div class="label">Visceral Fat</div><div class="value">8</div></div>
    <div class="metric"><div class="label">Metabolic Age</div><div class="value">28</div></div>
    <div class="metric"><div class="label">Height</div><div class="value">175 cm</div></div>
  </div>

  <h3 style="font-size: 16px; color: #10b981; margin: 24px 0 8px;">🤖 AI Wellness Analysis</h3>
  <div class="report-body">${report}</div>

  <div class="footer">
    <p>SVH Nutrition Club • AI-Powered Smart Wellness Platform</p>
    <p>This report is generated by AI and should not replace professional medical advice.</p>
  </div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const metricCards = [
    { label: "Weight", value: "75 kg", icon: Scale, color: "from-emerald-500 to-teal-500" },
    { label: "BMI", value: "24.5", icon: Activity, color: "from-blue-500 to-cyan-500" },
    { label: "Body Fat", value: "22%", icon: Flame, color: "from-amber-500 to-orange-500" },
    { label: "Muscle", value: "42%", icon: Heart, color: "from-purple-500 to-pink-500" },
    { label: "Hydration", value: "55%", icon: Droplets, color: "from-sky-500 to-blue-500" },
    { label: "Met. Age", value: "28", icon: Brain, color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              AI Report Generator
            </span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Wellness Report
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate a comprehensive, downloadable AI wellness report
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Metrics Preview */}
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-6">
          {metricCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-3 text-center"
            >
              <div className={cn("mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br", card.color)}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
              <p className="mt-1 font-heading text-sm font-bold text-foreground">{card.value}</p>
              <p className="text-[10px] text-muted-foreground">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Generate Button */}
        {!generated && (
          <div className="text-center">
            <button
              onClick={generateReport}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-emerald-500/25 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              {loading ? "Generating Report..." : "Generate AI Report"}
            </button>
          </div>
        )}

        {/* Report Content */}
        {generated && report && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Success banner */}
            <div className="flex items-center justify-between rounded-2xl bg-emerald-500/10 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-semibold text-foreground">Report Generated Successfully</span>
              </div>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg hover:shadow-primary/25"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            </div>

            {/* Report preview */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-foreground">AI Wellness Analysis</h2>
                  <p className="text-[10px] text-muted-foreground">
                    Generated on {new Date().toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert whitespace-pre-wrap leading-relaxed">
                {report}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={generateReport}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                Regenerate
              </button>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </motion.div>
        )}

        {/* Back link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
