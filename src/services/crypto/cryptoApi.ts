import { CoinData, TrendingResponse, CoinPriceHistory } from "@/types/crypto";
import { CoinService } from "./clients/CoinService";
import { TrendingService } from "./clients/TrendingService";

export class CryptoApiService {
  private static readonly coinService = new CoinService();
  private static readonly trendingService = new TrendingService();

  // Get current price for a specific coin
  static async getCoinPrice(coinId: string): Promise<CoinData> {
    return this.coinService.getCoinPrice(coinId);
  }

  // Search for a coin by symbol or name
  static async searchCoin(query: string): Promise<string> {
    return this.coinService.searchCoin(query);
  }

  // Get trending coins
  static async getTrendingCoins(): Promise<TrendingResponse> {
    return this.trendingService.getTrendingCoins();
  }

  // Get multiple coins data
  static async getCoinsData(coinIds: string[]): Promise<CoinData[]> {
    return this.coinService.getCoinsData(coinIds);
  }

  // Get 7-day price history
  static async getCoinHistory(coinId: string): Promise<CoinPriceHistory> {
    return this.coinService.getCoinHistory(coinId);
  }

  // Get top coins by market cap
  static async getTopCoins(limit: number = 10): Promise<CoinData[]> {
    return this.coinService.getTopCoins(limit);
  }
}
