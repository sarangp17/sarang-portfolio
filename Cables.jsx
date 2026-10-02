import { useMemo } from 'react';
import * as THREE from 'three';

function Cable({ points, radius = 0.012, color = '#2b2a27' }) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.4);
    return new THREE.TubeGeometry(curve, 64, radius, 6, false);
  }, [points, radius]);
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

export default function Cables() {
  const y = 1.016;
  return (
    <>
      {/* mouse -> back of monitor */}
      <Cable points={[[1.65, 1.06, 0.62], [1.65, y, 0.35], [1.55, y, -0.4], [0.9, y, -1.0], [0.35, 1.2, -1.35]]} />
      {/* keyboard -> back of monitor */}
      <Cable points={[[0, 1.07, 0.48], [-0.1, y, 0.25], [-0.75, y, -0.45], [-0.55, y, -1.15], [-0.3, 1.2, -1.35]]} />
    </>
  );
}
