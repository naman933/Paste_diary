import { useCallback, useEffect, useState } from 'react';
import { Experience } from './scenes3d/Experience';
import { Navigation } from './components/Navigation';
import { Modal } from './components/Modal';
import { pages } from './data/pages';
import type { ModalState, Phase, FlipDirection } from './types';

export default function App() {
  const [phase, setPhase] = useState<Phase>('dark');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<FlipDirection>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const lightUp = useCallback(() => {
    if (phase !== 'dark') return;
    setPhase('lit');
  }, [phase]);

  const openDiary = useCallback(() => {
    if (phase !== 'lit') return;
    setPhase('opening');
  }, [phase]);

  const onCoverFlipEnd = useCallback(() => setPhase((p) => (p === 'opening' ? 'open' : p)), []);

  const backToDesk = useCallback(() => {
    setPhase('lit');
    setCurrentSpread(0);
    setModal(null);
    setFlipping(false);
    setFlipDirection(null);
  }, []);

  const nextPage = useCallback(() => {
    if (flipping || currentSpread >= pages.length - 1) return;
    setFlipDirection('next');
    setFlipping(true);
  }, [flipping, currentSpread]);

  const prevPage = useCallback(() => {
    if (flipping || currentSpread <= 0) return;
    setFlipDirection('prev');
    setFlipping(true);
  }, [flipping, currentSpread]);

  const onPageFlipEnd = useCallback(() => {
    setCurrentSpread((s) => {
      if (flipDirection === 'next') return Math.min(s + 1, pages.length - 1);
      if (flipDirection === 'prev') return Math.max(s - 1, 0);
      return s;
    });
    setFlipping(false);
    setFlipDirection(null);
  }, [flipDirection]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && phase === 'dark') {
        e.preventDefault();
        lightUp();
      } else if (e.code === 'Space' && phase === 'lit') {
        e.preventDefault();
        openDiary();
      } else if (e.code === 'ArrowRight' && phase === 'open') {
        nextPage();
      } else if (e.code === 'ArrowLeft' && phase === 'open') {
        prevPage();
      } else if (e.code === 'Escape') {
        if (modal) setModal(null);
        else if (phase === 'open' || phase === 'opening') backToDesk();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, modal, lightUp, openDiary, nextPage, prevPage, backToDesk]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0503', position: 'relative', fontFamily: "'Playfair Display', serif" }}>
      <Experience
        phase={phase}
        currentSpread={currentSpread}
        flipping={flipping}
        flipDirection={flipDirection}
        onPhoto={(src, caption) => setModal({ type: 'photo', src, caption })}
        onCoverFlipEnd={onCoverFlipEnd}
        onPageFlipEnd={onPageFlipEnd}
        onSticky={() => setModal({ type: 'sticky' })}
      />

      {phase === 'open' && (
        <Navigation currentSpread={currentSpread} totalSpreads={pages.length} onPrev={prevPage} onNext={nextPage} onBack={backToDesk} />
      )}

      {(phase === 'dark' || phase === 'lit') && (
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            cursor: 'pointer',
            animation: 'pulse-fade 3.5s ease-in-out infinite',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (phase === 'dark') lightUp();
            else openDiary();
          }}
        >
          <span
            style={{
              font: "13px 'Playfair Display', serif",
              color: 'rgba(255,255,255,.6)',
              letterSpacing: 2,
              textShadow: '0 2px 10px rgba(0,0,0,.8)',
              whiteSpace: 'nowrap',
            }}
          >
            {phase === 'dark' ? 'Press Space to light up' : 'Press Space to open the diary'}
          </span>
        </div>
      )}

      <Modal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
