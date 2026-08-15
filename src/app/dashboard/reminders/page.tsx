"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Sparkles, Droplets, Dumbbell, Pill, Utensils, Scale, Calendar, Clock, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  color: string;
  enabled: boolean;
  frequency: string;
}

const defaultReminders: Reminder[] = [
  { id: "water1", title: "Morning Water", description: "Start your day with 2 glasses of water", time: "07:00", icon: Droplets, color: "from-sky-500 to-blue-500", enabled: true, frequency: "Daily" },
  { id: "supplement1", title: "Morning Supplements", description: "Cell Activator + Aloe Vera", time: "07:30", icon: Pill, color: "from-pink-500 to-rose-500", enabled: true, frequency: "Daily" },
  { id: "meal1", title: "Breakfast Shake", description: "Formula 1 Nutritional Shake", time: "08:00", icon: Utensils, color: "from-emerald-500 to-teal-500", enabled: true, frequency: "Daily" },
  { id: "water2", title: "Mid-Morning Water", description: "Hydration reminder — 2 glasses", time: "10:30", icon: Droplets, color: "from-sky-500 to-blue-500", enabled: true, frequency: "Daily" },
  { id: "workout", title: "Workout Time", description: "30 min exercise session", time: "17:00", icon: Dumbbell, color: "from-orange-500 to-red-500", enabled: true, frequency: "Mon-Fri" },
  { id: "track", title: "Body Tracking", description: "Log today's weight and metrics", time: "20:00", icon: Scale, color: "from-purple-500 to-indigo-500", enabled: false, frequency: "Weekly" },
  { id: "consult", title: "Consultation Reminder", description: "Upcoming wellness consultation", time: "10:00", icon: Calendar, color: "from-amber-500 to-yellow-500", enabled: false, frequency: "As scheduled" },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState(defaultReminders);

  const toggleReminder = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  const enabledCount = reminders.filter((r) => r.enabled).length;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Smart Reminders</span>
              </div>
              <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Stay On Track</h1>
              <p className="mt-1 text-sm text-muted-foreground">{enabledCount} active reminders helping you stay consistent</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        {reminders.map((reminder, i) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn("glass rounded-2xl p-4 transition-all", !reminder.enabled && "opacity-50")}
          >
            <div className="flex items-center gap-4">
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br", reminder.color)}>
                <reminder.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{reminder.title}</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{reminder.frequency}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{reminder.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {reminder.time}
                </div>
                <button onClick={() => toggleReminder(reminder.id)} className="text-primary">
                  {reminder.enabled ? <ToggleRight className="h-7 w-7" /> : <ToggleLeft className="h-7 w-7 text-muted-foreground" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
