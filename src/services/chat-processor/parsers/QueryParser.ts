import { QUERY_PATTERNS } from "../patterns/queryPatterns";
import { CoinExtractor } from "../extractors/CoinExtractor";
import { AmountExtractor } from "../extractors/AmountExtractor";

export interface ProcessedQuery {
  type:
    | "price"
    | "trending"
    | "portfolio"
    | "chart"
    | "stats"
    | "help"
    | "unknown";
  coinSymbol?: string;
  coinId?: string;
  amount?: number;
  action?: "add" | "remove" | "show";
  confidence?: number;
}

export class QueryParser {
  static parseQuery(input: string): ProcessedQuery {
    const lowerInput = input.toLowerCase().trim();
    const detectedType = this.detectQueryType(lowerInput);

    const baseQuery: ProcessedQuery = {
      type: detectedType.type as ProcessedQuery["type"],
      confidence: detectedType.confidence,
    };

    // Extract additional information based on query type
    switch (baseQuery.type) {
      case "price":
      case "chart":
      case "stats":
        baseQuery.coinSymbol = CoinExtractor.extractCoinSymbol(input);
        break;

      case "portfolio":
        baseQuery.action = AmountExtractor.extractPortfolioAction(input);
        baseQuery.amount = AmountExtractor.extractAmount(input);
        baseQuery.coinSymbol = CoinExtractor.extractCoinSymbol(input);
        break;
    }

    return baseQuery;
  }

  private static detectQueryType(input: string): {
    type: string;
    confidence: number;
  } {
    const matches = QUERY_PATTERNS.map((pattern) => ({
      type: pattern.type,
      priority: pattern.priority ?? 999,
      matchCount: this.countMatches(input, pattern.keywords),
      totalKeywords: pattern.keywords.length,
    }));

    // Find best match based on match count and priority
    const bestMatch = matches
      .filter((match) => match.matchCount > 0)
      .sort((a, b) => {
        // Sort by match count first, then by priority
        if (a.matchCount !== b.matchCount) {
          return b.matchCount - a.matchCount;
        }
        return a.priority - b.priority;
      })[0];

    if (bestMatch) {
      const confidence = bestMatch.matchCount / bestMatch.totalKeywords;
      return { type: bestMatch.type, confidence };
    }

    return { type: "unknown", confidence: 0 };
  }

  private static countMatches(input: string, keywords: string[]): number {
    return keywords.filter((keyword) => input.includes(keyword)).length;
  }
}
