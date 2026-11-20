import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt interactive physics from rahat300809 UI
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 2800);
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
      {/* Background Emerald / Cyan Glow Blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"
      />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Mobile Profile Image (circular with glass) */}
          <div className="flex justify-center lg:hidden">
            <div className="relative">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden glass border border-white/15 shadow-xl shadow-emerald-500/15">
                <img
                  src="/profile.jpg"
                  alt="Farhanul Haque"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden flex-col items-center justify-center w-full h-full text-slate-400 bg-slate-900">
                  <User size={40} />
                </div>
              </div>
              <div className="absolute -bottom-2 right-2 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md">
                CSE Student
              </div>
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Opportunities Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-5 border border-emerald-500/20">
              Available for new opportunities
            </span>

            {/* Main Greeting + Name with Emerald-to-Cyan Gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 tracking-tight leading-tight text-white">
              Hi, I am <span className="text-gradient">Farhanul Haque</span>
            </h1>

            {/* Static Subtitle */}
            <p className="text-base sm:text-lg text-slate-400 font-medium mb-2">
              Computer Science &amp; Engineering Student
            </p>

            {/* Animated Rotating Role */}
            <div className="h-9 mb-4 overflow-hidden flex items-center justify-center lg:justify-start">
              <motion.p
                key={titleIdx}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl sm:text-2xl font-display font-bold text-emerald-400"
              >
                {ROTATING_TITLES[titleIdx]}
              </motion.p>
            </div>

            {/* Bio description */}
            <p className="text-sm sm:text-base text-slate-400 mb-7 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Passionate about software development, web technologies, and artificial intelligence.
              I enjoy solving complex algorithmic challenges and building impactful, production-grade applications.
            </p>

            {/* Interest pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
              {personalInfo.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={() => handleScroll('#projects')}
                className="btn-primary"
              >
                View Projects <ArrowRight size={16} />
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
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-5 text-slate-400">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium"
                aria-label="GitHub Profile"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Desktop 3D Tilt Card (rahat300809 signature style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
          >
            {/* Tilt Container */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative z-10 w-full max-w-md mx-auto aspect-[4/5] rounded-[2rem] overflow-hidden glass border-white/15 shadow-2xl"
            >
              <img
                src="/profile.jpg"
                alt="Farhanul Haque"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div
                className="hidden flex-col items-center justify-center w-full h-full text-slate-400 bg-slate-900"
              >
                <User size={64} />
                <span className="text-sm font-semibold mt-3 text-slate-300">Farhanul Haque</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* In-Card Floating Student Badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div>
                  <p className="text-white font-display font-bold text-lg">Farhanul Haque</p>
                  <p className="text-emerald-400 text-xs font-semibold">CSE Undergraduate @ DIU</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  Active
                </span>
              </div>
            </motion.div>

            {/* Glowing Ambient Behind Card */}
            <motion.div
              style={{ x: shadowX, y: shadowY, scale: 0.95 }}
              className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-[2rem] -z-10"
            />
            <div className="absolute -top-6 -right-6 w-36 h-36 bg-emerald-500/25 blur-3xl rounded-full -z-10" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-cyan-500/25 blur-3xl rounded-full -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
