"use client";

import { Users, TrendingUp, AlertCircle, ArrowUpRight, Search } from "lucide-react";

export default function AssociateDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-muted-foreground">Welcome back. Here is your network's status.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Active Customers</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-heading text-4xl font-bold text-foreground">124</span>
            <span className="mb-1 flex items-center text-sm font-medium text-emerald-500">
              <ArrowUpRight className="h-3 w-3" /> 12%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Scans Pending Review</span>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-heading text-4xl font-bold text-foreground">8</span>
            <span className="mb-1 text-sm font-medium text-muted-foreground">Require attention</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Network Growth</span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-heading text-4xl font-bold text-foreground">+15</span>
            <span className="mb-1 text-sm font-medium text-muted-foreground">This month</span>
          </div>
        </div>
      </div>

      {/* Customer List Preview */}
      <div className="rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-heading text-lg font-bold text-foreground">Recent Customer Activity</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
        
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Last Scan</th>
                <th className="px-6 py-4 font-semibold">Goal Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "Sarah Jenkins", scan: "Today", status: "On Track", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { name: "Michael Chen", scan: "2 days ago", status: "Needs Review", color: "text-orange-500", bg: "bg-orange-500/10" },
                { name: "Emma Watson", scan: "1 week ago", status: "Stalled", color: "text-destructive", bg: "bg-destructive/10" },
              ].map((c, i) => (
                <tr key={i} className="transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-foreground">{c.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.scan}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.bg} ${c.color}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
