export interface CoinPattern {
  patterns: RegExp[];
  symbol: string;
  aliases: string[];
}

export const COIN_PATTERNS: CoinPattern[] = [
  {
    patterns: [/\b(btc|bitcoin)\b/i],
    symbol: "btc",
    aliases: ["bitcoin"],
  },
  {
    patterns: [/\b(eth|ethereum)\b/i],
    symbol: "eth",
    aliases: ["ethereum"],
  },
  {
    patterns: [/\b(ada|cardano)\b/i],
    symbol: "ada",
    aliases: ["cardano"],
  },
  {
    patterns: [/\b(sol|solana)\b/i],
    symbol: "sol",
    aliases: ["solana"],
  },
  {
    patterns: [/\b(dot|polkadot)\b/i],
    symbol: "dot",
    aliases: ["polkadot"],
  },
  {
    patterns: [/\b(avax|avalanche)\b/i],
    symbol: "avax",
    aliases: ["avalanche"],
  },
  {
    patterns: [/\b(matic|polygon)\b/i],
    symbol: "matic",
    aliases: ["polygon"],
  },
  {
    patterns: [/\b(link|chainlink)\b/i],
    symbol: "link",
    aliases: ["chainlink"],
  },
  {
    patterns: [/\b(uni|uniswap)\b/i],
    symbol: "uni",
    aliases: ["uniswap"],
  },
  {
    patterns: [/\b(doge|dogecoin)\b/i],
    symbol: "doge",
    aliases: ["dogecoin"],
  },
  {
    patterns: [/\b(shib|shiba)\b/i],
    symbol: "shib",
    aliases: ["shiba"],
  },
  {
    patterns: [/\b(xrp|ripple)\b/i],
    symbol: "xrp",
    aliases: ["ripple"],
  },
];

export const GENERIC_SYMBOL_PATTERN = /\b[A-Z]{2,5}\b/g;
