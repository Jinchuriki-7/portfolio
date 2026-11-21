import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, User } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

const ROTATING_TITLES = [
  'Software Developer',
  'Web Developer',
  'Competitive Programmer',
  'AI Enthusiast',
];

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-32 overflow-hidden"
    >
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Opportunity Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#75A2B5]/15 text-[#75A2B5] [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5] text-xs sm:text-sm font-semibold mb-6 border border-[#75A2B5]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#75A2B5] [data-theme=light]:bg-[#527F93] animate-ping" />
              Available for new opportunities
            </span>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
              Hi, I am <br className="hidden sm:inline" />
              <span className="text-gradient">Farhanul Haque</span>
            </h1>

            {/* Subtitle / Rotating Specialization */}
            <div className="mt-3 h-8 overflow-hidden">
              <motion.p
                key={titleIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg sm:text-xl font-medium text-[var(--text-secondary)]"
              >
                {ROTATING_TITLES[titleIdx]}
              </motion.p>
            </div>

            {/* Bio intro */}
            <p className="mt-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Building intelligent systems and full-stack solutions for real-world impact. CSE Student at Daffodil International University.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <button
                onClick={() => handleScroll('#projects')}
                className="bg-[#75A2B5]/15 hover:bg-[#75A2B5]/25 text-[#75A2B5] border border-[#75A2B5]/35 [data-theme=light]:bg-[#EAF2F5] [data-theme=light]:text-[#527F93] [data-theme=light]:border-[#C8DCE5] [data-theme=light]:hover:bg-[#DCEAF0] font-semibold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-lg shadow-[#75A2B5]/10 [data-theme=light]:shadow-none"
              >
                <span>View Projects</span>
                <ArrowRight size={15} />
              </button>

              <a
                href="/cv.pdf"
                download="Farhanul_Haque_CV.pdf"
                className="glass-button text-sm font-semibold"
                aria-label="Download CV"
              >
                <span>Download CV</span>
                <Download size={14} />
              </a>
            </div>

            {/* Social icons row */}
            <div className="mt-8 flex items-center gap-3.5 justify-center lg:justify-start">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white [data-theme=dark]:bg-[#17201D] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:scale-110 transition-all flex items-center justify-center p-2.5 shadow-xs group"
                aria-label="GitHub profile"
              >
                <img
                  src="/tech/github.svg"
                  alt="GitHub"
                  className="w-full h-full object-contain github-icon transition-transform"
                  loading="lazy"
                />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white [data-theme=dark]:bg-[#17201D] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:scale-110 transition-all flex items-center justify-center p-2.5 shadow-xs group"
                aria-label="LinkedIn profile"
              >
                <img
                  src="/tech/linkedin.svg"
                  alt="LinkedIn"
                  className="w-full h-full object-contain transition-transform"
                  loading="lazy"
                />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-xl bg-white [data-theme=dark]:bg-[#17201D] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:scale-110 transition-all flex items-center justify-center p-2.5 shadow-xs group"
                aria-label="Email"
              >
                <img
                  src="/tech/gmail.svg"
                  alt="Gmail"
                  className="w-full h-full object-contain transition-transform"
                  loading="lazy"
                />
              </a>
            </div>
          </motion.div>

          {/* Right: Circular Profile Picture with CSE Student badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer Dashed Concentric Circles */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-[var(--profile-ring)] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-[var(--profile-ring-inner)] pointer-events-none"
              />

              {/* Ambient Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-full bg-[var(--profile-glow)] blur-2xl pointer-events-none"
              />

              {/* Circular Photo Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-[3.5px] border-[var(--profile-border)] shadow-2xl shadow-[var(--profile-glow)] group">
                <img
                  src="/profile.jpg"
                  alt="Farhanul Haque - Computer Science & Engineering Student"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden flex-col items-center justify-center w-full h-full text-[var(--text-muted)] bg-[var(--bg-secondary)]">
                  <User size={56} strokeWidth={1} />
                  <span className="text-xs font-medium mt-2">Farhanul Haque</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
