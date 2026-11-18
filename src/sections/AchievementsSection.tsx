import { motion } from 'framer-motion';
import { Trophy, ExternalLink, Users, Calendar } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';

interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer: string;
  role: string;
  date: string;
  description: string;
  projectLink?: string;
  tag: string;
}

const achievements: Achievement[] = [
  {
    id: "landtech-2026",
    title: "LandTech Innovation Hackathon 2026 — Track: Digital Land Records & Digitization",
    event: "LandTech Innovation Hackathon 2026",
    organizer: "Department of CSE & CSE-TECH, Daffodil International University (DIU)",
    role: "Team Leader, Full-Stack & GIS Architect (Team InnoSphere)",
    date: "2026",
    description:
      "Led Team InnoSphere to develop 'JOMI-SHARE & NIRBASH', an AI Land Intelligence and Property Ecosystem for smart e-governance in Bangladesh, featuring automated land record cross-auditing and the proprietary Land DNA™ verification system.",
    projectLink: "https://github.com/Jinchuriki-7/jomi-share-landtech",
    tag: "Hackathon Finalist & Participant",
  },
  {
    id: "competitive-programming-contests",
    title: "Active Codeforces Contestant",
    event: "Codeforces Rounds & Division Contests",
    organizer: "Codeforces",
    role: "Competitive Programmer (Handle: Samii-7)",
    date: "Ongoing",
    description:
      "Regularly competing in rated algorithmic rounds on Codeforces, solving data structures, dynamic programming, and greedy optimization problems under real-time contest pressure.",
    projectLink: "https://codeforces.com/profile/Samii-7",
    tag: "Competitive Programming",
  },
];

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" alternate>
      <SectionHeader
        title="Achievements & Competitions"
        subtitle="Verified hackathon participation, team leadership, and competitive programming milestones."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.45 }}
            className="card flex flex-col justify-between"
          >
            <div>
              {/* Tag & Date */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy size={18} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0f172a] text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{item.organizer}</p>
                </div>
              </div>

              {/* Role */}
              <div className="mt-3.5 flex items-center gap-1.5 text-xs font-medium text-[#1e3a5f] bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
                <Users size={13} className="text-[#2563eb]" />
                <span>{item.role}</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Link if available */}
            {item.projectLink && (
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={item.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                >
                  <span>View Project &amp; Proof</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
