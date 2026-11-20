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
    // Dynamically fetch live Codeforces data
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
      .catch(() => {
        // Fallback to verified baseline stats
      });
  }, []);

  return (
    <SectionWrapper id="competitive-programming" alternate>
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
          className="card"
        >
          {/* Platform header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
              >
                <SiCodeforces size={24} />
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                  Codeforces
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Competitive Programming Platform
                </p>
              </div>
            </div>

            {/* Live indicator badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: isLive ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-accent-soft)',
                color: isLive ? '#22c55e' : 'var(--color-text-accent)',
                border: `1px solid ${isLive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
              }}
            >
              <Activity size={12} className={isLive ? 'animate-pulse' : ''} />
              {isLive ? 'Live API Verified' : 'Verified Profile'}
            </span>
          </div>

          {/* Handle */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-xs uppercase tracking-wide font-medium mb-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Handle
            </p>
            <p className="font-bold text-2xl font-mono" style={{ color: 'var(--color-text-accent)' }}>
              Samii-7
            </p>
          </div>

          {/* Verified Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div
              className="rounded-xl p-3"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                <Zap size={13} style={{ color: 'var(--color-text-accent)' }} />
                <span>Current Rating</span>
              </div>
              <p className="text-xl font-bold font-mono mt-1" style={{ color: 'var(--color-text-primary)' }}>
                {stats.rating}
              </p>
            </div>

            <div
              className="rounded-xl p-3"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                <Award size={13} className="text-amber-500" />
                <span>Rank</span>
              </div>
              <p className="text-xl font-bold capitalize mt-1 text-slate-400">
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

        {/* What I do in CP */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
            What I Practice
          </h3>

          {[
            {
              icon: Code2,
              title: 'Algorithmic Problem Solving',
              desc: 'Working through problems in graph theory, dynamic programming, greedy algorithms, and number theory.',
            },
            {
              icon: Award,
              title: 'Contest Participation',
              desc: 'Participating in Codeforces Div. rounds to test problem-solving speed and accuracy under real-time constraints.',
            },
            {
              icon: Code2,
              title: 'Data Structures',
              desc: 'Mastering efficient data structures including trees, heaps, segment trees, and hash maps for optimized solutions.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card flex gap-4 items-start"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'var(--color-accent-soft)',
                  color: 'var(--color-text-accent)',
                }}
              >
                <Icon size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {title}
                </h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
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
