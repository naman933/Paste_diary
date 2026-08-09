import { deskPolaroids } from '../data/photos';

interface DeskItemsProps {
  onCamera: () => void;
  onCake: () => void;
  onSticky: () => void;
  onPolaroid: (src: string, caption: string) => void;
}

export function DeskItems({ onCamera, onCake, onSticky, onPolaroid }: DeskItemsProps) {
  return (
    <>
      {/* Polaroid Camera */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '6%',
          width: 120,
          height: 90,
          background: 'linear-gradient(145deg,#2C2C2C,#1A1A1A)',
          borderRadius: 10,
          boxShadow: '3px 4px 18px rgba(0,0,0,.5)',
          transform: 'rotate(-8deg)',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onCamera();
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            transform: 'translate(-50%,-50%)',
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #6688AA, #334455, #1A2A3A)',
            border: '3px solid #444',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #99BBDD, #5577AA)',
              opacity: 0.7,
            }}
          />
        </div>
        <div style={{ position: 'absolute', top: 10, right: 14, width: 20, height: 14, background: 'linear-gradient(145deg,#DDD,#AAA)', borderRadius: 2, border: '1px solid #888' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 10, display: 'flex', gap: 0 }}>
          <div style={{ width: 6, height: 4, background: '#E74C3C' }} />
          <div style={{ width: 6, height: 4, background: '#F39C12' }} />
          <div style={{ width: 6, height: 4, background: '#2ECC71' }} />
          <div style={{ width: 6, height: 4, background: '#3498DB' }} />
        </div>
      </div>

      {/* Birthday Cake */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '8%',
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #FFF5E6, #F5DEC4, #E8CBA8)',
          border: '3px solid #E0C09A',
          boxShadow: '4px 5px 18px rgba(0,0,0,.4), inset 0 0 12px rgba(0,0,0,.05)',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onCake();
        }}
      >
        <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '2px dashed rgba(210,140,160,.3)' }} />
        <div style={{ position: 'absolute', top: 25, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#E74C3C', boxShadow: '0 0 8px rgba(255,150,50,.7)' }} />
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3498DB', boxShadow: '0 0 8px rgba(255,150,50,.7)' }} />
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2ECC71', boxShadow: '0 0 8px rgba(255,150,50,.7)' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 70,
            height: 24,
            background: 'radial-gradient(ellipse, rgba(255,200,80,.3), transparent)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Scattered Polaroids */}
      {[
        { bottom: '10%', left: '3%', width: 264, height: 316, rotate: 12, z: 2 },
        { bottom: '12%', left: '20%', width: 240, height: 288, rotate: -5, z: 1 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: p.bottom,
            left: p.left,
            width: p.width,
            height: p.height,
            background: '#F8F3E8',
            padding: '7px 7px 28px',
            transform: `rotate(${p.rotate}deg)`,
            boxShadow: '2px 3px 12px rgba(0,0,0,.35)',
            cursor: 'pointer',
            zIndex: p.z,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onPolaroid(deskPolaroids[i].src, deskPolaroids[i].caption);
          }}
        >
          <img src={deskPolaroids[i].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}

      {/* Sticky notes */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          right: '6%',
          width: 100,
          height: 90,
          background: 'linear-gradient(145deg,#FFEAA7,#F9D96C)',
          transform: 'rotate(2deg)',
          boxShadow: '2px 3px 10px rgba(0,0,0,.25)',
          padding: 10,
          font: "13px 'Caveat', cursive",
          color: '#5A4620',
          lineHeight: 1.3,
          cursor: 'pointer',
          animation: 'float-y 4s ease-in-out infinite',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSticky();
        }}
      >
        Open this on
        <br />
        your birthday
        <br />— love, the squad
      </div>
      <div
        style={{
          position: 'absolute',
          top: '38%',
          right: '4%',
          width: 80,
          height: 68,
          background: 'linear-gradient(145deg,#FFB3B3,#FF9B9B)',
          transform: 'rotate(-4deg)',
          boxShadow: '1px 2px 6px rgba(0,0,0,.2)',
          padding: 7,
          font: "11px 'Caveat', cursive",
          color: '#7A2020',
          lineHeight: 1.3,
        }}
      >
        P.S. We
        <br />
        remember
        <br />
        everything 🤫
      </div>
    </>
  );
}
