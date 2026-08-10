// The desk surface and a floor plane beneath it.
export function Table() {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[8, 0.2, 5]} />
        <meshStandardMaterial color="#5C3D2E" roughness={0.75} metalness={0.05} />
      </mesh>
      {/* Subtle darker rim for edge definition */}
      <mesh position={[0, -0.001, 0]} receiveShadow>
        <boxGeometry args={[7.94, 0.02, 4.94]} />
        <meshStandardMaterial color="#6B4A38" roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Floor, far below, just to catch ambient bounce / avoid black void beneath the table edge */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#140b06" roughness={1} />
      </mesh>
    </group>
  );
}
