import { BaseApiClient } from "../base/BaseApiClient";
import { API_ENDPOINTS, API_PARAMS } from "../config/apiConfig";
import { CoinMapper } from "../mappers/coinMapper";
import { CoinData, CoinPriceHistory } from "@/types/crypto";
import {
  CoinDetailApiResponse,
  ChartApiResponse,
  SearchApiResponse,
  CoinNotFoundError,
  MarketParams,
  ChartParams,
} from "../../../types/apiTypes";

export class CoinService extends BaseApiClient {
  async getCoinPrice(coinId: string): Promise<CoinData> {
    try {
      const response = await this.get<CoinDetailApiResponse>(
        API_ENDPOINTS.COIN_DETAIL(coinId),
        API_PARAMS.COIN_DETAIL
      );

      return CoinMapper.toCoinDataFromDetail(response);
    } catch (error) {
      console.error(error);
      throw new CoinNotFoundError(coinId);
    }
  }

  async searchCoin(query: string): Promise<string> {
    try {
      const response = await this.get<SearchApiResponse>(API_ENDPOINTS.SEARCH, {
        query,
      });

      if (response.coins.length === 0) {
        throw new CoinNotFoundError(query);
      }

      return response.coins[0].id;
    } catch (error) {
      if (error instanceof CoinNotFoundError) {
        throw error;
      }
      throw new CoinNotFoundError(query);
    }
  }

  async getCoinHistory(
    coinId: string,
    params?: Partial<ChartParams>
  ): Promise<CoinPriceHistory> {
    try {
      const chartParams = { ...API_PARAMS.CHART, ...params };
      const response = await this.get<ChartApiResponse>(
        API_ENDPOINTS.CHART(coinId),
        chartParams
      );

      return CoinMapper.toCoinPriceHistory(response);
    } catch (error) {
      console.error(error);
      throw new CoinNotFoundError(coinId);
    }
  }

  async getCoinsData(coinIds: string[]): Promise<CoinData[]> {
    try {
      const params: MarketParams = {
        ...API_PARAMS.MARKETS,
        ids: coinIds.join(","),
      };

      const response = await this.get<CoinData[]>(
        API_ENDPOINTS.MARKETS,
        params
      );

      return response.map((coin) => CoinMapper.toCoinData(coin));
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch coins data");
    }
  }

  async getTopCoins(limit: number = 10): Promise<CoinData[]> {
    try {
      const params: MarketParams = {
        ...API_PARAMS.MARKETS,
        per_page: limit,
      };

      const response = await this.get<CoinData[]>(
        API_ENDPOINTS.MARKETS,
        params
      );

      return response.map((coin) => CoinMapper.toCoinData(coin));
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch top coins");
    }
  }
}
