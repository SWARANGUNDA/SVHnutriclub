"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    description: "Mon-Sat, 9am to 8pm IST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@svhnutritionclub.com",
    href: "mailto:hello@svhnutritionclub.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, Telangana, India",
    href: null,
    description: "Visit us at our wellness center",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Sat: 9AM - 8PM",
    href: null,
    description: "Sunday by appointment only",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to send message");
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Get In Touch
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Contact <span className="text-gradient-green">Us</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Have questions about our products, services, or your wellness journey?
              We&apos;re here to help every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass group rounded-2xl p-5 text-center transition-all duration-500 hover:shadow-premium"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {info.label}
                </p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="mt-1 block text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-foreground">{info.value}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-3xl p-8">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Send Us a Message
                  </h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-primary/5 p-10 text-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Your full name"
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
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Subject *
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">Select a subject</option>
                          <option value="products">Product Inquiry</option>
                          <option value="consultation">Consultation Booking</option>
                          <option value="membership">Membership</option>
                          <option value="ai-features">AI Features</option>
                          <option value="support">Technical Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-emerald-500/25 hover:shadow-xl"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                    {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 lg:col-span-2"
            >
              {/* Map placeholder */}
              <div className="glass relative flex h-64 items-center justify-center overflow-hidden rounded-2xl lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />
                <div className="relative text-center">
                  <MapPin className="mx-auto h-10 w-10 text-primary" />
                  <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                    Hyderabad
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Telangana, India
                  </p>
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Frequently Asked
                </h3>
                <div className="mt-4 space-y-3">
                  {[
                    "How do I book a consultation?",
                    "Are the AI features free?",
                    "Can I return products?",
                    "Do you ship nationwide?",
                  ].map((q) => (
                    <button
                      key={q}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                    >
                      {q}
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
