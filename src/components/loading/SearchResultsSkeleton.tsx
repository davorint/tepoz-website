import { Skeleton } from '@/components/ui/skeleton'

export function SearchResultSkeleton() {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex gap-4">
      {/* Image */}
      <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      {/* Action button */}
      <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
    </div>
  )
}

export function SearchResultsSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SearchResultSkeleton key={i} />
      ))}
    </div>
  )
}

export function SearchPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Search header */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-12 w-full max-w-2xl" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <SearchResultsSkeletonList count={6} />
        </div>
      </div>
    </div>
  )
}
