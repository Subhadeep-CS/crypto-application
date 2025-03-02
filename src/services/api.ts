import { CoinDetailsQueryKey, CoinListQueryKey } from "./module";

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

  export const fetchCoinDetails=async({queryKey}:CoinDetailsQueryKey)=>{
    const [,{coin_id}]=queryKey;
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/coins/${coin_id}`,{
      headers:{
        'Content-Type':'application/json',
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      }
    });

    if(!response.ok){
      throw new Error(`Failed to fetch trending coins: ${response.statusText}`);
    }

    return response.json();
  }

  export const fetchCoinChartData=async({queryKey}:CoinDetailsQueryKey)=>{
    const [,{coin_id}]=queryKey;
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/coins/${coin_id}/market_chart?vs_currency=usd&days=1`,{
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