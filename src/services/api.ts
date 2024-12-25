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

  export const fetchAllCoinList=async({queryKey})=>{
    const [, { vs_currency }] = queryKey;
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/coins/markets?vs_currency=${vs_currency}&price_change_percentage=1h,24h,7d,30d&sparkline=true`,{
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