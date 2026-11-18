import { motion } from 'framer-motion';
import { ExternalLink, Code2, Award } from 'lucide-react';
import { SiCodeforces } from 'react-icons/si';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';

export default function CompetitiveProgrammingSection() {
  return (
    <SectionWrapper id="competitive-programming" alternate>
      <SectionHeader
        title="Competitive Programming"
        subtitle="Sharpening problem-solving skills through algorithmic competitions."
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
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <SiCodeforces size={22} className="text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-[#0f172a] text-base">Codeforces</h3>
              <p className="text-xs text-slate-500">Competitive Programming Platform</p>
            </div>
          </div>

          {/* Handle */}
          <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-1">
              Handle
            </p>
            <p className="font-bold text-[#1e3a5f] text-xl font-mono">Samii-7</p>
          </div>

          {/* Note about live stats */}
          <p className="text-xs text-slate-400 italic mb-4">
            Live rating, rank, and solved count are available on the profile page.
            Statistics are not fabricated here — visit the profile for accurate data.
          </p>

          {/* CTA */}
          <a
            href="https://codeforces.com/profile/Samii-7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center"
            aria-label="View Codeforces profile"
          >
            <ExternalLink size={15} />
            View Profile
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
          <h3 className="font-bold text-[#0f172a] text-base">What I Practice</h3>

          {[
            {
              icon: Code2,
              title: 'Algorithmic Problem Solving',
              desc: 'Working through problems in graph theory, dynamic programming, greedy algorithms, and number theory.',
            },
            {
              icon: Award,
              title: 'Contest Participation',
              desc: 'Participating in Codeforces Div. rounds to test problem-solving speed and accuracy under time pressure.',
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
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-[#2563eb]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#0f172a] text-sm">{title}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
