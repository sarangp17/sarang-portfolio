import { useCallback, useEffect, useRef, useState } from 'react';
import { Bios, PowerOff, ShutdownScreen, Splash } from './Screens';
import Desktop from './Desktop';
import { playClick } from './chiptune';

/**
 * The 800x600 "computer" that lives on the CRT glass.
 * phases: off -> bios -> splash -> desktop -> shutdown
 */
export default function RetroOS({ zoomed, onExit }) {
  const [phase, setPhase] = useState('off');
  const rootRef = useRef(null);

  // The screen lives in a CSS-3D layer where the browser's native wheel/touch scrolling
  // doesn't reach inner scroll areas, so we forward those gestures ourselves.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const scrollable = (node) => {
      while (node && node !== el) {
        if (node.nodeType === 1) {
          const oy = getComputedStyle(node).overflowY;
          if ((oy === 'auto' || oy === 'scroll') && node.scrollHeight > node.clientHeight + 1) return node;
        }
        node = node.parentNode;
      }
      return null;
    };
    const scale = () => Math.max(el.getBoundingClientRect().height / 600, 0.2); // screen px per CSS px
    const onWheel = (e) => {
      const t = scrollable(e.target);
      if (!t) return;
      const unit = e.deltaMode === 1 ? 18 : e.deltaMode === 2 ? t.clientHeight : 1;
      t.scrollTop += (e.deltaY * unit) / scale();
      e.preventDefault();
    };
    let target = null;
    let lastY = 0;
    const onStart = (e) => { target = scrollable(e.target); lastY = e.touches[0].clientY; };
    const onMove = (e) => {
      if (!target) return;
      const y = e.touches[0].clientY;
      target.scrollTop += (lastY - y) / scale();
      lastY = y;
      e.preventDefault();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
    };
  }, []);

  useEffect(() => {
    if (!zoomed) { setPhase('off'); return undefined; }
    const t = setTimeout(() => setPhase('bios'), 1100); // wait for the camera fly-in
    return () => clearTimeout(t);
  }, [zoomed]);

  const toSplash = useCallback(() => setPhase('splash'), []);
  const toDesktop = useCallback(() => setPhase('desktop'), []);

  return (
    <div ref={rootRef} className="retro-screen relative select-none overflow-hidden" style={{ width: 800, height: 600 }}
      onClickCapture={(e) => { if (e.target.closest && e.target.closest('button, a')) playClick(); }}
    >
      {phase === 'off' && <PowerOff zoomed={zoomed} />}
      {phase === 'bios' && <Bios onDone={toSplash} />}
      {phase === 'splash' && <Splash onDone={toDesktop} />}
      {(phase === 'desktop' || phase === 'shutdown') && <Desktop onShutdown={() => setPhase('shutdown')} />}
      {phase === 'shutdown' && <ShutdownScreen onDone={onExit} />}

      {/* CRT scanlines + vignette (non-interactive) */}
      <div
        className="crt-flicker pointer-events-none absolute inset-0 z-50"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.09) 0, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 3px), radial-gradient(ellipse at center, transparent 64%, rgba(0,0,0,0.42) 100%)',
        }}
      />
    </div>
  );
}
