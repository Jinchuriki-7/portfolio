import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AnimatedShaderBackground
 * High-performance WebGL shooting star / filament light trails.
 * Strictly bounded in length and width so they stay elegant, discrete,
 * and never expand or blob over time.
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

          // 38-degree diagonal tilt matching the shooting light streaks angle
          float ang = 0.66;
          mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
          vec2 p = rot * uv;

          vec3 col = vec3(0.0);
          float alpha = 0.0;

          // 16 discrete, slender shooting star filaments that stay strictly small and thin
          for (float i = 0.0; i < 16.0; i++) {
            // Pseudo-random fixed lane, speed, and length per streak
            float lane = (fract(sin(i * 12.9898 + 1.5) * 43758.5453) - 0.5) * 2.4;
            float speed = 0.28 + fract(sin(i * 78.233 + 3.7) * 43758.5453) * 0.32;
            float len = 0.16 + fract(sin(i * 45.164 + 7.1) * 43758.5453) * 0.20; // Strictly 80px - 150px length

            // Periodic progress along diagonal (glides smoothly across screen)
            float phase = fract(sin(i * 91.345 + 5.2) * 43758.5453);
            float progress = fract(iTime * speed * 0.22 + phase) * 4.0 - 2.0;

            float dx = p.x - progress;
            float dy = p.y - lane;

            // Only render within the short bounds of the streak (strictly small!)
            if (dx > 0.0 && dx < len) {
              // Softly tapering tail from bright head to fading tail
              float headGlow = exp(-dx * 60.0) * 0.4;
              float tailFade = pow(1.0 - (dx / len), 2.0);

              // Razor-thin width (2 - 3 pixels wide)
              float core = exp(-abs(dy) * 400.0);
              float halo = exp(-abs(dy) * 80.0) * 0.30;

              float intensity = (core + halo) * (tailFade + headGlow);

              // Authentic colors matching screenshot: Cyan, Mint Green, Lavender Purple, Dusty Blue
              vec3 streakColor;
              float colIdx = mod(i, 4.0);
              if (colIdx < 1.0) {
                streakColor = vec3(0.25, 0.88, 0.95); // Cyan
              } else if (colIdx < 2.0) {
                streakColor = vec3(0.38, 0.92, 0.65); // Mint Green
              } else if (colIdx < 3.0) {
                streakColor = vec3(0.70, 0.55, 0.98); // Lavender / Violet
              } else {
                streakColor = vec3(0.46, 0.68, 0.88); // Dusty / Steel Blue
              }

              col += streakColor * intensity;
              alpha += intensity * 0.90;
            }
          }

          // Ambient subtle background light filament
          float ambient = exp(-abs(p.y - 0.25) * 12.0) * 0.05;
          col += vec3(0.35, 0.55, 0.68) * ambient;
          alpha += ambient * 0.4;

          alpha = clamp(alpha, 0.0, 0.85);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
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
