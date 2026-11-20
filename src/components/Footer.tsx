import { Heart, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';

const CURRENT_YEAR = new Date().getFullYear();

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t border-white/10"
      style={{
        background: 'rgba(2, 6, 23, 0.95)',
      }}
    >
      <div className="section-container py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display font-bold text-2xl tracking-tight text-white">
              Farhanul<span className="text-emerald-400">.</span>
            </p>
            <p className="text-sm mt-1 text-slate-400">
              CSE Student • Software Developer • Problem Solver
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all hover:scale-105"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all hover:scale-105"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/10">
          <p className="text-xs text-slate-500">
            &copy; {CURRENT_YEAR} Farhanul Haque. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 flex items-center gap-1">
              Built with <Heart size={12} className="text-emerald-400 fill-emerald-400" /> using React & Tailwind CSS
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-white/10 hover:border-emerald-500/40 text-emerald-400 bg-white/5 hover:bg-white/10 transition-all hover:scale-105"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
