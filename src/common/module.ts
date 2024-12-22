export type MarketCapPercentageData={
    btc?:number ,
    eth?:number
}
type TopHeaderData={
    active_cryptocurrencies:number,
    markets:number,
    market_cap_percentage:MarketCapPercentageData,
}
export type MarketDominanceData={
    firstCoin: number | undefined,
    secondCoin: number | undefined,
}
export interface TopHeaderPropsData{
    topHeaderData: TopHeaderData,
}