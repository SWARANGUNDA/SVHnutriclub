"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Camera, ArrowRight, Image as ImageIcon, Calendar, Plus, UploadCloud, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Transformation {
  id: string;
  date: string;
  type: "Before" | "Progress" | "Current";
  weight: number;
  notes: string;
  image: string | null; // For local preview
}

export default function TransformationsPage() {
  const [transformations, setTransformations] = useState<Transformation[]>([
    {
      id: "1",
      date: "2026-06-01",
      type: "Before",
      weight: 85,
      notes: "Starting my journey today. Feeling motivated!",
      image: null,
    },
    {
      id: "2",
      date: "2026-08-15",
      type: "Progress",
      weight: 79,
      notes: "First milestone reached! Down 6kg.",
      image: null,
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const handleUploadMock = () => {
    setIsUploading(true);
    setTimeout(() => {
      setTransformations([
        ...transformations,
        {
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
          type: "Current",
          weight: 75,
          notes: "Feeling amazing! Clothes fit better.",
          image: null,
        }
      ]);
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Transformation Tracking</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Your Journey</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload photos and track your visual progress over time.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        
        {/* Upload Area */}
        <div className="glass glow-green rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Log New Progress</h2>
              <p className="text-sm text-muted-foreground mt-1">Upload a photo to create a new timeline milestone.</p>
            </div>
            <button 
              onClick={handleUploadMock}
              disabled={isUploading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isUploading ? <UploadCloud className="h-4 w-4 animate-bounce" /> : <Camera className="h-4 w-4" />}
              {isUploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {transformations.length > 0 && <div className="absolute left-[20px] top-4 bottom-0 w-1 bg-border rounded-full hidden sm:block" />}

          <div className="space-y-12">
            {transformations.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No transformation photos uploaded yet.</p>
            ) : (
              [...transformations].reverse().map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[12px] top-6 hidden sm:flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background z-10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass rounded-3xl p-6 hover:ring-1 hover:ring-primary/20 transition-all flex flex-col sm:flex-row gap-6">
                    {/* Photo Area */}
                    <div className="sm:w-1/3 aspect-[3/4] bg-muted/30 rounded-2xl border border-border/50 flex flex-col items-center justify-center relative overflow-hidden group">
                      {entry.image ? (
                        <img src={entry.image} alt={entry.type} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <ImageIcon className="h-10 w-10 text-muted-foreground/50 mb-2" />
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{entry.type} Photo</span>
                        </>
                      )}
                      
                      {/* Badge overlay */}
                      <div className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-primary border border-border uppercase">
                        {entry.type}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="sm:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(entry.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                      </div>
                      
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                        Weight: {entry.weight} kg
                      </h3>
                      
                      <div className="bg-background/40 rounded-xl p-4 border border-border/50">
                        <p className="text-sm leading-relaxed text-foreground/90 italic">
                          "{entry.notes}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-start">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
