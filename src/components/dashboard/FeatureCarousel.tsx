"use client";

import { motion } from "framer-motion";
import { Brain, Camera, Scale, Utensils, Award, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const carouselItems = [
  {
    id: "ai-body",
    title: "AI Body Analysis",
    description: "Get personalized insights from your latest measurements.",
    icon: Brain,
    href: "/dashboard/scan",
    color: "from-emerald-500 to-teal-500",
    badge: "New",
  },
  {
    id: "meal-gen",
    title: "AI Meal Generator",
    description: "Instantly create meals based on your goals and climate.",
    icon: Utensils,
    href: "/dashboard/meals",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "food-scan",
    title: "Nutrition Scanner",
    description: "Snap a photo of your food for instant macro estimates.",
    icon: Camera,
    href: "/dashboard/food-scan",
    color: "from-green-500 to-emerald-600",
    badge: "Popular",
  },
  {
    id: "challenges",
    title: "Active Challenges",
    description: "Join the 30-Day Lean Challenge and earn rewards.",
    icon: Award,
    href: "/dashboard/challenges",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "3d-body",
    title: "Personalized 3D Body",
    description: "Visualize your body composition in real-time.",
    icon: Scale,
    href: "/dashboard#3d-body",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "offers",
    title: "Special Offer",
    description: "20% off all Advanced Formula Shakes this week only!",
    icon: Sparkles,
    href: "/dashboard/recommendations",
    color: "from-amber-500 to-orange-500",
    badge: "Offer",
  }
];

export function FeatureCarousel() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-4 px-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory hide-scrollbar">
        {/* We double the array to allow for a simulated continuous manual scroll, but natively rely on CSS scroll snapping for best UX on mobile */}
        {[...carouselItems, ...carouselItems].map((item, idx) => (
          <Link
            key={`${item.id}-${idx}`}
            href={item.href}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] glass glow-green rounded-2xl p-5 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", item.color)}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
              {item.badge && (
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider border border-primary/20">
                  {item.badge}
                </span>
              )}
            </div>
            
            <div className="mt-4">
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
            
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
              Explore <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          animation: scroll 40s linear infinite;
        }
        .hide-scrollbar:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Disable CSS animation on mobile to allow native swiping instead */
        @media (max-width: 640px) {
          .hide-scrollbar {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
