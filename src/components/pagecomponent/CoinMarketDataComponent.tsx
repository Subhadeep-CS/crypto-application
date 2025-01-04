import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCoinList } from "../../services/api";
import CoinMarketDataTable from "./CoinMarketDataTable";
import CoinMarketCategoryNavBar from "./CoinMarketCategoryNavBar";
import CustomizeFilterComponent from "./CustomizeFilterComponent";
import { CustomiseDropdownChange } from "./module";
import { useCoinListData } from "../../zustand/store";
import PaginationComponent from "./PaginationComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

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
    <div className="flex flex-col gap-2">
      <div className="container-all flex justify-between items-center overflow-x-auto">
        <CoinMarketCategoryNavBar />
        <CustomizeFilterComponent
          dropdownChange={dropdownChange}
          setDropdownChange={setDropdownChange}
        />
      </div>
      <div>
        <CoinMarketDataTable
          allCoinList={coinList}
          dropdownChange={dropdownChange}
        />
        <div className="w-full flex justify-between items-center">
          <p className="whitespace-nowrap text-sm">
            Show 1 to 100 of 16,388 results
          </p>
          <PaginationComponent />
          <Label
            htmlFor="rows"
            className=" bg-secondary border mr-2 border-none text-muted-foreground focus:ring-0 focus:bg-secondary/80"
          >
            Rows:{" "}
          </Label>
          <Select>
            <SelectTrigger className="w-24 bg-secondary border mr-2 border-none focus:ring-0 focus:bg-secondary/80">
              <SelectValue placeholder="50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="300">300</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CoinMarketDataComponent;
