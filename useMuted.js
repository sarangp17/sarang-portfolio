import { useSyncExternalStore } from 'react';
import { isMuted, subscribeAudio } from './chiptune';

export function useMuted() {
  return useSyncExternalStore(subscribeAudio, isMuted);
}
