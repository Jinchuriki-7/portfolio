import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, User } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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
      className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-36 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Opportunity Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 border border-emerald-500/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Available for new opportunities
            </span>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Hi, I am <br className="hidden sm:inline" />
              <span className="text-gradient">Farhanul Haque</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-lg sm:text-xl text-slate-300 font-medium">
              Computer Science &amp; Engineering Student
            </p>

            {/* Rotating Title */}
            <div className="mt-3 h-8 sm:h-9 overflow-hidden">
              <motion.p
                key={titleIdx}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="text-xl sm:text-2xl font-display font-bold text-cyan-400"
              >
                {ROTATING_TITLES[titleIdx]}
              </motion.p>
            </div>

            {/* Bio intro */}
            <p className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Passionate about building scalable software, responsive web ecosystems, and exploring artificial intelligence with strong algorithmic problem-solving skills.
            </p>

            {/* Interest Badges */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {personalInfo.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-slate-300"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <button
                onClick={() => handleScroll('#projects')}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold px-7 py-3 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="/cv.pdf"
                download="Farhanul_Haque_CV.pdf"
                className="glass-button text-sm font-semibold"
                aria-label="Download CV"
              >
                <Download size={15} />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-5 justify-center lg:justify-start text-sm text-slate-400">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                aria-label="GitHub profile"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group">
              {/* Outer decorative ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-blue-500/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity"
              />

              {/* Photo Frame with 3D feel */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden glass border border-white/15 shadow-2xl shadow-emerald-500/10 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src="/profile.jpg"
                  alt="Farhanul Haque - Computer Science & Engineering Student"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden flex-col items-center justify-center w-full h-full text-slate-500 bg-slate-900">
                  <User size={56} strokeWidth={1} />
                  <span className="text-xs text-center px-4 font-medium mt-2">Farhanul Haque</span>
                </div>
              </div>

              {/* Float badge */}
              <div className="absolute -bottom-3 -right-3 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-xl shadow-black/50">
                DIU CSE Student
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
