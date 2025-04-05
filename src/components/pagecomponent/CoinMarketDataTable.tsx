import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { COINS_TABLE_HEADER } from "../../utils/constant";
import { CoinMarketDataTableProps, CustomiseDropdownChange } from "./module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Sparkline from "../svg/SparklineComponent";
import { useNavigate } from "react-router-dom";

const CoinMarketDataTable: React.FC<CoinMarketDataTableProps> = ({
  allCoinList,
  dropdownChange,
}) => {
  const navigate = useNavigate();
  const handleCoinDataClick = (coin_id: string) => {
    navigate(`/coin-details/${coin_id}`);
  };
  return (
    <Table>
      <TableHeader className="border-t">
        <TableRow>
          <TableHead></TableHead>
          {COINS_TABLE_HEADER.map((coinTableHeader, index) => {
            const shouldRenderHeader =
              !["30d", "FDV", "Market Cap/FDV"].includes(coinTableHeader) ||
              dropdownChange[coinTableHeader as keyof CustomiseDropdownChange];

            return shouldRenderHeader ? (
              <TableHead
                key={`${coinTableHeader}-${index}`}
                className="text-xs text-center font-bold text-black"
              >
                {coinTableHeader}
              </TableHead>
            ) : null;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allCoinList.map((coinData) => (
          <TableRow
            className="text-sm cursor-pointer"
            onClick={() => handleCoinDataClick(coinData.id)}
          >
            <TableCell className="text-center">
              <FontAwesomeIcon icon={faStar} />
            </TableCell>
            <TableCell className="text-black text-center">
              {coinData.market_cap_rank}
            </TableCell>
            <TableCell className="text-muted-foreground w-1/5">
              <div className="flex space-x-2">
                <img
                  src={coinData.image}
                  alt={coinData.name}
                  className="rounded-full h-6 w-6"
                />
                <span className="text-black font-semibold text-wrap text-uppercase">
                  {coinData.name}{" "}
                  <span className="text-muted-foreground text-uppercase">
                    {coinData.symbol}
                  </span>
                </span>
              </div>
            </TableCell>
            <TableCell className="text-black text-center">
              ${coinData.current_price.toFixed(2)}
            </TableCell>
            <TableCell
              className={`${
                coinData?.price_change_percentage_1h_in_currency
                  ? coinData?.price_change_percentage_1h_in_currency < 0
                    ? "text-red-500"
                    : "text-green-500"
                  : ""
              } text-center`}
            >
              {coinData?.price_change_percentage_1h_in_currency && (
                <>
                  <span className="mx-2">
                    {coinData?.price_change_percentage_1h_in_currency < 0 ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretUp} />
                    )}
                  </span>
                  <span>
                    {Math.abs(
                      coinData.price_change_percentage_1h_in_currency
                    ).toFixed(3)}
                    %
                  </span>
                </>
              )}
            </TableCell>
            <TableCell
              className={`${
                coinData?.price_change_percentage_24h_in_currency
                  ? coinData?.price_change_percentage_24h_in_currency < 0
                    ? "text-red-500"
                    : "text-green-500"
                  : ""
              } text-center`}
            >
              {coinData?.price_change_percentage_24h_in_currency && (
                <>
                  <span className="mx-2">
                    {coinData?.price_change_percentage_24h_in_currency < 0 ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretUp} />
                    )}
                  </span>
                  <span>
                    {Math.abs(
                      coinData.price_change_percentage_24h_in_currency
                    ).toFixed(3)}
                    %
                  </span>
                </>
              )}
            </TableCell>
            <TableCell
              className={`${
                coinData?.price_change_percentage_7d_in_currency
                  ? coinData?.price_change_percentage_7d_in_currency < 0
                    ? "text-red-500"
                    : "text-green-500"
                  : ""
              } text-center`}
            >
              {coinData.price_change_percentage_7d_in_currency && (
                <>
                  <span className="mx-2">
                    {coinData?.price_change_percentage_7d_in_currency < 0 ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretUp} />
                    )}
                  </span>
                  <span>
                    {Math.abs(
                      coinData.price_change_percentage_7d_in_currency
                    ).toFixed(3)}
                    %
                  </span>
                </>
              )}
            </TableCell>
            {dropdownChange["30d"] && (
              <>
                <TableCell
                  className={`${
                    coinData?.price_change_percentage_7d_in_currency
                      ? coinData?.price_change_percentage_7d_in_currency < 0
                        ? "text-red-500"
                        : "text-green-500"
                      : ""
                  } text-center`}
                >
                  <>
                    {coinData.price_change_percentage_30d_in_currency && (
                      <>
                        <span className="mx-2">
                          {coinData?.price_change_percentage_30d_in_currency <
                          0 ? (
                            <FontAwesomeIcon icon={faCaretDown} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretUp} />
                          )}
                        </span>
                        <span>
                          {Math.abs(
                            coinData.price_change_percentage_30d_in_currency
                          ).toFixed(3)}
                          %
                        </span>
                      </>
                    )}
                  </>
                </TableCell>
              </>
            )}
            <TableCell className="text-black text-center">
              ${coinData.total_volume}
            </TableCell>
            <TableCell className="text-black text-center">
              ${coinData.market_cap}
            </TableCell>
            {dropdownChange.FDV && (
              <>
                <TableCell className="text-black text-center">
                  ${coinData.fully_diluted_valuation}
                </TableCell>
              </>
            )}
            {dropdownChange["Market Cap/FDV"] && (
              <>
                <TableCell className="text-black text-center">
                  $
                  {(
                    coinData.market_cap / coinData.fully_diluted_valuation
                  ).toFixed(2)}
                </TableCell>
              </>
            )}
            <TableCell>
              <Sparkline
                data={coinData?.sparkline_in_7d.price}
                width={200}
                height={50}
                strokeColor={
                  coinData?.price_change_percentage_7d_in_currency &&
                  coinData?.price_change_percentage_7d_in_currency < 0
                    ? "#ff0000"
                    : "#00ff00"
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoinMarketDataTable;
