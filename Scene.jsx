import { Canvas } from '@react-three/fiber';
import { BG, FOV, ISO } from './constants';
import CameraRig from './CameraRig';
import Lights from './Lights';
import Room from './Room';
import Desk from './Desk';
import Monitor from './Monitor';
import Keyboard from './Keyboard';
import Mouse from './Mouse';
import Cables from './Cables';
import Folders from './Folders';
import Mug from './Mug';
import Plant from './Plant';

/**
 * The whole 3D world. `children` (the retro OS) is rendered onto the CRT glass.
 */
export default function Scene({ zoomed, children }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: FOV, position: ISO.position, near: 0.1, far: 120 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 22, 48]} />
      <Lights />
      <Room />
      <Desk />
      <Monitor zoomed={zoomed}>{children}</Monitor>
      <Keyboard />
      <Mouse />
      <Cables />
      <Folders />
      <Mug />
      <Plant />
      <CameraRig zoomed={zoomed} />
    </Canvas>
  );
}
