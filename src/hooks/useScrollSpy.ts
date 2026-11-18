import { useState, useEffect } from 'react';

/**
 * useScrollSpy - tracks the currently active section based on scroll position.
 * @param sectionIds - array of section element IDs to watch
 * @param offset - pixels from the top to consider a section "active"
 */
export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection(sectionIds[0]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
