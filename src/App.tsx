import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CompetitiveProgrammingSection from './sections/CompetitiveProgrammingSection';
import ExperienceSection from './sections/ExperienceSection';
import AchievementsSection from './sections/AchievementsSection';
import ContactSection from './sections/ContactSection';

/**
 * App — Root component with theme management and all portfolio sections.
 */
export default function App() {
  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0f1c' : '#f8fafc');
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background effects */}
      <div className="gradient-bg" aria-hidden="true" />
      <div className="grid-pattern" aria-hidden="true" />

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CompetitiveProgrammingSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
