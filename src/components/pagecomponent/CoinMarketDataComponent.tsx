import { useQuery } from "@tanstack/react-query";
import { fetchAllCoinList } from "../../services/api";
import CoinMarketDataTable from "./CoinMarketDataTable";

const CoinMarketDataComponent: React.FC = () => {
  const { data: coinList, isLoading } = useQuery({
    queryKey: ["CoinList", { vs_currency: "usd" }],
    queryFn: fetchAllCoinList,
  });

  if (isLoading) {
    return;
  }
  return (
    <>
      <CoinMarketDataTable allCoinList={coinList} />
    </>
  );
};

export default CoinMarketDataComponent;
