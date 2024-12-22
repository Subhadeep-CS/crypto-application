type PriceChange={
    usd:number
}
type CoinData={
    price:number;
    price_change_percentage_24h:PriceChange
}
type CoinItem = {
    id: string;
    coin_id: number;
    name:string;
    large:string;
    small:string;
    data:CoinData;
    thumb:string;
  };
  
  type TrendingCoin = {
    item: CoinItem;
  };
  
  export interface TrendingComponentProps {
    trendingCoinData: TrendingCoin[];
  }
  