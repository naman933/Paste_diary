import { useCallback, useEffect, useState } from 'react';
import { DeskScene } from './scenes/DeskScene';
import { DeskItems } from './components/DeskItems';
import { DiaryBook, closedDiaryCenterX, closedDiaryBottomY, openZoomScale } from './components/DiaryBook';
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
          transform: isZoomed ? `scale(${openZoomScale})` : 'scale(1)',
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
            top: `calc(48% + ${closedDiaryBottomY + 20}px)`,
            left: `calc(50% + ${closedDiaryCenterX}px)`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            cursor: 'pointer',
            animation: 'pulse-fade 3.5s ease-in-out infinite',
          }}
          onClick={(e) => {
            e.stopPropagation();
            openDiary();
          }}
        >
          <span
            style={{
              font: "13px 'Playfair Display', serif",
              color: 'rgba(255,255,255,.55)',
              letterSpacing: 2,
              textShadow: '0 2px 10px rgba(0,0,0,.7)',
              whiteSpace: 'nowrap',
            }}
          >
            Press Space or Click to Open
          </span>
        </div>
      )}

      <Modal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
