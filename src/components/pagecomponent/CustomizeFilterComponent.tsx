import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import CustomiseDropdownComponent from "./CustomiseDropdownComponent";
const CustomizeFilterComponent: React.FC = () => {
  return (
    <div className="flex justify-end items-center gap-2">
      <CustomiseDropdownComponent />
      <Button variant={"secondary"}>
        <FontAwesomeIcon icon={faFilter} />
      </Button>
    </div>
  );
};

export default CustomizeFilterComponent;
