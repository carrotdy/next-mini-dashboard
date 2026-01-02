export default function Loading() {
    return (
      <div className="min-h-[60vh] px-6 pb-12 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-7 w-32 animate-pulse rounded bg-zinc-100" />
          <div className="h-9 w-24 animate-pulse rounded bg-zinc-100" />
        </div>
  
        <div className="mb-6">
          <div className="h-6 w-48 animate-pulse rounded bg-zinc-100" />
          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-zinc-100" />
        </div>
  
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-zinc-100" />
            <div className="mt-3 h-7 w-32 animate-pulse rounded bg-zinc-100" />
            <div className="mt-4 h-4 w-20 animate-pulse rounded bg-zinc-100" />
          </div>
  
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
            <div className="mt-3 h-7 w-28 animate-pulse rounded bg-zinc-100" />
            <div className="mt-4 h-4 w-24 animate-pulse rounded bg-zinc-100" />
          </div>
        </div>
  
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3">
            <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
          </div>
  
          <div className="divide-y divide-zinc-100 px-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="py-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100" />
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-zinc-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  