import { AMOUNT_PATTERNS } from "../patterns/queryPatterns";

export class AmountExtractor {
  static extractAmount(input: string): number | undefined {
    for (const pattern of AMOUNT_PATTERNS) {
      const match = RegExp(pattern).exec(input);
      if (match?.[1]) {
        const amount = parseFloat(match[1]);
        if (!isNaN(amount) && amount > 0) {
          return amount;
        }
      }
    }
    return undefined;
  }

  static extractPortfolioAction(
    input: string
  ): "add" | "remove" | "show" | undefined {
    const lowerInput = input.toLowerCase();

    // Check for specific action patterns
    if (
      this.containsAny(lowerInput, [
        "sold",
        "remove",
        "don't have",
        "no longer",
      ])
    ) {
      return "remove";
    }

    if (
      this.containsAny(lowerInput, [
        "show",
        "display",
        "portfolio",
        "holdings",
        "what do i",
      ])
    ) {
      return "show";
    }

    if (
      this.containsAny(lowerInput, [
        "have",
        "own",
        "bought",
        "purchased",
        "i have",
      ])
    ) {
      return "add";
    }

    return undefined;
  }

  private static containsAny(input: string, keywords: string[]): boolean {
    return keywords.some((keyword) => input.includes(keyword));
  }
}
