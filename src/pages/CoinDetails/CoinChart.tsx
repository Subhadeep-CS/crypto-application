import { LineChart } from "recharts";
import { ChartContainer } from "../../components/ui/chart";
import { ChartConfig } from "../../components/ui/chart";
import { fetchCoinChartData } from "../../services/api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
const CoinChart: React.FC = () => {
  const { coin_id } = useParams<{ coin_id: string }>();
  const { data: coinChartsData } = useQuery({
    queryKey: ["CoinChartsData", { coin_id }],
    queryFn: fetchCoinChartData,
  });

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    // const chartData = coinChartsData?.prices?.map((price) => {
    //   const date = new Date(price[0]);
    //   const time = date.getHours();
    // });
  }, [coinChartsData]);
  return (
    <>
      <ChartContainer config={chartConfig}>
        <LineChart></LineChart>
      </ChartContainer>
    </>
  );
};

export default CoinChart;
