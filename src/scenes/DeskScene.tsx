import { useEffect, useRef, type ReactNode } from 'react';
import { DustMotes } from './DustMotes';

interface DeskSceneProps {
  parallax: boolean;
  children: ReactNode;
}

export function DeskScene({ parallax, children }: DeskSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty('--tilt-x', `${(-ny * 3).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(nx * 3).toFixed(2)}deg`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [parallax]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        transformStyle: 'preserve-3d',
        transform: parallax ? 'perspective(1400px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' : 'none',
        transition: 'transform .3s ease-out',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#3E2A1A 0%,#5C3D2E 25%,#4A3222 55%,#3A2618 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(88deg,transparent,transparent 22px,rgba(0,0,0,.05) 22px,rgba(0,0,0,.05) 23px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(91deg,transparent,transparent 45px,rgba(255,220,180,.025) 45px,rgba(255,220,180,.025) 46px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 15%, rgba(255,200,100,.12) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,.45) 100%)' }} />
      </div>
      {parallax && <DustMotes />}
      {children}
    </div>
  );
}
