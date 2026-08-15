import { Skeleton } from "@/components/shared/Skeletons";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-hero py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-2 h-8 w-64" />
          <Skeleton className="mt-1 h-4 w-48" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Health Score */}
        <Skeleton className="h-36 rounded-3xl" />
        {/* Metric Cards */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        {/* Insights */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
