// ============================================================
// Personal Information Data
// ============================================================

export const personalInfo = {
  name: "Farhanul Haque",
  nickname: "Farhan",
  title: "Computer Science & Engineering Student",
  tagline: "Passionate about Software Development, Web Development & AI",
  email: "farhan9t1l@gmail.com",
  github: "https://github.com/Jinchuriki-7",
  githubUsername: "Jinchuriki-7",
  linkedin: "https://www.linkedin.com/in/your-profile", // Replace with actual LinkedIn
  codeforces: "https://codeforces.com/profile/Samii-7",
  codeforcesUsername: "Samii-7",
  location: "Bangladesh",

  interests: [
    "Software Development",
    "Web Development",
    "Artificial Intelligence",
    "Competitive Programming",
    "Problem Solving",
  ],

  about: `I am a passionate Computer Science & Engineering student with a strong interest
in software development, web technologies, and artificial intelligence. I enjoy
building meaningful applications and solving challenging problems through code.

My journey in programming has led me to explore various domains — from crafting
responsive web interfaces to competing in algorithmic problem-solving contests.
I believe in writing clean, maintainable code and continuously learning new
technologies to stay current in an ever-evolving field.

I am particularly drawn to the intersection of software engineering and AI,
where I see immense potential for innovation. Outside of academics, I actively
engage in competitive programming to sharpen my analytical thinking and
problem-solving skills.`,
};

export interface Experience {
  id: string;
  organization: string;
  organizationUrl: string;
  position: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'current' | 'incoming' | 'completed';
  statusLabel: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    id: 'biswas-it',
    organization: 'Biswas IT Firm',
    organizationUrl: 'https://biswasitfirm.com/',
    position: 'Web Developer Intern',
    type: 'Online / Remote Internship',
    startDate: 'November 2026',
    endDate: 'January 2027',
    status: 'current',
    statusLabel: 'Current Position',
    description:
      'Working on frontend and web development tasks, creating modern responsive user interfaces, collaborating with the development team remotely, and building practical client-facing web solutions.',
  },
  {
    id: 'codealpha',
    organization: 'CodeAlpha',
    organizationUrl: 'https://www.codealpha.tech/',
    position: 'Artificial Intelligence Intern',
    type: 'Virtual Internship',
    startDate: 'November 20, 2026',
    endDate: 'December 20, 2026',
    status: 'incoming',
    statusLabel: 'Incoming Position',
    description:
      'Incoming virtual internship focused on Artificial Intelligence projects, machine learning models, and practical AI applications.',
  },
];

export const incomingExperience = experiences[1];
