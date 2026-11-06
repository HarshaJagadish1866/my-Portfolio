export interface PersonalInfo {
  name: string
  tagline: string
  email: string
  linkedIn: string
  github: string
  githubUsername: string
  aboutMe: string
  theme: {
    default: "dark" | "light"
    accentColor: string
    vibe: string
  }
  photoUrl: string
  resumeUrl: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  period: string
  skills: string[]
  certificate?: string
}

export interface ProjectItem {
  id: string
  title: string
  period: string
  summary: string
  contributors: string[]
  skills: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  status: "Active" | "Completed" | "In Development"
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  date: string
  skills: string[]
  badgeText?: string
}

export type SkillCategory = "AI and Agents" | "Programming" | "Data" | "Security"

export interface SkillGroup {
  category: SkillCategory
  skills: string[]
}

export interface PortfolioData {
  owner: PersonalInfo
  education: EducationItem[]
  projects: ProjectItem[]
  certifications: CertificationItem[]
  skills: SkillGroup[]
  navSections: { id: string; label: string }[]
}

export const portfolioData: PortfolioData = {
  owner: {
    name: "Harsha Jagadish",
    tagline: "Data Science & AI Engineer | Specializing in Multi-Agent Systems & LLM Applications",
    email: "harshajagadish320067@gmail.com",
    linkedIn: "https://www.linkedin.com/in/harsha-jagadish3200671866",
    github: "https://github.com/HarshaJagadish1866",
    githubUsername: "HarshaJagadish1866",
    aboutMe:
      "I am a Data Science and Applications student at the Indian Institute of Technology, Madras (IITM), focused on architecting intelligent multi-agent systems and real-world AI applications. I specialize in the Google Agent Development Kit (ADK), LLM integrations, and modern data-driven architectures, with hands-on experience building collaborative agents for legal review and automated travel planning.",
    theme: {
      default: "dark",
      accentColor: "#06B6D4", // Electric Cyan
      vibe: "Modern Deep-Tech AI Developer",
    },
    photoUrl: "/photo.jpg",
    resumeUrl: "/resume.pdf",
  },

  education: [
    {
      id: "iitm-bs",
      institution: "Indian Institute of Technology, Madras",
      degree: "Bachelor of Science in Data Science and Applications",
      period: "May 2025 to Present",
      skills: ["Python"],
      certificate: "2026 May Foundation Certificate",
    },
  ],

  projects: [
    {
      id: "arbitr-ai",
      title: "Arbitr-AI",
      period: "Jul 2026 to Present",
      summary: "Democratizing Legal Review with Multi-Agent AI.",
      contributors: ["Pavan", "Abhilash"],
      skills: [
        "Artificial Intelligence",
        "Multi-agent Systems",
        "Agentic Workflows",
        "LLM Application",
        "Python",
      ],
      githubUrl: null,
      liveUrl: null,
      status: "In Development",
    },
    {
      id: "voyager",
      title: "Voyager - Travelling Agent",
      period: "Dec 2025",
      summary:
        "AI travel planner using real-time Google data to build personalized, accurate itineraries.",
      contributors: ["Pavan", "Abhilash"],
      skills: [
        "Google Agent Development Kit (ADK)",
        "Multi-agent Systems",
        "AI Integrations",
        "Python",
      ],
      githubUrl: null,
      liveUrl: null,
      status: "Completed",
    },
  ],

  certifications: [
    {
      id: "cert-google-prompting",
      title: "Google Prompting Essentials",
      issuer: "Google",
      date: "Aug 2026",
      skills: ["AI", "Machine Learning", "Prompt Engineering"],
    },
    {
      id: "cert-google-ai-essentials",
      title: "Google AI Essentials",
      issuer: "Google",
      date: "Aug 2026",
      skills: ["AI Literacy", "Model Training"],
    },
    {
      id: "cert-kaggle-vibe-coding",
      title: "5-Day AI Agents: Intensive Vibe Coding Course",
      issuer: "Kaggle",
      date: "Jul 2026",
      skills: ["AI-Assisted Development", "Agentic Workflows"],
    },
    {
      id: "cert-iitg-summer-analytics",
      title: "Summer Analytics 2026",
      issuer: "Consulting & Analytics Club, IIT Guwahati",
      date: "Apr 2026",
      skills: ["Data Analysis", "Machine Learning"],
    },
    {
      id: "cert-gemini-student",
      title: "Gemini Certified University Student",
      issuer: "Google for Education",
      date: "Apr 2026",
      skills: ["AI Literacy", "Prompt Engineering"],
    },
    {
      id: "cert-iitm-cybersecurity",
      title: "Web Trapped: Cybersecurity 101",
      issuer: "Sunderbans House, IITM BS Degree",
      date: "Jan 2026",
      skills: ["Cybersecurity"],
    },
    {
      id: "cert-deloitte-analytics",
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Forage",
      date: "Jan 2026",
      skills: ["Data Analysis", "Data Modeling"],
    },
    {
      id: "cert-kaggle-agents-google",
      title: "5-Day AI Agents Intensive Course with Google",
      issuer: "Kaggle",
      date: "Dec 2025",
      skills: ["Google Agent Development Kit (ADK)", "Multi-agent Systems"],
    },
    {
      id: "cert-hackerrank-python",
      title: "Python (Basic) Certificate",
      issuer: "HackerRank",
      date: "Dec 2025",
      skills: ["Python"],
    },
  ],

  skills: [
    {
      category: "AI and Agents",
      skills: [
        "Artificial Intelligence",
        "Agentic Workflows",
        "LLM Application",
        "Machine Learning",
        "AI Literacy",
        "AI Integrations",
        "Model Training",
        "Prompt Engineering",
        "AI-Assisted Development",
        "Multi-agent Systems",
        "Google Agent Development Kit (ADK)",
      ],
    },
    {
      category: "Programming",
      skills: ["Python"],
    },
    {
      category: "Data",
      skills: [
        "Data Visualization Tools",
        "Spreadsheet Skills",
        "Data Analysis",
        "Data Modeling",
      ],
    },
    {
      category: "Security",
      skills: ["Cybersecurity"],
    },
  ],

  navSections: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "guestbook-contact", label: "Contact & Guestbook" },
  ],
}
