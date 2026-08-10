import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Table } from './Table';
import { Board } from './Board';
import { TubeLight } from './TubeLight';
import { Diary3D } from './Diary3D';
import { CameraRig } from './CameraRig';
import type { Phase, FlipDirection } from '../types';

interface ExperienceProps {
  phase: Phase;
  currentSpread: number;
  flipping: boolean;
  flipDirection: FlipDirection;
  onPhoto: (src: string, caption: string) => void;
  onCoverFlipEnd: () => void;
  onPageFlipEnd: () => void;
  onSticky: () => void;
}

function Lighting({ phase }: { phase: Phase }) {
  const lit = phase !== 'dark';
  const { warmth } = useSpring({ warmth: lit ? 1 : 0, config: { duration: 900 } });
  return (
    <>
      <animated.ambientLight intensity={warmth.to((v) => 0.15 + v * 0.35)} color="#fff4d8" />
      <TubeLight intensity={warmth} />
      {/* Faint cool fill so the dark state isn't pure black */}
      <pointLight position={[-2, 2, 3]} intensity={0.4} color="#5a6a8a" distance={8} />
    </>
  );
}

export function Experience({
  phase,
  currentSpread,
  flipping,
  flipDirection,
  onPhoto,
  onCoverFlipEnd,
  onPageFlipEnd,
  onSticky,
}: ExperienceProps) {
  return (
    <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true }}>
      <CameraRig phase={phase} />
      <Lighting phase={phase} />
      <Suspense fallback={null}>
        <Table />
        <Board onSticky={onSticky} onPhoto={onPhoto} />
        <Diary3D
          phase={phase}
          currentSpread={currentSpread}
          flipping={flipping}
          flipDirection={flipDirection}
          onPhoto={onPhoto}
          onCoverFlipEnd={onCoverFlipEnd}
          onPageFlipEnd={onPageFlipEnd}
        />
      </Suspense>
    </Canvas>
  );
}
