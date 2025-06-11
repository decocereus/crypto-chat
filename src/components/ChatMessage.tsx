import { ChatMessage } from "@/types/crypto";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageContent } from "./message/MessageContent";
import { MessageAvatar } from "./message/MessageAvatar";
import { MessageTimestamp } from "./message/MessageTimestamp";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessageComponent({ message }: Readonly<ChatMessageProps>) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={`flex items-start gap-3 ${
        isBot ? "justify-start" : "justify-end"
      } mb-4`}
    >
      {isBot && <MessageAvatar isBot={true} />}

      <div
        className={cn(
          isBot ? "order-2 w-3/4" : "order-1 w-fit",
          "flex flex-col gap-2"
        )}
      >
        <Card className={cn("bg-muted py-1")}>
          <CardContent className="p-3">
            <MessageContent message={message} />
          </CardContent>
        </Card>

        <MessageTimestamp timestamp={message.timestamp} isBot={isBot} />
      </div>

      {!isBot && <MessageAvatar isBot={false} className="order-2" />}
    </div>
  );
}
