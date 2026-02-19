const TypingIndicator = () => (
  <div className="flex items-end gap-2 animate-message-in">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--chat-gradient-from))] to-[hsl(var(--chat-gradient-to))] text-xs font-bold text-primary-foreground">
      AI
    </div>
    <div className="rounded-2xl rounded-bl-sm bg-[hsl(var(--chat-bot))] px-4 py-3">
      <div className="flex gap-1">
        <span className="block h-2 w-2 rounded-full bg-muted-foreground animate-typing-dot-1" />
        <span className="block h-2 w-2 rounded-full bg-muted-foreground animate-typing-dot-2" />
        <span className="block h-2 w-2 rounded-full bg-muted-foreground animate-typing-dot-3" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
