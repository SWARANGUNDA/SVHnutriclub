"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Maximize2, RotateCcw, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
}

interface Product3DViewerProps {
  imageSrc: string;
  productName: string;
  hotspots?: Hotspot[];
}

export function Product3DViewer({ imageSrc, productName, hotspots = [] }: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // 3D Rotation Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  // Handle Dragging to simulate 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    x.set(x.get() + e.movementX);
    y.set(y.get() + e.movementY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
    setActiveHotspot(null);
  };

  return (
    <div className="relative flex aspect-square w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-muted/50 to-muted/10 p-6">
      {/* Controls */}
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-background/50 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
          <RotateCcw className="h-3 w-3" />
          Drag to rotate
        </div>
        <button
          onClick={handleReset}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-md transition-colors hover:bg-background/80"
          title="Reset View"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex flex-1 cursor-grab items-center justify-center touch-none active:cursor-grabbing perspective-1000"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-[80%] w-[80%]"
        >
          {/* Main Product Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={imageSrc}
              alt={productName}
              className="h-full w-full object-contain drop-shadow-2xl pointer-events-none"
            />
          </div>

          {/* Hotspots */}
          {!isDragging &&
            hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(hotspot === activeHotspot ? null : hotspot);
                }}
                className={cn(
                  "absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 transform-style-3d",
                  activeHotspot === hotspot
                    ? "bg-primary text-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "bg-white/80 text-primary backdrop-blur-sm hover:scale-110 hover:bg-white"
                )}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: "translateZ(30px)",
                }}
              >
                <Info className="h-3 w-3" />
                
                {/* Ping animation behind hotspot */}
                <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40 opacity-75" />
              </button>
            ))}
        </motion.div>
      </div>

      {/* Hotspot Info Panel */}
      {activeHotspot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl bg-background/90 p-4 shadow-xl backdrop-blur-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">
                {activeHotspot.title}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {activeHotspot.description}
              </p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
            >
              <RotateCcw className="h-3 w-3 rotate-45" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
