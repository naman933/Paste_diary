interface NavigationProps {
  currentSpread: number;
  totalSpreads: number;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
}

const arrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  [side]: 24,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 15,
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(253,248,238,.85)',
  borderRadius: '50%',
  cursor: 'pointer',
  userSelect: 'none',
  backdropFilter: 'blur(6px)',
  font: "18px serif",
  color: 'rgba(90,62,40,.5)',
  boxShadow: '0 2px 10px rgba(0,0,0,.15)',
  border: '1px solid rgba(139,105,20,.1)',
});

export function Navigation({ currentSpread, totalSpreads, onPrev, onNext, onBack }: NavigationProps) {
  return (
    <>
      <div style={arrowStyle('left')} onClick={onPrev}>
        ←
      </div>
      <div style={arrowStyle('right')} onClick={onNext}>
        →
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          font: "12px 'Playfair Display', serif",
          color: 'rgba(90,62,40,.4)',
          letterSpacing: 1,
          padding: '6px 18px',
          background: 'rgba(253,248,238,.85)',
          borderRadius: 18,
          backdropFilter: 'blur(6px)',
        }}
      >
        Page {currentSpread + 1} of {totalSpreads}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 24,
          zIndex: 15,
          padding: '8px 18px',
          background: 'rgba(253,248,238,.85)',
          borderRadius: 18,
          font: "12px 'Playfair Display', serif",
          color: 'rgba(90,62,40,.5)',
          cursor: 'pointer',
          userSelect: 'none',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(139,105,20,.08)',
        }}
        onClick={onBack}
      >
        ← Back to Desk
      </div>
    </>
  );
}
