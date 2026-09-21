"use client";

import { Sparkles, Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Alerts</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your reminders and account alerts.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="glass rounded-3xl p-8 border border-border text-center">
          <Bell className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">You have no new notifications.</p>
        </div>
      </div>
    </div>
  );
}
