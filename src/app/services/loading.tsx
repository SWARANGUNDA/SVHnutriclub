import { PageHeroSkeleton, ServiceCardSkeleton } from "@/components/shared/Skeletons";

export default function ServicesLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
