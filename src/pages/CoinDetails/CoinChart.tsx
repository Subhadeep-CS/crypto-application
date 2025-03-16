import { XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { ChartContainer, ChartTooltip } from "../../components/ui/chart";
import { ChartConfig } from "../../components/ui/chart";
import { fetchCoinChartData } from "../../services/api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import usePriceFormatter from "../../hooks/usePriceFormatter";

interface FormattedData {
  time: string;
  detailedTime: string;
  price: string;
}

const CoinChart: React.FC<{
  percentageData: number;
  days: string;
  priceType: string;
}> = ({ percentageData, priceType, days }) => {
  const handlePriceFormat = usePriceFormatter();
  const { coin_id } = useParams<{ coin_id: string }>();
  const [chartData, setChartData] = useState<FormattedData[]>([]);

  const { data: coinChartsData } = useQuery({
    queryKey: ["CoinChartsData", { coin_id, days }],
    queryFn: fetchCoinChartData,
    enabled: !!coin_id,
  });

  console.log("Coin Charts Data", percentageData);

  const chartConfig: ChartConfig = {
    desktop: {
      label: "Desktop",
      color: percentageData < 0 ? "#ef4444" : "#10b981",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  };

  useEffect(() => {
    if (!coinChartsData?.[priceType]) return;
    const seenMonths = new Set(); // Track unique months
    console.log(coinChartsData?.[priceType]);
    const formattedData: FormattedData[] = coinChartsData?.[priceType].map(
      ([timestamp, price]: [number, number]) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();

        // 🛠️ Full detailed time (DD MMM YYYY, HH:MM:SS AM/PM)
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format

        const detailedTime = `${day} ${month} ${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;

        let timeLabel = "";
        if (days === "1") {
          // Show HH:MM AM/PM format for 1-day range
          timeLabel = `${formattedHours}:${minutes} ${ampm}`;
        } else if (days === "365") {
          // Show unique months for a one-year range
          const monthKey = `${month} ${year}`;
          if (seenMonths.has(monthKey)) return null;
          seenMonths.add(monthKey);
          timeLabel = monthKey;
        } else {
          // Default date format for other cases
          timeLabel = date.toLocaleDateString("en-GB");
        }

        return {
          time: timeLabel,
          detailedTime,
          price: price,
        };
      }
    );

    setChartData(formattedData);
  }, [coinChartsData, days, priceType]);

  return (
    <ChartContainer config={chartConfig} className="w-full">
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
          tickFormatter={(value) => `$ ${handlePriceFormat(Number(value))}`}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload as FormattedData;
              return (
                <div className="min-w-[150px] rounded-lg bg-white p-2 shadow-md text-xs">
                  <div className="mb-1 font-semibold text-gray-800">
                    {data.detailedTime}
                  </div>
                  <div className="flex items-baseline gap-0.5 font-mono tabular-nums text-gray-800 font-semibold">
                    <span className="text-gray-500">Price: </span>$
                    {handlePriceFormat(Number(data.price))}
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
          stroke={percentageData < 0 ? "rgb(239, 68, 68)" : "rgb(16, 185, 129)"}
          fillOpacity={1}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CoinChart;
