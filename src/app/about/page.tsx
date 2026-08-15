"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Users, Leaf, Award, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Story
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              About <span className="text-gradient-green">SVH Nutrition Club</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We&apos;re on a mission to transform lives through the perfect blend of 
              world-class nutrition and cutting-edge AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 hover:shadow-premium transition-all duration-500"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To empower every individual to achieve their optimal health through 
                personalized nutrition guidance, AI-driven insights, and premium Herbalife 
                products. We believe everyone deserves access to intelligent wellness tools 
                that make healthy living simple, enjoyable, and effective.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 hover:shadow-premium transition-all duration-500"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">Our Vision</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                To become the most trusted AI-powered wellness platform in India, where 
                technology meets nutrition to create lasting health transformations. We envision 
                a future where personalized wellness is accessible to everyone, in every language.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-section py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Our <span className="text-gradient-green">Core Values</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Trust", desc: "Science-backed nutrition with transparent ingredients" },
              { icon: Users, title: "Community", desc: "A supportive network for your wellness journey" },
              { icon: Leaf, title: "Wellness", desc: "Holistic approach to health and nutrition" },
              { icon: Award, title: "Excellence", desc: "Premium products and cutting-edge technology" },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass group rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join our growing community and transform your health today
          </p>
          <Link
            href="/consultation"
            className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            Book Free Consultation
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
