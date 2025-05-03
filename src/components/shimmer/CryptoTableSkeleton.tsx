import { Skeleton } from "../ui/skeleton";

const CryptoTableSkeleton = () => {
  return (
    <div className="w-full px-4">
      {/* Table Header */}
      <div className="grid grid-cols-9 gap-4 py-2 border-b text-sm font-semibold text-gray-500">
        <span>Rank</span>
        <span>Coin</span>
        <span>Price</span>
        <span>1h</span>
        <span>24h</span>
        <span>7d</span>
        <span>24h Volume</span>
        <span>Market Cap</span>
        <span>Last 7 Days</span>
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-9 gap-4 items-center py-4 border-b"
        >
          <Skeleton className="h-4 w-6" /> {/* Rank */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" /> {/* Coin Icon */}
            <Skeleton className="h-4 w-20" /> {/* Coin Name */}
          </div>
          <Skeleton className="h-4 w-20" /> {/* Price */}
          <Skeleton className="h-4 w-10" /> {/* 1h */}
          <Skeleton className="h-4 w-10" /> {/* 24h */}
          <Skeleton className="h-4 w-10" /> {/* 7d */}
          <Skeleton className="h-4 w-24" /> {/* Volume */}
          <Skeleton className="h-4 w-28" /> {/* Market Cap */}
          <Skeleton className="h-8 w-full" /> {/* 7-day sparkline chart */}
        </div>
      ))}
    </div>
  );
};

export default CryptoTableSkeleton;
