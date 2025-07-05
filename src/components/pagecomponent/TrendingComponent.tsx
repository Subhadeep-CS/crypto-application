import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingComponentProps } from "./module";
import { CircleChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TrendingComponent: React.FC<TrendingComponentProps> = ({
  trendingCoinData,
}) => {
  return (
    <>
      <Card className="shadow-md bg-white rounded-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div>🔥Trending</div>
              <Link to="trending-currencies">
                <div className="flex justify-center items-center gap-2 hover:text-green-500 cursor-pointer">
                  View More <CircleChevronRight />
                </div>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {trendingCoinData.slice(0, 3).map((coinData) => (
            <div
              key={coinData?.item?.coin_id}
              className="flex justify-between items-center"
            >
              <div className="flex justify-start items-center gap-2 w-32">
                <div className="my-2">
                  <img
                    src={coinData?.item?.thumb}
                    alt={coinData?.item?.id}
                    className="h-6 w-6 rounded-full"
                  />
                </div>
                <span className="text-sm">{coinData?.item?.name}</span>
              </div>
              <div className="flex justify-end items-center gap-4 w-40">
                <span className="text-sm">
                  ${coinData?.item?.data?.price.toFixed(3)}
                </span>
                <div className={`flex justify-start items-center gap-1`}>
                  <span>
                    {coinData?.item?.data?.price_change_percentage_24h["usd"] >
                    0 ? (
                      <FontAwesomeIcon
                        icon={faCaretUp}
                        style={{ color: "#00ff00" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{ color: "#ff0000" }}
                      />
                    )}
                  </span>
                  <span
                    className={`${
                      coinData?.item?.data?.price_change_percentage_24h["usd"] >
                      0
                        ? "text-green-600"
                        : "text-red-600"
                    } text-sm`}
                  >
                    {Math.abs(
                      coinData?.item?.data?.price_change_percentage_24h["usd"]
                    ).toFixed(2)}{" "}
                    %
                  </span>
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
