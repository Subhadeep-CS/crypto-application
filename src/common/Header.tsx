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

const Header: React.FC = () => {
  const { data: topHeaderData, isLoading } = useQuery({
    queryKey: ["globalCoinData"],
    queryFn: fetchGlobalCoinData,
  });
  if (isLoading) {
    return;
  }
  return (
    <>
      <TopHeader topHeaderData={topHeaderData.data} />
      <div className="w-full flex justify-between items-center bg-white/80 backdrop-blur-lg border-b">
        <nav className="container flex justify-between items-center">
          <Link to={"/"} className="flex justify-center items-center">
            <div className="m-2 p-2">
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
    </>
  );
};

export default Header;
