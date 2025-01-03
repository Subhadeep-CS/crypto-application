import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinChartData, fetchCoinDetails } from "../../services/api";
import { Badge } from "../../components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Calendar, Info } from "lucide-react";
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
      <div className="w-5/12 border-r pr-4" id="coin-details">
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
                <TableHead className="font-bold text-xl">Info</TableHead>
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
      <div>
        <div
          id="naviogation-bar"
          className="flex justify-between items-center gap-2"
        >
          <Tabs>
            <TabsList>
              <TabsTrigger value="">Price</TabsTrigger>
              <TabsTrigger value="">Market Cap</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs>
            <TabsList>
              <TabsTrigger value="">24h</TabsTrigger>
              <TabsTrigger value="">7d</TabsTrigger>
              <TabsTrigger value="">1m</TabsTrigger>
              <TabsTrigger value="">3m</TabsTrigger>
              <TabsTrigger value="">1y</TabsTrigger>
              <TabsTrigger value="">Max</TabsTrigger>
              <TabsTrigger value="">LOG</TabsTrigger>
              <TabsTrigger value="">
                <Calendar />
              </TabsTrigger>
              <TabsTrigger value="">
                <Calendar />
              </TabsTrigger>
              <TabsTrigger value="">
                <Calendar />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <CoinChart />
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
