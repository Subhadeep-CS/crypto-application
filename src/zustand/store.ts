import { create } from "zustand";
import { GlobalMarketData } from "./module";

export const useGlobalMarketStore = create<{
    globalMarketData:GlobalMarketData,
    setGlobalMarketData:(data:GlobalMarketData)=> void
}>((set) => ({
  globalMarketData: {total_market_cap:0,total_trading_volume:0,market_cap_change_percentage_24h_usd:0}, // Initial state
  setGlobalMarketData: (data) => 
    set(() => ({ globalMarketData: data })), 
}));
