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
      'Building clean, efficient software solutions with a focus on code quality, architecture, and maintainability.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Crafting responsive, high-performance web applications using modern frontend frameworks and ecosystems.',
  },
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description:
      'Exploring machine learning concepts and practical AI integrations to solve real-world engineering challenges.',
  },
  {
    icon: Trophy,
    title: 'Competitive Programming',
    description:
      'Sharpening algorithmic thinking, data structures, and speed through problem-solving on Codeforces.',
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" alternate>
      <SectionHeader
        title="About Me"
        subtitle="A brief introduction to my background, technical focus, and engineering passion."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Bio text */}
        <div>
          {personalInfo.about.trim().split('\n\n').map((para, i) => (
            <p
              key={i}
              className={`leading-relaxed text-base text-slate-300 ${i > 0 ? 'mt-4' : ''}`}
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
                className="rounded-xl p-3.5 glass border border-white/10"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <p className="mt-1 font-display font-bold text-sm text-emerald-400">
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
              className="card group hover:border-emerald-500/30"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105"
              >
                <Icon size={20} />
              </div>
              <h3 className="font-display font-bold text-base text-white">
                {title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
