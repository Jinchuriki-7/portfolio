import { motion } from 'framer-motion';
import { Code2, Globe, Brain, Trophy } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { personalInfo } from '../data/personalInfo';

const highlights = [
  {
    icon: Code2,
    title: 'Software Development',
    description:
      'Building clean, efficient software solutions with a focus on code quality and maintainability.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Crafting responsive, user-friendly web experiences using modern frontend technologies.',
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description:
      'Exploring machine learning concepts and AI applications to solve real-world problems.',
  },
  {
    icon: Trophy,
    title: 'Competitive Programming',
    description:
      'Sharpening algorithmic thinking through problem-solving on Codeforces and similar platforms.',
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" alternate>
      <SectionHeader
        title="About Me"
        subtitle="A brief introduction to who I am and what drives me."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Bio text */}
        <div>
          {personalInfo.about.trim().split('\n\n').map((para, i) => (
            <p
              key={i}
              className={`leading-relaxed text-base ${i > 0 ? 'mt-4' : ''}`}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {para.trim()}
            </p>
          ))}

          {/* Quick facts */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'Field', value: 'CSE' },
              { label: 'GitHub', value: `@${personalInfo.githubUsername}` },
              { label: 'Codeforces', value: personalInfo.codeforcesUsername },
              { label: 'Focus', value: 'Software & AI' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {label}
                </p>
                <p className="mt-1 font-semibold text-sm" style={{ color: 'var(--color-text-accent)' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interest cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="card group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300"
                style={{
                  background: 'var(--color-accent-soft)',
                  color: 'var(--color-text-accent)',
                }}
              >
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                {title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
