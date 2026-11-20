import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { experiences } from '../data/personalInfo';

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" alternate>
      <SectionHeader
        title="Internship & Experience"
        subtitle="Practical industry experience, professional engagements, and technical internships."
      />

      <div className="max-w-3xl space-y-6">
        {experiences.map((exp, idx) => {
          const isCurrent = exp.status === 'current';

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="glass-card p-6 md:p-8"
            >
              {/* Top Row: Status badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 [data-theme=light]:bg-blue-50 [data-theme=light]:text-blue-600 [data-theme=light]:border-blue-200'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 [data-theme=light]:bg-amber-50 [data-theme=light]:text-amber-700 [data-theme=light]:border-amber-200'
                  }`}
                >
                  {isCurrent ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {exp.statusLabel}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                  <Calendar size={13} className="text-[var(--accent)]" />
                  <span>{exp.startDate} → {exp.endDate}</span>
                </div>
              </div>

              {/* Company Info with 56x56 logo container */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-[var(--border-subtle)] text-[var(--accent)] flex items-center justify-center font-display font-bold text-sm tracking-wider flex-shrink-0 shadow-md">
                  {exp.id === 'biswas-it' ? 'BIT' : 'CA'}
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)]">
                    {exp.position}
                  </h3>
                  <a
                    href={exp.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors mt-0.5"
                  >
                    <span>{exp.organization}</span>
                    <ArrowUpRight size={13} />
                  </a>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{exp.type}</p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-4">
                {exp.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
