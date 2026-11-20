import { useState, useEffect } from 'react';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { personalInfo } from '../data/personalInfo';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'CP', href: '#competitive-programming' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });
  const activeSection = useScrollSpy(SECTION_IDS, 100);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Sync theme attribute on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Floating Capsule Navbar (Center) */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 ${
          scrolled ? 'top-3 md:top-4' : 'top-5 md:top-6'
        }`}
      >
        <div
          className={`glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-slate-950/75 border border-white/10 shadow-emerald-500/5 text-white'
              : 'bg-white/90 border border-slate-200 shadow-slate-300/50 text-slate-900'
          }`}
        >
          {/* Logo / Avatar Pill */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Go to top"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-950 font-display font-bold text-xs tracking-wider shadow-md group-hover:rotate-12 transition-transform">
              FH
            </div>
            <span
              className={`font-display font-bold text-base sm:text-lg transition-colors ${
                theme === 'dark'
                  ? 'text-white group-hover:text-emerald-400'
                  : 'text-slate-900 group-hover:text-emerald-600'
              }`}
            >
              Farhanul
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-emerald-400 bg-white/10 shadow-sm'
                        : 'text-emerald-600 bg-emerald-500/15 shadow-sm font-bold'
                      : theme === 'dark'
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-black/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Area: DAY/NIGHT Button + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* DAY / NIGHT Toggle Button (matches user's screenshot) */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-mono tracking-wider transition-all cursor-pointer select-none active:scale-95 ${
                theme === 'dark'
                  ? 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 text-slate-200'
                  : 'border-slate-300 bg-black/5 hover:bg-black/10 hover:border-emerald-500 text-slate-800'
              }`}
              aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={14} className="text-amber-300" />
                  <span>DAY</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-cyan-500" />
                  <span>NIGHT</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-1.5 transition-colors cursor-pointer ${
                theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="mt-3 md:hidden"
            >
              <div
                className={`glass rounded-3xl p-4 flex flex-col gap-1.5 border shadow-2xl backdrop-blur-2xl ${
                  theme === 'dark'
                    ? 'bg-slate-950/95 border-white/10'
                    : 'bg-white/95 border-slate-200 shadow-slate-300/50'
                }`}
              >
                {NAV_ITEMS.map((item) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? theme === 'dark'
                            ? 'text-emerald-400 bg-white/10 font-bold'
                            : 'text-emerald-600 bg-emerald-500/15 font-bold'
                          : theme === 'dark'
                          ? 'text-slate-300 hover:text-white hover:bg-white/5'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-black/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Top-Right Social Icons Pill (Desktop) */}
      <div
        className={`fixed top-5 md:top-6 right-6 z-50 hidden xl:flex items-center gap-3 glass px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-slate-950/70 border-white/10 text-slate-400'
            : 'bg-white/90 border-slate-200 text-slate-600 shadow-slate-300/40'
        }`}
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 transition-colors"
          aria-label="GitHub"
        >
          <FaGithub size={16} />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-cyan-400 transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={16} />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-slate-400 hover:text-emerald-400 transition-colors"
          aria-label="Email"
        >
          <MdEmail size={17} />
        </a>
      </div>

      {/* Floating Action Button (Bottom Right) */}
      <a
        href="/cv.pdf"
        download="Farhanul_Haque_CV.pdf"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        aria-label="Quick Download CV"
        title="Download CV"
      >
        <FileText size={20} strokeWidth={2.5} />
      </a>
    </>
  );
}
