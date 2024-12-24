import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CircleChevronRight } from "lucide-react";
import { TopGainerComponentProps } from "./module";

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
              <div className="text-title-xxxxsm">{coinData?.name}</div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div>{coinData?.data?.floor_price}</div>
              <div
                className={`${
                  coinData?.data?.floor_price_in_usd_24h_percentage_change > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {Number(
                  coinData?.data?.floor_price_in_usd_24h_percentage_change
                ).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopGainerComponent;
