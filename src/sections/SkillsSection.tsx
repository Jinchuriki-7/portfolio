import { type ComponentType, type CSSProperties } from 'react';
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

// Icon map for skill categories
const CategoryIcons: Record<string, ComponentType<{ size: number; className?: string }>> = {
  code: Code,
  globe: Globe,
  tool: Wrench,
  brain: Brain,
};

// Technology icon map — recognizable brand icons
const TechIcons: Record<string, ComponentType<{ size?: number; className?: string; style?: CSSProperties }>> = {
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
        subtitle="A curated set of programming languages, technologies, and tools I work with."
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
              className="card"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-text-accent)',
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {cat.category}
                </h3>
              </div>

              {/* Skill items with icons */}
              <div className="space-y-3">
                {cat.skills.map(({ name }, skillIdx) => {
                  const TechIcon = TechIcons[name];
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: 'var(--color-accent-soft)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {TechIcon ? (
                        <TechIcon size={16} className="flex-shrink-0" style={{ color: 'var(--color-text-accent)' }} />
                      ) : (
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ background: 'var(--color-accent-glow)', border: '2px solid var(--color-accent)' }}
                        />
                      )}
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
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
