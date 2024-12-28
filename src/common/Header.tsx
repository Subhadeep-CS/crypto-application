import { Link } from "react-router-dom";
import Logo from "../assets/image/crypto_icon.webp";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "../components/ui/navigation-menu";
import TopHeader from "./TopHeader";
import { HEADER_MENU } from "../utils/constant";
import { useQuery } from "@tanstack/react-query";
import { fetchGlobalCoinData } from "../services/api";
import { useEffect } from "react";
import { useGlobalMarketStore } from "../zustand/store";

const Header: React.FC = () => {
  const {
    data: topHeaderData,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["globalCoinData"],
    queryFn: fetchGlobalCoinData,
  });
  const setGlobalMarketData = useGlobalMarketStore(
    (state) => state.setGlobalMarketData
  );
  useEffect(() => {
    if (status === "success") {
      const globalCoinDataObject = {
        total_market_cap: topHeaderData.data.total_market_cap["usd"],
        total_trading_volume: topHeaderData.data.total_volume["usd"],
        market_cap_change_percentage_24h_usd:
          topHeaderData.data.market_cap_change_percentage_24h_usd,
        total_crypto_currencies: topHeaderData.data.active_cryptocurrencies,
      };
      setGlobalMarketData({ ...globalCoinDataObject });
    }
  }, [status, topHeaderData]);

  if (isLoading) {
    return;
  }
  return (
    <div className="grid">
      <div className="border-b">
        <TopHeader topHeaderData={topHeaderData.data} />
      </div>
      <div className="border-b">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-lg">
          <nav className="flex justify-between items-center">
            <Link to={"/"} className="flex justify-center items-center">
              <div className="p-2">
                <img src={Logo} className="w-56 h-16" alt="website-logo" />
              </div>
              <div>
                <NavigationMenu>
                  <NavigationMenuList>
                    {HEADER_MENU.map((headerMenu, index) => {
                      return (
                        <NavigationMenuItem key={index}>
                          <Link to="/docs">
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              {headerMenu}
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
