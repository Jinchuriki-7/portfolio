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
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'CP', href: '#competitive-programming' },
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
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Sync theme attribute on mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#101613' : '#F4F1E9');
    }
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
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-fit transition-all duration-300 ${scrolled ? 'top-3 md:top-4' : 'top-5 md:top-6'
          }`}
      >
        <div
          className={`glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between lg:justify-start gap-3 lg:gap-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${theme === 'dark'
            ? 'bg-[#101613]/88 border border-[#2B3932] shadow-[rgba(0,214,163,0.06)] text-[#F1F5F2]'
            : 'bg-[#F4F1E9]/92 border border-[#E6E2D8] shadow-sm text-[#252923]'
            }`}
        >
          {/* Logo / Avatar Pill */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
            aria-label="Go to top"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs tracking-wider shadow-md group-hover:rotate-12 transition-transform ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#00D6A3] to-[#39E6B0] text-[#101613]'
                : 'bg-gradient-to-br from-[#16866B] to-[#20A982] text-[#FCFBF7]'
            }`}>
              FH
            </div>
            <span
              className={`font-display font-bold text-base transition-colors ${theme === 'dark'
                ? 'text-[#F1F5F2] group-hover:text-[#00D6A3]'
                : 'text-[#252923] group-hover:text-[#16866B]'
                }`}
            >
              Farhanul
            </span>
          </button>

          {/* Desktop Navigation Links + Divider + DAY/NIGHT Toggle */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium tracking-normal transition-all cursor-pointer ${isActive
                    ? theme === 'dark'
                      ? 'text-[#00D6A3] bg-white/[0.06] shadow-sm font-semibold'
                      : 'text-[#16866B] bg-[#16866B]/10 shadow-sm font-semibold'
                    : theme === 'dark'
                      ? 'text-[#A8B8AE] hover:text-[#F1F5F2] hover:bg-white/5'
                      : 'text-[#62675F] hover:text-[#252923] hover:bg-[#EFECE3]'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Subtle Divider */}
            <div
              className={`w-px h-4 mx-2 ${theme === 'dark' ? 'bg-[#2B3932]' : 'bg-[#E6E2D8]'
                }`}
            />

            {/* DAY / NIGHT Toggle Button (Desktop) */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold font-mono tracking-wider transition-all cursor-pointer select-none active:scale-95 ${theme === 'dark'
                ? 'border-[#2B3932] bg-[#17201D] hover:bg-[#222F28] hover:border-[#00D6A3]/60 text-[#F1F5F2]'
                : 'border-[#E6E2D8] bg-[#FCFBF7] hover:border-[#16866B] text-[#252923]'
                }`}
              aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-amber-300" />
                  <span>DAY</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-[#16866B]" />
                  <span>NIGHT</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Right: DAY/NIGHT Button + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold font-mono tracking-wider transition-all cursor-pointer select-none active:scale-95 ${theme === 'dark'
                ? 'border-[#2B3932] bg-[#17201D] hover:bg-[#222F28] hover:border-[#00D6A3]/60 text-[#F1F5F2]'
                : 'border-[#E6E2D8] bg-[#FCFBF7] hover:border-[#16866B] text-[#252923]'
                }`}
              aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} className="text-amber-300" />
                  <span>DAY</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-[#16866B]" />
                  <span>NIGHT</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1.5 transition-colors cursor-pointer ${theme === 'dark' ? 'text-[#A8B8AE] hover:text-[#F1F5F2]' : 'text-[#62675F] hover:text-[#252923]'
                }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="mt-3 lg:hidden w-full max-w-sm mx-auto"
            >
              <div
                className={`glass rounded-3xl p-4 flex flex-col gap-1.5 border shadow-2xl backdrop-blur-2xl ${theme === 'dark'
                  ? 'bg-[#101613]/95 border-[#2B3932]'
                  : 'bg-[#FCFBF7]/98 border-[#E6E2D8] shadow-lg'
                  }`}
              >
                {NAV_ITEMS.map((item) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${isActive
                        ? theme === 'dark'
                          ? 'text-[#00D6A3] bg-white/[0.06] font-bold'
                          : 'text-[#16866B] bg-[#16866B]/10 font-bold'
                        : theme === 'dark'
                          ? 'text-[#A8B8AE] hover:text-[#F1F5F2] hover:bg-white/5'
                          : 'text-[#62675F] hover:text-[#252923] hover:bg-[#EFECE3]'
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
        className={`fixed top-5 md:top-6 right-6 z-50 hidden xl:flex items-center gap-3 glass px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-xl ${theme === 'dark'
          ? 'bg-[#101613]/88 border-[#2B3932] text-[#A8B8AE]'
          : 'bg-[#F4F1E9]/92 border-[#E6E2D8] text-[#62675F] shadow-sm'
          }`}
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors"
          aria-label="GitHub"
        >
          <FaGithub size={16} />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={16} />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="hover:text-[var(--accent)] transition-colors"
          aria-label="Email"
        >
          <MdEmail size={17} />
        </a>
      </div>

      {/* Floating Action Button (Bottom Right) */}
      <a
        href="/cv.pdf"
        download="Farhanul_Haque_CV.pdf"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-[#00D6A3] hover:bg-[#39E6B0] text-[#101613] shadow-[#00D6A3]/25 font-bold'
            : 'bg-[#16866B] hover:bg-[#20A982] text-[#FCFBF7] shadow-[#16866B]/25 font-bold'
        }`}
        aria-label="Quick Download CV"
        title="Download CV"
      >
        <FileText size={20} strokeWidth={2.5} />
      </a>
    </>
  );
}
