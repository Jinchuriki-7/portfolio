import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Award, Zap, Activity } from 'lucide-react';
import { SiCodeforces } from 'react-icons/si';
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
        {/* Codeforces Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                <SiCodeforces size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">Codeforces</h3>
                <p className="text-xs text-[var(--text-muted)]">Competitive Programming</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 [data-theme=light]:bg-blue-50 [data-theme=light]:text-blue-600 [data-theme=light]:border-blue-200">
              <Activity size={12} className={isLive ? 'animate-pulse' : ''} />
              {isLive ? 'Live API Verified' : 'Verified Profile'}
            </span>
          </div>

          {/* Handle */}
          <div className="p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] mb-5">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">
              Handle
            </p>
            <p className="font-display font-bold text-2xl text-[#00D6A3] [data-theme=light]:text-blue-600">
              Samii-7
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-1">
                <Zap size={13} className="text-[#00D6A3] [data-theme=light]:text-blue-600" />
                <span>Current Rating</span>
              </div>
              <p className="text-2xl font-display font-bold text-[var(--text-primary)]">
                {stats.rating}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-1">
                <Award size={13} className="text-[#39E6B0] [data-theme=light]:text-blue-500" />
                <span>Rank</span>
              </div>
              <p className="text-2xl font-display font-bold text-[var(--text-secondary)] capitalize">
                {stats.rank}
              </p>
            </div>
          </div>

          {/* Action button */}
          <a
            href="https://codeforces.com/profile/Samii-7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#00D6A3] to-[#39E6B0] text-[#101613] [data-theme=light]:from-blue-600 [data-theme=light]:to-blue-500 [data-theme=light]:text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#00D6A3]/25 [data-theme=light]:hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            aria-label="View Codeforces profile"
          >
            <ExternalLink size={15} />
            <span>Visit Codeforces Profile</span>
          </a>
        </motion.div>

        {/* Practice Breakdown */}
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
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 [data-theme=light]:bg-blue-50 [data-theme=light]:text-blue-600 [data-theme=light]:border-blue-200 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
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
