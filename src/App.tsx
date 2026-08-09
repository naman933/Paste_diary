import { useCallback, useEffect, useState } from 'react';
import { DeskScene } from './scenes/DeskScene';
import { DeskItems } from './components/DeskItems';
import { DiaryBook } from './components/DiaryBook';
import { Navigation } from './components/Navigation';
import { Modal } from './components/Modal';
import { pages } from './data/pages';
import type { ModalState, Phase, FlipDirection } from './types';

export default function App() {
  const [phase, setPhase] = useState<Phase>('desk');
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<FlipDirection>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const openDiary = useCallback(() => {
    if (phase !== 'desk') return;
    setPhase('opening');
  }, [phase]);

  const onCoverFlipEnd = useCallback(() => setPhase('open'), []);

  const backToDesk = useCallback(() => {
    setPhase('desk');
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
      if (e.code === 'Space' && phase === 'desk') {
        e.preventDefault();
        openDiary();
      } else if (e.code === 'ArrowRight' && phase === 'open') {
        nextPage();
      } else if (e.code === 'ArrowLeft' && phase === 'open') {
        prevPage();
      } else if (e.code === 'Escape') {
        if (modal) setModal(null);
        else if (phase === 'open') backToDesk();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, modal, openDiary, nextPage, prevPage, backToDesk]);

  const isZoomed = phase === 'opening' || phase === 'open';

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#1a0f08', position: 'relative', fontFamily: "'Playfair Display', serif" }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '50% 48%',
          transition: 'transform 1.2s cubic-bezier(.4,0,.2,1)',
          willChange: 'transform',
          transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
        }}
      >
        <DeskScene parallax={phase === 'desk'}>
          <DeskItems
            onCamera={() => setModal({ type: 'camera' })}
            onCake={() => setModal({ type: 'cake' })}
            onSticky={() => setModal({ type: 'sticky' })}
            onPolaroid={(src, caption) => setModal({ type: 'photo', src, caption })}
          />
          <DiaryBook
            phase={phase}
            currentSpread={currentSpread}
            flipping={flipping}
            flipDirection={flipDirection}
            onPhoto={(src, caption) => setModal({ type: 'photo', src, caption })}
            onCoverFlipEnd={onCoverFlipEnd}
            onPageFlipEnd={onPageFlipEnd}
          />
        </DeskScene>
      </div>

      {isZoomed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 34% 42% at 50% 48%, transparent 0%, transparent 60%, rgba(10,5,2,.55) 100%)',
            pointerEvents: 'none',
            zIndex: 5,
            animation: 'fade-in .8s ease-out',
          }}
        />
      )}

      {phase === 'open' && (
        <Navigation currentSpread={currentSpread} totalSpreads={pages.length} onPrev={prevPage} onNext={nextPage} onBack={backToDesk} />
      )}

      {phase === 'desk' && (
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 24px',
            background: 'rgba(0,0,0,.5)',
            borderRadius: 28,
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(196,166,122,.2)',
            animation: 'float-y 2s ease-in-out infinite',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            openDiary();
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              border: '1.5px solid rgba(255,255,255,.6)',
              borderRadius: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              font: '10px system-ui',
              color: 'rgba(255,255,255,.6)',
            }}
          >
            ⎵
          </div>
          <span style={{ font: "13px 'Playfair Display', serif", color: 'rgba(255,255,255,.85)', letterSpacing: 1 }}>
            Press Space or Click to Open
          </span>
        </div>
      )}

      <Modal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
