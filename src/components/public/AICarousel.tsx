"use client";

import { motion } from "framer-motion";
import { 
  ScanLine, 
  Utensils, 
  Smartphone, 
  BrainCircuit, 
  FileText, 
  Mic, 
  LineChart, 
  PackageSearch 
} from "lucide-react";

const AI_FEATURES = [
  { title: "Body Scan AI", icon: ScanLine, link: "/login" },
  { title: "AI Meals", icon: Utensils, link: "/login" },
  { title: "Food Scanner", icon: Smartphone, link: "/login" },
  { title: "Wellness Coach", icon: BrainCircuit, link: "/login" },
  { title: "AI Report", icon: FileText, link: "/login" },
  { title: "Voice AI", icon: Mic, link: "/login" },
  { title: "Progress AI", icon: LineChart, link: "/login" },
  { title: "Product Match", icon: PackageSearch, link: "/login" },
];

export function AICarousel() {
  // Duplicate array to allow infinite seamless scrolling
  const features = [...AI_FEATURES, ...AI_FEATURES, ...AI_FEATURES];

  return (
    <div className="relative flex w-full overflow-hidden bg-background py-16">
      {/* Subtle fade edges for the carousel */}
      <div className="absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-4 py-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
          AI FOR YOUR WELLNESS
        </span>
      </div>

      <motion.div
        className="flex w-max items-center gap-6"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          ease: "linear",
          duration: 30, // Slow speed
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <a
              key={idx}
              href={feature.link}
              className="group flex h-32 w-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <span className="font-heading text-sm font-medium text-card-foreground">
                {feature.title}
              </span>
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
