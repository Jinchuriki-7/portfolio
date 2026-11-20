import { Heart, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="section-container py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Farhanul<span className="text-gradient">.</span>
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              CSE Student • Software Developer • Problem Solver
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {CURRENT_YEAR} Farhanul Haque. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              Built with <Heart size={13} className="text-red-400 fill-red-400" /> using React & Tailwind CSS
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                color: 'var(--color-text-accent)',
                background: 'var(--color-accent-soft)',
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
