import {
  COIN_PATTERNS,
  GENERIC_SYMBOL_PATTERN,
} from "../patterns/coinPatterns";

export class CoinExtractor {
  static extractCoinSymbol(input: string): string | undefined {
    const lowerInput = input.toLowerCase();

    // Check specific coin patterns first
    for (const coinPattern of COIN_PATTERNS) {
      for (const pattern of coinPattern.patterns) {
        if (pattern.test(lowerInput)) {
          return coinPattern.symbol;
        }
      }
    }

    // Fall back to generic symbol pattern
    const genericMatch = RegExp(GENERIC_SYMBOL_PATTERN).exec(input);
    if (genericMatch) {
      return genericMatch[0].toLowerCase();
    }

    return undefined;
  }

  static isValidCoinSymbol(symbol: string): boolean {
    const lowerSymbol = symbol.toLowerCase();
    return COIN_PATTERNS.some(
      (pattern) =>
        pattern.symbol === lowerSymbol || pattern.aliases.includes(lowerSymbol)
    );
  }

  static normalizeCoinSymbol(symbol: string): string {
    const lowerSymbol = symbol.toLowerCase();
    const pattern = COIN_PATTERNS.find(
      (p) => p.symbol === lowerSymbol || p.aliases.includes(lowerSymbol)
    );
    return pattern ? pattern.symbol : lowerSymbol;
  }
}
