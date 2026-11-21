import { useEffect, useRef } from 'react';

/**
 * AnimatedShaderBackground
 * World-class interactive algorithmic constellation & neural network canvas.
 * High-performance, clean, elegant, and perfectly balanced for both
 * Warm Ivory (Day) and Obsidian (Night) themes.
 */
export default function AnimatedShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position with smooth idle decay
    const mouse = { x: -1000, y: -1000, active: false };

    // Get current theme helper
    const isDark = () => {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    };

    // Responsive node count (lightweight, zero CPU strain)
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isAccent: boolean;
      pulse: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        isAccent: Math.random() > 0.65,
        pulse: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const maxDist = 125;
    const mouseRadius = 150;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();

      // Palette definitions matching Farhanul's design system
      const baseNodeColor = dark ? 'rgba(117, 162, 181,' : 'rgba(82, 127, 147,';
      const accentNodeColor = dark ? 'rgba(110, 231, 183,' : 'rgba(117, 162, 181,';
      const lineColor = dark ? 'rgba(117, 162, 181,' : 'rgba(82, 127, 147,';

      // 1. Draw subtle interactive mouse glow
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius * 1.5
        );
        glowGrad.addColorStop(0, dark ? 'rgba(117, 162, 181, 0.07)' : 'rgba(82, 127, 147, 0.04)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and draw nodes + connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Move node smoothly
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.pulse += n1.pulseSpeed;

        // Wrap around borders seamlessly
        if (n1.x < -10) n1.x = width + 10;
        if (n1.x > width + 10) n1.x = -10;
        if (n1.y < -10) n1.y = height + 10;
        if (n1.y > height + 10) n1.y = -10;

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (dark ? 0.22 : 0.16);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.y ? n2.x : n1.x, n2.y);
            ctx.strokeStyle = `${lineColor} ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect node to mouse cursor if nearby
        if (mouse.active) {
          const mdx = n1.x - mouse.x;
          const mdy = n1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const malpha = (1 - mdist / mouseRadius) * (dark ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${lineColor} ${malpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Very gentle, natural attraction toward cursor
            n1.x -= mdx * 0.006;
            n1.y -= mdy * 0.006;
          }
        }

        // Draw the node circle
        const dynamicAlpha = 0.45 + Math.sin(n1.pulse) * 0.25;
        const colorPrefix = n1.isAccent ? accentNodeColor : baseNodeColor;

        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix} ${dynamicAlpha * (dark ? 0.75 : 0.6)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Subtle, Minimal Architectural Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.20] [data-theme=dark]:opacity-[0.14] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 30%, black 20%, transparent 85%)',
        }}
      />

      {/* 2. Interactive Algorithmic Constellation & Neural Graph Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
