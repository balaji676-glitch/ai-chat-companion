export interface FaqEntry {
  keywords: string[];
  question: string;
  answer: string;
}

export const faqData: FaqEntry[] = [
  {
    keywords: ["coding", "dsa", "data structure", "algorithm", "leetcode", "hackerrank", "coding round", "online assessment"],
    question: "How should I prepare for coding interviews?",
    answer: "Focus on mastering core data structures (arrays, trees, graphs, hash maps) and algorithms (sorting, searching, dynamic programming). Practice on LeetCode, HackerRank, or Codeforces. Start with easy problems, then move to medium. Aim for 2–3 problems daily and review solutions to learn optimal approaches.",
  },
  {
    keywords: ["hr", "behavioral", "tell me about yourself", "strengths", "weaknesses", "hr round", "culture fit"],
    question: "How do I prepare for HR interviews?",
    answer: "Practice common behavioral questions using the STAR method (Situation, Task, Action, Result). Prepare a concise 'tell me about yourself' pitch. Research the company's values and culture. Be authentic, show enthusiasm, and have thoughtful questions ready for the interviewer.",
  },
  {
    keywords: ["resume", "cv", "format", "template", "projects", "experience", "ats"],
    question: "How should I build my resume?",
    answer: "Keep it to one page. Use a clean, ATS-friendly format. Lead with education, then skills, projects, and experience. Quantify achievements (e.g., 'reduced load time by 40%'). Tailor your resume to each role. Include relevant projects with tech stack details and links to GitHub or live demos.",
  },
  {
    keywords: ["career", "path", "switch", "transition", "which field", "frontend", "backend", "ml", "data science", "role"],
    question: "How do I choose the right tech career path?",
    answer: "Explore different domains — frontend, backend, full-stack, DevOps, ML/AI, or data science. Build small projects in areas that interest you. Consider your strengths: if you love visuals, try frontend; if you enjoy logic and systems, explore backend or infrastructure. Talk to professionals and try internships to narrow your focus.",
  },
  {
    keywords: ["salary", "negotiate", "negotiation", "offer", "compensation", "package", "ctc", "hike"],
    question: "How do I negotiate salary?",
    answer: "Research market rates on Glassdoor, Levels.fyi, or LinkedIn Salary. Know your worth based on skills and experience. Never share your current salary first — let the company make an offer. Express enthusiasm but ask for time to review. Counter with data, not emotions. Consider the full package: base, bonus, equity, and benefits.",
  },
  {
    keywords: ["system design", "architecture", "scalability", "design round", "high level design", "low level design"],
    question: "How do I prepare for system design interviews?",
    answer: "Learn core concepts: load balancing, caching, databases (SQL vs NoSQL), message queues, and microservices. Practice designing systems like URL shorteners, chat apps, or news feeds. Use a structured approach: clarify requirements → estimate scale → design components → discuss trade-offs. Resources: 'Designing Data-Intensive Applications' and system design YouTube channels.",
  },
  {
    keywords: ["nervous", "anxiety", "confident", "confidence", "stress", "panic", "fear", "calm"],
    question: "How do I handle interview anxiety?",
    answer: "Preparation is the best antidote to anxiety. Do mock interviews with friends or on platforms like Pramp. Practice deep breathing before interviews. Remember: it's a conversation, not an interrogation. Reframe rejection as learning. Celebrate small wins and track your progress over time.",
  },
  {
    keywords: ["project", "portfolio", "github", "side project", "showcase", "build"],
    question: "What projects should I build for my portfolio?",
    answer: "Build 2–3 solid projects that demonstrate different skills. Ideas: a full-stack CRUD app, a CLI tool, an API integration project, or a data visualization dashboard. Deploy them live, write clean READMEs, and include links in your resume. Quality over quantity — one well-documented project beats five half-finished ones.",
  },
  {
    keywords: ["mock", "practice", "interview prep", "resources", "platform", "where to practice"],
    question: "What are the best resources for interview prep?",
    answer: "Coding: LeetCode, NeetCode, HackerRank. System Design: Grokking the System Design Interview, ByteByteGo. Behavioral: Big Interview, STAR method guides. Mock Interviews: Pramp, Interviewing.io. General: Cracking the Coding Interview (book), Tech Interview Handbook (GitHub). Consistency matters more than the platform.",
  },
  {
    keywords: ["first job", "fresher", "new grad", "entry level", "no experience", "beginner", "starting"],
    question: "How do I land my first tech job?",
    answer: "Build projects and contribute to open source to compensate for lack of experience. Apply broadly — startups and mid-size companies are often more open to freshers. Network on LinkedIn and attend tech meetups. Tailor each application. Don't wait until you feel 'ready' — apply while you're learning. Persistence is key.",
  },
];

export function findBestAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faqData) {
    const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return "I'm not sure about that one. Try asking about coding interviews, resume tips, HR rounds, salary negotiation, or career guidance — I'm here to help you ace your next interview! 💪";
}
