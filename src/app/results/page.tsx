"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Award, Calendar, Quote } from "lucide-react";

const transformations = [
  {
    id: 1,
    name: "Rahul Menon",
    age: 32,
    location: "Hyderabad",
    beforeWeight: "98 kg",
    afterWeight: "76 kg",
    duration: "4 months",
    story: "After years of struggling with weight, I found SVH Nutrition Club. The AI dashboard helped me understand my body metrics in depth, and the personalized meal plans were a game-changer. I lost 22 kg and gained confidence.",
    achievements: ["Lost 22 kg", "BMI normalized", "Energy up 200%"],
    gradient: "from-red-400/15 to-emerald-400/15",
  },
  {
    id: 2,
    name: "Sneha Patil",
    age: 28,
    location: "Pune",
    beforeWeight: "82 kg",
    afterWeight: "65 kg",
    duration: "5 months",
    story: "The body dashboard and progress timeline kept me motivated every single day. I could literally see my transformation happening in real-time with AI insights guiding every step.",
    achievements: ["Lost 17 kg", "Body fat reduced 12%", "Muscle gain"],
    gradient: "from-orange-400/15 to-emerald-400/15",
  },
  {
    id: 3,
    name: "Vikram Singh",
    age: 35,
    location: "Delhi",
    beforeWeight: "105 kg",
    afterWeight: "82 kg",
    duration: "6 months",
    story: "What sets SVH apart is the AI-powered health insights. The Voice Assistant in Hindi made it so easy to track my nutrition. The smart meal plans and progress tracking transformed not just my body, but my entire lifestyle.",
    achievements: ["Lost 23 kg", "Visceral fat halved", "Better sleep"],
    gradient: "from-yellow-400/15 to-emerald-400/15",
  },
  {
    id: 4,
    name: "Ananya Reddy",
    age: 25,
    location: "Hyderabad",
    beforeWeight: "74 kg",
    afterWeight: "58 kg",
    duration: "3 months",
    story: "The nutrition scanner helped me understand what I was eating, and the AI meal generator created perfect vegetarian meal plans for me. My wellness score improved by 40% in just 3 months!",
    achievements: ["Lost 16 kg", "Wellness score +40%", "Glowing skin"],
    gradient: "from-pink-400/15 to-emerald-400/15",
  },
  {
    id: 5,
    name: "Karthik Sharma",
    age: 29,
    location: "Bangalore",
    beforeWeight: "90 kg",
    afterWeight: "75 kg",
    duration: "4 months",
    story: "As a software engineer, I had no time for complex diets. The habit tracker and smart reminders kept me on track. The 3D body model helped me visualize my progress area by area.",
    achievements: ["Lost 15 kg", "Hydration improved", "Stamina doubled"],
    gradient: "from-purple-400/15 to-emerald-400/15",
  },
  {
    id: 6,
    name: "Priya Joshi",
    age: 31,
    location: "Mumbai",
    beforeWeight: "85 kg",
    afterWeight: "68 kg",
    duration: "5 months",
    story: "After pregnancy, I wanted to get back in shape safely. The AI health risk indicator ensured my journey was safe, and the personalized protein recommendations helped me build lean muscle while losing fat.",
    achievements: ["Lost 17 kg", "Post-pregnancy recovery", "Core strength"],
    gradient: "from-cyan-400/15 to-emerald-400/15",
  },
];

const stats = [
  { label: "Total Transformations", value: "850+", icon: TrendingUp },
  { label: "Average Weight Lost", value: "18 kg", icon: Award },
  { label: "Average Duration", value: "4 months", icon: Calendar },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Real Results
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Inspiring <span className="text-gradient-green">Transformations</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Real stories from real members who transformed their health with AI-powered
              nutrition plans and personalized wellness tracking
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-border py-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center px-4 text-center"
              >
                <stat.icon className="mb-2 h-5 w-5 text-primary" />
                <span className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformations Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {transformations.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg"
              >
                {/* Before/After Header */}
                <div className={`flex items-center justify-between bg-gradient-to-r ${t.gradient} p-5`}>
                  <div className="text-center">
                    <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Before
                    </span>
                    <span className="mt-1 block font-heading text-2xl font-bold text-foreground">
                      {t.beforeWeight}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-xs font-semibold text-primary">{t.duration}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      After
                    </span>
                    <span className="mt-1 block font-heading text-2xl font-bold text-primary">
                      {t.afterWeight}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Age {t.age} • {t.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-primary/40" />
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
                      {t.story}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.achievements.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 px-8 py-14 text-center shadow-2xl sm:px-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
            <div className="relative">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Your Transformation Is Next
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Join hundreds who have already transformed their lives. Get your
                personalized AI wellness plan today.
              </p>
              <Link
                href="/consultation"
                className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-emerald-600 shadow-xl transition-all hover:shadow-2xl"
              >
                Start Your Transformation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
