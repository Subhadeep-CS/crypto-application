type PriceChangeData={
    usd:number,
}

type ItemData={
    price:number;
    price_change_percentage_24h:PriceChangeData;
    total_volume:string;
    market_cap:string;
    sparkline:string;
}
type CoinItem = {
    id: string;
    coin_id: number;
    name:string;
    large:string;
    small:string;
    thumb:string;
    market_cap_rank:number;
    symbol:string;
    data:ItemData;
  };

  type CoinData={
    item:CoinItem
  }

export interface TrendingCoinDataTableProps{
    trendingCoinData:CoinData[]
}