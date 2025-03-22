import TrendingComponent from "./TrendingComponent";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingCoinData } from "../../services/api";
import TopGainerComponent from "./TopGainerComponent";
import TotalMarketCapData from "./TotalMarketCapData";
import {
  useGlobalCategoryData,
  useGlobalMarketDominance,
  useGlobalMarketStore,
} from "../../zustand/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import SwitchComponent from "./SwitchComponent";
import { Label } from "../ui/label";

const BannerComponent: React.FC = () => {
  const {
    data: trendingCoinData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["TrendingData"],
    queryFn: fetchTrendingCoinData,
  });
  const globalMarketData = useGlobalMarketStore(
    (state) => state.globalMarketData
  );
  const globalMarketDominance = useGlobalMarketDominance(
    (state) => state.globalMarketDominance
  );

  const setGlobalCategoryData = useGlobalCategoryData(
    (state) => state.setGlobalCategoryData
  );

  const [readMore, setReadMore] = useState<boolean>(false);
  const [highlights, setHighlights] = useState<boolean>(true);
  const handleReadMoreClick = () => {
    setReadMore((prevReadMore) => !prevReadMore);
  };

  const handleHighlightChange = (id: string, checked: boolean) => {
    console.log(id);
    console.log(checked);
    if (id === "highlights") {
      setHighlights(checked);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const categoryData = trendingCoinData?.categories;
      if (categoryData) {
        setGlobalCategoryData(categoryData);
      }
    }
  }, [isSuccess]);

  if (isLoading) {
    return;
  }
  return (
    <div className="container-all flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-1.5">
        <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row justify-between gap-1">
          <div>
            <h2 className="font-semibold text-md sm:text-xl">
              Cryptocurrency Prices By Market Cap
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              The global cryptocurrency market cap today is $
              {(globalMarketData.total_market_cap / 1e12).toFixed(2)} Trillion,
              a
              <span
                className={`${
                  globalMarketData.market_cap_change_percentage_24h_usd < 0
                    ? "text-red-500"
                    : "text-green-500"
                } mx-2 text-xs sm:text-sm`}
              >
                {globalMarketData.market_cap_change_percentage_24h_usd < 0 ? (
                  <FontAwesomeIcon icon={faCaretDown} />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}{" "}
                {globalMarketData.market_cap_change_percentage_24h_usd.toFixed(
                  2
                )}
                %
              </span>
              change in the last 24 hours.{" "}
              <span
                className={`underline cursor-pointer font-bold ${
                  readMore
                    ? "text-green-500 hover:text-black"
                    : "text-black hover:text-green-500"
                } text-xs sm:text-sm`}
                onClick={handleReadMoreClick}
              >
                {readMore ? "Hide" : "Read More"}
              </span>
            </p>
            <div
              className={`transition-all duration-500 ease-in-out ${
                readMore
                  ? "opacity-100 max-h-screen transform scale-100"
                  : "opacity-0 max-h-0 transform scale-95 overflow-hidden"
              } my-2`}
            >
              {readMore && (
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Total cryptocurrency trading volume in the last day is at
                  <span className="mx-2 text-bold text-black text-xs sm:text-sm">
                    ${(globalMarketData.total_trading_volume / 1e9).toFixed(3)}{" "}
                    Billion.
                  </span>
                  Bitcoin dominance is at{" "}
                  <span className="text-bold text-black text-xs sm:text-sm">
                    {globalMarketDominance[0]?.coinData?.toFixed(2)}%
                  </span>{" "}
                  and Ethereum dominance is at{" "}
                  <span className="text-bold text-black text-xs sm:text-sm">
                    {globalMarketDominance[1]?.coinData?.toFixed(2)}%
                  </span>{" "}
                  . CoinFeko is now tracking{" "}
                  <span className="text-black font-bold text-xs sm:text-sm">
                    {globalMarketData.total_crypto_currencies}
                  </span>{" "}
                  cryptocurrencies. The largest gainers in the industry right
                  now are XRP Ledger Ecosystem and Airdropped Tokens by NFT
                  Projects cryptocurrencies.
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-start sm:justify-center items-center">
            <Label htmlFor="highlights" className="mr-2 sm:text-base text-md">
              Highlights
            </Label>
            <SwitchComponent
              id="highlights"
              checked={highlights}
              onChangeChecked={handleHighlightChange}
            />
          </div>
        </div>
      </div>
      {highlights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <TotalMarketCapData />
          <TrendingComponent trendingCoinData={trendingCoinData?.coins} />
          <TopGainerComponent topGainerCoinData={trendingCoinData?.nfts} />
        </div>
      )}
    </div>
  );
};

export default BannerComponent;
