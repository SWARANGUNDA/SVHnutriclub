"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Clock, Trash2, Plus, Droplets, Utensils, Target, CalendarHeart, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const typeIcons: Record<string, any> = {
  WATER: Droplets,
  MEAL: Utensils,
  HABIT: Target,
  CONSULTATION: CalendarHeart,
  OTHER: Bell,
};

const typeColors: Record<string, string> = {
  WATER: "text-blue-500 bg-blue-500/10",
  MEAL: "text-emerald-500 bg-emerald-500/10",
  HABIT: "text-purple-500 bg-purple-500/10",
  CONSULTATION: "text-amber-500 bg-amber-500/10",
  OTHER: "text-gray-500 bg-gray-500/10",
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "WATER",
    time: "08:00",
    days: [0, 1, 2, 3, 4, 5, 6],
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await fetch("/api/reminders");
      if (res.ok) {
        const data = await res.json();
        setReminders(data.reminders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReminder = async (id: string, currentStatus: boolean) => {
    // Optimistic update
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !currentStatus } : r));
    try {
      await fetch(`/api/reminders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
    } catch (err) {
      console.error(err);
      fetchReminders(); // Revert on failure
    }
  };

  const deleteReminder = async (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    try {
      await fetch(`/api/reminders/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
      fetchReminders();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsCreating(false);
        fetchReminders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDay = (dayIndex: number) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(dayIndex)
        ? prev.days.filter(d => d !== dayIndex)
        : [...prev.days, dayIndex].sort()
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10">
              <Bell className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">Smart Reminders</h1>
              <p className="text-muted-foreground">Manage notifications for your wellness routine.</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            {isCreating ? "Cancel" : <><Plus className="h-4 w-4" /> Add Reminder</>}
          </button>
        </div>

        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <form onSubmit={handleCreate} className="glass rounded-3xl p-6">
                <h3 className="font-heading text-lg font-bold mb-4">Create New Reminder</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Drink Water"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="WATER">Hydration</option>
                      <option value="MEAL">Meal</option>
                      <option value="HABIT">Habit</option>
                      <option value="CONSULTATION">Consultation</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Time</label>
                    <input
                      required
                      type="time"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Repeat Days</label>
                    <div className="flex gap-1 mt-1">
                      {daysOfWeek.map((day, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleDay(i)}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                            formData.days.includes(i) ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-border"
                          )}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="rounded-xl bg-primary px-6 py-2 font-bold text-white hover:bg-primary/90">
                    Save Reminder
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {reminders.length === 0 && !isCreating ? (
          <div className="glass rounded-3xl p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h2 className="text-xl font-bold">No Reminders Yet</h2>
            <p className="text-muted-foreground mt-2">Set up smart reminders to stay on track.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reminders.map((reminder) => {
              const Icon = typeIcons[reminder.type] || Bell;
              const colorClass = typeColors[reminder.type] || typeColors.OTHER;

              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "glass flex items-center justify-between rounded-2xl p-4 transition-all hover:shadow-md",
                    !reminder.isActive && "opacity-60 grayscale"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", colorClass)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {reminder.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="h-3 w-3" />
                          {reminder.time}
                        </span>
                        <div className="flex gap-0.5">
                          {daysOfWeek.map((day, i) => (
                            <span key={i} className={cn("px-1", reminder.days.includes(i) ? "text-primary font-bold" : "text-muted-foreground/30")}>
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleReminder(reminder.id, reminder.isActive)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        reminder.isActive ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          reminder.isActive ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                    
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
