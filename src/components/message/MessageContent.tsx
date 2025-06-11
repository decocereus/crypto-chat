import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/types/crypto";
import PriceChart from "../PriceChart";

interface MessageContentProps {
  message: ChatMessage;
}

export function LoadingContent() {
  return (
    <div className="flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">Thinking...</span>
    </div>
  );
}

export function ErrorContent({ content }: { content: string }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="destructive" className="text-xs">
        Error
      </Badge>
      <span className="text-sm">{content}</span>
    </div>
  );
}

export function ChartContent({
  content,
  data,
}: {
  content: string;
  data: [number, number][];
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{content}</p>
      <div className="rounded-lg overflow-hidden">
        <PriceChart data={data} />
      </div>
    </div>
  );
}

export function TextContent({ content }: { content: string }) {
  return <p className="text-sm whitespace-pre-wrap break-words">{content}</p>;
}

export function MessageContent({ message }: MessageContentProps) {
  switch (message.type) {
    case "loading":
      return <LoadingContent />;

    case "error":
      return <ErrorContent content={message.content} />;

    case "chart":
      if (!message.data) return <TextContent content={message.content} />;
      return <ChartContent content={message.content} data={message.data} />;

    default:
      return <TextContent content={message.content} />;
  }
}
