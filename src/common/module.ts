export type MarketCapPercentageData={
    btc?:number ,
    eth?:number
}
type TopHeaderData={
    active_cryptocurrencies:number,
    markets:number,
    market_cap_percentage:MarketCapPercentageData,
}
export interface MarketDominanceData{
    coinName: string | undefined,
    coinData: number | undefined,
}
export interface TopHeaderPropsData{
    topHeaderData: TopHeaderData,
}

export type HeaderData = {
    data: {
        total_market_cap: { usd: number };
        total_volume: { usd: number };
        market_cap_change_percentage_24h_usd: number;
        active_cryptocurrencies: number;
        markets: number; // Assuming it's a number
        market_cap_percentage: {
          [key: string]: number; // Assuming it's an object with different currencies
        };
    };
  };
  