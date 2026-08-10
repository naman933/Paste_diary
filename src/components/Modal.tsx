import { motion, AnimatePresence } from 'framer-motion';
import type { ModalState } from '../types';
import { cameraEasterEggPhoto, groupPhoto } from '../data/photos';

const card = {
  background: '#FDF8EE',
  borderRadius: 12,
  padding: 32,
  maxWidth: 320,
  textAlign: 'center' as const,
  cursor: 'default' as const,
  boxShadow: '0 20px 60px rgba(0,0,0,.3)',
};

export function Modal({ modal, onClose }: { modal: ModalState; onClose: () => void }) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        >
          <ModalBody modal={modal} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalBody({ modal }: { modal: NonNullable<ModalState> }) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  if (modal.type === 'camera') {
    return (
      <div style={{ ...card, maxWidth: 340 }} onClick={stop}>
        <div style={{ font: "700 24px 'DM Serif Display', serif", color: '#3C2415', marginBottom: 12 }}>📸 Say Cheese!</div>
        <div style={{ font: "16px 'Caveat', cursive", color: '#5A3E28', lineHeight: 1.6, marginBottom: 12 }}>
          This polaroid camera has captured every embarrassing moment. Here's exhibit A.
        </div>
        <img
          src={cameraEasterEggPhoto}
          alt="exhibit A"
          style={{ width: '100%', borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,.2)' }}
        />
        <div style={{ font: "13px 'Caveat', cursive", color: 'rgba(90,62,40,.4)', marginTop: 12 }}>(click anywhere to close)</div>
      </div>
    );
  }

  if (modal.type === 'cake') {
    return (
      <div style={{ ...card, maxWidth: 340 }} onClick={stop}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎂</div>
        <div style={{ font: "700 24px 'DM Serif Display', serif", color: '#3C2415', marginBottom: 12 }}>Make a Wish!</div>
        <div style={{ font: "18px/1.6 'Caveat', cursive", color: '#5A3E28', whiteSpace: 'pre-wrap' }}>
          {'Happy Birthday Yash! 🎉\n\nBlow out the candles and make it a good one. You deserve it.'}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ fontSize: 24, display: 'inline-block', animation: `wiggle .5s ease-in-out ${i * 0.2}s infinite` }}>
              🕯️
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (modal.type === 'sticky') {
    return (
      <div
        style={{
          background: 'linear-gradient(145deg,#FFEAA7,#F9D96C)',
          borderRadius: 4,
          padding: 16,
          maxWidth: 340,
          cursor: 'default',
          boxShadow: '0 20px 60px rgba(0,0,0,.3)',
          transform: 'rotate(-2deg)',
        }}
        onClick={stop}
      >
        <img
          src={groupPhoto}
          alt="the whole squad"
          style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover', display: 'block', borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,.2)' }}
        />
        <div style={{ font: "700 24px 'Caveat', cursive", color: '#8B6914', textAlign: 'center', marginTop: 14 }}>
          We all love you Paste!!! ❤️
        </div>
      </div>
    );
  }

  if (modal.type === 'photo') {
    return (
      <div
        style={{
          background: '#F8F3E8',
          padding: '18px 18px 52px',
          width: 'fit-content',
          maxWidth: '94vw',
          maxHeight: '94vh',
          boxShadow: '0 30px 80px rgba(0,0,0,.4)',
          cursor: 'default',
        }}
        onClick={stop}
      >
        <img
          src={modal.src}
          alt={modal.caption}
          style={{ display: 'block', maxWidth: '88vw', maxHeight: '82vh', width: 'auto', height: 'auto', objectFit: 'contain' }}
        />
        <div style={{ font: "20px 'Caveat', cursive", color: 'rgba(90,62,40,.6)', marginTop: 16, textAlign: 'center' }}>
          {modal.caption}
        </div>
      </div>
    );
  }

  return null;
}
