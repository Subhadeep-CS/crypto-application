import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { HoverCardProps } from "./module";

const HoverCardComponent: React.FC<HoverCardProps> = ({
  hoverTrigger,
  hoverContext,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        {hoverTrigger}
      </HoverCardTrigger>
      <HoverCardContent>{hoverContext}</HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
