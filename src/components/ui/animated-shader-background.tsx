import { useEffect, useState } from 'react';

/**
 * AnimatedShaderBackground
 * High-performance, modern software engineer ambient background.
 * Combines subtle technical grid, elegant dot matrix, breathing
 * aurora blooms, and interactive cursor spotlight.
 */
export default function AnimatedShaderBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Subtle Developer Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.25] [data-theme=dark]:opacity-[0.18] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 20%, transparent 85%)',
        }}
      />

      {/* 2. Delicate Dot Matrix Nodes at Grid Intersections */}
      <div
        className="absolute inset-0 opacity-[0.18] [data-theme=dark]:opacity-[0.14] transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 25%, transparent 80%)',
        }}
      />

      {/* 3. Floating Ambient Aurora Glow Blooms (Soft, Subtle & Never Overpowering) */}
      <div className="absolute top-[-8%] left-[-5%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-[#75A2B5]/[0.07] [data-theme=dark]:bg-[#75A2B5]/[0.14] blur-[120px] animate-ambient-drift-1" />
      <div className="absolute top-[18%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#527F93]/[0.06] [data-theme=dark]:bg-[#527F93]/[0.12] blur-[130px] animate-ambient-drift-2" />
      <div className="absolute top-[52%] left-[8%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#75A2B5]/[0.05] [data-theme=dark]:bg-[#38BDF8]/[0.08] blur-[115px] animate-ambient-drift-3" />

      {/* 4. Interactive Spotlight Cursor Follow (Subtle) */}
      <div
        className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-500 blur-[90px]"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          opacity: mousePos.x > 0 ? 0.05 : 0,
        }}
      />
    </div>
  );
}
