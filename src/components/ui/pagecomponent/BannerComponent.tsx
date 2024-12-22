import TrendingComponent from "./TrendingComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingCoinData } from "../../../services/api";

const BannerComponent: React.FC = () => {
  const { data: trendingCoinData, isLoading } = useQuery({
    queryKey: ["TrendingData"],
    queryFn: fetchTrendingCoinData,
  });

  if (isLoading) {
    return;
  }
  return (
    <div className="container-fluid max-h-64 flex flex-col gap-10">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-semibold text-3xl">
          Cryptocurrency Prices By Market Cap
        </h2>
        <p className="text-md">
          The global cryptocurrency market cap today is $30 trillion
        </p>
      </div>
      <div className="flex gap-2">
        <div></div>
        <div>
          <TrendingComponent trendingCoinData={trendingCoinData?.coins} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BannerComponent;
