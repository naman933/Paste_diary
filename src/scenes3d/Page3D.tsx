import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { SpringValue } from '@react-spring/three';
import * as THREE from 'three';
import { PageBody } from '../components/PageContent';
import type { PageSlot } from '../data/pages';

export const PAGE_W = 1.5;
export const PAGE_D = 2.15;
const CURL_SEGMENTS = 20;
const CURL_AMPLITUDE = 0.22;

const CONTENT_PX = { width: 300, height: 430 };

function htmlWrapperStyle(faceUp: boolean): React.CSSProperties {
  return {
    width: CONTENT_PX.width,
    height: CONTENT_PX.height,
    background: 'linear-gradient(135deg,#FDF8EE,#F8F0E0)',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transform: faceUp ? undefined : 'rotateY(180deg)',
    boxShadow: '0 2px 12px rgba(0,0,0,.15)',
    borderRadius: 2,
  };
}

// Lies the Html DOM content flat, facing up, matching a page lying on the table.
function PageContent3D({ slot, onPhoto, faceUp = true }: { slot: PageSlot; onPhoto: (src: string, caption: string) => void; faceUp?: boolean }) {
  return (
    <Html
      transform
      occlude={false}
      distanceFactor={1.08}
      position={[0, faceUp ? 0.004 : -0.004, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      style={{ pointerEvents: 'auto' }}
    >
      <div style={htmlWrapperStyle(faceUp)}>
        <PageBody slot={slot} onPhoto={onPhoto} />
      </div>
    </Html>
  );
}

// A static (non-flipping) page lying flat on the table, centered at localX = ±PAGE_W/2
// so it spans from the spine (world x=0) out to ±PAGE_W.
export function StaticPage({
  slot,
  side,
  onPhoto,
}: {
  slot: PageSlot;
  side: 'left' | 'right';
  onPhoto: (src: string, caption: string) => void;
}) {
  const x = side === 'left' ? -PAGE_W / 2 : PAGE_W / 2;
  return (
    <group position={[x, 0, 0]}>
      <mesh receiveShadow position={[0, -0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[PAGE_W, PAGE_D]} />
        <meshStandardMaterial color="#F8F0E0" roughness={0.95} />
      </mesh>
      <PageContent3D slot={slot} onPhoto={onPhoto} />
    </group>
  );
}

// The page currently mid-turn: pivots around the spine (world x=0) and bows
// outward mid-flip so it reads as paper curling rather than a rigid card flip.
export function FlippingPage({
  frontSlot,
  backSlot,
  direction,
  progress,
  onPhoto,
}: {
  frontSlot: PageSlot;
  backSlot: PageSlot;
  direction: 'next' | 'prev';
  progress: SpringValue<number>;
  onPhoto: (src: string, caption: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sign = direction === 'next' ? 1 : -1;

  // Geometry's local x=0 is the hinge (spine); it extends out to sign*PAGE_W, matching
  // where the corresponding static page (right for 'next', left for 'prev') sits.
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(PAGE_W, PAGE_D, CURL_SEGMENTS, 1);
    geo.rotateX(-Math.PI / 2);
    geo.translate((sign * PAGE_W) / 2, 0, 0);
    return geo;
  }, [sign]);

  const basePositions = useMemo(() => geometry.attributes.position.array.slice(), [geometry]);

  useFrame(() => {
    const t = progress.get();
    if (groupRef.current) groupRef.current.rotation.y = -sign * t * Math.PI;

    const posAttr = geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const bulge = Math.sin(Math.PI * t) * CURL_AMPLITUDE;
    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i] as number;
      const localX = Math.abs(bx) / PAGE_W; // 0 at the spine, 1 at the far edge
      arr[i + 1] = (basePositions[i + 1] as number) + Math.sin(Math.PI * localX) * bulge;
    }
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group ref={groupRef} position={[0, 0.012, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#F8F0E0" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <group position={[(sign * PAGE_W) / 2, 0.006, 0]}>
        <PageContent3D slot={frontSlot} onPhoto={onPhoto} faceUp={true} />
        <PageContent3D slot={backSlot} onPhoto={onPhoto} faceUp={false} />
      </group>
    </group>
  );
}
