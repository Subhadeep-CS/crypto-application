const usePriceFormatter = () => {
    const handleFormatPrice = (number: number) => {
      return number >= 1e12
        ? (number / 1e12).toFixed(2) + "T" // Trillion
        : number >= 1e9
        ? (number / 1e9).toFixed(2) + "B" // Billion
        : number >= 1e6
        ? (number / 1e6).toFixed(2) + "M" // Million
        : number >= 1e3
        ? (number / 1e3).toFixed(2) + "K" // Thousand
        : number.toString(); // Ensure it's always a string
    };
  
    return handleFormatPrice;
  };
  
  export default usePriceFormatter;
  