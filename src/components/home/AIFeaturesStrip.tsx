"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AI_FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AIFeaturesStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-section py-10">
      {/* Section Header */}
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          </div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
            AI-Powered Features
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </motion.div>
      </div>

      {/* Auto-scrolling Strip */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />

        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto px-4 sm:px-8"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Auto-scroll animation wrapper - duplicate items for infinite loop */}
          <motion.div
            className="flex shrink-0 gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {[...AI_FEATURES, ...AI_FEATURES].map((feature, index) => (
              <AIFeatureCard
                key={`${feature.id}-${index}`}
                feature={feature}
                index={index % AI_FEATURES.length}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface AIFeatureCardProps {
  feature: (typeof AI_FEATURES)[number];
  index: number;
}

function AIFeatureCard({ feature, index }: AIFeatureCardProps) {
  const Icon = feature.icon;

  return (
    <Link href={feature.href} className="group block shrink-0">
      <div
        className={cn(
          "glass relative flex w-[260px] flex-col gap-3 overflow-hidden rounded-2xl p-5 transition-all duration-500",
          "hover:glow-green hover:shadow-premium-lg hover:-translate-y-1"
        )}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon */}
        <div
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
            feature.gradient
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="font-heading text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
            {feature.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
