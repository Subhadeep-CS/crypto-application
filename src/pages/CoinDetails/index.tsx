import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../../services/api";
import { Badge } from "../../components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Info } from "lucide-react";
import HoverCardComponent from "../../components/pagecomponent/HoverCardCiomponent";
import { Button } from "../../components/ui/button";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../components/ui/select";
import BreadCrumbComponent from "../../components/pagecomponent/BreadCrumbComponent";
import CoinDetailsTable from "./CoinDetailsTable";
import CoinChart from "./CoinChart";
import { useState } from "react";

const CoinDetails: React.FC = () => {
  const [selectedChartTime, setSelectedChartTime] = useState<string>("1");
  const [priceType, setPriceType] = useState<string>("prices");
  const { coin_id } = useParams<{ coin_id: string }>();
  const { data: coinDetailsData, isLoading } = useQuery({
    queryKey: ["CoinListData", { coin_id, days: selectedChartTime }],
    queryFn: fetchCoinDetails,
  });

  if (isLoading) {
    return;
  }
  return (
    <div className="container-all flex flex-col sm:flex-row">
      <div className="w-full sm:w-4/12 sm:border-r pr-4" id="coin-details">
        <div className="my-2">
          <BreadCrumbComponent />
        </div>
        <div
          id="coin-name-display"
          className="flex justify-start items-center gap-2 my-2"
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
        <div className="text-muted-foreground text-xs my-2">
          <p className="space-x-2">
            {coinDetailsData?.market_data?.current_price.btc.toFixed(4)} BTC{" "}
            <span>
              {coinDetailsData?.market_data.price_change_24h_in_currency.usd <
              0 ? (
                <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
              ) : (
                <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
              )}{" "}
              {coinDetailsData?.market_data.price_change_24h_in_currency.btc.toFixed(
                2
              )}
              %{" "}
            </span>
          </p>
        </div>
        <div>
          <Progress
            value={
              ((coinDetailsData?.market_data?.current_price?.usd -
                coinDetailsData?.market_data.low_24h.usd) /
                (coinDetailsData?.market_data.high_24h.usd -
                  coinDetailsData?.market_data.low_24h.usd)) *
              100
            }
          />
          <div className="font-bold flex justify-between items-center">
            <span>${coinDetailsData?.market_data.low_24h.usd}</span>
            <span>24h</span>
            <span>${coinDetailsData?.market_data.high_24h.usd}</span>
          </div>
        </div>
        <div>
          <Button
            variant={"secondary"}
            className="w-full font-bold justify-start items-center p-2"
          >
            <FontAwesomeIcon icon={faStar} />
            Add to Portfolio
          </Button>
        </div>
        <div>
          <CoinDetailsTable coinDetailsData={coinDetailsData} />
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-xl text-black">
                  Info
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coinDetailsData?.links?.homepage?.length > 0 && (
                <TableRow>
                  <TableCell className="flex justify-between items-center">
                    <TableCell className="text-muted-foreground">
                      Website
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Link
                        to={coinDetailsData?.links?.homepage[0]}
                        target="_blank"
                      >
                        <Button variant={"secondary"} className="lowercase">
                          {coinDetailsData.name + ".org"}
                        </Button>
                      </Link>
                      <Link
                        to={coinDetailsData?.links?.whitepaper}
                        target="_blank"
                      >
                        <Button variant={"secondary"} className="lowercase">
                          whitepaper
                        </Button>
                      </Link>
                    </TableCell>
                  </TableCell>
                </TableRow>
              )}
              {coinDetailsData?.links?.blockchain_site?.length && (
                <>
                  <TableRow>
                    <TableCell className="flex justify-between items-center">
                      <TableCell className="text-muted-foreground">
                        Explorers
                      </TableCell>
                      <TableCell className="flex">
                        <Button
                          variant={"secondary"}
                          className="rounded-r-none"
                        >
                          Mempool
                        </Button>
                        <Select>
                          <SelectTrigger className="bg-secondary border-none outline-none focus:ring-0 focus:bg-secondary/80 rounded-l-none border border-l-2"></SelectTrigger>
                          <SelectContent>
                            {coinDetailsData?.links?.blockchain_site.map(
                              (site: string, index: string) => (
                                <SelectItem value={index} key={index}>
                                  {site}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className=" w-full sm:w-8/12 space-y-8 p-4">
        <div
          id="naviogation-bar"
          className="flex justify-between items-center gap-2"
        >
          <Tabs value={priceType} onValueChange={setPriceType}>
            <TabsList>
              <TabsTrigger value="prices">Price</TabsTrigger>
              <TabsTrigger value="market_caps">Market Cap</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={selectedChartTime} onValueChange={setSelectedChartTime}>
            <TabsList>
              <TabsTrigger value="1">24h</TabsTrigger>
              <TabsTrigger value="7">7d</TabsTrigger>
              <TabsTrigger value="30">1m</TabsTrigger>
              <TabsTrigger value="90">3m</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CoinChart
          percentageData={
            selectedChartTime === "1"
              ? coinDetailsData?.market_data?.market_cap_change_percentage_24h
              : coinDetailsData?.market_data?.[
                  `price_change_percentage_${selectedChartTime}d_in_currency`
                ]?.usd
          }
          priceType={priceType}
          days={selectedChartTime}
        />
        <Table className="rounded-lg overflow-hidden border border-gray-200">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="first:rounded-tl-lg last:rounded-tr-lg text-center">
                1h
              </TableHead>
              <TableHead className="text-center">24h</TableHead>
              <TableHead className="text-center">7d</TableHead>
              <TableHead className="text-center">14d</TableHead>
              <TableHead className="text-center last:rounded-tr-lg">
                30d
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">
                <span>
                  {coinDetailsData?.market_data
                    .price_change_percentage_1h_in_currency.usd < 0 ? (
                    <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                  ) : (
                    <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                  )}{" "}
                </span>
                {Math.abs(
                  coinDetailsData?.market_data?.price_change_percentage_1h_in_currency[
                    "usd"
                  ].toFixed(2)
                )}{" "}
                %
              </TableCell>
              <TableCell className="text-center">
                <span>
                  {coinDetailsData?.market_data
                    .price_change_percentage_24h_in_currency.usd < 0 ? (
                    <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                  ) : (
                    <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                  )}{" "}
                </span>
                {Math.abs(
                  coinDetailsData?.market_data?.price_change_percentage_24h_in_currency[
                    "usd"
                  ].toFixed(2)
                )}{" "}
                %
              </TableCell>
              <TableCell className="text-center">
                <span>
                  {coinDetailsData?.market_data
                    .price_change_percentage_7d_in_currency.usd < 0 ? (
                    <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                  ) : (
                    <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                  )}{" "}
                </span>
                {Math.abs(
                  coinDetailsData?.market_data?.price_change_percentage_7d_in_currency[
                    "usd"
                  ].toFixed(2)
                )}{" "}
                %
              </TableCell>
              <TableCell className="text-center">
                <span>
                  {coinDetailsData?.market_data
                    .price_change_percentage_14d_in_currency.usd < 0 ? (
                    <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                  ) : (
                    <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                  )}{" "}
                </span>
                {Math.abs(
                  coinDetailsData?.market_data?.price_change_percentage_14d_in_currency[
                    "usd"
                  ].toFixed(2)
                )}{" "}
                %
              </TableCell>
              <TableCell className="text-center last:rounded-bl-lg">
                <span>
                  {coinDetailsData?.market_data
                    .price_change_percentage_30d_in_currency.usd < 0 ? (
                    <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                  ) : (
                    <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                  )}{" "}
                </span>
                {Math.abs(
                  coinDetailsData?.market_data?.price_change_percentage_30d_in_currency[
                    "usd"
                  ].toFixed(2)
                )}{" "}
                %
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CoinDetails;
