import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { TotalMarketVolumeCardComponentProps } from "./module";
import DownTrendSvgComponent from "../svg/DownTrendSvgComponent";
import UpTrendSvgComponent from "../svg/UpTrendAvgComponent";

const TotalMarketVolumeCardComponent: React.FC<
  TotalMarketVolumeCardComponentProps
> = ({ cardTitle, cardDescription, cardDataChange = null }) => {
  return (
    <Card className="shadow-md bg-white rounded-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
        <div className="flex-1">
          <CardTitle className="text-md sm:text-lg font-bold text-gray-800 mb-2">
            ${Math.round(cardTitle)}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-600 flex items-center">
            {cardDescription}{" "}
            {cardDataChange !== null && (
              <>
                <span
                  className={`ml-2 ${
                    cardDataChange < 0 ? "text-red-500" : "text-green-500"
                  } font-medium text-xs sm:text-sm`}
                >
                  {Math.abs(cardDataChange).toFixed(3)}%
                </span>
                <FontAwesomeIcon
                  icon={cardDataChange < 0 ? faCaretDown : faCaretUp}
                  color={cardDataChange < 0 ? "#ff0000" : "#00ff00"}
                  className="ml-1"
                />
              </>
            )}
          </CardDescription>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          {cardDataChange !== null ? (
            cardDataChange < 0 ? (
              <DownTrendSvgComponent />
            ) : (
              <UpTrendSvgComponent />
            )
          ) : (
            <DownTrendSvgComponent />
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default TotalMarketVolumeCardComponent;
