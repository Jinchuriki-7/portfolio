import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
  alternate?: boolean;
}

/**
 * SectionWrapper — consistent layout wrapper for every portfolio section.
 * Uses dark theme with alternating subtle background variations.
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
      className={`section-padding ${className}`}
      style={{
        backgroundColor: alternate ? 'var(--color-bg-secondary)' : 'transparent',
      }}
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
