import { motion } from 'framer-motion';
import { Briefcase, Calendar, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
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
          {/* Vertical connecting line across all items */}
          <div
            className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-slate-200 hidden sm:block"
            aria-hidden="true"
          />

          {experiences.map((exp, idx) => {
            const isCurrent = exp.status === 'current';
            const dotColor = isCurrent ? '#16a34a' : '#f59e0b'; // green for current, amber for incoming

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
                    style={{ backgroundColor: dotColor }}
                  />
                </div>

                {/* Card */}
                <div className="card flex-1">
                  {/* Status badge */}
                  <div className="flex items-center gap-2 mb-4">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        {exp.statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <Clock size={12} className="text-amber-600" />
                        {exp.statusLabel}
                      </span>
                    )}
                  </div>

                  {/* Position & organization */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Briefcase size={18} className="text-[#2563eb]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f172a] text-lg leading-snug">
                        {exp.position}
                      </h3>
                      <a
                        href={exp.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#2563eb] font-semibold text-sm mt-0.5 hover:underline"
                      >
                        {exp.organization}
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
                        Type
                      </p>
                      <p className="text-sm font-semibold text-[#0f172a]">
                        {exp.type}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
                        Duration
                      </p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0f172a]">
                        <Calendar size={13} className="text-slate-400" />
                        <span>
                          {exp.startDate} → {exp.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-slate-600 text-sm leading-relaxed">
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
