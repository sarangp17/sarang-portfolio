import { Html } from '@react-three/drei';
import { Box } from './parts';
import { HTML_DISTANCE_FACTOR, MONITOR_POS, SCREEN, SCREEN_LOCAL, UI_PX } from './constants';

const BEIGE = '#cdc7b3';
const BEIGE_D = '#b7b19c';

/**
 * Retro CRT. `children` is the 2D UI; it is projected onto the glass with drei's <Html transform>.
 */
export default function Monitor({ zoomed, children }) {
  return (
    <group position={MONITOR_POS}>
      {/* stand */}
      <Box size={[1.0, 0.06, 0.8]} position={[0, 0.03, 0]} color={BEIGE_D} radius={0.02} />
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.34, 0.12, 28]} />
        <meshStandardMaterial color={BEIGE_D} roughness={0.7} />
      </mesh>

      {/* housing: front, mid, back, tube neck */}
      <Box size={[2.0, 1.75, 0.8]} position={[0, 1.055, 0]} color={BEIGE} radius={0.07} />
      <Box size={[1.72, 1.5, 0.5]} position={[0, 1.0, -0.6]} color={BEIGE} radius={0.05} />
      <Box size={[1.25, 1.1, 0.5]} position={[0, 0.95, -0.95]} color={BEIGE_D} radius={0.05} />
      <mesh position={[0, 0.95, -1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.4, 0.25, 24]} />
        <meshStandardMaterial color="#2a2a28" roughness={0.6} />
      </mesh>
      {/* top vents */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Box key={i} size={[0.9, 0.012, 0.03]} position={[0, 1.76, -0.45 - i * 0.055]} color="#8f8a78" cast={false} />
      ))}

      {/* bezel + inset frame + glass */}
      <Box size={[1.82, 1.46, 0.05]} position={[0, SCREEN_LOCAL[1], 0.425]} color={BEIGE_D} radius={0.03} />
      <Box size={[1.62, 1.245, 0.02]} position={[0, SCREEN_LOCAL[1], 0.46]} color="#111111" roughness={0.3} cast={false} />
      <mesh position={[SCREEN_LOCAL[0], SCREEN_LOCAL[1], SCREEN_LOCAL[2] - 0.004]}>
        <planeGeometry args={[SCREEN.w, SCREEN.h]} />
        <meshStandardMaterial color="#06120d" emissive="#1c5a40" emissiveIntensity={0.5} roughness={0.2} />
      </mesh>

      {/* front controls */}
      <Box size={[0.55, 0.1, 0.012]} position={[-0.55, 0.36, 0.41]} color="#e6e1d0" cast={false} />
      <Box size={[0.1, 0.07, 0.03]} position={[0.35, 0.36, 0.41]} color="#9d9784" cast={false} />
      <Box size={[0.1, 0.07, 0.03]} position={[0.5, 0.36, 0.41]} color="#9d9784" cast={false} />
      <Box size={[0.14, 0.09, 0.04]} position={[0.7, 0.36, 0.41]} color="#8f8a78" cast={false} />
      <mesh position={[0.86, 0.36, 0.405]}>
        <circleGeometry args={[0.018, 16]} />
        <meshStandardMaterial color="#39ff88" emissive="#39ff88" emissiveIntensity={2} />
      </mesh>

      {/* the 2D OS, mapped onto the glass */}
      <Html
        transform
        distanceFactor={HTML_DISTANCE_FACTOR}
        position={SCREEN_LOCAL}
        pointerEvents={zoomed ? 'auto' : 'none'}
        zIndexRange={[5, 0]}
      >
        <div style={{ width: UI_PX.w, height: UI_PX.h }}>{children}</div>
      </Html>
    </group>
  );
}
