# Farhanul Haque — Personal Portfolio

A modern, professional personal portfolio website built as a university assignment for a Computer Science & Engineering student.

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 + TypeScript | UI framework |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icon library |
| React Icons | Brand icons (GitHub, LinkedIn) |

## 📂 Project Structure

```
src/
  components/      # Reusable UI components (Navbar, Footer, SectionWrapper, SectionHeader)
  sections/        # Page sections (Hero, About, Education, Skills, Projects, CP, Experience, Achievements, Contact)
  data/            # Static data files (personalInfo, skills, projects, education)
  hooks/           # Custom React hooks (useScrollSpy, useScrollAnimation)
  App.tsx          # Root component
  main.tsx         # Entry point
  index.css        # Global styles + design tokens
```

## 🏃 Getting Started

> **Prerequisite:** Node.js ≥ 18 at `C:\Program Files\nodejs\` (or on PATH)

```powershell
# Install dependencies
npm install

# Start dev server
npm run dev        # → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview
```

## ✏️ Personalizing

### Add Your Profile Photo
Place a photo at `public/profile.jpg` — the hero section will display it automatically.

### Add Your CV
Place your CV PDF at `public/cv.pdf` — the "Download CV" button will link to it.

### Update Your Email & LinkedIn
Edit `src/data/personalInfo.ts`:
```ts
email: "your.real.email@example.com",
linkedin: "https://www.linkedin.com/in/your-profile",
```

### Add GitHub Projects
Edit `src/data/projects.ts` and add entries for your GitHub repositories:
```ts
{
  id: "my-project",
  title: "My Awesome Project",
  description: "A short description of what this project does.",
  technologies: ["Python", "Flask", "SQLite"],
  githubUrl: "https://github.com/Jinchuriki-7/my-project",
  liveUrl: "https://my-project.vercel.app", // optional
  category: "Web Development",
  featured: true,
}
```

### Add Achievements
Edit `src/sections/AchievementsSection.tsx` with verified, confirmed achievement details.

### Update Education
Edit `src/data/education.ts` with your actual university name and graduation year.

### Enable Contact Form
Integrate EmailJS, Formspree, or a backend API in `src/sections/ContactSection.tsx`.

## 📱 Responsive Design
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1100px max content width

## 🎨 Design Tokens
Colors and spacing are defined as CSS custom properties in `src/index.css`:
- `--color-navy: #1e3a5f`
- `--color-accent: #2563eb`
- `--color-background: #fafafa`

---
Built with React, TypeScript, Vite and Tailwind CSS
