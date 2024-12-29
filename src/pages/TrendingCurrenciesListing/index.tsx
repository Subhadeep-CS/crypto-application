import TrendingCryptoCurrenciesTable from "./TrendingCryptoCurrenciesTable";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingCoinData } from "../../services/api";
const TrendingCurrenciesListing: React.FC = () => {
  const { data: trendingCoinData, isLoading } = useQuery({
    queryKey: ["TrendingData"],
    queryFn: fetchTrendingCoinData,
  });

  console.log(trendingCoinData);
  if (isLoading) {
    return;
  }
  return (
    <div className="container-all flex flex-col gap-8">
      <div id="header-compnent" className="mt-8">
        <h2 className="font-semibold text-xl text-black">
          Top Trending Cryptocurrencies Today
        </h2>
      </div>
      <div id="table-component">
        <TrendingCryptoCurrenciesTable
          trendingCoinData={trendingCoinData?.coins || []}
        />
      </div>
    </div>
  );
};

export default TrendingCurrenciesListing;
