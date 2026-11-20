import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Award, Zap, Activity, Trophy, Flame, CheckCircle2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';

interface CFStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
}

export default function CompetitiveProgrammingSection() {
  const [stats, setStats] = useState<CFStats>({
    rating: 921,
    maxRating: 921,
    rank: 'newbie',
    maxRank: 'newbie',
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch('https://codeforces.com/api/user.info?handles=Samii-7')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK' && data.result?.[0]) {
          const user = data.result[0];
          setStats({
            rating: user.rating || 921,
            maxRating: user.maxRating || 921,
            rank: user.rank || 'newbie',
            maxRank: user.maxRank || 'newbie',
          });
          setIsLive(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SectionWrapper id="competitive-programming">
      <SectionHeader
        title="Competitive Programming"
        subtitle="Sharpening algorithmic thinking, data structures, and problem-solving speed through rated contests."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN: Two Profile Cards Vertically Stacked */}
        <div className="space-y-6">
          {/* 1. Codeforces Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 md:p-7"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-white [data-theme=dark]:bg-[#17201D] border border-[var(--border-subtle)] shadow-sm flex items-center justify-center p-2.5 flex-shrink-0 hover:scale-105 transition-transform duration-200">
                  <img
                    src="/codeforces.svg"
                    alt="Codeforces"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">Codeforces</h3>
                  <p className="text-xs text-[var(--text-muted)]">Competitive Programming</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#75A2B5]/15 text-[#75A2B5] border border-[#75A2B5]/30 [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5]">
                <Activity size={12} className={isLive ? 'animate-pulse' : ''} />
                {isLive ? 'Live API Verified' : 'Verified Profile'}
              </span>
            </div>

            {/* Handle */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] mb-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">
                Handle
              </p>
              <p className="font-display font-bold text-xl sm:text-2xl text-[#75A2B5] [data-theme=light]:text-[#527F93]">
                Samii-7
              </p>
            </div>

            {/* Stats Grid: Rating, Solved, Max Streak */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-[var(--text-muted)] mb-1">
                  <Zap size={12} className="text-[#75A2B5] [data-theme=light]:text-[#527F93]" />
                  <span>Rating</span>
                </div>
                <p className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                  {stats.rating}
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-[var(--text-muted)] mb-1">
                  <CheckCircle2 size={12} className="text-[#527F93] [data-theme=light]:text-[#75A2B5]" />
                  <span>Solved</span>
                </div>
                <p className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                  309
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-[var(--text-muted)] mb-1">
                  <Flame size={12} className="text-amber-500" />
                  <span>Streak</span>
                </div>
                <p className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)]">
                  204 <span className="text-[10px] sm:text-xs font-medium text-[var(--text-muted)]">Days</span>
                </p>
              </div>
            </div>

            {/* Action button */}
            <a
              href="https://codeforces.com/profile/Samii-7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#75A2B5] to-[#527F93] text-[#101613] [data-theme=light]:from-[#527F93] [data-theme=light]:to-[#75A2B5] [data-theme=light]:text-white font-bold py-2.5 sm:py-3 rounded-xl hover:shadow-lg hover:shadow-[#75A2B5]/25 [data-theme=light]:hover:shadow-[#527F93]/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              aria-label="View Codeforces profile"
            >
              <ExternalLink size={15} />
              <span>Visit Codeforces Profile</span>
            </a>
          </motion.div>

          {/* 2. Beecrowd Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 md:p-7"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-white [data-theme=dark]:bg-[#17201D] border border-[var(--border-subtle)] shadow-sm flex items-center justify-center p-2 flex-shrink-0 hover:scale-105 transition-transform duration-200">
                  <img
                    src="/beecrowd.png"
                    alt="Beecrowd"
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">Beecrowd</h3>
                  <p className="text-xs text-[var(--text-muted)]">Online Judge & Problem Solving</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#75A2B5]/15 text-[#75A2B5] border border-[#75A2B5]/30 [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5]">
                <Trophy size={12} className="text-amber-500" />
                Verified Judge Profile
              </span>
            </div>

            {/* User ID */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] mb-4">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">
                User ID
              </p>
              <p className="font-display font-bold text-xl sm:text-2xl text-[#75A2B5] [data-theme=light]:text-[#527F93]">
                252-15-184
              </p>
            </div>

            {/* Stats Grid: Problems Solved, Ranking */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)] mb-1">
                  <CheckCircle2 size={13} className="text-[#75A2B5] [data-theme=light]:text-[#527F93]" />
                  <span>Problems Solved</span>
                </div>
                <p className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                  79
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)] mb-1">
                  <Trophy size={13} className="text-amber-500" />
                  <span>Ranking</span>
                </div>
                <p className="text-xl sm:text-2xl font-display font-bold text-[#75A2B5] [data-theme=light]:text-[#527F93]">
                  Top 7%
                </p>
              </div>
            </div>

            {/* Action button */}
            <a
              href="https://judge.beecrowd.com/en/profile/25215184"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#75A2B5] to-[#527F93] text-[#101613] [data-theme=light]:from-[#527F93] [data-theme=light]:to-[#75A2B5] [data-theme=light]:text-white font-bold py-2.5 sm:py-3 rounded-xl hover:shadow-lg hover:shadow-[#75A2B5]/25 [data-theme=light]:hover:shadow-[#527F93]/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              aria-label="View Beecrowd profile"
            >
              <ExternalLink size={15} />
              <span>Visit Beecrowd Profile</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Practice Breakdown (COMPLETELY UNCHANGED) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
            What I Practice
          </h3>

          {[
            {
              icon: Code2,
              title: 'Algorithmic Problem Solving',
              desc: 'Working through problems in dynamic programming, graph algorithms, greedy optimization, and number theory.',
            },
            {
              icon: Award,
              title: 'Contest Participation',
              desc: 'Actively participating in Codeforces Div. rated contests to enhance speed, precision, and accuracy under real-time constraints.',
            },
            {
              icon: Code2,
              title: 'Data Structures',
              desc: 'Mastering trees, segment trees, heaps, union-find sets, and hash maps for high-performance solutions.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="glass-card p-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-[#75A2B5]/15 text-[#75A2B5] [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5] border border-[#75A2B5]/30 flex items-center justify-center flex-shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                  {title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
