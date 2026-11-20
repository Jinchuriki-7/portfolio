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
 * App — Root component with sleek dark mode UI inspired by rahat300809.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-950 text-slate-200">
      {/* Background ambient radial mesh */}
      <div className="animate-mesh" aria-hidden="true" />

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
