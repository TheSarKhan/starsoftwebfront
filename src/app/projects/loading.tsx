export default function ProjectsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="relative max-w-3xl mx-auto px-4 text-center animate-pulse">
          <div className="h-4 w-24 bg-[var(--color-hairline-strong)] rounded mx-auto mb-5" />
          <div className="h-12 w-2/3 bg-[var(--color-hairline-strong)] rounded-xl mx-auto mb-4" />
          <div className="h-12 w-1/2 bg-[var(--color-hairline-strong)] rounded-xl mx-auto mb-6" />
          <div className="h-5 w-3/4 bg-mist rounded mx-auto mb-2" />
          <div className="h-5 w-1/2 bg-mist rounded mx-auto" />
        </div>
      </section>

      {/* Project cards skeleton */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-[var(--color-hairline)] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-mist" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-[var(--color-hairline-strong)] rounded" />
                  <div className="h-6 w-3/4 bg-[var(--color-hairline-strong)] rounded" />
                  <div className="h-4 w-full bg-mist rounded" />
                  <div className="h-4 w-5/6 bg-mist rounded" />
                  <div className="h-4 w-2/3 bg-mist rounded" />
                  <div className="flex gap-1.5 pt-1">
                    <div className="h-5 w-14 bg-mist rounded-md" />
                    <div className="h-5 w-16 bg-mist rounded-md" />
                    <div className="h-5 w-10 bg-mist rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
