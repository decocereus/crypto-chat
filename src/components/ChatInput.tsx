import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Mic, MicOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChatInputProps,
  SpeechRecognition,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
} from "@/types/chat";
import { toast } from "sonner";

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window === "undefined") return;

    // Check HTTPS requirement
    if (location.protocol !== "https:" && location.hostname !== "localhost") {
      toast.error(
        "Voice input requires HTTPS. Please use a secure connection."
      );
      return;
    }

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      toast.error(
        "Speech recognition not supported in this browser. Try Chrome or Edge."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setMessage((prev) => prev + (prev ? " " : "") + transcript.trim());
        }
        setIsListening(false);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);

        switch (event.error) {
          case "not-allowed":
            setError(
              "Microphone access denied. Please allow microphone access."
            );
            break;
          case "no-speech":
            setError("No speech detected. Please try speaking louder.");
            break;
          case "network":
            setError(
              "Speech service temporarily unavailable. Please try a different browser (Safari, Chrome, or Edge)."
            );
            break;
          case "audio-capture":
            setError(
              "Microphone not accessible. Please check your microphone."
            );
            break;
          case "service-not-allowed":
            setError("Speech recognition service not available.");
            break;
          case "aborted":
            setError("Speech recognition was cancelled.");
            break;
          case "language-not-supported":
            setError("Language not supported for speech recognition.");
            break;
          default:
            setError(`Speech recognition failed. Please try again.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setIsSupported(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to initialize speech recognition");
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    initializeSpeechRecognition();
  }, [initializeSpeechRecognition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setError(null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to start voice recognition");
        setIsListening(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <TooltipProvider>
      <div className="border bg-background p-4 sticky bottom-4 w-11/12 md:max-w-3xl z-10 mx-auto rounded-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about crypto prices, trends, or your portfolio..."
              disabled={disabled}
              className="rounded-full border-input focus-visible:ring-primary"
            />
          </div>

          {isSupported && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={isListening ? "destructive" : "secondary"}
                  size="icon"
                  onClick={toggleListening}
                  disabled={disabled}
                  className="rounded-full h-10 w-10"
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isListening ? "Stop listening" : "Voice input"}
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={!message.trim() || disabled}
                className="rounded-full h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </form>

        {isListening && (
          <div className="mt-3 text-center">
            <span className="text-sm text-muted-foreground animate-pulse">
              🎤 Listening... Speak now
            </span>
          </div>
        )}

        {error && (
          <div className="mt-2 text-center">
            <span className="text-xs text-destructive">{error}</span>
            <Button variant="outline" onClick={() => setError(null)}>
              <X className="h-2 w-2" />
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
