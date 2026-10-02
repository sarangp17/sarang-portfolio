import { RoundedBox } from '@react-three/drei';

/** Small helper: a (optionally rounded) box with a standard material. */
export function Box({
  size, position, rotation, color, radius = 0, roughness = 0.7, metalness = 0,
  emissive, emissiveIntensity = 0, cast = true, receive = true,
}) {
  const mat = (
    <meshStandardMaterial
      color={color} roughness={roughness} metalness={metalness}
      emissive={emissive} emissiveIntensity={emissiveIntensity}
    />
  );
  if (radius > 0) {
    return (
      <RoundedBox args={size} radius={radius} smoothness={4} position={position} rotation={rotation} castShadow={cast} receiveShadow={receive}>
        {mat}
      </RoundedBox>
    );
  }
  return (
    <mesh position={position} rotation={rotation} castShadow={cast} receiveShadow={receive}>
      <boxGeometry args={size} />
      {mat}
    </mesh>
  );
}
