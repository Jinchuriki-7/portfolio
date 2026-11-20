import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedShaderBackground from './components/ui/animated-shader-background';
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
 * App — Root component with dynamic Three.js WebGL aurora shader background
 * and dark mode UI system matching rahat300809's portfolio.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Dynamic WebGL Shader Background (AnoAI Aurora Waves) */}
      <AnimatedShaderBackground />

      {/* Floating Capsule Navigation Bar & Quick Action Button */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CompetitiveProgrammingSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
