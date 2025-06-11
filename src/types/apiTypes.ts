// Raw API response types
export interface CoinApiResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface CoinDetailApiResponse {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
  };
  description: {
    en: string;
  };
}

export interface SearchApiResponse {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
  }>;
}

export interface TrendingApiResponse {
  coins: Array<{
    item: {
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      large: string;
      price_btc: number;
    };
  }>;
}

export interface ChartApiResponse {
  prices: [number, number][];
}

// Error types
export class CryptoApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly endpoint?: string
  ) {
    super(message);
    this.name = "CryptoApiError";
  }
}

export class CoinNotFoundError extends CryptoApiError {
  constructor(query: string) {
    super(`No coin found for "${query}"`, 404);
    this.name = "CoinNotFoundError";
  }
}

export class RateLimitError extends CryptoApiError {
  constructor() {
    super("API rate limit exceeded", 429);
    this.name = "RateLimitError";
  }
}

// Request parameter types
export interface MarketParams extends Record<string, unknown> {
  vs_currency?: string;
  ids?: string;
  order?: string;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
}

export interface ChartParams extends Record<string, unknown> {
  vs_currency?: string;
  days?: number;
  interval?: string;
}
