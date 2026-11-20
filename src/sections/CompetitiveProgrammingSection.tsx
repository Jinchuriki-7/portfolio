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
        subtitle="Sharpening problem-solving skills through algorithmic competitions and rated contests."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Codeforces profile card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card border-white/10 hover:border-emerald-500/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center bg-red-500/10 text-red-400 border border-red-500/20"
              >
                <SiCodeforces size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Codeforces
                </h3>
                <p className="text-xs text-slate-400">
                  Competitive Programming Platform
                </p>
              </div>
            </div>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              <Activity size={12} className={isLive ? 'animate-pulse' : ''} />
              {isLive ? 'Live API Verified' : 'Verified Handle'}
            </span>
          </div>

          {/* Handle */}
          <div className="rounded-xl p-4 mb-4 glass border border-white/10">
            <p className="text-xs uppercase tracking-wide font-medium text-slate-500 mb-1">
              Active Handle
            </p>
            <p className="font-display font-bold text-2xl font-mono text-emerald-400">
              Samii-7
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl p-3.5 glass border border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Zap size={13} className="text-emerald-400" />
                <span>Current Rating</span>
              </div>
              <p className="text-2xl font-display font-bold font-mono mt-1 text-white">
                {stats.rating}
              </p>
            </div>

            <div className="rounded-xl p-3.5 glass border border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Award size={13} className="text-amber-400" />
                <span>Rank</span>
              </div>
              <p className="text-2xl font-display font-bold capitalize mt-1 text-slate-300">
                {stats.rank}
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://codeforces.com/profile/Samii-7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center"
            aria-label="View Codeforces profile"
          >
            <ExternalLink size={15} />
            Visit Codeforces Profile
          </a>
        </motion.div>

        {/* What I practice */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-display font-bold text-lg text-white">
            Algorithmic Focus &amp; Practice
          </h3>

          {[
            {
              icon: Code2,
              title: 'Algorithmic Problem Solving',
              desc: 'Working through problems in graph theory, dynamic programming, greedy algorithms, and number theory in optimized C++.',
            },
            {
              icon: Award,
              title: 'Rated Contest Participation',
              desc: 'Competing in rated Codeforces Division rounds under strict time constraints to test problem-solving speed and accuracy.',
            },
            {
              icon: Code2,
              title: 'Efficient Data Structures',
              desc: 'Mastering performance-critical data structures including segment trees, binary indexed trees, heaps, and hash tables.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card flex gap-4 items-start border-white/10 hover:border-emerald-500/30"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                <Icon size={18} />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-white">
                  {title}
                </h4>
                <p className="text-xs mt-1 text-slate-400 leading-relaxed">
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
