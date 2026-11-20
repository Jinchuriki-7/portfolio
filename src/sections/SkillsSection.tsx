import { type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Wrench, Brain } from 'lucide-react';
import {
  SiC, SiCplusplus, SiJavascript, SiHtml5, SiCss, SiReact, SiTailwindcss,
  SiGit, SiGithub, SiFirebase,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';

const CategoryIcons: Record<string, ComponentType<{ size: number }>> = {
  code: Code,
  globe: Globe,
  tool: Wrench,
  brain: Brain,
};

const TechIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  'C': SiC,
  'C++': SiCplusplus,
  'Java': FaJava,
  'JavaScript': SiJavascript,
  'HTML': SiHtml5,
  'CSS': SiCss,
  'React': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Git': SiGit,
  'GitHub': SiGithub,
  'VS Code': VscVscode,
  'Firebase': SiFirebase,
};

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" alternate>
      <SectionHeader
        title="Technical Skills"
        subtitle="A curated set of programming languages, frameworks, developer tools, and technical competencies."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((cat, catIdx) => {
          const Icon = CategoryIcons[cat.icon] ?? Code;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.45 }}
              className="glass-card p-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 [data-theme=light]:bg-[#EFECE3] [data-theme=light]:text-[#16866B] [data-theme=light]:border-[#E6E2D8] border border-emerald-500/20 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                  {cat.category}
                </h3>
              </div>

              {/* Skill chips */}
              <div className="space-y-2.5">
                {cat.skills.map(({ name }, skillIdx) => {
                  const TechIcon = TechIcons[name];
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + skillIdx * 0.04 }}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:bg-[var(--bg-pill-hover)] transition-all"
                    >
                      {TechIcon ? (
                        <TechIcon size={16} className="text-[var(--accent)] flex-shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
