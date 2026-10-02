import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { ISO, SCREEN, SCREEN_CENTER } from './constants';

const FIT = 1.04; // how tightly the screen fills the viewport when zoomed

/**
 * Smoothly flies the camera between the isometric desk view and a straight-on
 * view that fills the viewport with the CRT screen.
 */
export default function CameraRig({ zoomed }) {
  const { camera, size } = useThree();
  const t = useRef(0);
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const v = useMemo(
    () => ({
      isoPos: new THREE.Vector3(...ISO.position),
      isoLook: new THREE.Vector3(...ISO.target),
      screen: new THREE.Vector3(...SCREEN_CENTER),
      zoomPos: new THREE.Vector3(),
      look: new THREE.Vector3(),
    }),
    [],
  );

  useFrame((state, dt) => {
    t.current = THREE.MathUtils.damp(t.current, zoomed ? 1 : 0, reduce ? 12 : 2.6, dt);
    const e = THREE.MathUtils.smootherstep(t.current, 0, 1);

    // distance at which the screen fits the viewport (height- or width-limited)
    const aspect = size.width / size.height;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const d = Math.max((SCREEN.h * FIT) / 2 / tanHalf, (SCREEN.w * FIT) / 2 / (tanHalf * aspect));
    v.zoomPos.set(v.screen.x, v.screen.y, v.screen.z + d);

    camera.position.lerpVectors(v.isoPos, v.zoomPos, e);
    // gentle mouse parallax while looking at the whole desk
    const idle = 1 - e;
    camera.position.x += state.pointer.x * 0.35 * idle;
    camera.position.y += state.pointer.y * 0.2 * idle;

    v.look.lerpVectors(v.isoLook, v.screen, e);
    camera.lookAt(v.look);
  });
  return null;
}
