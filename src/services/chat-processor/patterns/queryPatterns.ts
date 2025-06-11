export interface QueryPattern {
  type: string;
  keywords: string[];
  priority?: number;
}

export const QUERY_PATTERNS: QueryPattern[] = [
  {
    type: "price",
    keywords: ["price", "trading", "worth", "cost", "value", "trading at"],
    priority: 1,
  },
  {
    type: "trending",
    keywords: ["trending", "popular", "hot", "top coins", "what's hot"],
    priority: 2,
  },
  {
    type: "portfolio",
    keywords: ["have", "own", "portfolio", "holdings", "my coins"],
    priority: 3,
  },
  {
    type: "chart",
    keywords: ["chart", "graph", "history", "performance", "show me"],
    priority: 4,
  },
  {
    type: "stats",
    keywords: ["stats", "info", "about", "details", "tell me about"],
    priority: 5,
  },
  {
    type: "help",
    keywords: ["help", "commands", "what can you do", "assistance"],
    priority: 6,
  },
];

export const PORTFOLIO_ACTION_PATTERNS = {
  add: ["have", "own", "bought", "purchased"],
  remove: ["sold", "remove", "don't have"],
  show: ["show", "display", "portfolio", "holdings"],
};

export const AMOUNT_PATTERNS = [
  /(\d+(?:\.\d+)?)\s*(?:coins?|tokens?)?/i,
  /i\s+have\s+(\d+(?:\.\d+)?)/i,
  /(\d+(?:\.\d+)?)\s+\w+/i,
];
