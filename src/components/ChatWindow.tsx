import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage, { type Message } from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { findBestAnswer } from "@/lib/faqData";

const WELCOME: Message = {
  id: "welcome",
  text: "Hello! 👋 I'm your Tech Interview Survival Bot. Ask me about coding interviews, resume tips, HR rounds, system design, salary negotiation, or career guidance — let's get you interview-ready!",
  sender: "bot",
  timestamp: new Date(),
};

interface ChatWindowProps {
  pendingQuestion?: string | null;
  onQuestionConsumed?: () => void;
}

const ChatWindow = ({ pendingQuestion, onQuestionConsumed }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = findBestAnswer(text);
      const botMsg: Message = {
        id: crypto.randomUUID(),
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }, []);

  // Handle sidebar category clicks
  useEffect(() => {
    if (pendingQuestion) {
      sendMessage(pendingQuestion);
      onQuestionConsumed?.();
    }
  }, [pendingQuestion, sendMessage, onQuestionConsumed]);

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <div className="flex flex-1 flex-col h-full bg-card">
      {/* Header — visible on mobile, subtle on desktop */}
      <div className="flex items-center gap-3 border-b px-6 py-4 bg-card">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold lg:hidden">
          AI
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Tech Interview Survival Bot</h2>
          <p className="text-xs text-muted-foreground">Your AI-powered interview prep companion</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-card px-6 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto flex max-w-3xl gap-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about tech interviews, resumes, or career prep…"
            className="flex-1 rounded-xl border-input bg-background px-4 py-3 text-sm transition-shadow focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_4px_hsl(var(--primary)/0.08)]"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="h-10 w-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
