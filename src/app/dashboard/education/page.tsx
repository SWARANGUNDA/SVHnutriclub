"use client";

import { Sparkles, BookOpen, Video, FileText } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Learning</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Education Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">Learn about nutrition, body scans, and wellness.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Video, title: "Video Lessons", count: "12 videos" },
            { icon: FileText, title: "Articles", count: "24 articles" },
            { icon: BookOpen, title: "Nutrition Guides", count: "5 guides" }
          ].map((item, i) => (
            <div key={i} className="glass rounded-3xl p-6 border border-border hover:ring-1 hover:ring-primary/50 transition-all cursor-pointer">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
