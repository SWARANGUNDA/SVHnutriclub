"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, ArrowRight, 
  ScanBody, Utensils, ScanLine, Bot, 
  ShoppingBag, TrendingUp, FileText, Mic
} from "lucide-react";

const AI_FEATURES = [
  {
    title: "Body Scan AI",
    desc: "Upload your scan. Get instant analysis",
    icon: ScanBody,
    href: "/dashboard/scan",
    color: "from-emerald-500/20 to-transparent",
  },
  {
    title: "AI Meal Generator",
    desc: "Personalized meals for your goals",
    icon: Utensils,
    href: "/dashboard/nutrition",
    color: "from-emerald-500/20 to-transparent",
  },
  {
    title: "Food Scanner",
    desc: "Scan food & get nutrition info",
    icon: ScanLine,
    href: "/dashboard/nutrition/scan",
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "AI Wellness Coach",
    desc: "Your personal guidance assistant",
    icon: Bot,
    href: "/dashboard/coach",
    color: "from-primary/20 to-transparent",
  },
  {
    title: "Product Match",
    desc: "Recommended just for you",
    icon: ShoppingBag,
    href: "/dashboard/discover",
    color: "from-emerald-500/20 to-transparent",
  },
  {
    title: "Progress AI",
    desc: "Track & analyze your progress",
    icon: TrendingUp,
    href: "/dashboard/progress",
    color: "from-emerald-500/20 to-transparent",
  },
  {
    title: "AI Report",
    desc: "Get detailed wellness reports",
    icon: FileText,
    href: "/dashboard/reports",
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "Voice Assistant",
    desc: "Talk to SVH in your language",
    icon: Mic,
    href: "/dashboard/voice",
    color: "from-primary/20 to-transparent",
  },
];

export function AICarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-1.5 rounded-full bg-primary" />
          <h2 className="font-heading text-xl font-bold text-foreground">SVH Intelligence — <span className="text-muted-foreground font-medium">AI for Your Wellness</span></h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/discover" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/50 hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll('right')} className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/50 hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {AI_FEATURES.map((feat, i) => (
          <Link 
            key={i} 
            href={feat.href}
            className={`group/card relative flex min-w-[220px] max-w-[220px] snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_rgba(var(--primary),0.3)] dark:bg-black/40`}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${feat.color} opacity-20`} />
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white drop-shadow-md">
              <feat.icon className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="relative z-10 mt-6 flex flex-col gap-1">
              <h3 className="font-heading text-sm font-bold text-foreground">{feat.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{feat.desc}</p>
            </div>
            <div className="absolute bottom-4 right-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 text-primary transition-transform group-hover/card:bg-primary group-hover/card:text-primary-foreground group-hover/card:scale-110">
              <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
