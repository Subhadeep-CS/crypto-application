import { useQuery } from "@tanstack/react-query";
import { fetchAllCoinList } from "../../services/api";
import CoinMarketDataTable from "./CoinMarketDataTable";
import CoinMarketCategoryNavBar from "./CoinMarketCategoryNavBar";
import CustomizeFilterComponent from "./CustomizeFilterComponent";

const CoinMarketDataComponent: React.FC = () => {
  const { data: coinList, isLoading } = useQuery({
    queryKey: ["CoinList", { vs_currency: "usd" }],
    queryFn: fetchAllCoinList,
  });

  if (isLoading) {
    return;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="container-all flex justify-between items-center">
        <div className="w-4/5">
          <CoinMarketCategoryNavBar />
        </div>
        <div className="w-1/5">
          <CustomizeFilterComponent />
        </div>
      </div>
      <div>
        <CoinMarketDataTable allCoinList={coinList} />
      </div>
    </div>
  );
};

export default CoinMarketDataComponent;
