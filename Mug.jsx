import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DESK_TOP_Y } from './constants';

function Steam() {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.children.forEach((m, i) => {
      const t = (clock.elapsedTime * 0.22 + i / 3) % 1;
      m.position.set(Math.sin(t * 6 + i) * 0.04, 0.34 + t * 0.5, 0);
      m.material.opacity = (1 - t) * 0.22;
      m.scale.setScalar(0.04 + t * 0.08);
    });
  });
  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function Mug() {
  return (
    <group position={[1.9, DESK_TOP_Y, -0.35]}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.17, 0.15, 0.3, 32]} />
        <meshStandardMaterial color="#f1ece0" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.172, 0.152, 0.07, 32]} />
        <meshStandardMaterial color="#c0583c" roughness={0.4} />
      </mesh>
      {/* coffee */}
      <mesh position={[0, 0.285, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#2b1a10" roughness={0.2} />
      </mesh>
      {/* handle */}
      <mesh position={[0.2, 0.15, 0]} castShadow>
        <torusGeometry args={[0.085, 0.025, 10, 20]} />
        <meshStandardMaterial color="#f1ece0" roughness={0.35} />
      </mesh>
      <Steam />
    </group>
  );
}
