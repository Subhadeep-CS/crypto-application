import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../../services/api";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";

const CoinDetails: React.FC = () => {
  const { coin_id } = useParams<{ coin_id: string }>();
  const { data: coinDetailsData, isLoading } = useQuery({
    queryKey: ["CoinListData", { coin_id }],
    queryFn: fetchCoinDetails,
  });
  if (isLoading) {
    return;
  }
  return (
    <div className="container-all flex">
      <div className="w-1/5" id="coin-details">
        <div
          id="coin-name-display"
          className="flex justify-start items-center gap-2"
        >
          <div>
            <img src={coinDetailsData?.image?.thumb} />
          </div>
          <div className="flex justify-between items-center gap-2">
            <p className="text-uppercase">
              {coinDetailsData.name} {coinDetailsData.symbol}
            </p>
            <Badge variant={"secondary"}>
              # {coinDetailsData.market_cap_rank}
            </Badge>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div id="chart-component" className="w-4/5"></div>
    </div>
  );
};

export default CoinDetails;
