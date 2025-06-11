export const API_CONFIG = {
  BASE_URL: "https://api.coingecko.com/api/v3",
  TIMEOUT: 10000,
  DEFAULT_CURRENCY: "usd",
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_CHART_DAYS: 7,
} as const;

export const API_ENDPOINTS = {
  COINS: "/coins",
  SEARCH: "/search",
  TRENDING: "/search/trending",
  MARKETS: "/coins/markets",
  CHART: (coinId: string) => `/coins/${coinId}/market_chart`,
  COIN_DETAIL: (coinId: string) => `/coins/${coinId}`,
} as const;

export const API_PARAMS = {
  COIN_DETAIL: {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false,
  },
  MARKETS: {
    vs_currency: API_CONFIG.DEFAULT_CURRENCY,
    order: "market_cap_desc",
    per_page: API_CONFIG.DEFAULT_PAGE_SIZE,
    page: 1,
    sparkline: false,
  },
  CHART: {
    vs_currency: API_CONFIG.DEFAULT_CURRENCY,
    days: API_CONFIG.DEFAULT_CHART_DAYS,
  },
} as const;
