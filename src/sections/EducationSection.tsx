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
        subtitle="My academic background and ongoing studies."
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
            {/* Timeline left column */}
            <div className="relative flex flex-col items-center">
              <div className="timeline-dot" />
              {idx < education.length - 1 && <div className="timeline-line" />}
            </div>

            {/* Content */}
            <div className="card flex-1 mt-0">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} style={{ color: 'var(--color-text-accent)' }} className="flex-shrink-0" />
                  <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                    {item.degree} in {item.field}
                  </h3>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: item.status === 'ongoing' ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-accent-soft)',
                    color: item.status === 'ongoing' ? '#22c55e' : 'var(--color-text-accent)',
                    border: `1px solid ${item.status === 'ongoing' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
                  }}
                >
                  {item.status === 'ongoing' ? 'In Progress' : 'Completed'}
                </span>
              </div>

              {/* Institution */}
              <div
                className="mt-2 flex items-center gap-1.5 text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <BookOpen size={14} />
                <span>{item.institution}</span>
              </div>

              {/* Description */}
              {item.description && (
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
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
