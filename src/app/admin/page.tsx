"use client";

import { Activity, Server, Users, ShieldAlert, Cpu } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">System Command</h1>
        <p className="mt-1 text-zinc-400">Global overview of SVH Platform Health.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-black p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Active Associates</span>
            <Users className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="mt-4">
            <span className="font-heading text-3xl font-bold text-white">42</span>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-black p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Total Customers</span>
            <Users className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="mt-4">
            <span className="font-heading text-3xl font-bold text-white">4,892</span>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-500">API Health</span>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4">
            <span className="font-heading text-3xl font-bold text-emerald-500">99.9%</span>
            <p className="mt-1 text-xs text-emerald-500/70">All systems operational</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-black p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">AI Tokens Used</span>
            <Cpu className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="mt-4">
            <span className="font-heading text-3xl font-bold text-white">1.2M</span>
            <p className="mt-1 text-xs text-zinc-500">This billing cycle</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-black p-6">
          <h2 className="mb-4 font-heading text-lg font-bold text-white">Recent Security Logs</h2>
          <div className="space-y-4">
            {[
              { event: "Admin Login", ip: "192.168.1.1", time: "2 mins ago", status: "success" },
              { event: "Failed Login Attempt", ip: "45.22.11.9", time: "14 mins ago", status: "fail" },
              { event: "Role Escalation Blocked", ip: "10.0.0.5", time: "1 hour ago", status: "fail" },
              { event: "DB Backup Completed", ip: "System", time: "4 hours ago", status: "success" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{log.event}</p>
                  <p className="text-xs text-zinc-500">{log.ip} • {log.time}</p>
                </div>
                {log.status === "fail" ? (
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                ) : (
                  <Server className="h-4 w-4 text-emerald-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
