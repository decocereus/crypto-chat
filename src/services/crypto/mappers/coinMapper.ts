import { CoinData, TrendingResponse, CoinPriceHistory } from "@/types/crypto";
import {
  CoinApiResponse,
  CoinDetailApiResponse,
  TrendingApiResponse,
  ChartApiResponse,
} from "../../../types/apiTypes";

export class CoinMapper {
  static toCoinData(apiResponse: CoinApiResponse): CoinData {
    return {
      id: apiResponse.id,
      symbol: apiResponse.symbol.toUpperCase(),
      name: apiResponse.name,
      current_price: apiResponse.current_price,
      market_cap: apiResponse.market_cap,
      market_cap_rank: apiResponse.market_cap_rank,
      price_change_percentage_24h: apiResponse.price_change_percentage_24h,
      image: apiResponse.image,
    };
  }

  static toCoinDataFromDetail(apiResponse: CoinDetailApiResponse): CoinData {
    return {
      id: apiResponse.id,
      symbol: apiResponse.symbol.toUpperCase(),
      name: apiResponse.name,
      current_price: apiResponse.market_data.current_price.usd,
      market_cap: apiResponse.market_data.market_cap.usd,
      market_cap_rank: apiResponse.market_cap_rank,
      price_change_percentage_24h:
        apiResponse.market_data.price_change_percentage_24h,
      image: apiResponse.image.large,
      description: apiResponse.description,
    };
  }

  static toTrendingResponse(
    apiResponse: TrendingApiResponse
  ): TrendingResponse {
    return {
      coins: apiResponse.coins.map((coin) => ({
        item: {
          id: coin.item.id,
          name: coin.item.name,
          symbol: coin.item.symbol,
          market_cap_rank: coin.item.market_cap_rank,
          thumb: coin.item.thumb,
          large: coin.item.large,
          price_btc: coin.item.price_btc,
        },
      })),
    };
  }

  static toCoinPriceHistory(apiResponse: ChartApiResponse): CoinPriceHistory {
    return {
      prices: apiResponse.prices,
    };
  }

  static toCoinDataArray(apiResponses: CoinApiResponse[]): CoinData[] {
    return apiResponses.map(this.toCoinData);
  }
}
