import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { education } from '../data/education';

export default function EducationSection() {
  return (
    <SectionWrapper id="education">
      <SectionHeader
        title="Education"
        subtitle="My academic background, undergraduate degree, and ongoing studies."
      />

      <div className="max-w-2xl">
        {education.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            {/* Timeline column */}
            <div className="relative flex flex-col items-center">
              <div className="timeline-dot" />
              {idx < education.length - 1 && <div className="timeline-line" />}
            </div>

            {/* Content card */}
            <div className="card flex-1 mt-0 border-white/10 hover:border-emerald-500/30">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-emerald-400 flex-shrink-0" />
                  <h3 className="font-display font-bold text-base text-white">
                    {item.degree} in {item.field}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.status === 'ongoing' ? 'In Progress' : 'Completed'}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                <BookOpen size={14} />
                <span>{item.institution}</span>
              </div>

              {item.description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
