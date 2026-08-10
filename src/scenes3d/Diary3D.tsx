import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { pages } from '../data/pages';
import { StaticPage, FlippingPage, PAGE_W, PAGE_D } from './Page3D';
import type { Phase, FlipDirection } from '../types';

const BOOK_THICKNESS = 0.22;

interface Diary3DProps {
  phase: Phase;
  currentSpread: number;
  flipping: boolean;
  flipDirection: FlipDirection;
  onPhoto: (src: string, caption: string) => void;
  onCoverFlipEnd: () => void;
  onPageFlipEnd: () => void;
}

export function Diary3D({
  phase,
  currentSpread,
  flipping,
  flipDirection,
  onPhoto,
  onCoverFlipEnd,
  onPageFlipEnd,
}: Diary3DProps) {
  const coverOpen = phase === 'opening' || phase === 'open';
  const openingRef = useRef(false);
  useEffect(() => {
    if (phase === 'opening') openingRef.current = true;
  }, [phase]);

  const { spineX, coverAngle } = useSpring({
    spineX: coverOpen ? 0 : -PAGE_W / 2,
    coverAngle: coverOpen ? Math.PI : 0,
    config: { duration: 1200 },
    onRest: () => {
      if (openingRef.current) {
        openingRef.current = false;
        onCoverFlipEnd();
      }
    },
  });

  const flipStartedRef = useRef(false);
  const [{ flipT }, flipApi] = useSpring(() => ({ flipT: 0, config: { duration: 750 } }));
  useEffect(() => {
    if (flipping) {
      flipStartedRef.current = true;
      flipApi.start({
        from: { flipT: 0 },
        to: { flipT: 1 },
        onRest: () => {
          if (flipStartedRef.current) {
            flipStartedRef.current = false;
            onPageFlipEnd();
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipping]);

  const spread = pages[currentSpread];
  const isOpenSettled = phase === 'open';

  return (
    <animated.group position-x={spineX} position-y={0} position-z={0}>
      {/* Pages block */}
      <mesh position={[PAGE_W / 2, (BOOK_THICKNESS - 0.04) / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[PAGE_W, BOOK_THICKNESS - 0.04, PAGE_D]} />
        <meshStandardMaterial color="#EFE6D2" roughness={0.9} />
      </mesh>

      {isOpenSettled && !flipping && (
        <group position={[0, BOOK_THICKNESS - 0.03, 0]}>
          <StaticPage slot={spread.left} side="left" onPhoto={onPhoto} />
          <StaticPage slot={spread.right} side="right" onPhoto={onPhoto} />
        </group>
      )}

      {isOpenSettled &&
        flipping &&
        flipDirection &&
        (() => {
          const isNext = flipDirection === 'next';
          const nextIdx = isNext ? Math.min(currentSpread + 1, pages.length - 1) : Math.max(currentSpread - 1, 0);
          const nextSpread = pages[nextIdx];
          return (
            <group position={[0, BOOK_THICKNESS - 0.03, 0]}>
              <StaticPage slot={isNext ? spread.left : nextSpread.left} side="left" onPhoto={onPhoto} />
              <StaticPage slot={isNext ? nextSpread.right : spread.right} side="right" onPhoto={onPhoto} />
              <FlippingPage
                frontSlot={isNext ? spread.right : spread.left}
                backSlot={isNext ? nextSpread.left : nextSpread.right}
                direction={flipDirection}
                progress={flipT}
                onPhoto={onPhoto}
              />
            </group>
          );
        })()}

      {/* Cover, hinged at the spine (local x = 0) */}
      <animated.group rotation-z={coverAngle}>
        <mesh position={[PAGE_W / 2, BOOK_THICKNESS - 0.01, 0]} castShadow receiveShadow>
          <boxGeometry args={[PAGE_W, 0.04, PAGE_D]} />
          <meshStandardMaterial color="#4A2518" roughness={0.55} metalness={0.1} />
        </mesh>
      </animated.group>
    </animated.group>
  );
}
