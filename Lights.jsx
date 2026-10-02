import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SCREEN_CENTER } from './constants';

export default function Lights() {
  const glow = useRef();
  useFrame(({ clock }) => {
    if (glow.current) glow.current.intensity = 2.2 + Math.sin(clock.elapsedTime * 2.1) * 0.25;
  });
  return (
    <>
      <ambientLight intensity={0.55} color="#fff4e0" />
      <hemisphereLight args={['#ffffff', '#c9b79c', 0.45]} />
      <directionalLight
        position={[5, 8, 4]} intensity={1.5} castShadow
        shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}
        shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7}
        shadow-camera-near={1} shadow-camera-far={25}
      />
      {/* soft phosphor glow spilling from the CRT */}
      <pointLight ref={glow} position={[SCREEN_CENTER[0], SCREEN_CENTER[1] - 0.1, SCREEN_CENTER[2] + 0.9]} color="#9be7ff" distance={4} decay={2} />
    </>
  );
}
