import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Building2, Eye, X, ExternalLink, Award,
  Trophy, Users, Layers, ShieldCheck, Sparkles
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  certificateImage?: string;
  isFeatured?: boolean;
  isFinalist?: boolean;
  teamName?: string;
  projectName?: string;
}

const achievements: Achievement[] = [
  {
    id: 'landtech-innovation-hackathon-2026',
    title: 'LandTech Innovation Hackathon 2026 – Finalist',
    organization: 'Daffodil International University',
    date: '2026',
    category: 'LandTech / Innovation / Hackathon',
    teamName: 'InnoSphere',
    projectName: 'JOMI-SHARE',
    isFeatured: true,
    isFinalist: true,
    description:
      'Selected as a finalist in the LandTech Innovation Hackathon 2026 with Team InnoSphere for developing JOMI-SHARE, an innovative AI-powered land verification and property management solution.',
  },
  {
    id: 'ai-innovation-hackathon-2026',
    title: 'AI Innovation Hackathon 2026 – Finalist',
    organization: 'Daffodil International University',
    date: '25 July 2026',
    category: 'Hackathon / AI Innovation',
    isFinalist: true,
    description:
      'Successfully qualified for the final round of the AI Innovation Hackathon 2026: From Learning to Impact as part of Team TRIMATRIX, recognized for innovation, creativity, and dedication.',
    certificateImage: '/certificates/ai-innovation-hackathon-2026.jpg',
  },
  {
    id: 'unlock-the-algorithm-2026',
    title: 'Unlock the Algorithm – Summer 2026',
    organization: 'DIU Computer & Programming Club',
    date: 'Summer 2026',
    category: 'Competitive Programming',
    description:
      'Successfully participated in the Unlock the Algorithm Programming Contest, awarded Certificate of Appreciation by the Department of CSE and CPC.',
    certificateImage: '/certificates/unlock-the-algorithm-2026.jpg',
  },
  {
    id: 'diu-math-olympiad-2025',
    title: 'DIU Mathematics Olympiad – Summer 2025',
    organization: 'DIU Mathematical Society (DIUMS)',
    date: '26 July 2025',
    category: 'Mathematics Competition',
    description:
      'Participated in the Preliminary Round of the DIU Mathematics Olympiad – Summer 2025, organized by the Faculty of Science & Information Technology in association with DIUMS.',
    certificateImage: '/certificates/diu-math-olympiad-2025.jpg',
  },
  {
    id: 'shapla-cub-award-2018',
    title: 'Shapla Cub Award',
    organization: 'Bangladesh Scouts',
    date: '25 July 2018',
    category: 'National Recognition',
    description:
      'Decorated with the Shapla Cub Award, the highest national recognition in Cub Scouting, in recognition of outstanding performance, leadership, and dedicated contribution.',
    certificateImage: '/certificates/shapla-cub-award-2018.jpg',
  },
];

export default function AchievementsSection() {
  const [selectedCert, setSelectedCert] = useState<Achievement | null>(null);

  // Close modal on Escape key and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <SectionWrapper id="achievements" alternate>
      <SectionHeader
        title="Achievements & Recognition"
        subtitle="Verified competition certificates, academic recognitions, and national honors."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {achievements.map((item, idx) => {
          const isFeatured = item.isFeatured;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.45 }}
              className={`glass-card p-5 sm:p-6 flex flex-col justify-between group hover:border-[var(--accent)] transition-all duration-300 relative overflow-hidden ${
                isFeatured ? 'md:col-span-2 border-[var(--accent)]/50 shadow-lg shadow-[#75A2B5]/5' : ''
              }`}
            >
              {/* Featured ambient background glow */}
              {isFeatured && (
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#75A2B5]/15 via-[#527F93]/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              )}

              <div>
                {/* Visual Section: Image thumbnail or LandTech spotlight banner */}
                {item.certificateImage ? (
                  <div
                    onClick={() => setSelectedCert(item)}
                    className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-black/10 border border-[var(--border-subtle)] group/thumb cursor-pointer shadow-sm"
                  >
                    <img
                      src={item.certificateImage}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]">
                      <Eye size={16} />
                      <span>Click to Expand Certificate</span>
                    </div>
                  </div>
                ) : (
                  /* Prominent LandTech Innovation & Project Spotlight Banner */
                  <div className="relative rounded-2xl p-5 sm:p-6 mb-5 bg-gradient-to-br from-[#75A2B5]/15 via-[#527F93]/10 to-[var(--bg-card)] border border-[#75A2B5]/30 overflow-hidden">
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-[#75A2B5] to-[#527F93] text-white shadow-sm flex items-center gap-1.5">
                            <Trophy size={13} className="text-amber-300" />
                            FINALIST
                          </span>
                          <span className="text-[11px] font-medium text-[var(--text-muted)]">
                            Hackathon Final Round
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                          JOMI-SHARE
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-[var(--accent)] flex items-center gap-1.5">
                          <Sparkles size={14} />
                          AI-Powered Land Verification & Property Management
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/80 backdrop-blur-sm border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] shadow-sm">
                          <Users size={14} className="text-[var(--accent)]" />
                          <span>Team: <strong className="text-[var(--accent)] font-bold">{item.teamName}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/80 backdrop-blur-sm border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] shadow-sm">
                          <Layers size={14} className="text-[var(--accent)]" />
                          <span>LandTech AI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Row: Category Badge + Date + Optional Finalist Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#75A2B5]/15 text-[#75A2B5] border border-[#75A2B5]/30 [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5]">
                      {item.category}
                    </span>
                    {item.isFinalist && !isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#75A2B5] to-[#527F93] text-white">
                        FINALIST
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                    <Calendar size={12} className="text-[var(--accent)]" />
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Organization */}
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1.5 font-medium">
                  <Building2 size={13} className="text-[var(--accent)] flex-shrink-0" />
                  <span>{item.organization}</span>
                </div>

                {/* Highlight badges for Featured card */}
                {isFeatured && (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#75A2B5]/15 text-[#527F93] [data-theme=dark]:text-[#75A2B5] border border-[#75A2B5]/30">
                      <Layers size={13} /> Project: <strong className="font-bold">JOMI-SHARE</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-pill)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      <Users size={13} /> Team: <strong className="font-bold">InnoSphere</strong>
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                {item.certificateImage ? (
                  <button
                    type="button"
                    onClick={() => setSelectedCert(item)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#75A2B5] to-[#527F93] hover:from-[#527F93] hover:to-[#75A2B5] px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#75A2B5]/20 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>View Certificate</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#75A2B5]/15 to-[#527F93]/15 text-[#527F93] [data-theme=dark]:text-[#75A2B5] border border-[#75A2B5]/30">
                    <Trophy size={14} className="text-amber-500" />
                    <span>Finalist Standing</span>
                  </div>
                )}

                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-muted)]">
                  {item.certificateImage ? (
                    <>
                      <Award size={13} className="text-[var(--accent)]" />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={13} className="text-[var(--accent)]" />
                      <span>Competition Finalist</span>
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCert && selectedCert.certificateImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {selectedCert.organization} • {selectedCert.date}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-[var(--bg-pill)] hover:bg-[var(--bg-pill-hover)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Certificate Image Viewer */}
              <div className="p-3 sm:p-5 flex-1 overflow-auto flex items-center justify-center bg-black/20">
                <img
                  src={selectedCert.certificateImage}
                  alt={selectedCert.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg border border-[var(--border-subtle)]"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Original Verified Document</span>
                <a
                  href={selectedCert.certificateImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[var(--accent)] hover:underline"
                >
                  <span>Open in Full Tab</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
