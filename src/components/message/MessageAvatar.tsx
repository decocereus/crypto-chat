import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageAvatarProps {
  isBot: boolean;
  className?: string;
}

export function MessageAvatar({
  isBot,
  className,
}: Readonly<MessageAvatarProps>) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarFallback
        className={cn(
          isBot
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  );
}
