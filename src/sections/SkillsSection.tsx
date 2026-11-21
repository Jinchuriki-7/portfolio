import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Globe, Wrench, Brain,
  BrainCircuit, Cpu, Code2, Trophy
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';

const CategoryIcons: Record<string, typeof Code> = {
  code: Code,
  globe: Globe,
  tool: Wrench,
  brain: Brain,
};

interface TechItemConfig {
  type: 'image' | 'lucide';
  src?: string;
  className?: string;
  icon?: ReactNode;
}

const TECH_CONFIG: Record<string, TechItemConfig> = {
  // Programming Languages
  'C': { type: 'image', src: '/tech/c.svg' },
  'C++': { type: 'image', src: '/tech/cplusplus.svg' },
  'Java': { type: 'image', src: '/tech/java.svg' },
  'Python': { type: 'image', src: '/tech/python.svg' },
  'JavaScript': { type: 'image', src: '/tech/javascript.svg' },

  // Frontend Development
  'HTML': { type: 'image', src: '/tech/html5.svg' },
  'CSS': { type: 'image', src: '/tech/css3.svg' },
  'React': { type: 'image', src: '/tech/react.svg' },
  'Tailwind CSS': { type: 'image', src: '/tech/tailwindcss.svg' },

  // Tools & Technologies
  'Git': { type: 'image', src: '/tech/git.svg' },
  'GitHub': {
    type: 'image',
    src: '/tech/github.svg',
    className: 'github-icon'
  },
  'VS Code': { type: 'image', src: '/tech/vscode.svg' },
  'Firebase': { type: 'image', src: '/tech/firebase.svg' },

  // Additional Interests (Conceptual icons)
  'Artificial Intelligence': {
    type: 'lucide',
    icon: <BrainCircuit size={22} className="text-violet-500 [data-theme=dark]:text-violet-400" />,
  },
  'Machine Learning': {
    type: 'lucide',
    icon: <Cpu size={22} className="text-cyan-600 [data-theme=dark]:text-cyan-400" />,
  },
  'Software Development': {
    type: 'lucide',
    icon: <Code2 size={22} className="text-[#527F93] [data-theme=dark]:text-[#75A2B5]" />,
  },
  'Competitive Programming': {
    type: 'lucide',
    icon: <Trophy size={22} className="text-amber-500 [data-theme=dark]:text-amber-400" />,
  },
};

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
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
                <div className="w-10 h-10 rounded-xl bg-[#75A2B5]/15 text-[#75A2B5] [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5] border border-[#75A2B5]/30 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
                  {cat.category}
                </h3>
              </div>

              {/* Skill chips */}
              <div className="space-y-2.5">
                {cat.skills.map(({ name }, skillIdx) => {
                  const tech = TECH_CONFIG[name];
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + skillIdx * 0.04 }}
                      className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:bg-[var(--bg-pill-hover)] transition-all cursor-default"
                    >
                      <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {tech?.type === 'image' && tech.src ? (
                          <img
                            src={tech.src}
                            alt={name}
                            className={`w-[24px] h-[24px] max-w-[26px] max-h-[26px] object-contain drop-shadow-sm ${tech.className ?? ''}`}
                            loading="lazy"
                          />
                        ) : tech?.type === 'lucide' && tech.icon ? (
                          tech.icon
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
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
