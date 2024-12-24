import TrendingComponent from "./TrendingComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingCoinData } from "../../services/api";
import TopGainerComponent from "./TopGainerComponent";
import TotalMarketCapData from "./TotalMarketCapData";
import { useGlobalMarketStore } from "../../zustand/store";

const BannerComponent: React.FC = () => {
  const { data: trendingCoinData, isLoading } = useQuery({
    queryKey: ["TrendingData"],
    queryFn: fetchTrendingCoinData,
  });

  const globalMarketData = useGlobalMarketStore(
    (state) => state.globalMarketData
  );
  if (isLoading) {
    return;
  }
  return (
    <div className="container-all flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-semibold text-3xl">
          Cryptocurrency Prices By Market Cap
        </h2>
        <p className="text-title-sm">
          The global cryptocurrency market cap today is $ $
          {(globalMarketData.total_market_cap / 1e12).toFixed(2)} Trillion,a
          0.0% change in the last 24 hours
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <TotalMarketCapData />
        <TrendingComponent trendingCoinData={trendingCoinData?.coins} />
        <TopGainerComponent topGainerCoinData={trendingCoinData?.nfts} />
      </div>
    </div>
  );
};

export default BannerComponent;
