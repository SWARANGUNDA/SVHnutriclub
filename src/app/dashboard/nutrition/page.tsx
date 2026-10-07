"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Flame, CheckCircle2, Apple, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

export default function NutritionPage() {
  const [activeDay, setActiveDay] = useState("Today");

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      
      {/* LEFT COL: MEAL TIMELINE */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">AI Meal Plan</h1>
            <p className="mt-1 text-muted-foreground">Optimized for 15% Body Fat target.</p>
          </div>
          <Link 
            href="/dashboard/nutrition/scan"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <Camera className="h-4 w-4" />
            Scan Meal
          </Link>
        </div>

        {/* Days Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["Yesterday", "Today", "Tomorrow", "Thursday", "Friday"].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeDay === day 
                  ? "bg-foreground text-background" 
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Meals List */}
        <div className="flex flex-col gap-4">
          <MealCard 
            meal="Breakfast" 
            time="08:00 AM" 
            title="Formula 1 + Protein Powder" 
            cals={220} protein={24} carbs={18} fats={3} 
            completed={true}
            isHerbalife={true}
          />
          <MealCard 
            meal="Mid-Morning" 
            time="11:00 AM" 
            title="Afresh Energy Drink + Almonds" 
            cals={120} protein={4} carbs={5} fats={9} 
            completed={true}
            isHerbalife={true}
          />
          <MealCard 
            meal="Lunch" 
            time="01:30 PM" 
            title="Grilled Paneer & Quinoa Bowl" 
            cals={450} protein={28} carbs={45} fats={15} 
            completed={false}
          />
          <MealCard 
            meal="Evening" 
            time="05:00 PM" 
            title="Formula 1 Nutritional Shake" 
            cals={200} protein={20} carbs={15} fats={2} 
            completed={false}
            isHerbalife={true}
          />
          <MealCard 
            meal="Dinner" 
            time="08:30 PM" 
            title="Light Tofu Salad" 
            cals={250} protein={18} carbs={12} fats={10} 
            completed={false}
          />
        </div>
      </div>

      {/* RIGHT COL: MACROS SUMMARY */}
      <div className="flex flex-col gap-6 lg:w-96 shrink-0">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-foreground">Daily Macros</h2>
          
          <div className="mt-8 flex flex-col items-center justify-center">
            {/* Simple CSS Donut representation */}
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-muted">
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-primary" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)" }} />
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-emerald-500" style={{ clipPath: "polygon(100% 100%, 100% 50%, 50% 50%, 0 50%)" }} />
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-orange-500" style={{ clipPath: "polygon(0 50%, 50% 50%, 0 100%)" }} />
              
              <div className="flex flex-col items-center">
                <span className="font-heading text-3xl font-bold text-foreground">1,240</span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kcal Eaten</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <MacroBar label="Protein" current={56} total={120} color="bg-primary" />
            <MacroBar label="Carbs" current={68} total={150} color="bg-emerald-500" />
            <MacroBar label="Fats" current={27} total={50} color="bg-orange-500" />
          </div>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="font-heading font-bold text-foreground">AI Suggestion</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            You are falling slightly behind on protein today. Add 1 extra scoop of Personalized Protein Powder to your evening shake to hit your macro goal.
          </p>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function MealCard({ meal, time, title, cals, protein, carbs, fats, completed, isHerbalife }: any) {
  return (
    <div className={`relative flex flex-col gap-4 rounded-2xl border ${completed ? 'border-border/50 bg-card/50' : 'border-border bg-card'} p-5 transition-colors hover:border-primary/50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{meal}</span>
          <span className="text-xs font-medium text-muted-foreground">• {time}</span>
        </div>
        {completed && <CheckCircle2 className="h-5 w-5 text-primary" />}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isHerbalife && (
            <div className="flex h-6 items-center justify-center rounded bg-emerald-500/10 px-2 text-[10px] font-bold text-emerald-500">
              SVH Pick
            </div>
          )}
          <h3 className={`font-heading text-lg font-semibold ${completed ? 'text-foreground/70 line-through' : 'text-foreground'}`}>
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
        <span className="flex items-center gap-1 text-orange-500"><Flame className="h-4 w-4"/> {cals} kcal</span>
        <span className="text-muted-foreground">Pro: {protein}g</span>
        <span className="text-muted-foreground">Carb: {carbs}g</span>
        <span className="text-muted-foreground">Fat: {fats}g</span>
      </div>
    </div>
  );
}

function MacroBar({ label, current, total, color }: any) {
  const percentage = Math.min(100, (current / total) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="text-muted-foreground">{current}g / {total}g</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
