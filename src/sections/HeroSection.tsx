import { motion } from 'framer-motion';
import { Download, ArrowDown, User } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';

export default function HeroSection() {
  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#fafafa] overflow-hidden"
    >
      {/* Subtle decorative background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-20 right-10 w-72 h-72 rounded-full border border-slate-100 opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute top-32 right-24 w-48 h-48 rounded-full border border-slate-100 opacity-40"
      />

      <div className="section-container w-full pt-24 pb-16 md:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[#2563eb] font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] leading-tight"
            >
              Farhanul
              <br />
              <span className="text-[#1e3a5f]">Haque</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-3 text-lg md:text-xl font-medium text-slate-500"
            >
              Computer Science &amp; Engineering Student
            </motion.p>

            {/* Short intro */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-5 text-slate-600 text-base leading-relaxed max-w-lg"
            >
              Passionate about{' '}
              <span className="text-[#1e3a5f] font-medium">software development</span>,{' '}
              <span className="text-[#1e3a5f] font-medium">web development</span>, and{' '}
              <span className="text-[#1e3a5f] font-medium">artificial intelligence</span>.
              I enjoy solving complex problems and building meaningful digital experiences.
            </motion.p>

            {/* Interest badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {personalInfo.interests.map((interest) => (
                <span key={interest} className="badge text-xs">
                  {interest}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => handleScroll('#projects')}
                className="btn-primary"
              >
                View Projects
              </button>

              {/* CV download — only functional when CV file is present */}
              <a
                href="/cv.pdf"
                download="Farhanul_Haque_CV.pdf"
                className="btn-outline"
                aria-label="Download CV"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-7 flex items-center gap-4"
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#1e3a5f] transition-colors font-medium"
                aria-label="GitHub profile"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <span className="w-px h-4 bg-slate-200" aria-hidden="true" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#1e3a5f] transition-colors font-medium"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Profile Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border-2 border-dashed border-slate-200"
              />
              {/* Profile photo area */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-2xl overflow-hidden group"
              >
                <img
                  src="/profile.jpg"
                  alt="Farhanul Haque - Computer Science & Engineering Student"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden flex-col items-center justify-center w-full h-full text-slate-400 bg-slate-100">
                  <User size={56} strokeWidth={1} />
                  <span className="text-xs text-slate-400 text-center px-4 font-medium mt-2">
                    Farhanul Haque
                  </span>
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-3 -right-3 bg-[#1e3a5f] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
              >
                CSE Student
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => handleScroll('#about')}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-[#1e3a5f] transition-colors"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
