import type { CSSProperties } from 'react';
import type { Phase, FlipDirection } from '../types';
import { pages } from '../data/pages';
import { PageBody } from './PageContent';

const BW = 546;
const BH = 390;
const PW = 260;
const SPINE = 26;
const CLOSED_OFFSET_X = -100;

// The closed book only shows the cover (the right half of the container), so its
// visible center sits away from the container's own center by half the cover width.
// Exported so the desk CTA can align itself precisely under the closed diary.
export const closedDiaryCenterX = CLOSED_OFFSET_X + (PW + SPINE / 2) / 2;
export const closedDiaryBottomY = BH / 2;

// The desk's "open" zoom scales the whole scene, including the diary itself.
// Scale by however much keeps the open book at its original, comfortably-readable
// effective height (the 390px book at the old 1.8x zoom) regardless of BH here.
export const openZoomScale = (390 * 1.8) / BH;

interface DiaryBookProps {
  phase: Phase;
  currentSpread: number;
  flipping: boolean;
  flipDirection: FlipDirection;
  onPhoto: (src: string, caption: string) => void;
  onCoverFlipEnd: () => void;
  onPageFlipEnd: () => void;
}

const pageFace: CSSProperties = {
  background: 'linear-gradient(135deg,#FDF8EE,#F8F0E0)',
  overflow: 'hidden',
};

const FLIP_DURATION = '0.85s';
const FLIP_EASE = 'cubic-bezier(.45,.05,.55,.95)';

export function DiaryBook({
  phase,
  currentSpread,
  flipping,
  flipDirection,
  onPhoto,
  onCoverFlipEnd,
  onPageFlipEnd,
}: DiaryBookProps) {
  const coverFlipped = phase === 'opening' || phase === 'open';
  const offset = coverFlipped ? 0 : CLOSED_OFFSET_X;
  const spread = pages[currentSpread];

  const renderLeft = (s = spread) => <PageBody slot={s.left} onPhoto={onPhoto} />;
  const renderRight = (s = spread) => <PageBody slot={s.right} onPhoto={onPhoto} />;

  return (
    <div
      style={{
        position: 'absolute',
        top: '48%',
        left: '50%',
        transform: `translate(calc(-50% + ${offset}px), -50%)`,
        transition: 'transform 1.2s cubic-bezier(.4,0,.2,1)',
        width: BW,
        height: BH,
        perspective: 1800,
        zIndex: 2,
      }}
    >
      {/* Back cover shadow */}
      <div
        style={{
          position: 'absolute',
          left: 4,
          top: 6,
          width: BW - 8,
          height: BH - 4,
          background: 'linear-gradient(145deg,#3A1C10,#2C1408)',
          borderRadius: 6,
          boxShadow: '0 10px 40px rgba(0,0,0,.5)',
          opacity: coverFlipped ? 1 : 0,
          transition: 'opacity .6s',
        }}
      />

      {coverFlipped && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
          {/* Left page (current, or prev spread while flipping back) */}
          <div
            key="lp"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: PW,
              height: BH,
              ...pageFace,
              borderRadius: '6px 0 0 6px',
              boxShadow: 'inset -3px 0 10px rgba(0,0,0,.05)',
              zIndex: 2,
            }}
          >
            {flipping && flipDirection === 'prev' ? renderLeft(pages[Math.max(currentSpread - 1, 0)]) : renderLeft()}
          </div>

          {/* Right page (current, or next spread while flipping forward) */}
          <div
            key="rp"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: PW,
              height: BH,
              ...pageFace,
              borderRadius: '0 6px 6px 0',
              boxShadow: 'inset 3px 0 10px rgba(0,0,0,.05)',
              zIndex: 2,
            }}
          >
            {flipping && flipDirection === 'next' ? renderRight(pages[Math.min(currentSpread + 1, pages.length - 1)]) : renderRight()}
          </div>

          {/* Prev left page underneath, revealed as the flipping page rotates away */}
          {flipping && flipDirection === 'prev' && (
            <div
              key="lpu"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: PW,
                height: BH,
                ...pageFace,
                borderRadius: '6px 0 0 6px',
                zIndex: 1,
              }}
            >
              {renderLeft()}
            </div>
          )}

          {/* Flipping page */}
          {flipping && (() => {
            const isNext = flipDirection === 'next';
            const nextIdx = isNext ? Math.min(currentSpread + 1, pages.length - 1) : Math.max(currentSpread - 1, 0);
            const nextSpread = pages[nextIdx];
            return (
              <div
                key="flip"
                onAnimationEnd={(e) => {
                  // The shadow-overlay child has its own animation and animationend
                  // bubbles, so only react to the flip container's own animation ending.
                  if (e.target === e.currentTarget) onPageFlipEnd();
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: isNext ? PW + SPINE : 0,
                  width: PW,
                  height: BH,
                  transformStyle: 'preserve-3d',
                  transformOrigin: isNext ? 'left center' : 'right center',
                  animation: `${isNext ? 'page-flip-next' : 'page-flip-prev'} ${FLIP_DURATION} ${FLIP_EASE} forwards`,
                  zIndex: 15,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    ...pageFace,
                    borderRadius: isNext ? '0 6px 6px 0' : '6px 0 0 6px',
                    boxShadow: `inset ${isNext ? '3' : '-3'}px 0 10px rgba(0,0,0,.05)`,
                  }}
                >
                  {isNext ? renderRight() : renderLeft()}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    ...pageFace,
                    borderRadius: isNext ? '6px 0 0 6px' : '0 6px 6px 0',
                    boxShadow: `inset ${isNext ? '-3' : '3'}px 0 10px rgba(0,0,0,.05)`,
                  }}
                >
                  {isNext ? renderLeft(nextSpread) : renderRight(nextSpread)}
                </div>
                {/* Dynamic darkening as the page turns edge-on to the light, like real paper */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#000',
                    animation: `page-flip-shadow ${FLIP_DURATION} ${FLIP_EASE} forwards`,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    width: 40,
                    [isNext ? 'right' : 'left']: 0,
                    background: `linear-gradient(${isNext ? 'to left' : 'to right'}, rgba(0,0,0,.12), transparent)`,
                    pointerEvents: 'none',
                  } as CSSProperties}
                />
              </div>
            );
          })()}
        </div>
      )}

      {/* Spine */}
      {coverFlipped && (
        <div
          style={{
            position: 'absolute',
            left: PW,
            top: 0,
            width: SPINE,
            height: BH,
            background: 'linear-gradient(90deg,rgba(0,0,0,.12),rgba(0,0,0,.02),rgba(0,0,0,.12))',
            zIndex: 25,
            borderRadius: 1,
          }}
        />
      )}

      <Cover flipped={coverFlipped} onFlipEnd={onCoverFlipEnd} />
    </div>
  );
}

function Cover({ flipped, onFlipEnd }: { flipped: boolean; onFlipEnd: () => void }) {
  const coverW = PW + SPINE / 2;
  const corners: [number, number, 'top' | 'bottom', 'left' | 'right'][] = [
    [18, 18, 'top', 'left'],
    [18, 18, 'top', 'right'],
    [18, 18, 'bottom', 'left'],
    [18, 18, 'bottom', 'right'],
  ];
  return (
    <div
      onTransitionEnd={(e) => {
        if (e.propertyName === 'transform' && flipped) onFlipEnd();
      }}
      style={{
        position: 'absolute',
        left: PW + SPINE / 2,
        top: 0,
        width: coverW,
        height: BH,
        transformOrigin: 'left center',
        transformStyle: flipped ? 'preserve-3d' : 'flat',
        transform: flipped ? 'rotateY(-180deg)' : 'none',
        transition: flipped ? 'transform 1.3s cubic-bezier(.4,0,.2,1)' : 'none',
        zIndex: flipped ? 1 : 30,
      }}
    >
      {/* Front face: leather cover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(145deg,#6B3A2A,#4A2518,#3C1E12)',
          borderRadius: '0 12px 12px 0',
          boxShadow: '0 8px 30px rgba(0,0,0,.4)',
          border: '1px solid rgba(139,105,20,.15)',
        }}
      >
        <div style={{ position: 'absolute', inset: 16, border: '1px solid rgba(196,166,122,.2)', borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
          <div style={{ font: "700 11px 'Playfair Display', serif", color: '#C9A63A', letterSpacing: 5, textTransform: 'uppercase', textShadow: '0 1px 2px rgba(0,0,0,.5)' }}>
            The Book of
          </div>
          <div style={{ font: "700 38px 'DM Serif Display', serif", color: '#D4B06A', margin: '8px 0', textShadow: '0 2px 4px rgba(0,0,0,.4)' }}>Yash</div>
          <div style={{ width: 70, height: 1, background: 'linear-gradient(90deg,transparent,#C9A63A,transparent)', margin: '8px auto' }} />
          <div style={{ font: "11px 'Playfair Display', serif", color: '#B8963A', letterSpacing: 3 }}>EST. 2026</div>
        </div>
        {corners.map(([t, l, v, h], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              [v]: t,
              [h]: l,
              width: 22,
              height: 22,
              [`border${v.charAt(0).toUpperCase()}${v.slice(1)}`]: '1px solid rgba(196,166,122,.25)',
              [`border${h.charAt(0).toUpperCase()}${h.slice(1)}`]: '1px solid rgba(196,166,122,.25)',
            } as CSSProperties}
          />
        ))}
      </div>

      {/* Back face: inside cover */}
      {flipped && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg,#E8D5B8,#D4C0A0)',
            borderRadius: '12px 0 0 12px',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,.08)',
          }}
        >
          <div style={{ position: 'absolute', inset: 12, border: '1px solid rgba(139,105,20,.08)', borderRadius: 3 }} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              font: "16px 'Caveat', cursive",
              color: 'rgba(90,62,40,.25)',
              textAlign: 'center',
              whiteSpace: 'pre-line',
            }}
          >
            {'This diary belongs to\nYash Paste'}
          </div>
        </div>
      )}
    </div>
  );
}
