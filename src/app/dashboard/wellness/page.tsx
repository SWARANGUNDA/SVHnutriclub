"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Target, 
  CheckCircle2, 
  Flame, 
  Droplet, 
  Moon, 
  Dumbbell, 
  Plus,
  ChevronRight
} from "lucide-react";

export default function MyWellnessPage() {
  const [activeTab, setActiveTab] = useState<"SCORE" | "GOALS" | "HABITS">("SCORE");

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          My Wellness Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your overall health score, set ambitious goals, and build lasting habits.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex w-full items-center gap-2 overflow-x-auto border-b border-border pb-px scrollbar-hide">
        {["SCORE", "GOALS", "HABITS"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "SCORE" && "Wellness Score"}
            {tab === "GOALS" && "Active Goals"}
            {tab === "HABITS" && "Daily Habits"}
            
            {activeTab === tab && (
              <motion.div
                layoutId="wellness-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-4">
        
        {/* TAB 1: WELLNESS SCORE */}
        {activeTab === "SCORE" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            {/* Score Hero */}
            <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-primary/20 bg-primary/5 p-8 md:flex-row md:p-12">
              <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  Current Status
                </span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Top 15% for your age</h2>
                <p className="max-w-md text-muted-foreground">
                  Your metabolism and muscle mass are excellent. We just need to focus on lowering body fat by 2% to reach peak performance.
                </p>
              </div>
              <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * 84) / 100} 
                    className="text-primary transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="font-heading text-4xl font-bold text-foreground">84</span>
                  <span className="text-xs font-medium text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard title="Metabolic Age" value="28" unit="yrs" ideal="Actual: 32" status="good" />
              <MetricCard title="Visceral Fat" value="6" unit="" ideal="Target: <10" status="good" />
              <MetricCard title="Body Fat" value="18.5" unit="%" ideal="Target: 15%" status="warning" />
              <MetricCard title="Muscle Mass" value="55.2" unit="kg" ideal="Excellent" status="good" />
              <MetricCard title="Water" value="58.2" unit="%" ideal="Target: >60%" status="warning" />
              <MetricCard title="BMI" value="22.9" unit="" ideal="Healthy Range" status="good" />
            </div>
          </motion.div>
        )}

        {/* TAB 2: GOALS */}
        {activeTab === "GOALS" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">Active Goals</h2>
              <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                <Plus className="h-4 w-4" /> Add Goal
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Goal 1 */}
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Flame className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">Reduce Body Fat</h3>
                      <p className="text-xs text-muted-foreground">Target: Oct 30, 2026</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">On Track</span>
                </div>
                
                <div className="mt-2">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Starting: 22.4%</span>
                    <span className="font-bold text-foreground">Current: 18.5%</span>
                    <span className="text-primary">Target: 15%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[55%] rounded-full bg-orange-500" />
                  </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">Build Muscle Mass</h3>
                      <p className="text-xs text-muted-foreground">Target: Dec 15, 2026</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">Needs Work</span>
                </div>
                
                <div className="mt-2">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Starting: 54kg</span>
                    <span className="font-bold text-foreground">Current: 55.2kg</span>
                    <span className="text-emerald-500">Target: 58kg</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[30%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: HABITS */}
        {activeTab === "HABITS" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">Today's Habits</h2>
              <span className="text-sm font-medium text-muted-foreground">3 of 5 completed</span>
            </div>

            <div className="flex flex-col gap-3">
              <HabitRow icon={Droplet} title="Drink 3L Water" streak={12} completed={true} color="text-blue-500" bg="bg-blue-500/10" />
              <HabitRow icon={Activity} title="Morning Workout (45m)" streak={4} completed={true} color="text-emerald-500" bg="bg-emerald-500/10" />
              <HabitRow icon={CheckCircle2} title="Formula 1 Shake (Breakfast)" streak={28} completed={true} color="text-primary" bg="bg-primary/10" />
              <HabitRow icon={Moon} title="Sleep 8 Hours" streak={0} completed={false} color="text-indigo-400" bg="bg-indigo-400/10" />
              <HabitRow icon={CheckCircle2} title="Take Multivitamin" streak={2} completed={false} color="text-amber-500" bg="bg-amber-500/10" />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

// Helper Components
function MetricCard({ title, value, unit, ideal, status }: any) {
  const isGood = status === "good";
  return (
    <div className={`flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm`}>
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {isGood ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        ) : (
          <div className="h-2 w-2 mt-1 rounded-full bg-orange-500" />
        )}
      </div>
      <div className="mt-4">
        <span className="font-heading text-3xl font-bold text-foreground">{value}</span>
        <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
      </div>
      <p className="mt-2 text-xs font-medium text-muted-foreground">{ideal}</p>
    </div>
  );
}

function HabitRow({ icon: Icon, title, streak, completed, color, bg }: any) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border ${completed ? 'border-primary/20 bg-card' : 'border-border bg-background'} p-4 transition-colors hover:border-primary/50`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h4 className={`font-semibold ${completed ? 'text-foreground line-through opacity-70' : 'text-foreground'}`}>{title}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <Flame className="h-3 w-3 text-orange-500" />
            <span className="text-xs font-medium text-muted-foreground">{streak} day streak</span>
          </div>
        </div>
      </div>
      <button 
        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
          completed ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary'
        }`}
      >
        <CheckCircle2 className="h-5 w-5" />
      </button>
    </div>
  );
}
