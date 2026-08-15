"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  Mic,
  Salad,
  Monitor,
  Activity,
  Users,
  FileText,
  Camera,
  BarChart3,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "AI Digital Body Dashboard",
    description:
      "Comprehensive body analytics with OCR-powered smart scale reading, BMI/BMR/body fat analysis, animated charts, radar visualizations, and AI-generated wellness insights.",
    features: [
      "OCR body report scanning",
      "Real-time health score",
      "Animated analytics charts",
      "AI wellness insights",
    ],
    gradient: "from-emerald-500 to-teal-600",
    popular: true,
  },
  {
    icon: Mic,
    title: "AI Voice Assistant",
    description:
      "Multilingual AI voice assistant that answers health questions, explains body parameters, provides motivation, and generates personalized recommendations in English, Telugu, and Hindi.",
    features: [
      "Voice input & output",
      "3 Languages supported",
      "Health Q&A",
      "Personalized advice",
    ],
    gradient: "from-teal-500 to-cyan-600",
    popular: false,
  },
  {
    icon: Salad,
    title: "AI Meal Generator",
    description:
      "Personalized vegetarian meal plans based on your BMI, body fat percentage, fitness goals, and activity level. Complete with calorie counts, protein targets, and hydration goals.",
    features: [
      "Goal-based planning",
      "Vegetarian focused",
      "Macro tracking",
      "Hydration goals",
    ],
    gradient: "from-green-500 to-emerald-600",
    popular: true,
  },
  {
    icon: Camera,
    title: "Smart Nutrition Scanner",
    description:
      "Upload food images for instant AI analysis of calories, protein, carbs, fats, and nutritional quality. Make informed eating decisions with every meal.",
    features: [
      "Image recognition",
      "Macro estimation",
      "Quality scoring",
      "Meal logging",
    ],
    gradient: "from-cyan-500 to-blue-600",
    popular: false,
  },
  {
    icon: Brain,
    title: "Interactive 3D Body Model",
    description:
      "Explore a 3D human body model where you can click on body regions to learn about visceral fat, muscle groups, and wellness implications with improvement methods.",
    features: [
      "Click to explore",
      "Fat/muscle info",
      "Wellness implications",
      "Improvement methods",
    ],
    gradient: "from-violet-500 to-purple-600",
    popular: false,
  },
  {
    icon: Activity,
    title: "Live Health Score System",
    description:
      "Real-time wellness scoring that combines your body metrics, activity levels, nutrition data, and habits into a comprehensive health score with AI-generated summaries.",
    features: [
      "Real-time scoring",
      "Multi-metric analysis",
      "AI summaries",
      "Trend tracking",
    ],
    gradient: "from-emerald-500 to-green-600",
    popular: false,
  },
  {
    icon: BarChart3,
    title: "AI Health Risk Indicator",
    description:
      "Detect potential health risks including obesity trends, unhealthy fat levels, BMI warnings, and dangerous wellness patterns with actionable recommendations.",
    features: [
      "Risk detection",
      "Warning system",
      "Recommendations",
      "Trend analysis",
    ],
    gradient: "from-red-500 to-orange-600",
    popular: false,
  },
  {
    icon: FileText,
    title: "AI Report Generator",
    description:
      "Generate comprehensive downloadable PDF reports covering wellness analytics, nutrition summaries, body progress, and personalized improvement recommendations.",
    features: [
      "PDF generation",
      "Wellness reports",
      "Progress analytics",
      "Shareable format",
    ],
    gradient: "from-blue-500 to-indigo-600",
    popular: false,
  },
  {
    icon: Dumbbell,
    title: "Fitness Challenge System",
    description:
      "Join community fitness challenges, build streaks, earn badges and rewards, climb leaderboards, and compete with other members for wellness supremacy.",
    features: [
      "Community challenges",
      "Leaderboards",
      "Badges & rewards",
      "Streak tracking",
    ],
    gradient: "from-orange-500 to-red-600",
    popular: false,
  },
  {
    icon: Users,
    title: "Realtime Consultation",
    description:
      "Book and attend video/voice consultations with our wellness experts using secure WebRTC-powered real-time communication directly through the platform.",
    features: [
      "Video consultation",
      "Voice calls",
      "Secure & private",
      "Easy scheduling",
    ],
    gradient: "from-teal-500 to-emerald-600",
    popular: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              What We Offer
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Our <span className="text-gradient-green">Services</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A comprehensive suite of AI-powered wellness tools designed to transform
              your health journey from the inside out
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg"
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass mx-auto max-w-2xl rounded-3xl p-10"
          >
            <Sparkles className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Not Sure Where to Start?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Book a free consultation and our AI will recommend the perfect services
              based on your health goals.
            </p>
            <Link
              href="/consultation"
              className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:shadow-2xl"
            >
              Book Free Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
