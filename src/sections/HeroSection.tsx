import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown, User } from 'lucide-react';
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
            opacity: 0.5,
          }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-32 right-20 w-16 h-16 border rounded-xl hidden md:block"
          style={{ borderColor: 'var(--color-border)', opacity: 0.4 }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute bottom-40 right-40 w-10 h-10 rounded-full hidden md:block"
          style={{ background: 'var(--color-accent-soft)', opacity: 0.6 }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-48 left-16 w-6 h-6 rounded hidden md:block"
          style={{ background: 'var(--color-accent-glow)' }}
        />
      </div>

      <div className="section-container w-full pt-28 pb-16 md:pt-36 lg:pt-40">
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
              className="text-sm font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: 'var(--color-text-accent)' }}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mt-2 block"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Farhanul
              <br />
              <span className="text-gradient">Haque</span>
            </motion.h1>

            {/* Static subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-2 text-base font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Computer Science &amp; Engineering Student
            </motion.p>

            {/* Rotating title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 h-9 overflow-hidden"
            >
              <motion.p
                key={titleIdx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-bold"
                style={{ color: 'var(--color-text-accent)' }}
              >
                {ROTATING_TITLES[titleIdx]}
              </motion.p>
            </motion.div>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-5 text-base leading-relaxed max-w-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Passionate about{' '}
              <span style={{ color: 'var(--color-text-accent)' }} className="font-medium">
                software development
              </span>
              ,{' '}
              <span style={{ color: 'var(--color-text-accent)' }} className="font-medium">
                web development
              </span>
              , and{' '}
              <span style={{ color: 'var(--color-text-accent)' }} className="font-medium">
                artificial intelligence
              </span>
              . I enjoy solving complex problems and building meaningful digital experiences.
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
              <button onClick={() => handleScroll('#projects')} className="btn-primary">
                View Projects
              </button>
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
                className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="GitHub profile"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <span className="w-px h-4" style={{ background: 'var(--color-border)' }} aria-hidden="true" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Animated ring */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="absolute -inset-4 rounded-full"
                style={{
                  border: '2px dashed var(--color-border)',
                }}
              />
              {/* Glow effect */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-full blur-xl"
                style={{ background: 'var(--color-accent-glow)' }}
              />
              {/* Profile photo */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden group"
                style={{
                  border: '3px solid var(--color-accent)',
                  boxShadow: 'var(--shadow-glow-lg)',
                }}
              >
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
                <div
                  className="hidden flex-col items-center justify-center w-full h-full"
                  style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}
                >
                  <User size={56} strokeWidth={1} />
                  <span className="text-xs text-center px-4 font-medium mt-2">Farhanul Haque</span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))',
                  color: '#ffffff',
                }}
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
            className="flex flex-col items-center gap-2 transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
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
