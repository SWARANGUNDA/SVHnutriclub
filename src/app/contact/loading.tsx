import { PageHeroSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function ContactLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      {/* Info cards */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
      {/* Form + Sidebar */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <Skeleton className="h-[500px] rounded-3xl lg:col-span-3" />
            <div className="flex flex-col gap-6 lg:col-span-2">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-52 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
