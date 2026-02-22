import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex items-end gap-3 animate-message-in">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Bot className="h-4 w-4" />
    </div>
    <div className="rounded-2xl rounded-bl-md bg-[hsl(var(--chat-bot))] px-4 py-3">
      <div className="flex gap-1">
        <span className="block h-2 w-2 rounded-full bg-muted-foreground/50 animate-typing-dot-1" />
        <span className="block h-2 w-2 rounded-full bg-muted-foreground/50 animate-typing-dot-2" />
        <span className="block h-2 w-2 rounded-full bg-muted-foreground/50 animate-typing-dot-3" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
