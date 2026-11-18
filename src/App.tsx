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
 * App — Root component that composes all portfolio sections.
 * Sections appear in order: Home → About → Education → Skills →
 * Projects → CP → Experience → Achievements → Contact
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
