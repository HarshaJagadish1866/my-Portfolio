export interface QuickFact {
  label: string
  value: string
}

export interface SocialLink {
  platform: "email" | "linkedin" | "x" | "github" | "instagram"
  label: string
  href: string
  icon: string
}

export interface PersonalInfo {
  name: string
  tagline: string
  email: string
  linkedIn: string
  github: string
  githubUsername: string
  aboutMe: string
  quickFacts: QuickFact[]
  socialLinks: SocialLink[]
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
  description?: string
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
  imageUrl?: string | null
  status: "Active" | "Completed" | "In Development"
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  date: string
  skills: string[]
  credentialUrl?: string | null
  credentialId?: string | null
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
    quickFacts: [
      { label: "Institution", value: "Indian Institute of Technology, Madras" },
      { label: "Degree Program", value: "BS in Data Science and Applications" },
      { label: "Core Focus", value: "Multi-Agent AI & Google ADK" },
      { label: "Milestone", value: "May 2026 Foundation Certificate" },
      { label: "Collaboration", value: "Open for AI / Data Projects" },
    ],
    socialLinks: [
      {
        platform: "email",
        label: "Email",
        href: "mailto:harshajagadish320067@gmail.com",
        icon: "email",
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/harsha-jagadish3200671866",
        icon: "linkedin",
      },
      {
        platform: "x",
        label: "X",
        href: "https://x.com/im_the_kalki",
        icon: "x",
      },
      {
        platform: "github",
        label: "GitHub",
        href: "https://github.com/HarshaJagadish1866",
        icon: "github",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/harsha_jagadish_18/",
        icon: "instagram",
      },
    ],
    theme: {
      default: "light",
      accentColor: "#F26B21", // Vivid Orange
      vibe: "Warm Editorial Beige & Vivid Orange",
    },
    photoUrl: "/photo.jpg",
    resumeUrl: "/Harsha_Jagadish_Resume_2026.pdf",
  },

  education: [
    {
      id: "iitm-bs",
      institution: "Indian Institute of Technology, Madras",
      degree: "Bachelor of Science in Data Science and Applications",
      period: "May 2025 to Present",
      skills: ["Python"],
      certificate: "2026 May Foundation Certificate",
      description:
        "Rigorous foundational and application-oriented program emphasizing computational thinking, data structures, predictive modeling, and mathematical foundations for modern data science.",
    },
  ],

  projects: [
    {
      id: "arbitr-ai",
      title: "Arbitr-AI",
      period: "Jul 2026 to Present",
      summary:
        "Democratizing Legal Review with Multi-Agent AI. Designed to orchestrate specialized AI agents that collaborate to parse complex legal documentation, identify critical clauses, and provide streamlined review intelligence.",
      contributors: ["Pavan", "Abhilash"],
      skills: [
        "Artificial Intelligence",
        "Multi-agent Systems",
        "Agentic Workflows",
        "LLM Application",
        "Python",
      ],
      githubUrl: "https://github.com/HarshaJagadish1866/Arbitr-ai",
      liveUrl: null,
      imageUrl: null,
      status: "In Development",
    },
    {
      id: "voyager",
      title: "Voyager - Travelling Agent",
      period: "Dec 2025",
      summary:
        "AI travel planner using real-time Google data to build personalized, accurate itineraries. Integrates multi-agent systems to cross-reference location heuristics, timing constraints, and live service data for seamless journey planning.",
      contributors: ["Pavan", "Abhilash"],
      skills: [
        "Google Agent Development Kit (ADK)",
        "Multi-agent Systems",
        "AI Integrations",
        "Python",
      ],
      githubUrl: null,
      liveUrl: null,
      imageUrl: null,
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
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-google-ai-essentials",
      title: "Google AI Essentials",
      issuer: "Google",
      date: "Aug 2026",
      skills: ["AI Literacy", "Model Training"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-kaggle-vibe-coding",
      title: "5-Day AI Agents: Intensive Vibe Coding Course",
      issuer: "Kaggle",
      date: "Jul 2026",
      skills: ["AI-Assisted Development", "Agentic Workflows"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-iitg-summer-analytics",
      title: "Summer Analytics 2026",
      issuer: "Consulting & Analytics Club, IIT Guwahati",
      date: "Apr 2026",
      skills: ["Data Analysis", "Machine Learning"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-gemini-student",
      title: "Gemini Certified University Student",
      issuer: "Google for Education",
      date: "Apr 2026",
      skills: ["AI Literacy", "Prompt Engineering"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-iitm-cybersecurity",
      title: "Web Trapped: Cybersecurity 101",
      issuer: "Sunderbans House, IITM BS Degree",
      date: "Jan 2026",
      skills: ["Cybersecurity"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-deloitte-analytics",
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Forage",
      date: "Jan 2026",
      skills: ["Data Analysis", "Data Modeling"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-kaggle-agents-google",
      title: "5-Day AI Agents Intensive Course with Google",
      issuer: "Kaggle",
      date: "Dec 2025",
      skills: ["Google Agent Development Kit (ADK)", "Multi-agent Systems"],
      credentialUrl: null,
      credentialId: null,
    },
    {
      id: "cert-hackerrank-python",
      title: "Python (Basic) Certificate",
      issuer: "HackerRank",
      date: "Dec 2025",
      skills: ["Python"],
      credentialUrl: null,
      credentialId: null,
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
    { id: "contact", label: "Guestbook" },
  ],
}
