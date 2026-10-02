import { Box } from './parts';

export default function Room() {
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#cdc5b2" roughness={0.95} />
      </mesh>
      {/* rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0.4]} receiveShadow>
        <circleGeometry args={[3.3, 64]} />
        <meshStandardMaterial color="#7f93a8" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0.4]} receiveShadow>
        <ringGeometry args={[2.9, 3.05, 64]} />
        <meshStandardMaterial color="#e8e2d4" roughness={1} />
      </mesh>
      {/* back wall */}
      <mesh position={[0, 4.5, -3.6]} receiveShadow>
        <planeGeometry args={[40, 9]} />
        <meshStandardMaterial color="#e6e1d3" roughness={1} />
      </mesh>
      {/* left wall */}
      <mesh position={[-6.2, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[40, 9]} />
        <meshStandardMaterial color="#dcd6c6" roughness={1} />
      </mesh>
      {/* skirting boards */}
      <Box size={[40, 0.28, 0.08]} position={[0, 0.14, -3.56]} color="#f3efe4" />
      <Box size={[0.08, 0.28, 40]} position={[-6.16, 0.14, 0]} color="#f3efe4" />
    </group>
  );
}
