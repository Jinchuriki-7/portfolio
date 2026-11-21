import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { experiences } from '../data/personalInfo';

const COMPANY_LOGOS: Record<string, { src: string; alt: string; padding?: string }> = {
  'biswas-it': {
    src: '/biswas-it-firm.png?v=2',
    alt: 'Biswas IT Firm',
    padding: 'p-1',
  },
  'codealpha': {
    src: '/codealpha.png?v=2',
    alt: 'CodeAlpha',
    padding: 'p-2',
  },
};

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
                      ? 'bg-[#75A2B5]/15 text-[#75A2B5] border border-[#75A2B5]/30 [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5]'
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
                {(() => {
                  const logo = COMPANY_LOGOS[exp.id];
                  return (
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-icon-card)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden hover:scale-105 transition-transform duration-200">
                      {logo ? (
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`w-full h-full object-contain ${logo.padding || 'p-2'}`}
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-display font-bold text-sm text-[var(--accent)]">
                          {exp.organization.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                  );
                })()}

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
