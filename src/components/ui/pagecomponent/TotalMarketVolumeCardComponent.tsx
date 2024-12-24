import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { TotalMarketVolumeCardComponentProps } from "./module";

const TotalMarketVolumeCardComponent: React.FC<
  TotalMarketVolumeCardComponentProps
> = ({ cardTitle, cardDescription, cardDataChange = null }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">${Math.round(cardTitle)}</CardTitle>
        <CardDescription>
          {cardDescription}{" "}
          {cardDataChange !== null && (
            <>
              <span
                className={`${
                  cardDataChange < 0 ? "text-red-500" : "text-green-500"
                } mr-2`} // Added margin-right to create a gap
              >
                {Math.abs(cardDataChange).toFixed(3)} %
              </span>
              <span>
                {cardDataChange < 0 ? (
                  <FontAwesomeIcon icon={faCaretDown} color="#ff0000" />
                ) : (
                  <FontAwesomeIcon icon={faCaretUp} color="#00ff00" />
                )}
              </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TotalMarketVolumeCardComponent;
