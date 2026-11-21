import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AnimatedShaderBackground
 * High-performance, slender WebGL dynamic aurora shader background.
 * Strictly bounded filaments that maintain an elegant, compact scale
 * and never expand into massive or obstructive shapes over time.
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

        #define NUM_OCTAVES 2

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.35;
          vec2 shift = vec2(50.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          // Normalized, aspect-corrected coordinates centered on screen
          vec2 uv = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;

          // Diagonal tilt matching the elegant aurora streak
          mat2 rot = mat2(0.866, -0.5, 0.5, 0.866);
          vec2 p = rot * uv * 3.5;

          vec3 col = vec3(0.0);

          // Slender, controlled filaments with bounded wave amplitude (keeps them thin and compact)
          for (float i = 0.0; i < 10.0; i++) {
            float t = iTime * 0.5 + i * 0.42;

            // Strictly bounded gentle sinusoidal wave (amplitude <= 0.35)
            float wave = sin(p.x * 1.4 + t) * 0.20 + cos(p.x * 2.6 - t * 0.7) * 0.10;
            wave += fbm(vec2(p.x * 0.7 + t * 0.25, i * 1.5)) * 0.15;

            // Distance to filament center line (controlled separation)
            float dist = abs(p.y - wave - (i - 5.0) * 0.14);

            // Quadratic dropoff keeps beam thin and tightly localized (no bloat or blob expansion)
            float beam = 0.010 / (dist * dist * 42.0 + 0.016);
            beam *= smoothstep(2.4, 0.4, abs(p.x)); // Softly taper at screen edges

            // Palette matching Dusty Blue (#75A2B5), Steel Blue (#527F93), Cyan & Mint
            vec3 auroraColor = mix(
              vec3(0.32, 0.55, 0.68), // Dusty Blue / Steel Blue
              vec3(0.24, 0.78, 0.72), // Cyan / Mint
              0.5 + 0.5 * sin(i * 0.55 + t * 0.4)
            );

            col += auroraColor * beam * 0.40;
          }

          // Tone curve to compress peak values
          col = col / (1.0 + col);

          // Alpha strictly derived from luminosity with a clean cutoff so no dark/grey smudges appear
          float brightness = max(col.r, max(col.g, col.b));
          float alpha = smoothstep(0.012, 0.60, brightness) * 0.70;

          gl_FragColor = vec4(col, alpha);
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
