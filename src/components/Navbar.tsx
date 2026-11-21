import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      const saved = localStorage.getItem('user_theme_pref');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
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
    localStorage.setItem('user_theme_pref', theme);
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
          className={`glass rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-center gap-1.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${theme === 'dark'
            ? 'bg-[#101613]/88 border border-[#2B3932] shadow-[rgba(0,214,163,0.06)] text-[#F1F5F2]'
            : 'bg-[#F4F1E9]/92 border border-[#E6E2D8] shadow-sm text-[#252923]'
            }`}
        >
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
                      ? 'text-[#75A2B5] bg-white/[0.06] shadow-sm font-semibold'
                      : 'text-[#527F93] bg-[#527F93]/10 shadow-sm font-semibold'
                    : theme === 'dark'
                      ? 'text-[#A8B8AE] hover:text-[#F1F5F2] hover:bg-white/5'
                      : 'text-[#62675F] hover:text-[#252923] hover:bg-[#EAF2F5]'
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
                ? 'border-[#2B3932] bg-[#17201D] hover:bg-[#222F28] hover:border-[#75A2B5]/60 text-[#F1F5F2]'
                : 'border-[#E6E2D8] bg-[#FCFBF7] hover:border-[#527F93] text-[#252923]'
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
                  <Moon size={13} className="text-[#527F93]" />
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
                ? 'border-[#2B3932] bg-[#17201D] hover:bg-[#222F28] hover:border-[#75A2B5]/60 text-[#F1F5F2]'
                : 'border-[#E6E2D8] bg-[#FCFBF7] hover:border-[#527F93] text-[#252923]'
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
                  <Moon size={13} className="text-[#527F93]" />
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
                          ? 'text-[#75A2B5] bg-white/[0.06] font-bold'
                          : 'text-[#527F93] bg-[#527F93]/10 font-bold'
                        : theme === 'dark'
                          ? 'text-[#A8B8AE] hover:text-[#F1F5F2] hover:bg-white/5'
                          : 'text-[#62675F] hover:text-[#252923] hover:bg-[#EAF2F5]'
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
        className={`fixed top-5 md:top-6 right-6 z-50 hidden xl:flex items-center gap-2.5 glass px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-xl ${theme === 'dark'
          ? 'bg-[#101613]/88 border-[#2B3932]'
          : 'bg-[#F4F1E9]/92 border-[#E6E2D8] shadow-sm'
          }`}
      >
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg flex items-center justify-center p-1 hover:scale-115 transition-transform"
          aria-label="GitHub"
        >
          <img
            src="/tech/github.svg"
            alt="GitHub"
            className="w-full h-full object-contain [data-theme=dark]:invert [data-theme=dark]:brightness-125"
            loading="lazy"
          />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg flex items-center justify-center p-1 hover:scale-115 transition-transform"
          aria-label="LinkedIn"
        >
          <img
            src="/tech/linkedin.svg"
            alt="LinkedIn"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="w-7 h-7 rounded-lg flex items-center justify-center p-1 hover:scale-115 transition-transform"
          aria-label="Email"
        >
          <img
            src="/tech/gmail.svg"
            alt="Gmail"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </a>
      </div>
    </>
  );
}
