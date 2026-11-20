import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { projects, type Project } from '../data/projects';

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass-card group flex flex-col h-full overflow-hidden"
    >
      {/* Aspect-video image banner */}
      <div className="relative aspect-video overflow-hidden border-b border-[var(--border-subtle)] bg-[#101613] [data-theme=light]:bg-[#EFECE3]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101613] via-[#101613]/20 to-transparent [data-theme=light]:from-[#252923]/30 [data-theme=light]:via-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md [data-theme=light]:bg-[#16866B] [data-theme=light]:text-white [data-theme=light]:border-[#16866B]">
              <Sparkles size={11} />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category */}
        <span className="text-[var(--accent)] text-xs font-semibold mb-2 uppercase tracking-widest">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-pill)] hover:bg-[var(--bg-pill-hover)] px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] transition-all"
            aria-label={`Source code for ${project.title}`}
          >
            <FaGithub size={14} />
            <span>Source Code</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101613] [data-theme=light]:text-white bg-gradient-to-r from-[#00D6A3] to-[#39E6B0] [data-theme=light]:from-[#16866B] [data-theme=light]:to-[#20A982] hover:shadow-lg hover:shadow-[#00D6A3]/25 [data-theme=light]:hover:shadow-[#16866B]/20 px-3.5 py-2 rounded-lg transition-all"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
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
    <SectionWrapper id="projects" alternate>
      <SectionHeader
        title="Featured Projects"
        subtitle="A showcase of real-world applications, tools, and systems retrieved from my GitHub profile."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#00D6A3] to-[#39E6B0] text-[#101613] font-bold shadow-md shadow-[#00D6A3]/20 [data-theme=light]:from-[#16866B] [data-theme=light]:to-[#20A982] [data-theme=light]:text-white [data-theme=light]:shadow-none'
                : 'bg-[var(--bg-pill)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:bg-[var(--bg-pill-hover)] hover:text-[var(--text-primary)]'
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
      <div className="mt-12 text-center">
        <a
          href="https://github.com/Jinchuriki-7"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button text-sm"
          aria-label="View all projects on GitHub"
        >
          <FaGithub size={16} />
          <span>Explore All Repositories on GitHub</span>
        </a>
      </div>
    </SectionWrapper>
  );
}
