import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCoinList } from "../../services/api";
import CoinMarketDataTable from "./CoinMarketDataTable";
import CoinMarketCategoryNavBar from "./CoinMarketCategoryNavBar";
import CustomizeFilterComponent from "./CustomizeFilterComponent";
import { CustomiseDropdownChange } from "./module";
import { useCoinListData } from "../../zustand/store";

const CoinMarketDataComponent: React.FC = () => {
  const coinListPerPagedata = useCoinListData((state) => state.coinListPerPage);
  const { data: coinList, isLoading } = useQuery({
    queryKey: [
      "CoinList",
      { vs_currency: "usd", per_page: coinListPerPagedata },
    ],
    queryFn: fetchAllCoinList,
  });

  const [dropdownChange, setDropdownChange] = useState<CustomiseDropdownChange>(
    {
      "30d": false,
      FDV: false,
      "Market Cap/FDV": false,
    }
  );
  if (isLoading) {
    return;
  }
  return (
    <div className="container-all flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="w-4/5 mt-8 mb-4">
          <CoinMarketCategoryNavBar />
        </div>
        <div className="w-1/5">
          <CustomizeFilterComponent
            dropdownChange={dropdownChange}
            setDropdownChange={setDropdownChange}
          />
        </div>
      </div>
      <div>
        <CoinMarketDataTable
          allCoinList={coinList}
          dropdownChange={dropdownChange}
        />
      </div>
    </div>
  );
};

export default CoinMarketDataComponent;
