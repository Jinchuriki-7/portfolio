// ============================================================
// Skills Data — Updated categories per redesign requirements
// ============================================================

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "code",
    skills: [
      { name: "C" },
      { name: "C++" },
      { name: "Java" },
      { name: "Python" },
    ],
  },
  {
    category: "Frontend Development",
    icon: "globe",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "tool",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Firebase" },
    ],
  },
  {
    category: "Additional Interests",
    icon: "brain",
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Machine Learning" },
      { name: "Software Development" },
      { name: "Competitive Programming" },
    ],
  },
];
