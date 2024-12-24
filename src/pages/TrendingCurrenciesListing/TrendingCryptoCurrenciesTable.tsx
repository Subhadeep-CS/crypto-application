import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { TRENDING_COINS_TABLE_HEADER } from "../../utils/constant";
import { TrendingCoinDataTableProps } from "./module";

const TrendingCryptoCurrenciesTable: React.FC<TrendingCoinDataTableProps> = ({
  trendingCoinData,
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
          {trendingCoinData.map((coinData) => (
            <TableRow>
              <TableCell className="text-black text-center">
                {coinData.item.market_cap_rank}
              </TableCell>
              <TableCell className="text-muted-foreground text-center">
                <div className="flex justify-start items-center space-x-2">
                  <img
                    src={coinData.item.thumb}
                    alt={coinData.item.name}
                    className="rounded-full h-6 w-6"
                  />
                  <span className="text-black font-semibold">
                    {coinData.item.name}
                  </span>{" "}
                  <span>{coinData.item.symbol}</span>
                </div>
              </TableCell>
              <TableCell className="text-black text-center">
                ${coinData.item.data.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-black text-center">
                {(
                  coinData.item.data.price_change_percentage_24h["usd"] / 24
                ).toFixed(3)}
                %
              </TableCell>
              <TableCell className="text-black text-center">
                {coinData.item.data.price_change_percentage_24h["usd"].toFixed(
                  3
                )}
                %
              </TableCell>
              <TableCell className="text-black text-center">
                {(
                  coinData.item.data.price_change_percentage_24h["usd"] * 7
                ).toFixed(3)}
                %
              </TableCell>
              <TableCell className="text-black text-center">
                {coinData.item.data.total_volume}
              </TableCell>
              <TableCell className="text-black text-center">
                {coinData.item.data.market_cap}
              </TableCell>
              <TableCell className="text-black text-center">
                <img src={coinData.item.data.sparkline} alt="graph-tracker" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TrendingCryptoCurrenciesTable;
