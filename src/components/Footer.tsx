import { ArrowUp, Heart } from 'lucide-react';
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
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] backdrop-blur-xl relative transition-colors">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display font-bold text-2xl tracking-tight text-[var(--text-primary)]">
              Farhanul<span className="text-gradient">.</span>
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              CSE Student • Software Developer • Problem Solver
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
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
              className="p-2.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all hover:scale-105"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent-secondary)] hover:border-[var(--accent-secondary)] transition-all hover:scale-105"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>&copy; {CURRENT_YEAR} Farhanul Haque. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              Crafted with <Heart size={12} className="text-red-500 fill-red-500" /> in React &amp; Tailwind CSS
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[var(--bg-pill)] text-[var(--accent)] hover:bg-[var(--bg-pill-hover)] transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
