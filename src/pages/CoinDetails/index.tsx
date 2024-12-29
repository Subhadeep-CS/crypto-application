import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../../services/api";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Info } from "lucide-react";
import HoverCardComponent from "../../components/pagecomponent/HoverCardCiomponent";

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
      <div className="w-1/4" id="coin-details">
        <div id="breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Cryptocuurencies</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div
          id="coin-name-display"
          className="flex justify-start items-center gap-2"
        >
          <div>
            <img
              src={coinDetailsData?.image?.thumb}
              alt={coinDetailsData?.symbol}
            />
          </div>
          <div className="flex justify-between items-center gap-2 text-muted-foreground">
            <div className="text-lg flex justify-start items-center gap-2">
              <p className="font-bold text-black">{coinDetailsData.name}</p>
              <p>{coinDetailsData.symbol.toUpperCase()}</p>
              <p>Price</p>
            </div>
            <Badge variant={"secondary"}>
              # {coinDetailsData.market_cap_rank}
            </Badge>
          </div>
        </div>
        <div
          id="coin-price-details"
          className="flex justify-start items-center font-bold gap-2"
        >
          <h2 className="font-bold text-3xl">
            $ {coinDetailsData?.market_data?.current_price?.usd}
          </h2>
          <p
            className={`${
              coinDetailsData?.market_data.market_cap_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            } mx-2 flex gap-2 justify-center items-center`}
          >
            {coinDetailsData?.market_data.market_cap_change_percentage_24h <
            0 ? (
              <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
            ) : (
              <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
            )}{" "}
            {coinDetailsData?.market_data.market_cap_change_percentage_24h.toFixed(
              2
            )}
            %{" "}
            <HoverCardComponent
              hoverTrigger={
                <Info className="text-muted-foreground" size={"16"} />
              }
              hoverContext={coinDetailsData?.description.en}
            />
          </p>
        </div>
        <div className="">
          <p>
            {coinDetailsData?.market_data?.price_change_24h_in_currency.btc}
          </p>
        </div>
      </div>
      <div id="chart-component" className="w-3/4">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
};

export default CoinDetails;
