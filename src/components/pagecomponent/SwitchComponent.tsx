import { SwitchComponentProps } from "./module";
import { Switch } from "../ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
const SwitchComponent: React.FC<SwitchComponentProps> = ({
  checked = false,
  id,
  onChangeChecked,
}) => {
  return (
    <>
      <Switch
        className="data-[state=checked]:bg-green-500"
        checked={checked}
        checkedIcon={
          <>
            <FontAwesomeIcon icon={faCheck} />
          </>
        }
        unCheckedIcon={
          <>
            <FontAwesomeIcon icon={faX} />
          </>
        }
        name={id}
        onCheckedChange={(checked) => onChangeChecked(id, checked)}
      />
    </>
  );
};

export default SwitchComponent;
