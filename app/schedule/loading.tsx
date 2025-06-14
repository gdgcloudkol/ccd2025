export default function ScheduleLoading() {
  return (
    <div className="mt-8">
      {/* Loading skeleton */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full">
          {/* Tab skeleton */}
          <div className="h-12 min-w-full w-max border-b-[1px] border-[--border] flex my-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-base font-medium px-6 h-full pt-3">
                <div className="h-4 bg-[--muted] rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex w-full">
                <div className="w-1/4 lg:w-1/5 border-b-[1px] lg:border-r-[0px] border-[--border] flex flex-col items-end px-3 py-3 bg-[--muted]/30">
                  <div className="h-4 bg-[--muted] rounded w-16 animate-pulse mb-1"></div>
                  <div className="h-3 bg-[--muted] rounded w-12 animate-pulse"></div>
                </div>
                <div className="w-3/4 lg:w-4/5 flex flex-col p-3 border-b-[1px] border-[--border] grow">
                  <div className="h-3 bg-[--muted] rounded w-20 animate-pulse mb-2"></div>
                  <div className="h-6 bg-[--muted] rounded w-3/4 animate-pulse mb-2"></div>
                  <div className="h-4 bg-[--muted] rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 