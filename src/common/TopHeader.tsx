import React from "react";
import { useEffect, useState } from "react";
import {
  TopHeaderPropsData,
  MarketDominanceData,
  MarketCapPercentageData,
} from "./module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/ui/button";
import { Settings, User } from "lucide-react";
import {
  useGlobalMarketDominance,
  useGlobalMarketStore,
} from "../zustand/store";

const TopHeader: React.FC<TopHeaderPropsData> = ({ topHeaderData }) => {
  const [marketDominanceData, setMarketDominanceData] = useState<
    MarketDominanceData[]
  >([{ coinName: "", coinData: 0 }]);
  const setGlobalMarketDominanceData = useGlobalMarketDominance(
    (state) => state.setGlobalMarketDominance
  );
  const globalMarketData = useGlobalMarketStore(
    (state) => state.globalMarketData
  );
  const { active_cryptocurrencies, markets, market_cap_percentage } =
    topHeaderData;

  useEffect(() => {
    const keys = Object.keys(
      market_cap_percentage
    ) as (keyof MarketCapPercentageData)[];

    const firstCoinData: number | undefined = market_cap_percentage[keys[0]];
    const secondCoinData: number | undefined = market_cap_percentage[keys[1]];

    const newState = [
      { coinName: keys[0], coinData: firstCoinData },
      { coinName: keys[1], coinData: secondCoinData },
    ];
    setGlobalMarketDominanceData(newState);
    setMarketDominanceData([...newState]);
  }, [market_cap_percentage]);
  return (
    <div className="container-all flex justify-between items-center bg-white/80 backdrop-blur-lg">
      <div className="flex gap-3 my-2 overflow-x-auto">
        <div className="text-sm whitespace-nowrap">
          <p className="text-muted-foreground sm:text-xs">
            Coins:{" "}
            <span className="font-semibold text-black sm:text-xs">
              {active_cryptocurrencies}
            </span>
          </p>
        </div>
        <div className="text-sm whitespace-nowrap">
          <p className="text-muted-foreground sm:text-xs">
            Exchanges:{" "}
            <span className="font-semibold text-black sm:text-xs">
              {markets}
            </span>
          </p>
        </div>
        <div className="text-sm whitespace-nowrap">
          <p className="text-muted-foreground sm:text-xs">
            Market Cap:{" "}
            <span className="font-semibold text-black sm:text-xs">
              ${(globalMarketData.total_market_cap / 1e12).toFixed(2)}T
            </span>
            <span
              className={`${
                globalMarketData.market_cap_change_percentage_24h_usd < 0
                  ? "text-red-500"
                  : "text-green-500"
              } mx-2 sm:text-xs`}
            >
              {globalMarketData.market_cap_change_percentage_24h_usd < 0 ? (
                <FontAwesomeIcon icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon icon={faCaretUp} />
              )}{" "}
              {globalMarketData.market_cap_change_percentage_24h_usd.toFixed(2)}
              %
            </span>
          </p>
        </div>
        <div className="text-sm sm:text-xs whitespace-nowrap">
          <p className="text-muted-foreground sm:text-xs">
            24h Vol:{" "}
            <span className="text-black font-semibold sm:text-xs">
              ${(globalMarketData.total_trading_volume / 1e12).toFixed(2)}T
            </span>
          </p>
        </div>
        <div className="text-sm sm:text-xs whitespace-nowrap">
          {marketDominanceData.length !== 0 && (
            <p className="text-muted-foreground sm:text-xs">
              Dominance:{" "}
              {marketDominanceData.map((dominanceData, index) => (
                <React.Fragment key={index}>
                  <span className="font-semibold text-black sm:text-xs">
                    {dominanceData?.coinName?.toLocaleUpperCase()}
                  </span>{" "}
                  <span className="font-semibold text-black sm:text-xs">
                    {dominanceData?.coinData?.toFixed(2)}%
                  </span>{" "}
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </div>
      <div
        id="logindata"
        className="justify-end items-center gap-4 p-2 hidden sm:flex"
      >
        <div id="settings-button">
          <Button variant={"secondary"}>
            <Settings />
          </Button>
        </div>
        <div id="login-button">
          <Button variant={"secondary"}>
            <User />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
