import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/personalInfo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div>
            <p className="font-bold text-lg tracking-tight">
              Farhanul<span className="text-blue-300">.</span>
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Computer Science &amp; Engineering Student
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/10 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-sm">
            &copy; {year} Farhanul Haque. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Built with <Heart size={13} className="text-red-400 fill-red-400" /> using React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
