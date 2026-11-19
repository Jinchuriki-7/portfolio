// ============================================================
// Projects Data
// Verified from GitHub profile & project repositories
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "jomi-share",
    title: "JOMI-SHARE & NIRBASH — AI Land Intelligence & Property Ecosystem",
    description:
      "An integrated dual-platform land tech solution addressing land records verification, inheritance dispute resolution, and transparent property transactions with the Land DNA™ index and digital surveyor booking. Developed for the LandTech Innovation Hackathon 2026.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "AI / GIS", "Firebase"],
    githubUrl: "https://github.com/Jinchuriki-7/jomi-share-landtech",
    liveUrl: "https://jomi-share-portal.web.app",
    category: "Full-Stack & AI",
    featured: true,
  },
  {
    id: "medcore",
    title: "MedCore — Centralized Digital Healthcare Ecosystem",
    description:
      "A unified, consent-driven national Electronic Health Record (EHR) and clinical workflow platform. Integrates patient portal, doctor live chamber queues, hospital administration, and diagnostic lab report synchronization with token-based verification.",
    technologies: ["PHP", "JavaScript", "SQLite / MySQL", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/rahat300809/MedCore",
    liveUrl: "https://medcore-main-2026.vercel.app/",
    category: "Full-Stack & AI",
    featured: true,
  },
  {
    id: "filex",
    title: "FileX — Floating Universal File Converter for Windows",
    description:
      "A sleek, always-on-top floating desktop application for Windows that converts files instantly via drag-and-drop. Supports Images, PDFs, Documents, Spreadsheets, Presentations, Audio, and Video formats with multithreaded background processing.",
    technologies: ["Python", "PySide6", "Qt", "Desktop App"],
    githubUrl: "https://github.com/Jinchuriki-7/FileX",
    category: "Software Development",
    featured: true,
  },
  {
    id: "byebyte-ai",
    title: "ByeByte AI — Cross-Platform System Optimizer",
    description:
      "Next-generation cross-platform system optimizer and storage cleaner natively engineered for Windows 10/11 and Android mobile. Features real-time hardware telemetry, MVVM architecture, and zero-risk recovery sandboxing.",
    technologies: ["Flutter", "Dart", "MVVM", "Android", "Windows"],
    githubUrl: "https://github.com/Jinchuriki-7/ByeByte-AI",
    category: "Mobile & Desktop",
    featured: true,
  },
  {
    id: "hospital-management",
    title: "Hospital Management System (Console Edition)",
    description:
      "An enterprise-level console application implementing object-oriented programming principles. Manages doctor scheduling, patient electronic health records, inpatient bed allocation, and dynamic billing workflows.",
    technologies: ["Java", "OOP", "CLI", "System Architecture"],
    githubUrl: "https://github.com/Jinchuriki-7/Hospital-Management-System",
    category: "Software Development",
    featured: false,
  },
  {
    id: "currency-converter",
    title: "Modern C++17 Currency Converter",
    description:
      "A feature-rich command-line currency converter built in modern C++17. Fetches real-time live exchange rates for 150+ international currencies using libcurl and parses structured JSON with nlohmann/json.",
    technologies: ["C++17", "libcurl", "nlohmann/json", "REST API"],
    githubUrl: "https://github.com/Jinchuriki-7/Currency-Converter",
    category: "Software Development",
    featured: false,
  },
  {
    id: "weather-app",
    title: "Real-Time Weather App",
    description:
      "A console-based weather application that queries OpenWeather REST APIs to retrieve temperature, humidity, atmospheric pressure, and meteorological forecasts with comprehensive network error handling.",
    technologies: ["C++17", "OpenWeather API", "libcurl", "vcpkg"],
    githubUrl: "https://github.com/Jinchuriki-7/Real-Time-Weather-App",
    category: "Software Development",
    featured: false,
  },
  {
    id: "codeforces-solutions",
    title: "Codeforces Problem Solutions Archive",
    description:
      "A curated collection of algorithmic solutions for competitive programming challenges on Codeforces. Covers dynamic programming, graph theory, greedy techniques, and number theory in optimized C++.",
    technologies: ["C++", "Algorithms", "Data Structures", "Competitive Programming"],
    githubUrl: "https://github.com/Jinchuriki-7/Codeforces-Problem-Solution",
    category: "Competitive Programming",
    featured: false,
  },
];

export const hasProjects = projects.length > 0;
