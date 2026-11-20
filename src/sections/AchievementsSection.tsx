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
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-text-accent)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                  }}
                >
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <Calendar size={12} />
                  {item.date}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                  }}
                >
                  <Trophy size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {item.organizer}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div
                className="mt-3.5 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                style={{
                  background: 'var(--color-bg-card)',
                  color: 'var(--color-text-accent)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Users size={13} />
                <span>{item.role}</span>
              </div>

              {/* Description */}
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {item.description}
              </p>
            </div>

            {/* Link */}
            {item.projectLink && (
              <div className="mt-5 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                <a
                  href={item.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 hover:gap-2"
                  style={{ color: 'var(--color-text-accent)' }}
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
