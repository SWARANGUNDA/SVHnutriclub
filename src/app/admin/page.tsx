"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  Calendar,
  ShoppingBag,
  TrendingUp,
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

const mockUserData = [
  { name: "Mon", users: 120, active: 80 },
  { name: "Tue", users: 150, active: 100 },
  { name: "Wed", users: 180, active: 120 },
  { name: "Thu", users: 170, active: 140 },
  { name: "Fri", users: 210, active: 160 },
  { name: "Sat", users: 250, active: 200 },
  { name: "Sun", users: 280, active: 220 },
];

const mockSalesData = [
  { name: "Week 1", sales: 4000 },
  { name: "Week 2", sales: 3000 },
  { name: "Week 3", sales: 5000 },
  { name: "Week 4", sales: 7000 },
];

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalUsers: 2405, activeScans: 842, consultations: 156, totalSales: 45231 }); // defaults that get overwritten

  useEffect(() => {
    fetchDataAndGenerateSummary();
  }, []);

  async function fetchDataAndGenerateSummary() {
    setLoading(true);
    let currentStats = stats;
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const data = await res.json();
        if (data.totalUsers !== undefined) {
           currentStats = {
             totalUsers: data.totalUsers || 0,
             activeScans: data.activeScans || 0,
             consultations: data.consultations || 0,
             totalSales: data.totalSales || 0
           };
           setStats(currentStats);
        }
      }
    } catch (e) {
      console.error("Failed to fetch analytics:", e);
    }

    try {
      const summaryRes = await fetch("/api/admin/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics: currentStats })
      });
      if (summaryRes.ok) {
        const data = await summaryRes.json();
        setAiSummary(data.summary || "Unable to generate summary.");
      } else {
        setAiSummary("Failed to generate summary due to API error.");
      }
    } catch (e) {
       console.error("Failed to generate summary:", e);
       setAiSummary("AI Summary currently unavailable.");
    }
    setLoading(false);
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "--",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Scans",
      value: stats.activeScans.toLocaleString(),
      change: "--",
      trend: "up",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Consultations",
      value: stats.consultations.toLocaleString(),
      change: "--",
      trend: "up",
      icon: Calendar,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Total Sales",
      value: `$${stats.totalSales.toLocaleString()}`,
      change: "--",
      trend: "up",
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  AI Analytics Dashboard
                </span>
              </div>
              <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
                Platform Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Real-time insights and AI-generated performance summaries.
              </p>
            </div>
            <button
              onClick={fetchDataAndGenerateSummary}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh Data
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* AI Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass glow-green relative overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-lg font-bold text-foreground">
                AI Executive Summary
              </h2>
              {loading ? (
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
                </div>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {aiSummary}
                </p>
              )}
            </div>
          </div>
        </motion.div>

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
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                    stat.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-red-500/10 text-red-500"
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
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

        {/* Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  User Growth & Activity
                </h3>
                <p className="text-sm text-muted-foreground">
                  New vs Active users this week
                </p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockUserData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                  <Area type="monotone" dataKey="active" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Product Sales
                </h3>
                <p className="text-sm text-muted-foreground">
                  Monthly revenue overview
                </p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
