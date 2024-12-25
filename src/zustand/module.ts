export interface GlobalMarketData {
  total_market_cap: number;
  total_trading_volume: number;
  market_cap_change_percentage_24h_usd: number;
  total_crypto_currencies: number;
}

export interface GlobalMarketDominance {
  coinName: string | undefined,
  coinData: number | undefined,
}

export interface GlobalCategoryData{
  id:number,
  name:string,
}