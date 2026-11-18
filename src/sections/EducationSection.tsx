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
                  <GraduationCap size={18} className="text-[#2563eb] flex-shrink-0" />
                  <h3 className="font-bold text-[#0f172a] text-base">
                    {item.degree} in {item.field}
                  </h3>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    item.status === 'ongoing'
                      ? 'bg-green-50 text-green-700 border border-green-100'
                      : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}
                >
                  {item.status === 'ongoing' ? 'In Progress' : 'Completed'}
                </span>
              </div>

              {/* Institution */}
              <div className="mt-2 flex items-center gap-1.5 text-slate-500 text-sm">
                <BookOpen size={14} />
                <span>{item.institution}</span>
              </div>

              {/* Description */}
              {item.description && (
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
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
