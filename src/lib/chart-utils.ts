import { format } from "date-fns";
import { CHART_CONFIG, CHART_LABELS } from "../components/chart/ChartConfig";

export interface ChartDataPoint {
  time: number;
  price: number;
  formattedTime: string;
}

export interface PriceMetrics {
  minPrice: number;
  maxPrice: number;
  priceRange: number;
  yAxisMin: number;
  yAxisMax: number;
  currentPrice: number;
  startPrice: number;
  priceChange: number;
  isPositive: boolean;
}

export class ChartUtils {
  static transformPriceData(data: [number, number][]): ChartDataPoint[] {
    return data.map(([timestamp, price]) => ({
      time: timestamp,
      price: price,
      formattedTime: format(new Date(timestamp), CHART_LABELS.DATE_FORMAT),
    }));
  }

  static calculatePriceMetrics(
    data: [number, number][],
    chartData: ChartDataPoint[]
  ): PriceMetrics {
    const minPrice = Math.min(...data.map(([, price]) => price));
    const maxPrice = Math.max(...data.map(([, price]) => price));
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * CHART_CONFIG.CHART_SETTINGS.Y_AXIS_PADDING;

    const currentPrice = chartData[chartData.length - 1]?.price || 0;
    const startPrice = chartData[0]?.price || 0;
    const priceChange =
      startPrice > 0 ? ((currentPrice - startPrice) / startPrice) * 100 : 0;

    return {
      minPrice,
      maxPrice,
      priceRange,
      yAxisMin: minPrice - padding,
      yAxisMax: maxPrice + padding,
      currentPrice,
      startPrice,
      priceChange,
      isPositive: priceChange >= 0,
    };
  }

  static formatPriceChange(priceChange: number, isPositive: boolean): string {
    const sign = isPositive ? "+" : "";
    return `${sign}${priceChange.toFixed(2)}%`;
  }

  static getStrokeColor(isPositive: boolean): string {
    return isPositive
      ? CHART_CONFIG.COLORS.POSITIVE
      : CHART_CONFIG.COLORS.NEGATIVE;
  }

  static getTextColor(isPositive: boolean): string {
    return isPositive ? "text-green-600" : "text-red-600";
  }
}
