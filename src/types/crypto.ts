export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
  description?: {
    en: string;
  };
}

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  price_btc: number;
}

export interface TrendingResponse {
  coins: Array<{
    item: TrendingCoin;
  }>;
}

export interface CoinPriceHistory {
  prices: [number, number][];
}

export interface Portfolio {
  [coinId: string]: {
    amount: number;
    symbol: string;
    name: string;
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: "text" | "chart" | "loading" | "error";
  data?: [number, number][] | undefined;
}
