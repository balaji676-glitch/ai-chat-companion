import { cn } from "@/lib/utils";

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
    <div className={cn("flex items-end gap-2 animate-message-in", isUser && "flex-row-reverse")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--chat-gradient-from))] to-[hsl(var(--chat-gradient-to))] text-xs font-bold text-primary-foreground">
          AI
        </div>
      )}
      <div className="flex max-w-[75%] flex-col gap-1">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-br-sm bg-[hsl(var(--chat-user))] text-[hsl(var(--chat-user-foreground))]"
              : "rounded-bl-sm bg-[hsl(var(--chat-bot))] text-[hsl(var(--chat-bot-foreground))]"
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
