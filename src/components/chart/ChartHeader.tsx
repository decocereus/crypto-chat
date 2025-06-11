import { CHART_LABELS } from "./ChartConfig";
import { ChartUtils, PriceMetrics } from "../../lib/chart-utils";

interface ChartHeaderProps {
  metrics: PriceMetrics;
  title?: string;
}

export function ChartHeader({
  metrics,
  title = CHART_LABELS.TITLE,
}: Readonly<ChartHeaderProps>) {
  const { priceChange, isPositive } = metrics;

  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="text-sm font-medium">{title}</div>
      <div
        className={`text-sm font-semibold ${ChartUtils.getTextColor(
          isPositive
        )}`}
      >
        {ChartUtils.formatPriceChange(priceChange, isPositive)}
      </div>
    </div>
  );
}
