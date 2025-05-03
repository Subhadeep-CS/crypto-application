import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <div className="w-full border-b">
      {/* Left side (e.g. logo or title) */}
      <div className="container-all px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-8 w-32 rounded" />

        {/* Center (e.g. nav links) */}
        <div className="hidden md:flex gap-4">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>

        {/* Right side (e.g. avatar or action buttons) */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
