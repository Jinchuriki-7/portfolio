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
        subtitle="My academic background, institution, and ongoing undergraduate studies."
      />

      <div className="max-w-3xl">
        {education.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-card p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#75A2B5]/15 border border-[#75A2B5]/30 text-[#75A2B5] [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5] flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)]">
                    {item.degree} in {item.field}
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--text-muted)] mt-0.5">
                    <BookOpen size={13} className="text-[var(--accent)]" />
                    <span>{item.institution}</span>
                  </div>
                </div>
              </div>

              <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-[#75A2B5]/20 text-[#75A2B5] border border-[#75A2B5]/35 [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5]">
                {item.status === 'ongoing' ? 'In Progress' : 'Completed'}
              </span>
            </div>

            {item.description && (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4 mt-2">
                {item.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
