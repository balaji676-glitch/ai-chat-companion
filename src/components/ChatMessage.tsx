import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  const time = message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={cn("flex items-end gap-3 animate-message-in", isUser && "flex-row-reverse")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className="flex max-w-[70%] flex-col gap-1">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-br-md bg-[hsl(var(--chat-user))] text-[hsl(var(--chat-user-foreground))]"
              : "rounded-bl-md bg-[hsl(var(--chat-bot))] text-[hsl(var(--chat-bot-foreground))]"
          )}
        >
          {message.text}
        </div>
        <span className={cn("text-[10px] text-muted-foreground px-1", isUser && "text-right")}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
