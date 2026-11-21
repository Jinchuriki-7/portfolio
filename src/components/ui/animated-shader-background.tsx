import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedShaderBackground
 * High-performance, native WebGL dynamic aurora shader background.
 * Renders elegant, flowing, slender aurora filaments with soft translucent
 * ribbons, subtle luminous highlights, and minimal floating light particles.
 * 
 * Strict mathematically bounded wave functions ensure filaments remain
 * permanently slender and compact without blob expansion.
 */
export default function AnimatedShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize WebGL context
    const gl = (
      canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      }) ||
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Vertex Shader: Fullscreen triangle/quad
    const vertexSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Slender, flowing aurora ribbons matching reference design
    const fragmentSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_dark;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        // Aspect-corrected UV space centered on screen
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

        // Slow, serene time scale
        float t = u_time * 0.16;

        vec3 accumColor = vec3(0.0);
        float accumAlpha = 0.0;

        // Portfolio color palette
        vec3 c_primary = vec3(0.459, 0.635, 0.710);    // #75A2B5
        vec3 c_darkAccent = vec3(0.322, 0.498, 0.576); // #527F93
        vec3 c_softCyan = vec3(0.725, 0.867, 0.898);   // #B9DDE5
        vec3 c_lightBlue = vec3(0.863, 0.918, 0.941);  // #DCEAF0
        vec3 c_white = vec3(1.0, 1.0, 1.0);

        // 4 layered, flowing slender aurora filaments
        for (float i = 0.0; i < 4.0; i++) {
          float layerTime = t * (0.85 + i * 0.18) + i * 1.57;

          // Mid-hero baseline vertical offset
          float baseY = (i - 1.5) * 0.08 - 0.02;

          // Mathematically bounded gentle wave equation (amplitude strictly <= 0.15)
          float wave = sin(uv.x * 2.2 + layerTime * 1.1) * 0.085
                     + cos(uv.x * 3.8 - layerTime * 0.7) * 0.045
                     + sin(uv.x * 5.4 + layerTime * 1.8) * 0.020;

          // Gentle organic undulation via lightweight noise
          float n = noise(vec2(uv.x * 2.5 + layerTime * 0.5, i * 3.2)) * 0.035;

          float waveY = baseY + wave + n;

          // Vertical distance to wave center line
          float dist = uv.y - waveY;

          // 1. Slender luminous crest highlight line
          float crest = exp(-abs(dist) * 95.0);

          // 2. Translucent flowing ribbon veil (strictly localized)
          float bodySpread = mix(35.0, 55.0, mod(i, 2.0));
          float body = exp(-dist * dist * bodySpread) * smoothstep(0.22, -0.05, dist);

          // Soft edge taper across horizontal bounds
          float xFade = smoothstep(1.4 * (u_resolution.x / u_resolution.y), 0.25, abs(uv.x));

          // Harmonious gradient across the filament
          float colorShift = 0.5 + 0.5 * sin(uv.x * 1.8 + layerTime + i * 1.2);
          vec3 ribbonBody = mix(c_darkAccent, c_primary, colorShift);
          vec3 ribbonCrest = mix(c_softCyan, c_white, 0.5 + 0.5 * cos(uv.x * 2.5 - layerTime));

          vec3 layerColor = mix(ribbonBody, ribbonCrest, crest * 0.82);
          float layerIntensity = (crest * 0.85 + body * 0.38) * xFade;

          accumColor += layerColor * layerIntensity;
          accumAlpha += layerIntensity;
        }

        // Minimal floating starlight particles (8 subtle glowing specks)
        for (float p = 0.0; p < 8.0; p++) {
          float pSpeed = 0.035 + fract(sin(p * 45.1) * 43758.5) * 0.03;
          vec2 pPos = vec2(
            (fract(sin(p * 12.3) * 43758.5) - 0.5) * 2.2 * (u_resolution.x / u_resolution.y),
            fract(sin(p * 67.8) * 43758.5 - t * pSpeed) * 1.6 - 0.8
          );

          float pDist = length(uv - pPos);
          float pGlow = exp(-pDist * 140.0) * (0.5 + 0.5 * sin(t * 3.0 + p * 2.5));

          accumColor += mix(c_lightBlue, c_white, 0.6) * pGlow * 0.45;
          accumAlpha += pGlow * 0.35;
        }

        // Soft tone curve
        accumColor = accumColor / (1.0 + accumColor * 0.35);

        // Day Mode (Warm Ivory) vs Night Mode (Dark Charcoal) balance:
        // Day mode preserves ivory background with delicate translucency
        // Night mode provides rich, cinematic aurora luminosity
        float targetAlpha = mix(0.40, 0.70, u_dark);
        float finalAlpha = clamp(accumAlpha * targetAlpha, 0.0, targetAlpha);

        gl_FragColor = vec4(accumColor, finalAlpha);
      }
    `;

    // Shader compilation utility
    function compileShader(type: number, source: string): WebGLShader | null {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uDark = gl.getUniformLocation(program, 'u_dark');

    // Viewport & DPR Sizing
    const resize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uResolution) {
        gl.uniform2f(uResolution, canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Track Theme changes (Day Mode vs Night Mode)
    let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const updateThemeUniform = () => {
      isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (uDark && gl) {
        gl.uniform1f(uDark, isDark ? 1.0 : 0.0);
      }
    };
    updateThemeUniform();

    const themeObserver = new MutationObserver(() => {
      updateThemeUniform();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Animation Render Loop
    let animationFrameId: number;
    let startTime = performance.now();

    const render = (now: number) => {
      if (!gl || !program) return;

      const elapsed = prefersReducedMotion ? 10.0 : (now - startTime) * 0.001;

      // Bound time smoothly using modulo to prevent precision artifacts
      const boundedTime = elapsed % 628.3185;

      if (uTime) {
        gl.uniform1f(uTime, boundedTime);
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      themeObserver.disconnect();

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Subtle Developer Technical Grid Pattern (Faded Vignette) */}
      <div
        className="absolute inset-0 opacity-[0.20] [data-theme=dark]:opacity-[0.14] transition-opacity duration-500"
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

      {/* 2. WebGL Dynamic Aurora Filaments Canvas */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      ) : (
        /* Graceful CSS Fallback when WebGL is unavailable */
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(117,162,181,0.22),transparent)]" />
      )}
    </div>
  );
}
