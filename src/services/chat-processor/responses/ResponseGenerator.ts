import { ProcessedQuery } from "../parsers/QueryParser";
import { Portfolio } from "@/types/crypto";
import { CryptoApiService } from "@/services/crypto/cryptoApi";

export interface ResponseStrategy {
  generate(query: ProcessedQuery, portfolio?: Portfolio): Promise<string>;
}

export class PriceResponseStrategy implements ResponseStrategy {
  async generate(query: ProcessedQuery): Promise<string> {
    if (!query.coinSymbol) {
      return "I'd be happy to help you check a coin's price! Please specify which cryptocurrency you're interested in. For example: 'What's BTC trading at?'";
    }

    const coinId = await CryptoApiService.searchCoin(query.coinSymbol);
    const coinData = await CryptoApiService.getCoinPrice(coinId);

    const priceChange = coinData.price_change_percentage_24h;
    const changeDirection = priceChange >= 0 ? "📈" : "📉";

    return `${coinData.name} (${
      coinData.symbol
    }) is currently trading at $${coinData.current_price.toLocaleString()} ${changeDirection}
    
24h change: ${priceChange.toFixed(2)}%
Market cap: $${(coinData.market_cap / 1e9).toFixed(2)}B
Rank: #${coinData.market_cap_rank}`;
  }
}

export class TrendingResponseStrategy implements ResponseStrategy {
  async generate(): Promise<string> {
    const trending = await CryptoApiService.getTrendingCoins();
    const trendingList = trending.coins
      .slice(0, 5)
      .map(
        (item, index) =>
          `${index + 1}. ${
            item.item.name
          } (${item.item.symbol.toUpperCase()}) - Rank #${
            item.item.market_cap_rank
          }`
      )
      .join("\n");

    return `🔥 Today's trending cryptocurrencies:\n\n${trendingList}`;
  }
}

export class PortfolioResponseStrategy implements ResponseStrategy {
  async generate(
    query: ProcessedQuery,
    portfolio?: Portfolio
  ): Promise<string> {
    if (query.action === "show") {
      if (!portfolio || Object.keys(portfolio).length === 0) {
        return "Your portfolio is empty. You can add holdings by saying something like 'I have 2 ETH' or 'I own 0.5 BTC'.";
      }

      const holdings = Object.entries(portfolio);
      const holdingsList = holdings
        .map(
          ([, holding]) =>
            `${holding.amount} ${holding.symbol} (${holding.name})`
        )
        .join("\n");

      return `📊 Your current portfolio:\n\n${holdingsList}`;
    }

    if (query.action === "add" && query.coinSymbol && query.amount) {
      return `Got it! I've noted that you have ${
        query.amount
      } ${query.coinSymbol.toUpperCase()}. You can ask me to show your portfolio value anytime!`;
    }

    return "I can help you track your crypto portfolio! Tell me what you own, like 'I have 2 ETH' or ask to 'show my portfolio'.";
  }
}

export class ChartResponseStrategy implements ResponseStrategy {
  async generate(query: ProcessedQuery): Promise<string> {
    if (!query.coinSymbol) {
      return "I can show you price charts! Please specify which coin you'd like to see, for example: 'Show me BTC chart' or 'ETH performance'.";
    }
    return `I'll show you the 7-day price chart for ${query.coinSymbol.toUpperCase()}...`;
  }
}

export class StatsResponseStrategy implements ResponseStrategy {
  async generate(query: ProcessedQuery): Promise<string> {
    if (!query.coinSymbol) {
      return "I can provide detailed stats for any cryptocurrency! Just tell me which coin you're interested in.";
    }

    const statsCoinId = await CryptoApiService.searchCoin(query.coinSymbol);
    const statsData = await CryptoApiService.getCoinPrice(statsCoinId);

    return `📊 ${statsData.name} (${statsData.symbol}) Statistics:
    
💰 Price: $${statsData.current_price.toLocaleString()}
📈 24h Change: ${statsData.price_change_percentage_24h.toFixed(2)}%
🏆 Market Cap: $${(statsData.market_cap / 1e9).toFixed(2)}B
🥇 Rank: #${statsData.market_cap_rank}

${
  statsData.description?.en
    ? statsData.description.en.substring(0, 200) + "..."
    : "No description available."
}`;
  }
}

export class HelpResponseStrategy implements ResponseStrategy {
  async generate(): Promise<string> {
    return `🤖 I'm your crypto assistant! Here's what I can help you with:

💰 **Price Queries**: "What's BTC trading at?" or "ETH price"
🔥 **Trending Coins**: "Show me trending coins" or "What's popular today?"
📊 **Portfolio**: "I have 2 ETH" or "Show my portfolio"
📈 **Charts**: "Show BTC chart" or "ETH performance"
📋 **Stats**: "Tell me about Bitcoin" or "ETH stats"
🎤 **Voice**: Use the mic button to speak your questions!

Just ask me anything about crypto in natural language!`;
  }
}

export class UnknownResponseStrategy implements ResponseStrategy {
  async generate(): Promise<string> {
    return "I'm not sure what you're asking about. Try asking about crypto prices, trending coins, your portfolio, or say 'help' to see what I can do!";
  }
}

export class ResponseGenerator {
  private readonly strategies: Map<string, ResponseStrategy> = new Map([
    ["price", new PriceResponseStrategy()],
    ["trending", new TrendingResponseStrategy()],
    ["portfolio", new PortfolioResponseStrategy()],
    ["chart", new ChartResponseStrategy()],
    ["stats", new StatsResponseStrategy()],
    ["help", new HelpResponseStrategy()],
    ["unknown", new UnknownResponseStrategy()],
  ]);

  async generateResponse(
    query: ProcessedQuery,
    portfolio?: Portfolio
  ): Promise<string> {
    try {
      const strategy =
        this.strategies.get(query.type) || this.strategies.get("unknown")!;
      return await strategy.generate(query, portfolio);
    } catch (error) {
      if (error instanceof Error && error.message.includes("rate")) {
        return "🚫 The crypto API is currently rate-limited. Please try again in a moment!";
      }
      return "❌ Sorry, I encountered an error fetching that information. Please try again or ask about something else!";
    }
  }
}
