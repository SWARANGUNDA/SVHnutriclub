"use client";

import { Sparkles, ShoppingBag } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Store</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Personalized Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Product recommendations based on your unique profile and goals.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="glass glow-green rounded-3xl p-8 border border-border text-center">
          <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4 opacity-80" />
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">Analyzing Profile...</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Our AI is checking your wellness goals against our product catalog to find the perfect supplements for you.
          </p>
        </div>
      </div>
    </div>
  );
}
