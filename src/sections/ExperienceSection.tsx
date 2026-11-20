import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { experiences } from '../data/personalInfo';

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader
        title="Internship & Experience"
        subtitle="Practical industry experience, professional engagements, and technical internships."
      />

      <div className="max-w-2xl">
        <div className="space-y-8 relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[11px] top-6 bottom-6 w-[2px] hidden sm:block"
            style={{
              background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
            }}
            aria-hidden="true"
          />

          {experiences.map((exp, idx) => {
            const isCurrent = exp.status === 'current';
            const isIncoming = exp.status === 'incoming';
            // Status colors: Green for Current, Orange for Incoming, Gray for Completed
            const statusColor = isCurrent ? '#22c55e' : isIncoming ? '#f59e0b' : '#94a3b8';
            const statusBg = isCurrent
              ? 'rgba(34, 197, 94, 0.1)'
              : isIncoming
              ? 'rgba(245, 158, 11, 0.1)'
              : 'rgba(148, 163, 184, 0.1)';
            const statusBorder = isCurrent
              ? 'rgba(34, 197, 94, 0.2)'
              : isIncoming
              ? 'rgba(245, 158, 11, 0.2)'
              : 'rgba(148, 163, 184, 0.2)';

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative flex gap-5"
              >
                {/* Timeline dot */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="timeline-dot z-10"
                    style={{
                      backgroundColor: statusColor,
                      boxShadow: `0 0 0 2px ${statusColor}, 0 0 12px ${statusColor}40`,
                    }}
                  />
                </div>

                {/* Card */}
                <div className="card flex-1">
                  {/* Status badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: statusBg,
                        color: statusColor,
                        border: `1px solid ${statusBorder}`,
                      }}
                    >
                      {isCurrent ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {exp.statusLabel}
                    </span>
                  </div>

                  {/* Position & organization with logo container (56x56px rounded-square) */}
                  <div className="flex items-start gap-4">
                    {/* Logo container: 56x56px, rounded-square, object-fit contain */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-sm tracking-wider shadow-sm transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-bg-tertiary), var(--color-accent-soft))',
                        color: 'var(--color-text-accent)',
                        border: '1.5px solid var(--color-border)',
                      }}
                    >
                      {exp.id === 'biswas-it' ? 'BIT' : 'CA'}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-lg leading-snug"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {exp.position}
                      </h3>
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-sm mt-0.5 hover:underline"
                        style={{ color: 'var(--color-text-accent)' }}
                      >
                        {exp.organization}
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-wide font-medium mb-1"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Type
                      </p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {exp.type}
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-3"
                      style={{
                        background: 'var(--color-bg-card)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-wide font-medium mb-1"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Duration
                      </p>
                      <div
                        className="flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        <Calendar size={13} style={{ color: 'var(--color-text-muted)' }} />
                        <span>{exp.startDate} → {exp.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
