import { Box } from './parts';

const TOP = '#a98258';
const LEG = '#8a6a49';

export default function Desk() {
  return (
    <group position={[0, 0, -0.1]}>
      <Box size={[5.2, 0.1, 3.2]} position={[0, 0.95, 0]} color={TOP} roughness={0.75} radius={0.025} />
      {/* panel legs */}
      <Box size={[0.1, 0.9, 2.9]} position={[-2.4, 0.45, 0]} color={LEG} roughness={0.85} />
      <Box size={[0.1, 0.9, 2.9]} position={[2.4, 0.45, 0]} color={LEG} roughness={0.85} />
      {/* modesty panel */}
      <Box size={[4.7, 0.55, 0.05]} position={[0, 0.62, -1.4]} color={LEG} roughness={0.85} />
    </group>
  );
}
