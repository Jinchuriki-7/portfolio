import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { projects, type Project } from '../data/projects';

function ProjectCard({ project }: { project: Project }) {
  // 3D tilt effect on card hover from rahat300809 UI
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="card group overflow-hidden flex flex-col h-full perspective-1000 border-white/10 hover:border-emerald-500/30"
    >
      {/* Aspect-Video Real Project Image */}
      <div
        style={{ transform: "translateZ(25px)" }}
        className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Right Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              <Sparkles size={11} />
              Featured
            </span>
          )}
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            Active
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ transform: "translateZ(15px)" }} className="pt-5 flex-1 flex flex-col">
        {/* Category tag */}
        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-xs font-medium border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
            aria-label={`GitHub source code for ${project.title}`}
          >
            <FaGithub size={14} />
            <span>Source Code</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
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
    <SectionWrapper id="projects">
      <SectionHeader
        title="Featured Projects"
        subtitle="A showcase of real-world applications, tools, and systems engineered with modern technologies."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200"
            style={{
              background: activeCategory === cat
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'rgba(255, 255, 255, 0.04)',
              color: activeCategory === cat ? '#ffffff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(255, 255, 255, 0.1)'}`,
              boxShadow: activeCategory === cat ? '0 4px 15px rgba(16, 185, 129, 0.3)' : 'none',
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
        className="mt-14 text-center"
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
