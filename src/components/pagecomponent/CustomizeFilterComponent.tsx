import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import CustomiseDropdownComponent from "./CustomiseDropdownComponent";
import { CustomiseFilterProps } from "./module";
const CustomizeFilterComponent: React.FC<CustomiseFilterProps> = ({
  dropdownChange,
  setDropdownChange,
}) => {
  return (
    <div className="flex justify-end items-center gap-2">
      <CustomiseDropdownComponent
        dropdownChange={dropdownChange}
        setDropdownChange={setDropdownChange}
      />
      <Button variant={"secondary"}>
        <FontAwesomeIcon icon={faFilter} />
      </Button>
    </div>
  );
};

export default CustomizeFilterComponent;
