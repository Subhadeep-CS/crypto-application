import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { TrendingComponentProps } from "./module";
import { CircleChevronRight } from "lucide-react";

const TrendingComponent: React.FC<TrendingComponentProps> = ({
  trendingCoinData,
}) => {
  console.log(trendingCoinData);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div>🔥Trending</div>
              <div className="flex justify-center items-center gap-2">
                View More <CircleChevronRight />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {trendingCoinData.slice(0, 3).map((coinData) => (
            <div
              key={coinData?.item?.coin_id}
              className="flex justify-between items-center gap-4"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="mx-2 p-2">
                  <img
                    src={coinData?.item?.thumb}
                    alt={coinData?.item?.id}
                    className="h-6 w-6"
                  />
                </div>
                <div className="text-title-xxxxsm">{coinData?.item?.name}</div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <div>${coinData?.item?.data?.price.toFixed(3)}</div>
                <div
                  className={`${
                    coinData?.item?.data?.price_change_percentage_24h["usd"] > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coinData?.item?.data?.price_change_percentage_24h[
                    "usd"
                  ].toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default TrendingComponent;
