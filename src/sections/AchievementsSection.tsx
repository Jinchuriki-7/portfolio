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
    tag: "Hackathon Finalist",
  },
  {
    id: "competitive-programming-contests",
    title: "Active Codeforces Contestant",
    event: "Codeforces Division Contests",
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
    <SectionWrapper id="achievements">
      <SectionHeader
        title="Achievements & Recognition"
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
            className="glass-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={12} className="text-emerald-400" />
                  {item.date}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy size={19} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base md:text-lg text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{item.organizer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 my-3">
                <Users size={13} />
                <span>{item.role}</span>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {item.projectLink && (
              <div className="mt-5 pt-4 border-t border-white/5">
                <a
                  href={item.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-cyan-400 transition-colors"
                >
                  <span>View Project &amp; Proof</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
