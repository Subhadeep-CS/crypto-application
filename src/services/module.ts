export interface CoinListQueryKey{
    queryKey:[string,{vs_currency:string,per_page:string,page:number}]
}

export interface CoinDetailsQueryKey{
    queryKey:[string,{coin_id:string | undefined}]
}