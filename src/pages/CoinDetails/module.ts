export interface CoinDeatilsDataProps{
    coinDetailsData:{
        market_data:{
            market_cap:{
                usd:string | number;
            },
            fully_diluted_valuation:{
                usd:string | number;
            },
            circulating_supply:string | number;
            total_supply:string | number;
            max_supply:string | number;
        }
    }
}