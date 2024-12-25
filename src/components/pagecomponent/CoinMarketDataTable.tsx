import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { TRENDING_COINS_TABLE_HEADER } from "../../utils/constant";
import { CoinMarketDataTableProps } from "./module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
const CoinMarketDataTable: React.FC<CoinMarketDataTableProps> = ({
  allCoinList,
}) => {
  return (
    <>
      <Table>
        <TableHeader className="border-t">
          <TableRow>
            {TRENDING_COINS_TABLE_HEADER.map((coinTableHeader, index) => (
              <TableHead
                key={index}
                className="text-center font-bold  text-black"
              >
                {coinTableHeader}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCoinList.map((coinData) => (
            <TableRow>
              <TableCell className="text-black text-center">
                {coinData.market_cap_rank}
              </TableCell>
              <TableCell className="text-muted-foreground text-center">
                <div className="flex justify-start items-center space-x-2">
                  <img
                    src={coinData.image}
                    alt={coinData.name}
                    className="rounded-full h-6 w-6"
                  />
                  <span className="text-black font-semibold">
                    {coinData.name.toLocaleUpperCase()}
                  </span>{" "}
                  <span>{coinData.symbol.toLocaleUpperCase()}</span>
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
              <TableCell className="text-black text-center">
                ${coinData.total_volume}
              </TableCell>
              <TableCell className="text-black text-center">
                ${coinData.market_cap}
              </TableCell>
              {/* <TableCell className="text-black text-center">
                <img src={coinData.item.data.sparkline} alt="graph-tracker" />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CoinMarketDataTable;
