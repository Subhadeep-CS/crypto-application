import TrendingComponent from "./TrendingComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingCoinData } from "../../../services/api";
import TopGainerComponent from "./TopGainerComponent";
import TotalMarketCapData from "./TotalMarketCapData";

const BannerComponent: React.FC = () => {
  const { data: trendingCoinData, isLoading } = useQuery({
    queryKey: ["TrendingData"],
    queryFn: fetchTrendingCoinData,
  });

  if (isLoading) {
    return;
  }
  return (
    <div className="container">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-semibold text-3xl">
          Cryptocurrency Prices By Market Cap
        </h2>
        <p className="text-md">
          The global cryptocurrency market cap today is $30 trillion
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <TotalMarketCapData />

        {/* Trending Component */}

        <TrendingComponent trendingCoinData={trendingCoinData?.coins} />

        {/* Top Gainer Component */}
        <TopGainerComponent topGainerCoinData={trendingCoinData?.nfts} />
      </div>
    </div>
  );
};

export default BannerComponent;
