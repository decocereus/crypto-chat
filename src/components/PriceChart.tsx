import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartUtils } from "../lib/chart-utils";
import { ChartTooltip } from "./chart/ChartTooltip";
import { ChartHeader } from "./chart/ChartHeader";
import { CHART_CONFIG, CHART_LABELS } from "./chart/ChartConfig";

interface PriceChartProps {
  data: [number, number][]; // [timestamp, price]
  title?: string;
  height?: number;
}

export default function PriceChart({
  data,
  title = CHART_LABELS.TITLE,
  height = CHART_CONFIG.DIMENSIONS.HEIGHT,
}: Readonly<PriceChartProps>) {
  const chartData = ChartUtils.transformPriceData(data);
  const metrics = ChartUtils.calculatePriceMetrics(data, chartData);

  // Get theme colors from CSS variables
  const getThemeColor = (variable: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    }
    return "#94a3b8"; // fallback
  };

  const gridColor = getThemeColor("--border");
  const textColor = getThemeColor("--muted-foreground");
  const axisColor = getThemeColor("--border");

  return (
    <Card className="bg-card border shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <ChartHeader metrics={metrics} title={title} />

        <div className="w-full mt-4" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={gridColor}
                strokeOpacity={0.8}
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="formattedTime"
                axisLine={true}
                tickLine={true}
                tick={{
                  fontSize: 13,
                  fill: textColor,
                  fontWeight: 500,
                }}
                stroke={axisColor}
                strokeWidth={1}
                tickMargin={10}
              />
              <YAxis
                domain={[metrics.yAxisMin, metrics.yAxisMax]}
                axisLine={true}
                tickLine={true}
                tick={{
                  fontSize: 13,
                  fill: textColor,
                  fontWeight: 500,
                }}
                stroke={axisColor}
                strokeWidth={1}
                tickMargin={10}
                tickFormatter={CHART_LABELS.PRICE_FORMAT}
                width={80}
              />
              <Tooltip
                content={ChartTooltip}
                cursor={{
                  stroke: textColor,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={ChartUtils.getStrokeColor(metrics.isPositive)}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 7,
                  fill: ChartUtils.getStrokeColor(metrics.isPositive),
                  stroke: getThemeColor("--background"),
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
