"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Activity, Info, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BodyRegion {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  metric?: string;
  value?: string;
}

export function Body3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState<BodyRegion | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const regions: BodyRegion[] = [
    {
      id: "chest",
      name: "Upper Body & Core",
      x: 50,
      y: 35,
      description: "Core strength and visceral fat distribution.",
      metric: "Visceral Fat",
      value: "8 (Healthy)"
    },
    {
      id: "arms",
      name: "Musculature",
      x: 35,
      y: 40,
      description: "Muscle mass and upper body strength tracking.",
      metric: "Muscle Mass",
      value: "42%"
    },
    {
      id: "legs",
      name: "Lower Body",
      x: 50,
      y: 70,
      description: "Lower body muscle development and water retention.",
      metric: "Hydration",
      value: "55%"
    }
  ];

  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-45, 45]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    x.set(x.get() + e.movementX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 p-6 shadow-premium-lg">
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-white">Interactive Body Model</h3>
        <button
          onClick={() => { x.set(0); setActiveRegion(null); }}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* 3D Viewer Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex flex-1 cursor-grab items-center justify-center touch-none active:cursor-grabbing perspective-1000"
      >
        <motion.div
          style={{ rotateY, transformStyle: "preserve-3d" }}
          className="relative h-[80%] w-[60%]"
        >
          {/* Mock Body Outline (SVG) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <svg viewBox="0 0 100 200" className="h-full w-full text-emerald-400 stroke-current" fill="none" strokeWidth="2">
              <path d="M50 10 C 60 10, 65 20, 65 30 C 65 40, 55 45, 50 45 C 45 45, 35 40, 35 30 C 35 20, 40 10, 50 10 Z" />
              <path d="M35 40 C 20 45, 10 60, 15 90 C 20 120, 35 110, 40 100 L 45 45" />
              <path d="M65 40 C 80 45, 90 60, 85 90 C 80 120, 65 110, 60 100 L 55 45" />
              <path d="M45 45 L 55 45 L 60 100 L 40 100 Z" />
              <path d="M40 100 L 35 180 C 35 190, 45 190, 45 180 L 50 110 L 55 180 C 55 190, 65 190, 65 180 L 60 100" />
            </svg>
          </div>

          {/* Interactive Hotspots */}
          {!isDragging && regions.map((region) => (
            <button
              key={region.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveRegion(region);
              }}
              className={cn(
                "absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 transform-style-3d",
                activeRegion?.id === region.id
                  ? "bg-emerald-500 text-white scale-110 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                  : "bg-white/20 text-white backdrop-blur-sm hover:scale-110 hover:bg-white/40"
              )}
              style={{
                left: `${region.x}%`,
                top: `${region.y}%`,
                transform: "translateZ(20px)",
              }}
            >
              <Activity className="h-3 w-3" />
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500/40" />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Region Info Panel */}
      {activeRegion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl bg-white/10 p-4 shadow-xl backdrop-blur-md border border-white/20"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-heading text-sm font-bold text-white">
                {activeRegion.name}
              </h4>
              <p className="mt-1 text-xs text-white/70">
                {activeRegion.description}
              </p>
              {activeRegion.metric && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <Info className="h-3 w-3" />
                  {activeRegion.metric}: {activeRegion.value}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
