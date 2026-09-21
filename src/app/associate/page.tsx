"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AssociateDashboardPage() {
  const statCards = [
    { title: "My Customers", value: "24", icon: Users, color: "from-blue-500 to-cyan-500" },
    { title: "Active Plans", value: "18", icon: Target, color: "from-emerald-500 to-teal-500" },
    { title: "Upcoming Consultations", value: "3", icon: Calendar, color: "from-amber-500 to-orange-500" },
    { title: "Weekly Volume", value: "1,250", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-hero py-12">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-4xl font-bold text-foreground">
                Associate Dashboard
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage your customers, track progress, and grow your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                    stat.color
                  )}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </h3>
                <p className="mt-1 font-heading text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for Customer List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Recent Customers
              </h3>
              <p className="text-sm text-muted-foreground">
                Customers currently assigned to you
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Users className="mb-4 h-12 w-12 opacity-20" />
            <p>Your customer list will appear here.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
