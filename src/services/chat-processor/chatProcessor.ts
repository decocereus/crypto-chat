import { Portfolio } from "@/types/crypto";
import { QueryParser, ProcessedQuery } from "./parsers/QueryParser";
import { ResponseGenerator } from "./responses/ResponseGenerator";

export type { ProcessedQuery } from "./parsers/QueryParser";

export class ChatProcessor {
  private static readonly queryParser = QueryParser;
  private static readonly responseGenerator = new ResponseGenerator();

  // Parse user input to determine intent and extract relevant information
  static parseQuery(input: string): ProcessedQuery {
    return this.queryParser.parseQuery(input);
  }

  // Generate appropriate responses
  static async generateResponse(
    query: ProcessedQuery,
    portfolio?: Portfolio
  ): Promise<string> {
    return this.responseGenerator.generateResponse(query, portfolio);
  }

  // Convenience method that combines parsing and response generation
  static async processMessage(
    input: string,
    portfolio?: Portfolio
  ): Promise<{ query: ProcessedQuery; response: string }> {
    const query = this.parseQuery(input);
    const response = await this.generateResponse(query, portfolio);

    return { query, response };
  }
}
