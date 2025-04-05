import { lazy, useMemo, useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCoinList } from "../../services/api";
import CoinMarketCategoryNavBar from "./CoinMarketCategoryNavBar";
import CustomizeFilterComponent from "./CustomizeFilterComponent";
import { CustomiseDropdownChange } from "./module";
import PaginationComponent from "./PaginationComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { PAGE_LIMIT } from "../../utils/constant";
import { useGlobalMarketStore } from "../../zustand/store";
import HeaderShimmer from "../shimmer/HeaderShimmer";
const CoinMarketDataTable = lazy(() => import("./CoinMarketDataTable"));

const CoinMarketDataComponent: React.FC = () => {
  const { globalMarketData } = useGlobalMarketStore();
  const [selectRow, setSelectRow] = useState<string>(PAGE_LIMIT);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = useMemo(
    () =>
      Math.floor(globalMarketData?.total_crypto_currencies / Number(selectRow)),
    [globalMarketData, selectRow]
  );
  const { data: coinList, isLoading } = useQuery({
    queryKey: [
      "CoinList",
      { vs_currency: "usd", per_page: selectRow, page: currentPage },
    ],
    queryFn: fetchAllCoinList,
    placeholderData: (previousData) => previousData,
  });

  const [dropdownChange, setDropdownChange] = useState<CustomiseDropdownChange>(
    {
      "30d": false,
      FDV: false,
      "Market Cap/FDV": false,
    }
  );

  if (isLoading) {
    return <HeaderShimmer />;
  }
  return (
    <div className="flex flex-col gap-2 my-4">
      <div className="container-all flex justify-between items-center overflow-x-auto my-4">
        <CoinMarketCategoryNavBar />
        <CustomizeFilterComponent
          dropdownChange={dropdownChange}
          setDropdownChange={setDropdownChange}
        />
      </div>
      <div className="container-all">
        <Suspense fallback={<div>Loading...</div>}>
          <CoinMarketDataTable
            allCoinList={coinList}
            dropdownChange={dropdownChange}
          />
        </Suspense>
        <div className="flex justify-between items-cente flex-wrap">
          <p className="whitespace-nowrap text-xs hidden sm:block">
            Show 1 to {selectRow} of {globalMarketData?.total_crypto_currencies}{" "}
            results
          </p>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className="hidden sm:flex">
            <Label
              htmlFor="rows"
              className="border mr-2 border-none text-muted-foreground flex justify-center items-center text-xs"
            >
              Rows:{" "}
            </Label>
            <Select
              onValueChange={(value) => setSelectRow(value)}
              value={selectRow}
            >
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
    </div>
  );
};

export default CoinMarketDataComponent;
