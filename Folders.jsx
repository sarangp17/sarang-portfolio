import { Box } from './parts';
import { DESK_TOP_Y } from './constants';

function Folder({ position, rotation = [0, 0, 0], color, tab = '#d6b45f' }) {
  return (
    <group position={position} rotation={rotation}>
      <Box size={[0.95, 0.03, 0.7]} position={[0, 0.015, 0]} color={color} roughness={0.9} />
      <Box size={[0.3, 0.03, 0.09]} position={[-0.25, 0.015, -0.395]} color={tab} roughness={0.9} />
      <Box size={[0.9, 0.012, 0.64]} position={[0.02, 0.036, 0.03]} color="#f7f4ea" roughness={1} cast={false} />
    </group>
  );
}

export default function Folders() {
  const y = DESK_TOP_Y;
  return (
    <group>
      <Folder position={[-1.85, y, 0.5]} rotation={[0, 0.12, 0]} color="#e8c872" />
      <Folder position={[-1.82, y + 0.05, 0.47]} rotation={[0, -0.08, 0]} color="#8fb5c9" tab="#7aa3b8" />
      <Folder position={[-1.86, y + 0.1, 0.52]} rotation={[0, 0.2, 0]} color="#d98a6a" tab="#c4755a" />
      <Folder position={[-1.5, y, 1.15]} rotation={[0, -0.45, 0]} color="#c9d49a" tab="#b3bf84" />
    </group>
  );
}
