import { Bot, GraduationCap, Clock, DollarSign, FileText, Cpu, HelpCircle } from "lucide-react";

interface ChatSidebarProps {
  onCategoryClick: (question: string) => void;
}

const categories = [
  { label: "Eligibility", icon: GraduationCap, question: "Who is eligible for the AI internship?" },
  { label: "Duration", icon: Clock, question: "How long is the internship?" },
  { label: "Stipend", icon: DollarSign, question: "Is there a stipend?" },
  { label: "Application Process", icon: FileText, question: "How do I apply?" },
  { label: "Tech Stack", icon: Cpu, question: "What tech stack will I work with?" },
  { label: "General Help", icon: HelpCircle, question: "What kind of projects will I work on?" },
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
            <h1 className="text-sm font-semibold text-sidebar-foreground">AI Intern Assistant</h1>
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
          Powered by AI · Internship FAQ Bot
        </p>
      </div>
    </aside>
  );
};

export default ChatSidebar;
