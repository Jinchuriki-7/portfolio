import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderOpen, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { projects, type Project } from '../data/projects';

// Tech badge color mapping
const techColor: Record<string, { bg: string; text: string }> = {
  React:          { bg: '#ecfeff', text: '#0e7490' },
  TypeScript:     { bg: '#eff6ff', text: '#1d4ed8' },
  JavaScript:     { bg: '#fefce8', text: '#a16207' },
  Python:         { bg: '#faf5ff', text: '#7e22ce' },
  'C++':          { bg: '#f0fdf4', text: '#15803d' },
  'C++17':        { bg: '#f0fdf4', text: '#15803d' },
  Java:           { bg: '#fff7ed', text: '#c2410c' },
  Flutter:        { bg: '#f0f9ff', text: '#0284c7' },
  Dart:           { bg: '#e0f2fe', text: '#0369a1' },
  PySide6:        { bg: '#fdf4ff', text: '#9333ea' },
  'Tailwind CSS': { bg: '#ecfeff', text: '#0e7490' },
  PHP:            { bg: '#f5f3ff', text: '#6d28d9' },
  'SQLite / MySQL': { bg: '#f0fdfa', text: '#0f766e' },
  Vercel:         { bg: '#f8fafc', text: '#0f172a' },
  'AI / GIS':     { bg: '#fdf2f8', text: '#be185d' },
  Firebase:       { bg: '#fffbeb', text: '#b45309' },
  Algorithms:     { bg: '#f0fdf4', text: '#166534' },
  default:        { bg: '#f8fafc', text: '#475569' },
};

function TechBadge({ name }: { name: string }) {
  const style = techColor[name] ?? techColor.default;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.bg === '#f8fafc' ? '#e2e8f0' : style.bg,
      }}
    >
      {name}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`card flex flex-col h-full group ${
        project.featured ? 'border-blue-200 bg-gradient-to-b from-white to-blue-50/20' : ''
      }`}
    >
      {/* Category tag */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
          {project.category}
        </span>
        {project.featured && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Sparkles size={11} className="text-amber-500" />
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <div className="flex items-start gap-2 mb-2">
        <FolderOpen size={18} className="text-[#1e3a5f] flex-shrink-0 mt-1" />
        <h3 className="font-bold text-[#0f172a] text-base leading-snug group-hover:text-[#2563eb] transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed flex-1 mt-1">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.technologies.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1e3a5f] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors border border-slate-200"
          aria-label={`GitHub repository for ${project.title}`}
        >
          <FaGithub size={14} />
          <span>Source Code</span>
        </a>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-3 py-1.5 rounded-md transition-colors shadow-sm"
            aria-label={`Live demo for ${project.title}`}
          >
            <ExternalLink size={13} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack & AI', 'Software Development', 'Mobile & Desktop', 'Competitive Programming'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        title="Projects"
        subtitle="A showcase of real-world applications, tools, and systems retrieved from my GitHub profile."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeCategory === cat
                ? 'bg-[#1e3a5f] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-[#1e3a5f]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/Jinchuriki-7"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex"
          aria-label="View all projects on GitHub"
        >
          <FaGithub size={16} />
          Explore All Repositories on GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
