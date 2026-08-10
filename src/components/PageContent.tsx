import type { CSSProperties } from 'react';
import type { PageSlot } from '../data/pages';
import { childhoodPhotos } from '../data/childhood';
import { receiptPhotos } from '../data/roasts';
import { friendMessages, photoPairs } from '../data/messages';

const pad: CSSProperties = {
  padding: '28px 24px',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
};

const pageTitle = (title: string, subtitle: string) => (
  <div style={{ textAlign: 'center', marginBottom: 16 }}>
    <div style={{ font: "700 24px 'DM Serif Display', serif", color: '#3C2415' }}>{title}</div>
    <div style={{ font: "13px 'Caveat', cursive", color: 'rgba(90,62,40,.4)', marginTop: 4 }}>{subtitle}</div>
    <div style={{ width: 70, height: 1, background: 'linear-gradient(90deg,transparent,rgba(139,105,20,.2),transparent)', margin: '8px auto 0' }} />
  </div>
);

// Alternating small tilt per index, so grid items don't look mechanically uniform.
const tiltFor = (i: number) => [-3, 2, -2, 3, -2][i % 5];

function gridStyle(columns: number): CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: 10,
    maxHeight: '100%',
    overflowY: 'auto',
    alignContent: 'start',
  };
}

function Polaroid({ src, caption, rotate, onClick }: { src: string; caption: string; rotate: number; onClick: () => void }) {
  return (
    <div style={{ minWidth: 0, transform: `rotate(${rotate}deg)`, cursor: 'pointer' }} onClick={onClick}>
      <div
        style={{
          background: '#F8F3E8',
          padding: '6px 6px 20px',
          borderRadius: 2,
          boxShadow: '2px 3px 10px rgba(0,0,0,.22)',
          position: 'relative',
        }}
      >
        <img src={src} alt={caption} style={{ width: '100%', aspectRatio: '1 / 1.1', objectFit: 'cover', display: 'block' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 3,
            left: 7,
            right: 7,
            font: "11px 'Caveat', cursive",
            color: 'rgba(90,62,40,.55)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {caption}
        </div>
      </div>
    </div>
  );
}

function ReceiptCard({ photo, rotate, onClick }: { photo: (typeof receiptPhotos)[number]; rotate: number; onClick: () => void }) {
  return (
    <div style={{ minWidth: 0, transform: `rotate(${rotate}deg)`, cursor: 'pointer' }} onClick={onClick}>
      <div style={{ background: '#fff', padding: 5, borderRadius: 3, boxShadow: '2px 3px 10px rgba(0,0,0,.25)' }}>
        <img src={photo.src} alt={photo.quote} style={{ width: '100%', aspectRatio: '1 / 0.78', objectFit: 'cover', display: 'block', borderRadius: 1 }} />
        <div
          style={{
            font: "12px 'Caveat', cursive",
            color: 'rgba(90,62,40,.6)',
            padding: '5px 2px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          @{photo.from}
        </div>
      </div>
    </div>
  );
}

// 17 childhood photos across 4 pages.
const childhoodRanges = [
  [0, 5],
  [5, 9],
  [9, 13],
  [13, 17],
];

export function PageBody({
  slot,
  onPhoto,
}: {
  slot: PageSlot;
  onPhoto: (src: string, caption: string) => void;
}) {
  if (slot.type === 'welcome-left') {
    return (
      <div style={pad}>
        <div style={{ textAlign: 'center', marginTop: '15%' }}>
          <div style={{ font: "700 14px 'Playfair Display', serif", color: '#C9A63A', letterSpacing: 5, textTransform: 'uppercase' }}>
            The Book of
          </div>
          <div style={{ font: "700 48px 'DM Serif Display', serif", color: '#3C2415', margin: '12px 0' }}>Yash</div>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg,transparent,#C9A63A,transparent)', margin: '12px auto' }} />
          <div style={{ font: "14px 'Playfair Display', serif", color: '#B8963A', letterSpacing: 3 }}>EST. 2026</div>
          <div style={{ font: "16px 'Caveat', cursive", color: 'rgba(90,62,40,.4)', marginTop: 30 }}>
            A collection of memories, roasts,
          </div>
          <div style={{ font: "16px 'Caveat', cursive", color: 'rgba(90,62,40,.4)' }}>and love from your favorite people.</div>
        </div>
      </div>
    );
  }

  if (slot.type === 'welcome-right') {
    const items = ['Childhood memories', 'The roast page', 'Messages'];
    return (
      <div style={{ ...pad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{ font: "18px 'Caveat', cursive", color: 'rgba(90,62,40,.5)', textAlign: 'center' }}>What's inside:</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A63A', flexShrink: 0 }} />
            <div style={{ font: "17px 'Caveat', cursive", color: '#5A3E28' }}>{item}</div>
          </div>
        ))}
        <div style={{ font: "14px 'Caveat', cursive", color: 'rgba(90,62,40,.3)', marginTop: 20, textAlign: 'center' }}>
          (click any photo to expand it)
        </div>
      </div>
    );
  }

  if (slot.type === 'childhood') {
    const [start, end] = childhoodRanges[slot.part];
    const photos = childhoodPhotos.slice(start, end);
    const hasTitle = slot.part === 0;
    return (
      <div style={pad}>
        {hasTitle && pageTitle('Childhood Memories', 'the whole archive')}
        <div style={{ ...gridStyle(hasTitle ? 3 : 2), height: hasTitle ? 'calc(100% - 90px)' : '100%' }}>
          {photos.map((p, i) => (
            <Polaroid key={i} src={p.src} caption={p.caption} rotate={tiltFor(i)} onClick={() => onPhoto(p.src, p.caption)} />
          ))}
        </div>
      </div>
    );
  }

  if (slot.type === 'roast' && slot.part === 0) {
    const photos = receiptPhotos.slice(0, 3);
    return (
      <div style={pad}>
        {pageTitle('The Roast Page', 'the actual comment section, unedited')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: 'calc(100% - 110px)' }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ReceiptCard photo={photos[0]} rotate={tiltFor(0)} onClick={() => onPhoto(photos[0].src, `@${photos[0].from}: "${photos[0].quote}"`)} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ReceiptCard photo={photos[1]} rotate={tiltFor(1)} onClick={() => onPhoto(photos[1].src, `@${photos[1].from}: "${photos[1].quote}"`)} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 'calc(50% - 7px)' }}>
              <ReceiptCard photo={photos[2]} rotate={tiltFor(2)} onClick={() => onPhoto(photos[2].src, `@${photos[2].from}: "${photos[2].quote}"`)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slot.type === 'roast') {
    const photos = receiptPhotos.slice(3, 7);
    return (
      <div style={pad}>
        <div style={{ ...gridStyle(2), height: '100%' }}>
          {photos.map((p, i) => (
            <ReceiptCard key={i} photo={p} rotate={tiltFor(i)} onClick={() => onPhoto(p.src, `@${p.from}: "${p.quote}"`)} />
          ))}
        </div>
      </div>
    );
  }

  if (slot.type === 'friend-message') {
    const f = friendMessages[slot.person];
    const showTitle = slot.person === 0;
    return (
      <div style={{ ...pad, display: 'flex', flexDirection: 'column' }}>
        {showTitle && <div style={{ flexShrink: 0, marginBottom: -6 }}>{pageTitle('Messages', 'from the people who love you')}</div>}
        <div style={{ textAlign: 'center', marginBottom: 10, flexShrink: 0 }}>
          <div style={{ font: "700 22px 'DM Serif Display', serif", color: '#3C2415' }}>{f.name}</div>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg,transparent,rgba(139,105,20,.2),transparent)', margin: '6px auto 0' }} />
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            overflowY: 'auto',
          }}
        >
          {f.lines.map((line, i) => (
            <div key={i} style={{ font: "17px/1.5 'Caveat', cursive", color: '#5A3E28' }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ alignSelf: 'flex-end', flexShrink: 0, marginTop: 10, font: "22px 'Caveat', cursive", color: '#8B6914', transform: 'rotate(-3deg)' }}>
          — {f.name} ♡
        </div>
      </div>
    );
  }

  if (slot.type === 'friend-photos') {
    const f = friendMessages[slot.person];
    const cols = f.photos.length > 1 ? 2 : 1;
    return (
      <div style={{ ...pad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...gridStyle(cols), maxWidth: cols === 1 ? 190 : '100%' }}>
          {f.photos.map((src, i) => (
            <Polaroid key={i} src={src} caption={f.name} rotate={tiltFor(i)} onClick={() => onPhoto(src, f.name)} />
          ))}
        </div>
      </div>
    );
  }

  if (slot.type === 'photo-pair') {
    const [a, b] = photoPairs[slot.pair];
    return (
      <div style={{ ...pad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={gridStyle(2)}>
          <Polaroid src={a.src} caption={a.name} rotate={-3} onClick={() => onPhoto(a.src, a.name)} />
          <Polaroid src={b.src} caption={b.name} rotate={3} onClick={() => onPhoto(b.src, b.name)} />
        </div>
      </div>
    );
  }

  if (slot.type === 'final-left') {
    return (
      <div style={{ ...pad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ font: "700 14px 'Playfair Display', serif", color: '#C9A63A', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 16 }}>
          Happy Birthday
        </div>
        <div style={{ font: "700 52px 'DM Serif Display', serif", color: '#3C2415' }}>Paste!!!</div>
        <div style={{ width: 100, height: 1, background: 'linear-gradient(90deg,transparent,#C9A63A,transparent)', marginTop: 24 }} />
      </div>
    );
  }

  // slot.type === 'final-right'
  return (
    <div style={{ ...pad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
      <div style={{ font: "32px 'Caveat', cursive", color: '#5A3E28' }}>Have a good one!!!</div>
    </div>
  );
}
