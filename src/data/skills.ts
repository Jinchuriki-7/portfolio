// ============================================================
// Skills Data
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
    category: "Web Technologies",
    icon: "globe",
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" },
      { name: "React" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "tool",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
    ],
  },
];
