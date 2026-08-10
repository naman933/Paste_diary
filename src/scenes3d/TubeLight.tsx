import { animated } from '@react-spring/three';

// A fixture mounted above the board, plus the actual light it casts.
// `intensity` is a 0..1 spring value driving both the emissive glow and the real light.
export function TubeLight({ intensity }: { intensity: import('@react-spring/three').SpringValue<number> }) {
  return (
    <group position={[0, 3.6, -1.6]}>
      {/* Fixture housing */}
      <mesh castShadow>
        <boxGeometry args={[3.2, 0.12, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* The tube itself, glows on */}
      <animated.mesh position={[0, -0.09, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 12]} />
        <animated.meshStandardMaterial
          color="#fff8e0"
          emissive="#fff2c0"
          emissiveIntensity={intensity.to((v) => v * 2.2)}
          roughness={0.4}
        />
      </animated.mesh>
      <animated.pointLight
        position={[0, -0.4, 0.6]}
        color="#ffe9b0"
        intensity={intensity.to((v) => v * 12)}
        distance={9}
        decay={2}
        castShadow
      />
    </group>
  );
}
