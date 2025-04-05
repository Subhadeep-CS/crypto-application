import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalCategoryData } from "../../zustand/store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { faListOl, faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
const CoinMarketCategoryNavBar: React.FC = () => {
  const globalCategoryData = useGlobalCategoryData(
    (state) => state.globalCategoryData
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="text-muted-foreground">
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <div className="flex justify-center gap-2 py-2">
              <FontAwesomeIcon icon={faRankingStar} className="text-base" />
              <span className="text-md font-bold">All Coins</span>
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Link to={"/categories"}>
              <div className="flex justify-center items-center py-2 gap-2">
                <FontAwesomeIcon icon={faListOl} className="text-base" />
                <span className="text-md font-bold">Categories</span>
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <Separator orientation="vertical" />
        {globalCategoryData.length > 0 && (
          <>
            {globalCategoryData.slice(3).map((categoryData) => (
              <NavigationMenuItem key={categoryData.id}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  🔥 {categoryData.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CoinMarketCategoryNavBar;
