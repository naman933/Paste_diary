import type { CSSProperties } from 'react';
import type { PageSlot } from '../data/pages';
import { childhoodPhotos } from '../data/childhood';
import { receiptPhotos } from '../data/roasts';

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

// 7 receipt photos across 3 pages (4th slot on the roast spread is blank).
const roastRanges = [
  [0, 3],
  [3, 5],
  [5, 7],
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

  if (slot.type === 'roast') {
    const [start, end] = roastRanges[slot.part];
    const photos = receiptPhotos.slice(start, end);
    const hasTitle = slot.part === 0;
    return (
      <div style={pad}>
        {hasTitle && pageTitle('The Roast Page', 'the actual comment section, unedited')}
        <div style={{ ...gridStyle(hasTitle ? 3 : 2), height: hasTitle ? 'calc(100% - 110px)' : '100%' }}>
          {photos.map((p, i) => (
            <ReceiptCard key={i} photo={p} rotate={tiltFor(i)} onClick={() => onPhoto(p.src, `@${p.from}: "${p.quote}"`)} />
          ))}
        </div>
      </div>
    );
  }

  if (slot.type === 'messages-left') {
    return (
      <div style={{ ...pad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ font: "700 26px 'DM Serif Display', serif", color: '#3C2415', marginBottom: 10 }}>Messages</div>
        <div style={{ width: 70, height: 1, background: 'linear-gradient(90deg,transparent,rgba(139,105,20,.2),transparent)', marginBottom: 20 }} />
        <div style={{ font: "18px 'Caveat', cursive", color: 'rgba(90,62,40,.4)', maxWidth: 200 }}>
          Letters from friends are coming soon — check back on this page.
        </div>
      </div>
    );
  }

  if (slot.type === 'messages-right') {
    return (
      <div style={{ ...pad, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✍️</div>
        <div style={{ font: "16px 'Caveat', cursive", color: 'rgba(90,62,40,.4)', maxWidth: 200 }}>This page is being written.</div>
      </div>
    );
  }

  // blank filler page
  return (
    <div style={{ ...pad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,#C9A63A,transparent)' }} />
    </div>
  );
}
