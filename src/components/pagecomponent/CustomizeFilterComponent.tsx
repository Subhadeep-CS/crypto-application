import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <button className="secondary-button">
        <span className="front">
          <FontAwesomeIcon icon={faFilter} />
        </span>
      </button>
      {/* <Button variant={"secondary"}></Button> */}
    </div>
  );
};

export default CustomizeFilterComponent;
