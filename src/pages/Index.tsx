import { useState, useCallback } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";

const Index = () => {
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const handleCategoryClick = useCallback((question: string) => {
    setPendingQuestion(question);
  }, []);

  const handleQuestionConsumed = useCallback(() => {
    setPendingQuestion(null);
  }, []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <ChatSidebar onCategoryClick={handleCategoryClick} />
      <ChatWindow
        pendingQuestion={pendingQuestion}
        onQuestionConsumed={handleQuestionConsumed}
      />
    </div>
  );
};

export default Index;
