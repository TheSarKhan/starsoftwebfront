export default function BlogPostLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-32 pb-24 animate-pulse">
      {/* Back link */}
      <div className="h-4 w-24 bg-mist rounded mb-10" />

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-mist rounded-md" />
        <div className="h-5 w-20 bg-mist rounded-md" />
      </div>

      {/* Title */}
      <div className="h-10 w-full bg-[var(--color-hairline-strong)] rounded-xl mb-3" />
      <div className="h-10 w-4/5 bg-[var(--color-hairline-strong)] rounded-xl mb-6" />

      {/* Meta */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-4 w-24 bg-mist rounded" />
        <div className="h-4 w-1 bg-mist rounded" />
        <div className="h-4 w-28 bg-mist rounded" />
        <div className="h-4 w-1 bg-mist rounded" />
        <div className="h-4 w-20 bg-mist rounded" />
      </div>

      {/* Cover image */}
      <div className="h-72 w-full bg-mist rounded-2xl mb-10" />

      {/* Article body */}
      <div className="space-y-3">
        {[100, 90, 75, 95, 60, 100, 80, 70, 88, 55, 100, 85].map((w, i) => (
          <div
            key={i}
            className="h-4 bg-mist rounded"
            style={{ width: `${w}%` }}
          />
        ))}
        <div className="pt-4" />
        {[95, 70, 100, 82, 60].map((w, i) => (
          <div
            key={`b${i}`}
            className="h-4 bg-mist rounded"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}
