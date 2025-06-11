export const CHART_CONFIG = {
  DIMENSIONS: {
    HEIGHT: 192,
    WIDTH: "100%",
  },
  COLORS: {
    POSITIVE: "#16a34a",
    NEGATIVE: "#dc2626",
    MUTED_FOREGROUND: "hsl(var(--muted-foreground))",
  },
  CHART_SETTINGS: {
    STROKE_WIDTH: 2,
    ACTIVE_DOT_RADIUS: 4,
    Y_AXIS_PADDING: 0.1,
  },
  AXIS_STYLE: {
    FONT_SIZE: 10,
    AXIS_LINE: false,
    TICK_LINE: false,
  },
} as const;

export const CHART_LABELS = {
  TITLE: "7-Day Price Chart",
  DATE_FORMAT: "MMM d",
  TIME_FORMAT: "HH:mm",
  PRICE_FORMAT: (value: number) => `$${value.toFixed(0)}`,
} as const;
