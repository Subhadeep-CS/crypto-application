import { useGlobalMarketStore } from "../../../zustand/store";
import TotalMarketVolumeCardComponent from "./TotalMarketVolumeCardComponent";

const TotalMarketCapData: React.FC = () => {
  const golbalMarketData = useGlobalMarketStore(
    (state) => state.globalMarketData
  );
  console.log(golbalMarketData);
  return (
    <div className="flex flex-col justify-between">
      <TotalMarketVolumeCardComponent
        cardTitle={golbalMarketData.total_market_cap}
        cardDescription={"Market Cap"}
        cardDataChange={golbalMarketData.market_cap_change_percentage_24h_usd}
      />
      <TotalMarketVolumeCardComponent
        cardTitle={golbalMarketData.total_trading_volume}
        cardDescription={"24h Tading Volume"}
      />
    </div>
  );
};

export default TotalMarketCapData;
