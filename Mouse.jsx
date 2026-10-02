import { Box } from './parts';
import { DESK_TOP_Y } from './constants';

export default function Mouse() {
  return (
    <group position={[1.6, DESK_TOP_Y, 0.85]}>
      {/* mouse pad */}
      <Box size={[0.95, 0.014, 0.8]} position={[0, 0.007, 0]} color="#3b4a6b" roughness={0.95} radius={0.006} />
      {/* body */}
      <mesh position={[0.05, 0.062, 0.02]} scale={[0.16, 0.065, 0.24]} castShadow>
        <sphereGeometry args={[1, 28, 18]} />
        <meshStandardMaterial color="#d6d0bc" roughness={0.5} />
      </mesh>
      {/* buttons split */}
      <Box size={[0.004, 0.004, 0.13]} position={[0.05, 0.121, -0.1]} color="#6e6a5c" cast={false} />
      <Box size={[0.13, 0.004, 0.004]} position={[0.05, 0.119, -0.03]} color="#6e6a5c" cast={false} />
    </group>
  );
}
