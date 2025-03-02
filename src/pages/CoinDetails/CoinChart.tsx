import { XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { ChartContainer, ChartTooltip } from "../../components/ui/chart";
import { ChartConfig } from "../../components/ui/chart";
import { fetchCoinChartData } from "../../services/api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formattedData } from "./module";

const CoinChart: React.FC<{ percentageData: number }> = ({
  percentageData,
}) => {
  const { coin_id } = useParams<{ coin_id: string }>();
  const [chartData, setChartData] = useState<formattedData[]>([]);
  const { data: coinChartsData } = useQuery({
    queryKey: ["CoinChartsData", { coin_id }],
    queryFn: fetchCoinChartData,
  });

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: percentageData < 0 ? "#ef4444" : "#10b981",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const formattedData: formattedData[] = coinChartsData?.prices.map(
      ([timestamp, price]: [number, number]) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const year = date.getFullYear();
        const detailedTime = `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;

        return {
          time: `${day} ${month}, ${hours}:00`,
          detailedTime,
          price: price.toFixed(2),
        };
      }
    );

    setChartData(formattedData);
  }, [coinChartsData]);
  return (
    <>
      <ChartContainer config={chartConfig}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={percentageData < 0 ? "#ef4444" : "#10b981"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={percentageData < 0 ? "#ef4444" : "#10b981"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$ ${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="min-w-[150px] rounded-lg bg-white p-2 shadow-md text-xs">
                    <div className="mb-1 font-semibold text-gray-800">
                      {data.detailedTime} {/* Display Detailed Time */}
                    </div>
                    <div className="flex items-baseline gap-0.5 font-mono tabular-nums text-gray-800 font-semibold">
                      <span className="text-gray-500">Price: </span>$
                      {data.price}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            dot={false}
            strokeWidth={2}
            fill="url(#colorPrice)"
            stroke={
              percentageData < 0 ? "rgb(239, 68, 68)" : "rgb(16, 185, 129)"
            }
            fillOpacity={1}
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

export default CoinChart;
