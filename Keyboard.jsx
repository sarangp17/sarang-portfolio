import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Box } from './parts';
import { DESK_TOP_Y } from './constants';

const PITCH = 0.128;

function useKeys() {
  return useMemo(() => {
    const keys = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 14; c++) {
        keys.push({ x: (c - 6.5) * PITCH, z: -0.25 + r * 0.125, dark: c === 0 || c === 13 || r === 0 });
      }
    }
    [0, 1, 2, 11, 12, 13].forEach((c) => keys.push({ x: (c - 6.5) * PITCH, z: 0.25, dark: true }));
    return keys;
  }, []);
}

export default function Keyboard() {
  const ref = useRef();
  const keys = useKeys();

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const col = new THREE.Color();
    keys.forEach((k, i) => {
      m.setPosition(k.x, 0.095, k.z);
      ref.current.setMatrixAt(i, m);
      ref.current.setColorAt(i, col.set(k.dark ? '#bdb6a0' : '#ebe6d6'));
    });
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.instanceColor.needsUpdate = true;
  }, [keys]);

  return (
    <group position={[0, DESK_TOP_Y + 0.05, 0.85]} rotation={[0.06, 0, 0]}>
      <Box size={[2.0, 0.08, 0.78]} position={[0, 0.04, 0]} color="#cdc7b3" radius={0.025} />
      <instancedMesh ref={ref} args={[null, null, keys.length]} castShadow>
        <boxGeometry args={[0.108, 0.05, 0.1]} />
        <meshStandardMaterial roughness={0.5} />
      </instancedMesh>
      {/* space bar */}
      <Box size={[1.0, 0.05, 0.1]} position={[0, 0.095, 0.25]} color="#ebe6d6" cast />
    </group>
  );
}
