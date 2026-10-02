import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DESK_TOP_Y } from './constants';

export default function Plant() {
  const sway = useRef();
  const leaves = useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({
      a: i * 2.4,
      tilt: 0.45 + (i % 3) * 0.28,
      h: 0.38 + (i % 4) * 0.09,
      len: 0.15 + (i % 3) * 0.03,
      color: ['#4f8a4b', '#5c9a55', '#3f7a43'][i % 3],
    })),
    [],
  );
  useFrame(({ clock }) => {
    sway.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.015;
  });
  return (
    <group position={[-2.0, DESK_TOP_Y, -1.1]}>
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.23, 0.16, 0.32, 24]} />
        <meshStandardMaterial color="#b9643f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.33, 0]} castShadow>
        <cylinderGeometry args={[0.255, 0.24, 0.05, 24]} />
        <meshStandardMaterial color="#c4714a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.345, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial color="#3a2a1e" roughness={1} />
      </mesh>
      <group ref={sway}>
        {leaves.map((l, i) => (
          <group key={i} rotation={[0, l.a, 0]}>
            <mesh position={[0.02, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.008, 0.008, l.h, 5]} />
              <meshStandardMaterial color="#4a7a3f" />
            </mesh>
            <mesh position={[0.14, 0.34 + l.h, 0]} rotation={[0, 0, -l.tilt]} scale={[l.len, 0.026, 0.08]} castShadow>
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color={l.color} roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
