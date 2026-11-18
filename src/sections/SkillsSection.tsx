import { type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Wrench } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { skillCategories } from '../data/skills';

// Icon map for skill categories
const CategoryIcons: Record<string, ComponentType<{ size: number; className: string }>> = {
  code: Code,
  globe: Globe,
  tool: Wrench,
};

// Language / tech → color theme
const techColors: Record<string, { bg: string; text: string; border: string }> = {
  C:          { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'C++':      { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  Java:       { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  Python:     { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
  HTML5:      { bg: '#fff7ed', text: '#ea580c', border: '#fdba74' },
  CSS3:       { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
  JavaScript: { bg: '#fefce8', text: '#a16207', border: '#fde68a' },
  React:      { bg: '#ecfeff', text: '#0e7490', border: '#a5f3fc' },
  Git:        { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  GitHub:     { bg: '#f8fafc', text: '#1e293b', border: '#e2e8f0' },
  'VS Code':  { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
};

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" alternate>
      <SectionHeader
        title="Technical Skills"
        subtitle="A curated set of programming languages, technologies, and tools I work with."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon size={18} className="text-[#2563eb]" />
                </div>
                <h3 className="font-bold text-[#0f172a] text-sm">{cat.category}</h3>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(({ name }, skillIdx) => {
                  const style = techColors[name] ?? {
                    bg: '#f8fafc',
                    text: '#475569',
                    border: '#e2e8f0',
                  };
                  return (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + skillIdx * 0.04 }}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: style.bg,
                        color: style.text,
                        borderColor: style.border,
                      }}
                    >
                      {name}
                    </motion.span>
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
