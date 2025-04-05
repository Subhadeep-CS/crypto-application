import { create } from "zustand";
import { GlobalCategoryData, GlobalMarketData,GlobalMarketDominance } from "./module";

export const useGlobalMarketStore = create<{
    globalMarketData:GlobalMarketData,
    setGlobalMarketData:(data:GlobalMarketData)=> void
}>((set) => ({
  globalMarketData: {total_market_cap:0,total_trading_volume:0,market_cap_change_percentage_24h_usd:0,total_crypto_currencies:0},
  setGlobalMarketData: (data) => 
    set(() => ({ globalMarketData: data })), 
}));

export const useGlobalMarketDominance= create<{
  globalMarketDominance:GlobalMarketDominance[],
  setGlobalMarketDominance:(data:GlobalMarketDominance[])=>void
}>((set)=>({
  globalMarketDominance:[{coinName:'',coinData:0}],
  setGlobalMarketDominance: (data)=> set(()=>({globalMarketDominance:data}))
}))

export const useGlobalCategoryData=create<{
  globalCategoryData:GlobalCategoryData[],
  setGlobalCategoryData:(data:GlobalCategoryData[])=>void
}>((set)=>({
  globalCategoryData:[],
  setGlobalCategoryData: (data)=> set(()=>({globalCategoryData:data}))
}))

export const useCoinListData=create<{
  coinListPerPage:string,
  setCoinListPerPage:(data:string)=>void
}>((set)=>({
  coinListPerPage:"50",
  setCoinListPerPage: (data)=>set(()=>({coinListPerPage:data}))
}))

export const useTrrendingCoinDeatils=create<{
  trendingCoinData:{categories:GlobalCategoryData[],coins:{item:{name:string,coin_id:string}}[],nfts:{name:string}[]} | null
  setTrendingCoinData:(data:{categories:GlobalCategoryData[],coins:{item:{name:string,coin_id:string}}[],nfts:{name:string}[]} | null)=>void
}>((set)=>({
  trendingCoinData:null,
  setTrendingCoinData: (data)=> set(()=>({trendingCoinData:data}))
}))