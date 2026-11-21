import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { personalInfo } from '../data/personalInfo';

const highlights = [
  {
    image: '/tech/vscode.svg',
    title: 'Software Development',
    description:
      'Building clean, scalable, maintainable software architectures with high code standards.',
  },
  {
    image: '/tech/react.svg',
    title: 'Web Technologies',
    description:
      'Crafting high-performance responsive web applications using modern full-stack tools.',
  },
  {
    image: '/tech/ai.svg',
    title: 'Artificial Intelligence',
    description:
      'Exploring machine learning pipelines and integrating practical AI models into products.',
  },
  {
    image: '/codeforces.svg',
    title: 'Competitive Programming',
    description:
      'Sharpening analytical thinking through algorithms and rated problem-solving contests.',
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" alternate>
      <SectionHeader
        title="About Me"
        subtitle="A brief introduction to my background, technical journey, and what drives my work."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Bio paragraphs */}
        <div className="lg:col-span-6 space-y-4">
          {personalInfo.about.trim().split('\n\n').map((para, i) => (
            <p key={i} className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
              {para.trim()}
            </p>
          ))}

          {/* Quick stats grid */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { label: 'Field', value: 'CSE' },
              { label: 'Focus', value: 'Software & AI' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-center transition-colors">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {label}
                </p>
                <p className="mt-1 font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map(({ image, title, description }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="glass-card p-5 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--bg-icon-card)] border border-[var(--border-subtle)] [data-theme=light]:shadow-sm flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-200 p-2">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {title}
              </h3>
              <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
