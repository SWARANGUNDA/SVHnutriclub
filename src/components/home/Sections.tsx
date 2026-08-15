"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";

const transformations = [
  {
    id: 1,
    name: "Rahul M.",
    before: "98 kg",
    after: "76 kg",
    duration: "4 months",
    quote: "The AI meal planner changed everything for me.",
    gradient: "from-red-400/20 to-emerald-400/20",
  },
  {
    id: 2,
    name: "Sneha P.",
    before: "82 kg",
    after: "65 kg",
    duration: "5 months",
    quote: "Body dashboard kept me accountable every single day.",
    gradient: "from-orange-400/20 to-emerald-400/20",
  },
  {
    id: 3,
    name: "Vikram S.",
    before: "105 kg",
    after: "82 kg",
    duration: "6 months",
    quote: "Personalized nutrition guidance made the difference.",
    gradient: "from-yellow-400/20 to-emerald-400/20",
  },
];

export function TransformationsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-section py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Real Results
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Inspiring <span className="text-gradient-green">Transformations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Our members achieve incredible results with AI-powered nutrition plans
            and personalized wellness tracking
          </p>
        </motion.div>

        {/* Transformation Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transformations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:glow-green hover:shadow-premium-lg"
            >
              {/* Before/After Visual */}
              <div className={`flex items-center justify-between rounded-xl bg-gradient-to-r ${item.gradient} p-4`}>
                <div className="text-center">
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Before
                  </span>
                  <span className="mt-1 block font-heading text-2xl font-bold text-foreground">
                    {item.before}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    {item.duration}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    After
                  </span>
                  <span className="mt-1 block font-heading text-2xl font-bold text-primary">
                    {item.after}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4">
                <p className="font-heading text-base font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/results"
            className="group inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            View All Transformations
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-section" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            What Our Members <span className="text-gradient-green">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:shadow-premium"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultationCTA() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 px-8 py-14 text-center shadow-2xl sm:px-16 lg:py-20"
        >
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
            <div className="bg-grid absolute inset-0 opacity-10" />
          </div>

          <div className="relative">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Transform?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Book a free consultation with our wellness experts and get a
              personalized nutrition plan powered by AI
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/consultation"
                className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-emerald-600 shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Book Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-section py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              AI Dashboard
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Your Personal{" "}
              <span className="text-gradient-green">Health Command Center</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Get real-time insights into your body metrics, nutrition, and
              wellness journey. Our AI analyzes your data to provide actionable
              recommendations.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Real-time body analytics & health score",
                "AI-generated personalized meal plans",
                "Smart nutrition scanner with food recognition",
                "Interactive 3D body model exploration",
                "Downloadable wellness reports (PDF)",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 hover:shadow-xl"
            >
              Explore Dashboard
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass glow-green-strong relative overflow-hidden rounded-2xl p-6 shadow-premium-lg">
              {/* Mock dashboard header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Welcome back</p>
                  <p className="font-heading text-lg font-bold text-foreground">
                    Health Overview
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
                </div>
              </div>

              {/* Mock metrics grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Health Score", value: "87/100", color: "text-emerald-500" },
                  { label: "BMI", value: "23.5", color: "text-teal-500" },
                  { label: "Body Fat", value: "18.2%", color: "text-cyan-500" },
                  { label: "Hydration", value: "72%", color: "text-blue-500" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className={`mt-1 font-heading text-xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mock chart placeholder */}
              <div className="mt-4 rounded-xl bg-muted/30 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Weekly Progress
                </p>
                <div className="mt-3 flex items-end gap-1.5">
                  {[40, 55, 45, 70, 60, 80, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-teal-400"
                      style={{ maxHeight: `${h}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-primary">AI Insight</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your hydration levels have improved 15% this week. Keep it up! Consider adding 1 more glass in the evening.
                </p>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-teal-400/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WellnessCards() {
  const cards = [
    {
      title: "Smart Nutrition",
      description:
        "AI-powered meal plans tailored to your body metrics and wellness goals",
      icon: "🥗",
      gradient: "from-emerald-500/10 to-green-500/10",
    },
    {
      title: "Body Analytics",
      description:
        "Deep insights into BMI, body fat, muscle mass, and hydration levels",
      icon: "📊",
      gradient: "from-teal-500/10 to-cyan-500/10",
    },
    {
      title: "Voice Assistant",
      description:
        "Multilingual AI assistant for health queries in English, Telugu & Hindi",
      icon: "🎙️",
      gradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
      title: "3D Visualization",
      description:
        "Interactive 3D body model to explore and understand your health",
      icon: "🧬",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Progress Tracking",
      description:
        "Visual timeline of your transformation with milestone achievements",
      icon: "📈",
      gradient: "from-orange-500/10 to-amber-500/10",
    },
    {
      title: "Premium Products",
      description:
        "World-class Herbalife nutrition products with AI-matched recommendations",
      icon: "✨",
      gradient: "from-emerald-500/10 to-teal-500/10",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Why SVH
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            A Complete{" "}
            <span className="text-gradient-green">Wellness Ecosystem</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Everything you need for your health journey, powered by artificial
            intelligence
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
