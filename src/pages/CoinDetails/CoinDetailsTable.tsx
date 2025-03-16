import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { CoinDeatilsDataProps } from "./module";
const CoinDetailsTable: React.FC<CoinDeatilsDataProps> = ({
  coinDetailsData,
}) => {
  return (
    <>
      <Table className="text-muted-foreground">
        <TableBody>
          <TableRow>
            <TableCell className="flex justify-between items-center">
              <TableCell>Market Cap</TableCell>
              <TableCell className="font-semibold text-black">
                $
                {coinDetailsData?.market_data?.market_cap[
                  "usd"
                ]?.toLocaleString()}
              </TableCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex justify-between items-center">
              <TableCell>Fully Diluted Valuation</TableCell>
              <TableCell className="font-semibold text-black">
                $
                {coinDetailsData?.market_data?.fully_diluted_valuation[
                  "usd"
                ]?.toLocaleString()}
              </TableCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex justify-between items-center">
              <TableCell>Circulating Supply</TableCell>
              <TableCell className="font-semibold text-black">
                {coinDetailsData?.market_data?.circulating_supply?.toLocaleString()}
              </TableCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex justify-between items-center">
              <TableCell>Total Supply</TableCell>
              <TableCell className="font-semibold text-black">
                {coinDetailsData?.market_data?.total_supply?.toLocaleString()}
              </TableCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex justify-between items-center">
              <TableCell>Max Supply</TableCell>
              <TableCell className="font-semibold text-black">
                {coinDetailsData?.market_data?.max_supply?.toLocaleString()}
              </TableCell>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default CoinDetailsTable;
