"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, CheckCircle2, RefreshCcw, ScanLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ScanState = "IDLE" | "SCANNING" | "ANALYZING" | "RESULT";

export default function FoodScannerPage() {
  const [scanState, setScanState] = useState<ScanState>("IDLE");
  const router = useRouter();

  const handleSimulateScan = () => {
    setScanState("SCANNING");
    setTimeout(() => setScanState("ANALYZING"), 2000);
    setTimeout(() => setScanState("RESULT"), 4500);
  };

  return (
    <div className="mx-auto max-w-md h-[calc(100vh-10rem)] md:h-[600px] flex flex-col overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between bg-black/50 p-4 backdrop-blur-md">
        <button onClick={() => router.back()} className="text-white hover:text-primary">
          <X className="h-6 w-6" />
        </button>
        <span className="font-heading font-bold text-white">Food AI Scanner</span>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Viewfinder Area */}
      <div className="relative flex-1 bg-zinc-900">
        <AnimatePresence mode="wait">
          
          {(scanState === "IDLE" || scanState === "SCANNING") && (
            <motion.div 
              key="camera"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Fake camera feed background */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #333 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
              
              {/* Viewfinder brackets */}
              <div className="relative h-64 w-64 border-2 border-white/20">
                <div className="absolute -left-1 -top-1 h-8 w-8 border-l-4 border-t-4 border-primary" />
                <div className="absolute -right-1 -top-1 h-8 w-8 border-r-4 border-t-4 border-primary" />
                <div className="absolute -bottom-1 -left-1 h-8 w-8 border-b-4 border-l-4 border-primary" />
                <div className="absolute -bottom-1 -right-1 h-8 w-8 border-b-4 border-r-4 border-primary" />
                
                {scanState === "SCANNING" && (
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_15px_rgba(5,150,105,0.8)]"
                    animate={{ y: [0, 250, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
              
              <div className="absolute bottom-10">
                {scanState === "IDLE" ? (
                  <button 
                    onClick={handleSimulateScan}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
                  >
                    <div className="h-12 w-12 rounded-full bg-white" />
                  </button>
                ) : (
                  <div className="text-sm font-semibold text-white tracking-widest uppercase">Hold Still</div>
                )}
              </div>
            </motion.div>
          )}

          {scanState === "ANALYZING" && (
            <motion.div
              key="analyzing"
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RefreshCcw className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-6 font-heading font-bold text-white text-lg">AI is identifying food...</p>
              <p className="mt-2 text-sm text-zinc-400">Calculating macros and volume</p>
            </motion.div>
          )}

          {scanState === "RESULT" && (
            <motion.div
              key="result"
              className="absolute inset-0 flex flex-col bg-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="h-48 w-full bg-zinc-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ScanLine className="h-12 w-12 text-zinc-600" />
                </div>
              </div>
              
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 w-fit px-3 py-1 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Match Found</span>
                </div>
                
                <h2 className="font-heading text-2xl font-bold text-foreground">Grilled Chicken Salad</h2>
                <p className="text-muted-foreground mt-1">Estimated weight: ~350g</p>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground mb-1">Calories</div>
                    <div className="font-heading text-2xl font-bold text-foreground">320 <span className="text-sm text-muted-foreground">kcal</span></div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground mb-1">Protein</div>
                    <div className="font-heading text-2xl font-bold text-primary">42 <span className="text-sm text-muted-foreground">g</span></div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground mb-1">Carbs</div>
                    <div className="font-heading text-2xl font-bold text-emerald-500">12 <span className="text-sm text-muted-foreground">g</span></div>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <div className="text-sm text-muted-foreground mb-1">Fats</div>
                    <div className="font-heading text-2xl font-bold text-orange-500">14 <span className="text-sm text-muted-foreground">g</span></div>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 flex gap-3">
                  <button onClick={() => setScanState("IDLE")} className="flex-1 rounded-xl border border-border bg-transparent py-4 text-sm font-semibold text-foreground hover:bg-muted">
                    Retake
                  </button>
                  <button onClick={() => router.push("/dashboard/nutrition")} className="flex-1 rounded-xl bg-primary py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                    Log Meal
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
