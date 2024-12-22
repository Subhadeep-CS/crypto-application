import { useEffect, useState } from "react";
import {
  TopHeaderPropsData,
  MarketDominanceData,
  MarketCapPercentageData,
} from "./module";
import { Button } from "../components/ui/button";
import { Settings,User } from "lucide-react";

const TopHeader: React.FC<TopHeaderPropsData> = ({ topHeaderData }) => {
  const [marketDominanceData, setMarketDominanceData] =
    useState<MarketDominanceData>({ firstCoin: 0, secondCoin: 0 });
  const { active_cryptocurrencies, markets, market_cap_percentage } =
    topHeaderData;

  useEffect(() => {
    const keys = Object.keys(
      market_cap_percentage
    ) as (keyof MarketCapPercentageData)[];

    const firstCoinData: number | undefined = market_cap_percentage[keys[0]];
    const secondCoinData: number | undefined = market_cap_percentage[keys[1]];

    setMarketDominanceData((prevState) => ({
      ...prevState,
      firstCoin: firstCoinData,
      secondCoin: secondCoinData,
    }));
  }, [market_cap_percentage]);
  return (
    <div className="w-full flex justify-evenly items-center bg-white/80 backdrop-blur-lg border-b">
      <div id="crypto-topheader" className="flex gap-3 mx-4 my-2">
        <div className="text-title-xxxxsm">
          <p>
            Coins: <span className="font-bold">{active_cryptocurrencies}</span>
          </p>
        </div>
        <div className="text-title-xxxxsm">
          <p>
            Exchanges: <span className="font-bold">{markets}</span>
          </p>
        </div>
        <div className="text-title-xxxxsm">
          <p>
            Dominance:{" "}
            <span className="font-bold">
              {marketDominanceData?.firstCoin?.toFixed(2)} %
            </span>{" "}
            <span className="font-bold">
              {marketDominanceData?.secondCoin?.toFixed(2)} %
            </span>
          </p>
        </div>
        <div className="text-title-xxxxsm">
          <p>
            Coins: <span className="font-bold">{active_cryptocurrencies}</span>
          </p>
        </div>
        <div className="text-title-xxxxsm">
          <p>
            Coins: <span className="font-bold">{active_cryptocurrencies}</span>
          </p>
        </div>
      </div>
      <div id="logindata" className="flex gap-4 p-2">
        <div id="settings-button">
            <Button variant={"secondary"}><Settings/></Button>
        </div>
        <div id="login-button">
            <Button variant={"secondary"}><User /></Button>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
