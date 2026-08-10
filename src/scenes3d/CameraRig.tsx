import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
import type { Phase } from '../types';

const ANGLED = { pos: [0, 5.3, 6.4] as [number, number, number], target: [0, 0.4, -0.6] as [number, number, number] };
const TOP_DOWN = { pos: [0, 7.2, 0.25] as [number, number, number], target: [0, 0, 0] as [number, number, number] };

export function CameraRig({ phase }: { phase: Phase }) {
  const { camera } = useThree();
  const isOpen = phase === 'opening' || phase === 'open';
  const preset = isOpen ? TOP_DOWN : ANGLED;

  const { pos, target } = useSpring({
    pos: preset.pos,
    target: preset.target,
    config: { mass: 1, tension: 90, friction: 32 },
  });

  const currentTarget = useRef(new THREE.Vector3(...ANGLED.target));

  useFrame(() => {
    const p = pos.get();
    camera.position.set(p[0], p[1], p[2]);
    const t = target.get();
    currentTarget.current.set(t[0], t[1], t[2]);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
