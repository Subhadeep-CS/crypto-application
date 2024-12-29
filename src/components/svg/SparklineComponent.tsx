import React from "react";
import { SparklineComponent } from "./module";

const Sparkline: React.FC<SparklineComponent> = ({
  data,
  width = 100,
  height = 30,
  strokeColor = "#4caf50",
}) => {
  // Calculate the normalized points for the polyline
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width; // X position
      const y = height - ((value - minValue) / (maxValue - minValue)) * height; // Y position
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
};

export default Sparkline;
