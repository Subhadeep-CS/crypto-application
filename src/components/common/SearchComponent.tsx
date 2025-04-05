// SearchPopover.tsx

import React, { useState } from "react";
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
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const recentSearches = ["Doge", "Shiba", "XRP"];

const SearchComponent: React.FC = () => {
  const trendingCoinData = useTrrendingCoinDeatils(
    (state) => state.trendingCoinData
  );

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Dummy suggestions - Replace with API or fuzzy match logic
  const allCoins = ["Bitcoin", "Ethereum", "Solana", "Ripple", "Cardano"];
  const filteredSuggestions = query
    ? allCoins.filter((coin) =>
        coin.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
              <p className="text-sm font-medium mb-2">Trending</p>
              <div className="flex flex-wrap gap-2">
                {trendingCoinData.coins.map((coin) => (
                  <span
                    key={coin?.item?.coin_id}
                    className="bg-yellow-100 text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-yellow-200"
                  >
                    {coin.item.name}
                  </span>
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
