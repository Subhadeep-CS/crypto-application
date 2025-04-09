// SearchPopover.tsx

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useTrrendingCoinDeatils } from "../../zustand/store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListOl, faFire, faImage } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchData } from "../../services/api";
import { Separator } from "../ui/separator";

const recentSearches = ["Doge", "Shiba", "XRP"];

const SearchComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debounceSearchQuery = useDebounce(query, 500);
  const { data, refetch, isFetching, isError, error } = useQuery({
    queryKey: ["searchData", debounceSearchQuery],
    queryFn: () => fetchSearchData(debounceSearchQuery),
    enabled: false, // 🔥 disable auto-fetch
    refetchOnWindowFocus: false,
  });
  const trendingCoinData = useTrrendingCoinDeatils(
    (state) => state.trendingCoinData
  );

  // Dummy suggestions - Replace with API or fuzzy match logic
  const allCoins = ["Bitcoin", "Ethereum", "Solana", "Ripple", "Cardano"];
  const filteredSuggestions = query
    ? allCoins.filter((coin) =>
        coin.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (debounceSearchQuery && debounceSearchQuery.trim() !== "") refetch();
  }, [debounceSearchQuery]);

  console.log("Crypto Data", data);
  if (!trendingCoinData) {
    return;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-center justify-start gap-2 w-full max-w-52 "
          onClick={() => setOpen(!open)}
        >
          <Search className="h-4 w-4" />
          <span className="text-sm text-gray-400 font-semibold">Search</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            autoFocus
            placeholder="Search coins..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {isFetching && <p>Loading...</p>}
        {isError && <p>Error: {(error as Error).message}</p>}
        <NavigationMenu>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <div className="flex justify-center items-center py-2 gap-2 text-gray-400">
                <FontAwesomeIcon icon={faFire} className="text-base" />
                <span className="text-md font-bold">Trendings</span>
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <div className="flex justify-center items-center py-2 gap-2 text-gray-400">
                <FontAwesomeIcon icon={faImage} className="text-base" />
                <span className="text-md font-bold">nfts</span>
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <NavigationMenuLink>
              <div className="flex justify-center items-center py-2 gap-2 text-gray-400">
                <FontAwesomeIcon icon={faListOl} className="text-base" />
                <span className="text-md font-bold">Categories</span>
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
        {query ? (
          <div>
            <p className="text-sm font-medium mb-2">Suggestions</p>
            <ul className="space-y-1">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((coin, i) => (
                  <li
                    key={i}
                    className="text-sm px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    {coin}
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No results</li>
              )}
            </ul>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Recent Searches</p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((coin, i) => (
                  <span
                    key={i}
                    className="bg-muted text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    {coin}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="space-y-2">
                <div className="flex items-center justify-between w-full gap-2">
                  <p className="text-xs text-gray-500">Trending Search 🔥 </p>
                  <Separator className="flex-1" />
                </div>
                {trendingCoinData?.coins &&
                  trendingCoinData.coins.slice(0, 6).map((coin) => (
                    <div
                      key={coin?.item?.coin_id}
                      className="bg-yellow-100 text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-yellow-200"
                    >
                      {coin.item.name}
                    </div>
                  ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between w-full gap-2">
                  <p className="text-xs text-gray-500">Trending Nfts 🔥 </p>
                  <Separator className="flex-1" />
                </div>
                {trendingCoinData?.nfts &&
                  trendingCoinData.nfts.map((nft) => (
                    <div
                      key={nft.id}
                      className="bg-yellow-100 text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-yellow-200"
                    >
                      {nft.name}
                    </div>
                  ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between w-full gap-2">
                  <p className="text-xs text-gray-500">
                    Trending Categories 🔥{" "}
                  </p>
                  <Separator className="flex-1" />
                </div>
                {trendingCoinData?.coins &&
                  trendingCoinData.coins.map((coin) => (
                    <div
                      key={coin?.item?.coin_id}
                      className="bg-yellow-100 text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-yellow-200"
                    >
                      {coin.item.name}
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchComponent;
