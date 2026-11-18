import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
  alternate?: boolean; // slightly different background
}

/**
 * SectionWrapper — consistent layout wrapper for every portfolio section.
 * Provides scroll-margin, max-width centering, and entrance animation.
 */
export default function SectionWrapper({
  id,
  className = '',
  children,
  alternate = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`section-padding ${alternate ? 'bg-white' : 'bg-[#fafafa]'} ${className}`}
    >
      <motion.div
        className="section-container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
