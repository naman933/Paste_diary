import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 60;

function Motes() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // Concentrate motes near the top-left lamp glow (in NDC-ish space, -1..1)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.9;
      positions[i * 3] = -0.55 + Math.cos(angle) * radius * 0.5;
      positions[i * 3 + 1] = 0.55 + Math.sin(angle) * radius * 0.35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      speeds[i] = 0.03 + Math.random() * 0.06;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, []);

  useFrame((state) => {
    const geom = pointsRef.current?.geometry;
    if (!geom) return;
    const arr = geom.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.004;
      arr[i * 3] += Math.sin(t * 0.4 + phases[i]) * 0.0006;
      if (arr[i * 3 + 1] > 1.1) {
        arr[i * 3 + 1] = -0.2;
      }
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffd9a0"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function DustMotes() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <Motes />
      </Canvas>
    </div>
  );
}
