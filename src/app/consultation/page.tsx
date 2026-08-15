"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Mic,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const consultationTypes = [
  {
    id: "video",
    icon: Video,
    title: "Video Consultation",
    description: "Face-to-face wellness consultation via secure video call",
    duration: "30 min",
    price: "Free",
  },
  {
    id: "voice",
    icon: Mic,
    title: "Voice Consultation",
    description: "One-on-one voice call with our nutrition expert",
    duration: "20 min",
    price: "Free",
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat Consultation",
    description: "Text-based wellness guidance at your convenience",
    duration: "Flexible",
    price: "Free",
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

const goals = [
  "Weight Loss",
  "Muscle Gain",
  "Better Nutrition",
  "Energy Boost",
  "Skin Health",
  "Gut Health",
  "General Wellness",
  "Post-pregnancy Recovery",
];

export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleSubmit = async () => {
    const type = consultationTypes.find((item) => item.title === selectedType)?.id;
    if (!type || !selectedDate || !selectedTime) {
      setSubmitError("Please complete the consultation type, date, and time.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: type.toUpperCase(), date: selectedDate, time: selectedTime, goals: selectedGoals }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to book consultation");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to book consultation");
    } finally {
      setSubmitting(false);
    }
  };

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      full: date.toISOString().split("T")[0],
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center px-4"
        >
          <div className="glass glow-green rounded-3xl p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
              Booking Confirmed!
            </h2>
            <p className="mt-3 text-muted-foreground">
              Your consultation has been scheduled. We&apos;ll send a confirmation
              to your email with the meeting details.
            </p>
            <div className="mt-6 rounded-xl bg-muted/50 p-4 text-left text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium text-foreground">{selectedType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-t border-border">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{selectedDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-t border-border">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedTime}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setSelectedType("");
                setSelectedDate("");
                setSelectedTime("");
                setSelectedGoals([]);
              }}
              className="mt-6 text-sm font-semibold text-primary hover:underline"
            >
              Book Another Consultation
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Free Consultation
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Book Your <span className="text-gradient-green">Consultation</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Get personalized wellness guidance from our nutrition experts.
              Your first consultation is completely free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {[
              { num: 1, label: "Type" },
              { num: 2, label: "Schedule" },
              { num: 3, label: "Details" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all",
                    step >= s.num
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.num ? "✓" : s.num}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:block",
                    step >= s.num ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
                {i < 2 && (
                  <div
                    className={cn(
                      "ml-3 hidden h-px w-16 sm:block lg:w-24",
                      step > s.num ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Step 1: Type Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="font-heading text-xl font-bold text-foreground">
                Choose Consultation Type
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {consultationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.title)}
                    className={cn(
                      "glass group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300",
                      selectedType === type.title
                        ? "glow-green ring-2 ring-primary shadow-premium"
                        : "hover:shadow-premium"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                        selectedType === type.title
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <type.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {type.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {type.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{type.duration}</span>
                      <span className="font-semibold text-primary">{type.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => selectedType && setStep(2)}
                disabled={!selectedType}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="font-heading text-xl font-bold text-foreground">
                Pick a Date & Time
              </h2>

              {/* Date picker */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Select Date
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={cn(
                        "flex flex-col items-center gap-0.5 rounded-xl py-3 text-center transition-all",
                        selectedDate === d.full
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "glass hover:shadow-premium"
                      )}
                    >
                      <span className="text-[10px] font-medium uppercase">
                        {d.day}
                      </span>
                      <span className="text-lg font-bold">{d.date}</span>
                      <span className="text-[10px]">{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time picker */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Select Time
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "rounded-xl py-2.5 text-sm font-medium transition-all",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "glass hover:shadow-premium"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  What are your wellness goals? (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={cn(
                        "rounded-full px-4 py-2 text-xs font-medium transition-all",
                        selectedGoals.includes(goal)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "glass text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Back
                </button>
                <button
                  onClick={() => selectedDate && selectedTime && setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <h2 className="font-heading text-xl font-bold text-foreground">
                Your Details
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Any specific concerns or questions..."
                />
              </div>

              {/* Summary */}
              <div className="glass rounded-2xl p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Booking Summary
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium text-foreground">{selectedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">{selectedTime}</span>
                  </div>
                  {selectedGoals.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals</span>
                      <span className="max-w-[60%] text-right font-medium text-foreground">
                        {selectedGoals.join(", ")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold text-primary">Free</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.name || !formData.email || !formData.phone}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
              {submitError && <p className="mt-3 text-center text-sm text-destructive">{submitError}</p>}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
