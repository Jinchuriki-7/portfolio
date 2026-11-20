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

      <div className="max-w-2xl">
        <div className="space-y-8 relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[11px] top-6 bottom-6 w-[2px] hidden sm:block bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent"
            aria-hidden="true"
          />

          {experiences.map((exp, idx) => {
            const isCurrent = exp.status === 'current';
            const statusColor = isCurrent ? '#34d399' : '#fbbf24';

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
                      boxShadow: `0 0 0 2px ${statusColor}, 0 0 16px ${statusColor}50`,
                    }}
                  />
                </div>

                {/* Card */}
                <div className="card flex-1 border-white/10 hover:border-emerald-500/30">
                  {/* Status badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                        isCurrent
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {isCurrent ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {exp.statusLabel}
                    </span>
                  </div>

                  {/* Position & organization */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm tracking-wider shadow-sm transition-all duration-300 hover:scale-105 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      {exp.id === 'biswas-it' ? 'BIT' : 'CA'}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white leading-snug">
                        {exp.position}
                      </h3>
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-sm mt-0.5 text-emerald-400 hover:underline"
                      >
                        {exp.organization}
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl p-3 glass border border-white/10">
                      <p className="text-xs uppercase tracking-wide font-medium text-slate-500 mb-1">
                        Type
                      </p>
                      <p className="text-sm font-semibold text-slate-200">
                        {exp.type}
                      </p>
                    </div>
                    <div className="rounded-xl p-3 glass border border-white/10">
                      <p className="text-xs uppercase tracking-wide font-medium text-slate-500 mb-1">
                        Duration
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-200">
                        <Calendar size={13} className="text-slate-500" />
                        <span>{exp.startDate} → {exp.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
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
