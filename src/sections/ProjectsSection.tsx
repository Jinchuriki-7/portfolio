import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderOpen, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { projects, type Project } from '../data/projects';

function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: 'var(--color-accent-soft)',
        color: 'var(--color-text-accent)',
        border: '1px solid rgba(59, 130, 246, 0.15)',
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
      className="card flex flex-col h-full group overflow-hidden"
      style={{
        borderColor: project.featured ? 'rgba(59, 130, 246, 0.25)' : undefined,
      }}
    >
      {/* Project Image Preview Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950 mb-4 border border-slate-800/80 group-hover:border-blue-500/40 transition-all duration-300">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Category tag + featured badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: 'var(--color-accent-soft)',
            color: 'var(--color-text-accent)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
          }}
        >
          {project.category}
        </span>
        {project.featured && (
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            <Sparkles size={11} />
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <div className="flex items-start gap-2 mb-2">
        <FolderOpen size={18} className="flex-shrink-0 mt-1" style={{ color: 'var(--color-text-accent)' }} />
        <h3
          className="font-bold text-base leading-snug transition-colors group-hover:text-blue-400"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1 mt-1"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.technologies.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>

      {/* Action buttons */}
      <div
        className="mt-5 flex items-center justify-between pt-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
          style={{
            color: 'var(--color-text-secondary)',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
          }}
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
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)',
            }}
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

  const categories = ['All', 'Full-Stack & AI', 'Software Development', 'Mobile & Desktop'];

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
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
            style={{
              background: activeCategory === cat
                ? 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))'
                : 'var(--color-bg-card)',
              color: activeCategory === cat ? '#ffffff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'transparent' : 'var(--color-border)'}`,
              boxShadow: activeCategory === cat ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
            }}
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
