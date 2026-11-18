// ============================================================
// Education Data
// ============================================================

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  status: "ongoing" | "completed";
  description?: string;
}

export const education: EducationItem[] = [
  {
    id: "diu-cse",
    degree: "Bachelor of Science",
    field: "Computer Science & Engineering",
    institution: "Daffodil International University (DIU)",
    status: "ongoing",
    description:
      "Pursuing undergraduate studies with strong emphasis on software engineering, data structures, algorithms, artificial intelligence, and database management systems. Actively competing in programming hackathons and university contests.",
  },
];
