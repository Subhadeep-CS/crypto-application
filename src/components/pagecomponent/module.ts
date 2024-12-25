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

  type  SingleCoinData={
    id:string;
    market_cap_rank:string;
    name:string;
    image:string;
    symbol:string;
    current_price:number;
    price_change_percentage_1h_in_currency?:number;
    price_change_percentage_24h_in_currency?:number;
    price_change_percentage_7d_in_currency?:number;
    total_volume:number
    market_cap:number
  }
  export interface CoinMarketDataTableProps{
    allCoinList:SingleCoinData[]
  }

  export interface CustomiseDropdownComponent{
    dropdownTrigger:string;
  }