export function SkeletonCard({ aspect = "video" }: { aspect?: "video" | "poster" }) {
  return (
    <div
      className={`skeleton-shimmer rounded ${aspect === "video" ? "aspect-video" : "aspect-[2/3]"}`}
    />
  );
}

export function SkeletonRow() {
  return (
    <div className="px-4 md:px-12 my-8">
      <div className="h-5 w-48 skeleton-shimmer rounded mb-3" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="shrink-0 w-[180px] md:w-[240px]">
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
}
