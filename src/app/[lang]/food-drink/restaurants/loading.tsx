import { BusinessCardSkeletonGrid } from '@/components/loading/BusinessCardSkeleton'

export default function RestaurantsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page header skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-12 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
        <div className="h-5 w-96 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <div className="mb-6 flex gap-3">
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
        <div className="h-10 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
        <div className="h-10 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
      </div>

      {/* Business cards grid */}
      <BusinessCardSkeletonGrid count={9} />
    </div>
  )
}
