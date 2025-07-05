import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import SwitchComponent from "./SwitchComponent";
import { CustomiseFilterProps } from "./module";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useCoinListData } from "../../zustand/store";

const CustomiseDropdownComponent: React.FC<CustomiseFilterProps> = ({
  dropdownChange,
  setDropdownChange,
}) => {
  const coinListPerPagedata = useCoinListData((state) => state.coinListPerPage);
  const setCoinListPerPage = useCoinListData(
    (state) => state.setCoinListPerPage
  );
  const handleChange = (name: string, checked: boolean) => {
    setDropdownChange((prevDropdownChange) => ({
      ...prevDropdownChange,
      [name]: checked,
    }));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="secondary-button">
          <span className="front flex items-center gap-2">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="pr-2" />
            <span>Customise</span>
          </span>
        </button>
        {/* <Button variant={"secondary"}></Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem
          className="flex flex-col gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="w-full flex items-center">
            <span className="text-muted-foreground mr-2">Price Change</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-black font-bold">30d</p>
            <SwitchComponent
              checked={dropdownChange["30d"]}
              id="30d"
              onChangeChecked={handleChange}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-col gap-4"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="w-full flex items-center">
            <span className="text-muted-foreground mr-2">Metrics</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-black font-bold">FDV</p>
            <SwitchComponent
              checked={dropdownChange.FDV}
              id="FDV"
              onChangeChecked={handleChange}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-black font-bold">Market Cap/FDV</p>
            <SwitchComponent
              checked={dropdownChange["Market Cap/FDV"]}
              id="Market Cap/FDV"
              onChangeChecked={handleChange}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-col gap-2"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="w-full flex items-center">
            <span className="text-muted-foreground mr-2">Others</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-black font-bold">Row</p>
            <Tabs
              value={coinListPerPagedata}
              onValueChange={setCoinListPerPage}
            >
              <TabsList>
                <TabsTrigger value="50">50</TabsTrigger>
                <TabsTrigger value="100">100</TabsTrigger>
                <TabsTrigger value="300">300</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomiseDropdownComponent;
