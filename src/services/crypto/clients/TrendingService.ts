import { BaseApiClient } from "../base/BaseApiClient";
import { API_ENDPOINTS } from "../config/apiConfig";
import { CoinMapper } from "../mappers/coinMapper";
import { TrendingResponse } from "@/types/crypto";
import { TrendingApiResponse } from "../../../types/apiTypes";

export class TrendingService extends BaseApiClient {
  async getTrendingCoins(): Promise<TrendingResponse> {
    try {
      const response = await this.get<TrendingApiResponse>(
        API_ENDPOINTS.TRENDING
      );

      return CoinMapper.toTrendingResponse(response);
    } catch {
      throw new Error("Failed to fetch trending coins");
    }
  }
}
