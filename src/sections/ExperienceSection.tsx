import { motion } from 'framer-motion';
import { Briefcase, Calendar, ArrowUpRight, Clock } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { incomingExperience } from '../data/personalInfo';

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader
        title="Internship & Experience"
        subtitle="Professional engagements and upcoming opportunities."
      />

      <div className="max-w-2xl">
        {/* Incoming internship card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative flex gap-5"
        >
          {/* Timeline left */}
          <div className="relative flex flex-col items-center">
            <div className="timeline-dot" style={{ backgroundColor: '#f59e0b' }} />
          </div>

          {/* Card */}
          <div className="card flex-1">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Clock size={12} />
                Incoming Position
              </span>
            </div>

            {/* Position & org */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Briefcase size={18} className="text-[#2563eb]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] text-lg leading-snug">
                  {incomingExperience.position}
                </h3>
                <a
                  href="https://www.codealpha.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#2563eb] font-semibold text-sm mt-0.5 hover:underline"
                >
                  {incomingExperience.organization}
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
                  {incomingExperience.type}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
                  Duration
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0f172a]">
                  <Calendar size={13} className="text-slate-400" />
                  <span>
                    {incomingExperience.startDate} → {incomingExperience.endDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-slate-500 text-sm leading-relaxed">
              {incomingExperience.description}
            </p>
          </div>
        </motion.div>

        {/* Future experience placeholder text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 text-sm text-slate-400 italic"
        >
          More experience entries will appear here as they are accumulated.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
