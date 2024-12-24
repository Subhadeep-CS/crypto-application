type PriceChange={
    usd:number
}
type CoinData={
    price:number;
    price_change_percentage_24h:PriceChange
}
type NftData={
  floor_price:string;
  floor_price_in_usd_24h_percentage_change:number;
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
  
  type GainerCoinItem = {
    id:string;
    name:string;
    nft_contract_id:number;
    thumb:string;
    data:NftData;
  }
  type TrendingCoin = {
    item: CoinItem;
  };
  
  export interface TrendingComponentProps {
    trendingCoinData: TrendingCoin[];
  }


  export interface TopGainerComponentProps {
    topGainerCoinData: GainerCoinItem[];
  }
  
  export interface TotalMarketVolumeCardComponentProps{
    cardTitle:number;
    cardDescription:string;
    cardDataChange?:number | null;
  }