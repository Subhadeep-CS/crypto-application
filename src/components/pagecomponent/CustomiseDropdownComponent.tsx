import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
const CustomiseDropdownComponent: React.FC = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"secondary"}>
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Customise
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem className="flex flex-col gap-2">
            <div className="w-full flex items-center">
              <span className="text-muted-foreground mr-2">Price Change</span>
              <Separator className="flex-1" />
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-black font-bold">30d</p>
              <Switch />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CustomiseDropdownComponent;
