import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AnimatedShaderBackground
 * High-performance, slender WebGL dynamic aurora light streaks.
 * Razor-thin luminous filaments with zero background grey halos or capsule bodies.
 */
export default function AnimatedShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        void main() {
          // Normalized, aspect-corrected coordinates centered on screen
          vec2 uv = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;

          // Diagonal tilt (-32 degrees)
          float angle = -0.55;
          mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
          vec2 p = rot * uv * 2.8;

          vec3 finalColor = vec3(0.0);
          float finalAlpha = 0.0;

          // Render 4 slender, delicate, glowing light filaments - NO grey capsule body
          for (float i = 0.0; i < 4.0; i++) {
            float t = iTime * 0.45 + i * 1.57;

            // Gentle sinusoidal undulation with small, strictly bounded amplitude
            float wave = sin(p.x * 1.8 + t) * 0.12 + cos(p.x * 3.2 - t * 0.7) * 0.06;

            // Controlled separation between filaments
            float yPos = wave + (i - 1.5) * 0.38;

            // Distance to filament center line
            float dist = abs(p.y - yPos);

            // Razor-thin core with steep quadratic dropoff - completely transparent beyond 3-4px
            float core = 0.0035 / (dist * dist * 450.0 + 0.0035);

            // Soft longitudinal fade at screen edges
            float endFade = smoothstep(2.6, 0.8, abs(p.x));
            core *= endFade;

            // Distinct vibrant neon colors matching Farhanul's signature palette
            vec3 streakColor;
            if (i < 1.0) {
              streakColor = vec3(0.22, 0.75, 0.85); // Bright Cyan / Steel Blue
            } else if (i < 2.0) {
              streakColor = vec3(0.30, 0.85, 0.65); // Neon Mint / Emerald
            } else if (i < 3.0) {
              streakColor = vec3(0.46, 0.64, 0.95); // Dusty Blue
            } else {
              streakColor = vec3(0.65, 0.55, 0.95); // Subtle Lavender / Violet
            }

            finalColor += streakColor * core;
            finalAlpha += core * 0.85;
          }

          // Strict clamping - alpha is 0.0 everywhere except directly on the thin beams
          finalAlpha = clamp(finalAlpha, 0.0, 0.95);

          // Tone map color to prevent over-saturation
          finalColor = finalColor / (1.0 + finalColor);

          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      // Bounded periodic time to eliminate any floating-point precision loss over long durations
      material.uniforms.iTime.value = (performance.now() * 0.001) % 628.3185;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none shader-container overflow-hidden"
    />
  );
}
