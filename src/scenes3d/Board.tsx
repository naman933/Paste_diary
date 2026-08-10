import { useTexture, Html } from '@react-three/drei';
import { deskPolaroids } from '../data/photos';

const BOARD_Z = -2.35;

function Postcard({ src, x, y, rotation, onClick }: { src: string; x: number; y: number; rotation: number; onClick: () => void }) {
  const texture = useTexture(src);
  return (
    <group position={[x, y, BOARD_Z + 0.09]} rotation={[0, 0, rotation]}>
      {/* White polaroid frame */}
      <mesh castShadow onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <planeGeometry args={[0.95, 1.15]} />
        <meshStandardMaterial color="#F8F3E8" roughness={0.9} />
      </mesh>
      {/* Photo */}
      <mesh position={[0, 0.08, 0.005]}>
        <planeGeometry args={[0.82, 0.82]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </group>
  );
}

function StickyNote({
  x,
  y,
  rotation,
  color,
  children,
  onClick,
}: {
  x: number;
  y: number;
  rotation: number;
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <group position={[x, y, BOARD_Z + 0.09]} rotation={[0, 0, rotation]}>
      <mesh castShadow onClick={onClick ? (e) => { e.stopPropagation(); onClick(); } : undefined}>
        <planeGeometry args={[0.9, 0.85]} />
        <meshStandardMaterial color={color} roughness={0.95} />
      </mesh>
      <Html
        transform
        occlude={false}
        position={[0, 0, 0.01]}
        distanceFactor={2.4}
        style={{
          width: 150,
          padding: 12,
          font: "20px 'Caveat', cursive",
          color: '#5A4620',
          lineHeight: 1.3,
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {children}
      </Html>
    </group>
  );
}

export function Board({ onSticky, onPhoto }: { onSticky: () => void; onPhoto: (src: string, caption: string) => void }) {
  return (
    <group>
      {/* The board itself */}
      <mesh position={[0, 1.5, BOARD_Z]} receiveShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshStandardMaterial color="#3E2A1A" roughness={0.85} />
      </mesh>

      <Postcard
        src={deskPolaroids[0].src}
        x={-2.6}
        y={1.7}
        rotation={0.15}
        onClick={() => onPhoto(deskPolaroids[0].src, deskPolaroids[0].caption)}
      />
      <Postcard
        src={deskPolaroids[1].src}
        x={-1.7}
        y={1.15}
        rotation={-0.1}
        onClick={() => onPhoto(deskPolaroids[1].src, deskPolaroids[1].caption)}
      />

      <StickyNote x={2.1} y={1.9} rotation={0.05} color="#FFEAA7" onClick={onSticky}>
        We all love
        <br />
        you Paste!!!
      </StickyNote>
      <StickyNote x={2.75} y={1.3} rotation={-0.08} color="#FFB3B3">
        P.S. We
        <br />
        remember
        <br />
        everything 🤫
      </StickyNote>
    </group>
  );
}
