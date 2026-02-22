import { Bot, Code, Users, FileText, Compass, DollarSign, Brain } from "lucide-react";

interface ChatSidebarProps {
  onCategoryClick: (question: string) => void;
}

const categories = [
  { label: "Coding Interviews", icon: Code, question: "How should I prepare for coding interviews?" },
  { label: "HR Interviews", icon: Users, question: "How do I prepare for HR interviews?" },
  { label: "Resume Tips", icon: FileText, question: "How should I build my resume?" },
  { label: "Career Guidance", icon: Compass, question: "How do I choose the right tech career path?" },
  { label: "Salary Negotiation", icon: DollarSign, question: "How do I negotiate salary?" },
  { label: "System Design", icon: Brain, question: "How do I prepare for system design interviews?" },
];

const ChatSidebar = ({ onCategoryClick }: ChatSidebarProps) => {
  return (
    <aside className="hidden lg:flex w-[280px] flex-col bg-sidebar border-r border-sidebar-border">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-foreground">Tech Interview Survival Bot</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="block h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-sidebar-foreground/60">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="flex-1 px-4 py-5 overflow-y-auto">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-sidebar-foreground/40 px-2 mb-3">
          FAQ Categories
        </p>
        <nav className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onCategoryClick(cat.question)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group"
            >
              <cat.icon className="h-4 w-4 text-sidebar-foreground/40 group-hover:text-primary transition-colors" />
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-[11px] text-sidebar-foreground/30 text-center">
          Powered by AI · Interview Prep Assistant
        </p>
      </div>
    </aside>
  );
};

export default ChatSidebar;
