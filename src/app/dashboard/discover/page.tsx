"use client";

import { motion } from "framer-motion";
import { Play, Star, Sparkles, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Discover SVH
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore premium nutrition, AI tools, and success stories.
        </p>
      </div>

      {/* Featured Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        
        <div className="relative z-20 flex min-h-[300px] w-full flex-col justify-center p-8 sm:p-12 md:w-2/3">
          <span className="mb-4 w-fit rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            New Challenge
          </span>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">21-Day Transformation</h2>
          <p className="mt-4 max-w-md text-zinc-300">
            Join 4,500+ members in our guided 21-day wellness challenge. Includes daily AI coaching and exclusive meal plans.
          </p>
          <button className="mt-8 w-fit rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
            Join Challenge
          </button>
        </div>
      </section>

      {/* Recommended Products Carousel */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">Recommended For You</h2>
          <Link href="#" className="flex items-center text-sm font-semibold text-primary hover:underline">
            View Store <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          <ProductCard 
            title="Formula 1 Nutritional Shake" 
            desc="Healthy meal replacement loaded with 21 vitamins."
            price="₹2,100"
            tag="Best Seller"
          />
          <ProductCard 
            title="Personalized Protein Powder" 
            desc="High quality soy and whey protein to build muscle."
            price="₹1,250"
            tag="AI Match"
          />
          <ProductCard 
            title="Afresh Energy Drink" 
            desc="Boosts metabolism and provides extreme energy."
            price="₹850"
            tag="Trending"
          />
          <ProductCard 
            title="Herbal Aloe Concentrate" 
            desc="Soothes the stomach and supports nutrient absorption."
            price="₹1,800"
          />
        </div>
      </section>

      {/* AI Intelligence Tools */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">SVH AI Arsenal</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AIToolCard icon={ScanLine} title="Smart Body Scan" desc="Analyze your metrics instantly." />
          <AIToolCard icon={Sparkles} title="Recipe Generator" desc="Turn fridge leftovers into macros." />
          <AIToolCard icon={Play} title="Form Checker" desc="Upload workout videos for feedback." />
        </div>
      </section>

    </div>
  );
}

// Helper Components
function ProductCard({ title, desc, price, tag }: any) {
  return (
    <div className="group flex min-w-[280px] w-[280px] snap-center flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/50">
      <div className="relative h-48 w-full bg-muted p-4">
        {tag && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm">
            {tag}
          </span>
        )}
        {/* Placeholder for product image */}
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <ShoppingBag className="h-12 w-12 opacity-20" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading font-bold text-foreground">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{desc}</p>
        <div className="mt-auto pt-6 flex items-center justify-between">
          <span className="font-heading font-bold text-foreground">{price}</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AIToolCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 cursor-pointer">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-heading text-sm font-bold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
