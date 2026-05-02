export type Company = {
  id: string;
  name: string;
  logo: string; // emoji
  category: "Dream" | "Service" | "Startup";
  type: "Tech" | "Non-Tech";
  role: string;
  package: number; // LPA
  skills: string[];
  description: string;
  rounds: string[];
  process: string;
  tips: string[];
  eligibility: string;
  location: string;
};

export const companies: Company[] = [
  {
    id: "google", name: "Google", logo: "🔷", category: "Dream", type: "Tech",
    role: "Backend", package: 45, skills: ["DSA", "System Design", "Java", "Distributed Systems"],
    description: "Build products that impact billions across Search, Cloud and AI.",
    rounds: ["Online Assessment", "Phone Screen", "Onsite x4 (Coding)", "Hiring Committee", "Team Match"],
    process: "Resume shortlist → 1 OA → 1 phone screen → 4 technical onsites → committee review.",
    tips: ["Master DSA on LeetCode (300+ problems)", "Practice Google-tagged questions", "System design fundamentals", "Behavioral with Googleyness"],
    eligibility: "CGPA 7.0+, all branches, no active backlogs", location: "Bangalore / Hyderabad",
  },
  {
    id: "microsoft", name: "Microsoft", logo: "🪟", category: "Dream", type: "Tech",
    role: "Frontend", package: 44, skills: ["DSA", "React", "TypeScript", "Azure"],
    description: "Empower every person on the planet to achieve more.",
    rounds: ["Online Assessment", "Group Discussion", "Tech Interview x2", "HR Round"],
    process: "Codility OA → GD → 2 tech rounds → HR/AA round.",
    tips: ["Strong DSA + projects on resume", "Know your projects deeply", "Practice live coding"],
    eligibility: "CGPA 7.0+, CSE/IT/ECE", location: "Hyderabad / Noida",
  },
  {
    id: "amazon", name: "Amazon", logo: "📦", category: "Dream", type: "Tech",
    role: "Backend", package: 42, skills: ["DSA", "OOP", "AWS", "Java"],
    description: "Earth's most customer-centric company hiring SDE-1.",
    rounds: ["Online Assessment", "Debugging Round", "Tech Interview x3", "Bar Raiser"],
    process: "OA (2 coding + MCQs) → Debugging → 3 tech + Bar Raiser interview.",
    tips: ["Leadership Principles stories (STAR)", "Trees and graphs heavily tested", "Amazon OA archive on LeetCode"],
    eligibility: "CGPA 6.5+, all engineering branches", location: "Bangalore / Chennai",
  },
  {
    id: "tcs", name: "TCS", logo: "🏢", category: "Service", type: "Tech",
    role: "Full Stack", package: 7, skills: ["Java", "SQL", "Spring", "Aptitude"],
    description: "India's largest IT services firm — Digital and Ninja roles.",
    rounds: ["TCS NQT", "Tech Interview", "Managerial", "HR Round"],
    process: "NQT (Aptitude + Coding) → Tech → MR → HR same day.",
    tips: ["Clear NQT with strong aptitude", "Basic OOPs and DBMS solid", "Communicate clearly in HR"],
    eligibility: "CGPA 6.0+, no backlogs", location: "Pan India",
  },
  {
    id: "infosys", name: "Infosys", logo: "🌐", category: "Service", type: "Tech",
    role: "Backend", package: 9, skills: ["Java", "DBMS", "OS", "Networking"],
    description: "Specialist Programmer / Power Programmer roles.",
    rounds: ["InfyTQ", "Tech Interview", "HR Round"],
    process: "InfyTQ test → Tech (project + DSA basics) → HR.",
    tips: ["Crack InfyTQ for SP role", "Project explanation prep", "SQL queries practice"],
    eligibility: "CGPA 6.5+, BE/BTech/MCA", location: "Bangalore / Mysore / Pune",
  },
  {
    id: "wipro", name: "Wipro", logo: "💠", category: "Service", type: "Tech",
    role: "Full Stack", package: 6.5, skills: ["Aptitude", "C++", "SQL", "Communication"],
    description: "Wipro Elite & Turbo hiring for engineers.",
    rounds: ["Elite NLTH", "Business Discussion", "HR Round"],
    process: "NLTH (Aptitude + Written Comm + Coding) → BD/Tech → HR.",
    tips: ["Essay writing for written comm", "Pseudo-code questions practice"],
    eligibility: "CGPA 6.0+, 60% in 10/12", location: "Pan India",
  },
  {
    id: "razorpay", name: "Razorpay", logo: "⚡", category: "Startup", type: "Tech",
    role: "Frontend", package: 24, skills: ["React", "JavaScript", "Node.js", "DSA"],
    description: "Fintech unicorn powering payments for millions.",
    rounds: ["Online Test", "Machine Coding", "Tech Interview x2", "Hiring Manager"],
    process: "OA → 2hr machine coding → 2 tech rounds → HM round.",
    tips: ["Build a small project end-to-end", "React + state management deep dive"],
    eligibility: "CGPA 7.5+, CSE/IT", location: "Bangalore",
  },
  {
    id: "zomato", name: "Zomato", logo: "🍽️", category: "Startup", type: "Tech",
    role: "Mobile", package: 22, skills: ["Kotlin", "Swift", "DSA", "System Design"],
    description: "Food-tech leader hiring across Android/iOS.",
    rounds: ["DSA Round", "Machine Coding", "System Design", "HR"],
    process: "DSA → machine coding → LLD → HR.",
    tips: ["Mobile arch patterns (MVVM/MVI)", "LLD problems practice"],
    eligibility: "CGPA 7.0+, all branches", location: "Gurugram",
  },
  {
    id: "swiggy", name: "Swiggy", logo: "🛵", category: "Startup", type: "Tech",
    role: "Backend", package: 20, skills: ["Java", "Microservices", "Kafka", "DSA"],
    description: "On-demand delivery company solving logistics at scale.",
    rounds: ["DSA Round", "LLD", "HLD", "Hiring Manager"],
    process: "2 DSA → LLD → HLD → HM.",
    tips: ["Strong concurrency and OOP design", "HLD basics like caching, queues"],
    eligibility: "CGPA 7.0+", location: "Bangalore",
  },
  {
    id: "deloitte", name: "Deloitte", logo: "📊", category: "Dream", type: "Non-Tech",
    role: "Consulting", package: 12, skills: ["Case Study", "Excel", "Communication", "Analytics"],
    description: "Big 4 consulting — Analyst & Consultant roles.",
    rounds: ["Aptitude", "Case Study", "Partner Interview", "HR"],
    process: "Aptitude → case interview x2 → partner round → HR.",
    tips: ["Case Interview Secrets book", "Mock cases with peers", "Guesstimates practice"],
    eligibility: "CGPA 7.0+, all streams", location: "Mumbai / Bangalore / Gurugram",
  },
  {
    id: "kpmg", name: "KPMG", logo: "📈", category: "Dream", type: "Non-Tech",
    role: "Audit & Risk", package: 9, skills: ["Accounting", "Excel", "Communication", "Auditing"],
    description: "Big 4 audit and advisory practice.",
    rounds: ["Aptitude", "Group Discussion", "Tech Interview", "HR"],
    process: "Apti → GD → tech (accounting/finance) → HR.",
    tips: ["IFRS and Ind-AS basics", "Strong accounting fundamentals"],
    eligibility: "B.Com / BBA / MBA, CGPA 6.5+", location: "Pan India",
  },
  {
    id: "hul", name: "Hindustan Unilever", logo: "🧴", category: "Dream", type: "Non-Tech",
    role: "Marketing", package: 28, skills: ["Marketing", "Strategy", "Analytics", "Leadership"],
    description: "FMCG giant — UFLP leadership program.",
    rounds: ["Application", "Game-based Assessment", "Discovery Interview", "Final Interview"],
    process: "Online application → games → discovery → final panel.",
    tips: ["Know HUL brands inside out", "STAR framework for behavioral"],
    eligibility: "MBA / Top engineering colleges", location: "Mumbai",
  },
  {
    id: "zs", name: "ZS Associates", logo: "💼", category: "Service", type: "Non-Tech",
    role: "Business Analyst", package: 11, skills: ["SQL", "Excel", "Problem Solving", "Communication"],
    description: "Management consulting and analytics for pharma.",
    rounds: ["Aptitude", "Case Round", "Tech Interview", "HR"],
    process: "Apti → case → SQL/Excel → HR.",
    tips: ["Guesstimates daily practice", "SQL joins and window functions"],
    eligibility: "CGPA 7.0+, all streams", location: "Pune / Gurugram",
  },
  {
    id: "ey", name: "Ernst & Young", logo: "🏛️", category: "Service", type: "Non-Tech",
    role: "HR", package: 7, skills: ["Communication", "Recruiting", "MS Office", "Analytics"],
    description: "Big 4 — People Advisory and HR roles.",
    rounds: ["Aptitude", "GD", "HR Interview", "Final Round"],
    process: "Apti → GD → HR → final.",
    tips: ["HR fundamentals and labor laws", "Strong communication"],
    eligibility: "MBA-HR / BBA, CGPA 6.5+", location: "Bangalore / Gurugram",
  },
  {
    id: "byjus", name: "BYJU'S", logo: "📚", category: "Startup", type: "Non-Tech",
    role: "Sales", package: 10, skills: ["Communication", "Sales", "Negotiation", "CRM"],
    description: "Edtech — Business Development Associate role.",
    rounds: ["Aptitude", "Video Interview", "Sales Round", "HR"],
    process: "Apti → video pitch → sales role-play → HR.",
    tips: ["Be confident on calls", "Know education sector"],
    eligibility: "Any graduate, good comm skills", location: "Bangalore",
  },
  {
    id: "ola", name: "Ola", logo: "🚖", category: "Startup", type: "Non-Tech",
    role: "Operations", package: 9, skills: ["Excel", "SQL", "Operations", "Analytics"],
    description: "Mobility unicorn — city operations roles.",
    rounds: ["Aptitude", "Case Study", "HR Interview"],
    process: "Apti → ops case → HR.",
    tips: ["Excel pivot tables", "Basic SQL"],
    eligibility: "Any graduate, CGPA 6.5+", location: "Bangalore",
  },
];

export const roles = ["Frontend", "Backend", "Full Stack", "Mobile", "Consulting", "Audit & Risk", "Marketing", "Business Analyst", "HR", "Sales", "Operations"];
