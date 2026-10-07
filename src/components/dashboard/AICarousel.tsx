"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, ChevronRight, ArrowRight, 
  Scan, Utensils, ScanLine, Bot, 
  ShoppingBag, TrendingUp, FileText, Mic
} from "lucide-react";

const AI_FEATURES = [
  {
    title: "Body Scan AI",
    desc: "Upload your scan. Get instant analysis.",
    icon: Scan,
    href: "/dashboard/scan",
    color: "from-emerald-500/10 to-transparent",
  },
  {
    title: "AI Meal Generator",
    desc: "Personalized meals for your goals.",
    icon: Utensils,
    href: "/dashboard/nutrition",
    color: "from-emerald-500/10 to-transparent",
  },
  {
    title: "Food Scanner",
    desc: "Scan food & get nutrition info.",
    icon: ScanLine,
    href: "/dashboard/nutrition/scan",
    color: "from-blue-500/10 to-transparent",
  },
  {
    title: "AI Wellness Coach",
    desc: "Your personal guidance assistant.",
    icon: Bot,
    href: "/dashboard/coach",
    color: "from-primary/10 to-transparent",
  },
  {
    title: "Product Match",
    desc: "Recommended just for you.",
    icon: ShoppingBag,
    href: "/dashboard/discover",
    color: "from-emerald-500/10 to-transparent",
  },
  {
    title: "Progress AI",
    desc: "Track & analyze your progress.",
    icon: TrendingUp,
    href: "/dashboard/progress",
    color: "from-emerald-500/10 to-transparent",
  },
  {
    title: "AI Report",
    desc: "Get detailed wellness reports.",
    icon: FileText,
    href: "/dashboard/reports",
    color: "from-blue-500/10 to-transparent",
  },
  {
    title: "Voice Assistant",
    desc: "Talk to SVH in your language.",
    icon: Mic,
    href: "/dashboard/voice",
    color: "from-primary/10 to-transparent",
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
          scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 rounded-full bg-primary" />
          <h2 className="font-heading text-base font-bold text-foreground">SVH Intelligence — <span className="text-muted-foreground font-medium">AI for Your Wellness</span></h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/discover" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
          <div className="hidden sm:flex items-center gap-1.5">
            <button onClick={() => scroll('left')} className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors shadow-sm">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button onClick={() => scroll('right')} className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors shadow-sm">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 px-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        {AI_FEATURES.map((feat, i) => (
          <Link 
            key={i} 
            href={feat.href}
            className="group/card relative flex min-w-[200px] max-w-[200px] snap-start flex-col justify-between overflow-hidden rounded-[16px] border border-border bg-card p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${feat.color} opacity-40`} />
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border shadow-sm">
              <feat.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="relative z-10 mt-4 flex flex-col gap-0.5">
              <h3 className="font-heading text-[13px] font-bold text-foreground leading-tight">{feat.title}</h3>
              <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight pr-4">{feat.desc}</p>
            </div>
            <div className="absolute bottom-3 right-3 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 text-primary transition-transform group-hover/card:bg-primary group-hover/card:text-primary-foreground group-hover/card:scale-110">
              <ArrowRight className="h-2.5 w-2.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
