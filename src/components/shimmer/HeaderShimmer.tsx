import { Skeleton } from "../ui/skeleton";
const HeaderShimmer: React.FC = () => {
  return (
    <div className="custom-container">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="w-full">
          <Skeleton className="h-full w-full rounded-xl" />
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
        <Skeleton className="h-full w-full rounded-xl" />
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  );
};

export default HeaderShimmer;
