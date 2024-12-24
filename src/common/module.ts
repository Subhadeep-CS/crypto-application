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