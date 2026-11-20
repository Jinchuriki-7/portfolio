import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';

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

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Toggle theme */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', newTheme === 'dark' ? '#0a0f1c' : '#f8fafc');
  };

  /* Smooth scroll */
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b ${
        scrolled ? 'shadow-lg shadow-black/25' : 'shadow-sm'
      }`}
      style={{
        background: 'var(--color-bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
            style={{ color: 'var(--color-text-primary)' }}
            aria-label="Go to top"
          >
            Farhanul<span className="text-gradient">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-0.5" role="list">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        color: isActive ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget.style.color = 'var(--color-text-primary)');
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget.style.color = 'var(--color-text-secondary)');
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 rounded-full"
                          style={{ background: 'var(--color-accent)' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-lg transition-all duration-200"
              style={{
                color: 'var(--color-text-secondary)',
                background: 'var(--color-accent-soft)',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden glass border-t overflow-hidden"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <ul className="section-container py-3 flex flex-col gap-1" role="list">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        color: isActive ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
                        background: isActive ? 'var(--color-accent-soft)' : 'transparent',
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
