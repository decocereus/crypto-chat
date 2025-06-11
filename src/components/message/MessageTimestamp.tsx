import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageTimestampProps {
  timestamp: Date;
  isBot: boolean;
  className?: string;
}

export function MessageTimestamp({
  timestamp,
  isBot,
  className,
}: Readonly<MessageTimestampProps>) {
  return (
    <div
      className={cn(
        "text-xs text-muted-foreground mt-1 px-1",
        isBot ? "text-left" : "text-right",
        className
      )}
    >
      {format(timestamp, "HH:mm")}
    </div>
  );
}
