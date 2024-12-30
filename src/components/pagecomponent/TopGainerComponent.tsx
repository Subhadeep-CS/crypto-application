import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CircleChevronRight } from "lucide-react";
import { TopGainerComponentProps } from "./module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const TopGainerComponent: React.FC<TopGainerComponentProps> = ({
  topGainerCoinData,
}) => {
  return (
    <Card className="shadow-md bg-white rounded-lg">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <div>🚀 Top NFTS</div>
            <div className="flex justify-center items-center gap-2 hover:text-green-500 cursor-pointer">
              View More <CircleChevronRight />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topGainerCoinData.slice(0, 3).map((coinData) => (
          <div
            key={coinData?.nft_contract_id}
            className="flex justify-between items-center gap-4"
          >
            <div className="flex justify-center items-center gap-2">
              <div className="my-2">
                <img
                  src={coinData?.thumb}
                  alt={coinData?.id}
                  className="h-6 w-6 rounded-full"
                />
              </div>
              <span className="text-sm">{coinData?.name}</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="text-sm">{coinData?.data?.floor_price}</span>
              <span className="text-sm">
                {coinData?.data?.floor_price_in_usd_24h_percentage_change <
                0 ? (
                  <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                )}
              </span>
              <span
                className={`${
                  coinData?.data?.floor_price_in_usd_24h_percentage_change > 0
                    ? "text-green-500"
                    : "text-red-500"
                } text-sm`}
              >
                {Number(
                  coinData?.data?.floor_price_in_usd_24h_percentage_change
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopGainerComponent;
