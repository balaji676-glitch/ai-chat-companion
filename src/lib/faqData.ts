export interface FaqEntry {
  keywords: string[];
  question: string;
  answer: string;
}

export const faqData: FaqEntry[] = [
  {
    keywords: ["eligible", "eligibility", "who can", "qualification", "qualify", "requirements"],
    question: "Who is eligible for the AI internship?",
    answer: "Students currently enrolled in a Computer Science, Data Science, AI/ML, or related program are eligible. We also welcome self-taught developers with demonstrable skills in Python or machine learning.",
  },
  {
    keywords: ["apply", "application", "how to apply", "submit", "register", "sign up"],
    question: "How do I apply?",
    answer: "You can apply through our website by filling out the application form with your resume, a brief cover letter, and links to any relevant projects or GitHub repos. Applications are reviewed on a rolling basis.",
  },
  {
    keywords: ["duration", "how long", "length", "weeks", "months", "period"],
    question: "How long is the internship?",
    answer: "The internship runs for 8–12 weeks, depending on your availability and the project scope. We offer both full-time and part-time tracks.",
  },
  {
    keywords: ["stipend", "pay", "salary", "compensation", "paid", "money"],
    question: "Is there a stipend?",
    answer: "Yes! All interns receive a competitive stipend. The exact amount varies by location and whether you're full-time or part-time. Details are shared during the offer stage.",
  },
  {
    keywords: ["tech", "stack", "technology", "tools", "framework", "language", "python", "tensorflow"],
    question: "What tech stack will I work with?",
    answer: "You'll primarily work with Python, PyTorch/TensorFlow, and popular ML libraries like scikit-learn and Hugging Face Transformers. We also use React for front-end dashboards and PostgreSQL for data storage.",
  },
  {
    keywords: ["remote", "work from home", "location", "onsite", "office", "hybrid"],
    question: "Is the internship remote?",
    answer: "Yes, we offer fully remote positions. We use Slack, Notion, and daily standups to stay connected. Some optional in-person events may be offered depending on your location.",
  },
  {
    keywords: ["project", "what will i do", "tasks", "work on", "assignment", "responsibilities"],
    question: "What kind of projects will I work on?",
    answer: "Interns work on real-world AI projects such as building chatbots, training NLP models, developing recommendation systems, and creating data pipelines. You'll contribute to production-level code.",
  },
  {
    keywords: ["mentor", "mentorship", "guidance", "support", "supervisor"],
    question: "Will I have a mentor?",
    answer: "Absolutely! Each intern is paired with a senior engineer or researcher who provides weekly 1-on-1 mentorship, code reviews, and career guidance throughout the program.",
  },
  {
    keywords: ["certificate", "certification", "completion", "credential"],
    question: "Do I get a certificate?",
    answer: "Yes, upon successful completion of the internship you'll receive a certificate of completion along with a detailed recommendation letter if you perform well.",
  },
  {
    keywords: ["deadline", "last date", "when", "start date", "timeline", "schedule"],
    question: "What are the important dates?",
    answer: "Applications open on a rolling basis. The next cohort starts at the beginning of each quarter. Check our website for exact dates and deadlines for the current cycle.",
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

  return "That's a great question! I don't have a specific answer for that yet, but feel free to ask about eligibility, application process, stipend, tech stack, duration, mentorship, or certificates. 😊";
}
