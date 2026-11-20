import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
  alternate?: boolean;
}

export default function SectionWrapper({
  id,
  className = '',
  children,
  alternate = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`section-padding relative overflow-hidden ${
        alternate ? 'bg-slate-950/40' : 'bg-transparent'
      } ${className}`}
    >
      <motion.div
        className="section-container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
