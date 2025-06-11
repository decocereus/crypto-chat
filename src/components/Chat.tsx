"use client";

import { useState, useEffect, useRef } from "react";
import { ChatMessage, Portfolio } from "@/types/crypto";
import { ChatProcessor } from "@/services/chat-processor/chatProcessor";
import { ChatMessageComponent } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { CryptoApiService } from "@/services/crypto/cryptoApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateMessageId } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Text-to-speech functionality
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedPortfolio = localStorage.getItem("crypto-portfolio");
    if (savedPortfolio) {
      try {
        setPortfolio(JSON.parse(savedPortfolio));
      } catch (error) {
        console.error("Failed to parse saved portfolio:", error);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "welcome-message",
          content: `🚀 Welcome to CryptoChat! I'm your personal crypto assistant.

I can help you with:
• Real-time crypto prices
• Trending cryptocurrencies  
• Portfolio tracking
• Price charts and stats
• Voice commands

Try asking me "What's BTC trading at?" or "Show me trending coins" to get started!`,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        },
      ]);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("crypto-portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: generateMessageId(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const updateMessage = (id: string, updates: Partial<ChatMessage>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  };

  const handleSendMessage = async (userInput: string) => {
    addMessage({
      content: userInput,
      sender: "user",
      type: "text",
    });

    const loadingMessage = addMessage({
      content: "",
      sender: "bot",
      type: "loading",
    });

    setIsLoading(true);

    try {
      // Parse the user query
      const query = ChatProcessor.parseQuery(userInput);

      // Handle portfolio updates
      if (
        query.type === "portfolio" &&
        query.action === "add" &&
        query.coinSymbol &&
        query.amount
      ) {
        const coinId = await CryptoApiService.searchCoin(query.coinSymbol);
        const coinData = await CryptoApiService.getCoinPrice(coinId);

        setPortfolio((prev) => ({
          ...prev,
          [coinId]: {
            amount: query.amount!,
            symbol: coinData.symbol,
            name: coinData.name,
          },
        }));
      }

      // Generate response
      let response = await ChatProcessor.generateResponse(query, portfolio);

      // Handle chart requests
      let chartData = undefined;
      if (query.type === "chart" && query.coinSymbol) {
        try {
          const coinId = await CryptoApiService.searchCoin(query.coinSymbol);
          const history = await CryptoApiService.getCoinHistory(coinId);
          chartData = history.prices;
          response = `7-day price chart for ${query.coinSymbol.toUpperCase()}:`;
        } catch {
          response = `Sorry, I couldn't fetch the chart data for ${query.coinSymbol.toUpperCase()}. Please try again.`;
        }
      }

      // Update the loading message with the response
      updateMessage(loadingMessage.id, {
        content: response,
        type: chartData ? "chart" : "text",
        data: chartData,
      });

      // Speak the response (for non-chart messages)
      if (!chartData && response.length < 300) {
        speakText(response);
      }
    } catch (error) {
      updateMessage(loadingMessage.id, {
        content:
          error instanceof Error
            ? error.message
            : "Sorry, something went wrong. Please try again.",
        type: "error",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-background relative w-full min-w-0">
      {/* Header */}
      <Card className="rounded-none border-b border-t-0 border-l-0 border-r-0 py-1 w-full">
        <CardHeader className="pb-4 px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm sm:text-lg">
                ₿
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg font-semibold truncate">
                CryptoChat
              </h1>
              <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Your AI crypto assistant
                </p>
                <Badge
                  variant="default"
                  className="text-xs hidden xs:inline-flex"
                >
                  Live Data
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs hidden sm:inline-flex"
                >
                  CoinGecko API
                </Badge>
              </div>
            </div>
            {Object.keys(portfolio).length > 0 && (
              <Badge variant="default" className="text-xs flex-shrink-0">
                {Object.keys(portfolio).length}{" "}
                {Object.keys(portfolio).length === 1 ? "Asset" : "Assets"}{" "}
                <span className="hidden xs:inline">Tracked</span>
              </Badge>
            )}
            <ThemeToggle />
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <ScrollArea className="flex-1 w-full">
        <div className="p-2 sm:p-4 max-w-full sm:max-w-3xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>
      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
