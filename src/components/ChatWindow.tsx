import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage, { type Message } from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

const WELCOME: Message = {
  id: "welcome",
  text: "Hello! 👋 How can I help you today?",
  sender: "bot",
  timestamp: new Date(),
};

const ChatWindow = () => {
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

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      const botMsg: Message = {
        id: crypto.randomUUID(),
        text: data.reply, // ✅ backend sends "reply"
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg: Message = {
        id: crypto.randomUUID(),
        text: "Backend not responding. Please check server.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[min(700px,90dvh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/5">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b bg-gradient-to-r from-[hsl(var(--chat-gradient-from))] to-[hsl(var(--chat-gradient-to))] px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white backdrop-blur-sm">
          AI
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-white">AI Chatbot</h1>
          <div className="flex items-center gap-1.5">
            <span className="block h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs text-white/80">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-card px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl"
          />

          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
