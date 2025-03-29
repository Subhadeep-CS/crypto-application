import { CoinListQueryKey } from "./module";
import { QueryFunctionContext } from "@tanstack/react-query";

// api/fetchGlobalCoin.ts
export const fetchGlobalCoinData = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/global`, {
      headers: {
        "Content-Type": "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }
  
    return response.json();
  }; 
  
  //api/fetchTrendingCoinData.ts

  export const fetchTrendingCoinData=async()=>{
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/search/trending`,{
      headers:{
        'Content-Type':'application/json',
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      }
    })

    if(!response.ok){
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }

    return response.json();
  }

  export const fetchAllCoinList=async({queryKey}:CoinListQueryKey)=>{
    const [, { vs_currency,per_page,page }] = queryKey;
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/coins/markets?vs_currency=${vs_currency}&price_change_percentage=1h,24h,7d,30d&sparkline=true&per_page=${per_page}&page=${page}`,{
      headers:{
        'Content-Type':'application/json',
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      }
    })
    
    if(!response.ok){
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }

    return response.json();
  }

  export const fetchCoinDetails = async ({
    queryKey,
  }: QueryFunctionContext<[string, { coin_id: string | undefined; days: string }]>) => {
    const [, { coin_id }] = queryKey; // Correctly extract coin_id
  
    if (!coin_id) {
      throw new Error("coin_id is required to fetch coin details");
    }
  
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/coins/${coin_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`Failed to fetch coin details: ${response.statusText}`);
    }
  
    return response.json();
  };

  export const fetchCoinChartData=async({queryKey}:QueryFunctionContext<[string, { coin_id: string | undefined; days: string }]>)=>{
    const [,{coin_id,days}]=queryKey;
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/coins/${coin_id}/market_chart?vs_currency=usd&days=${days}`,{
      headers:{
        'Content-Type':'application/json',
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      }
    })

    if(!response.ok){
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }

    return response.json();
  }

  export const fetchCoinCategoryList=async()=>{
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/coins/categories/list`,{
      headers:{
        'Content-Type':'application/json',
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      }
    })

    if(!response.ok){
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }

    return response.json();
  }

  export const fetchCoinCategoryDetails=async()=>{
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}coins/categories`,{
      headers:{
        'Content-Type':'application/json',
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      }
    })

    if(!response.ok){
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }

    return response.json();
  }