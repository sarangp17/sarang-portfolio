import { useEffect, useState } from 'react';
import Scene from './Scene';
import RetroOS from './RetroOS';
import { startMusic, toggleMute } from './chiptune';
import { useMuted } from './useMuted';

/** 2D overlay that sits above the 3D canvas (title chip + Start / Esc hints). */
function Hud({ zoomed, onStart }) {
  const muted = useMuted();
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] font-pixel">
      <div className="absolute left-3 top-3 bg-[#c0c0c0] p-[3px] text-[9px] text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]">
        <div className="bg-[#000080] px-2 py-1 text-white">PORTFOLIO.EXE</div>
        <div className="px-2 py-1">Sarang Palsutkar</div>
      </div>

      <div
        className="pointer-events-auto absolute left-3 top-[76px] flex flex-col gap-1 text-[8px] leading-4"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          ['✉ sarangpalsutkar@gmail.com', 'mailto:sarangpalsutkar@gmail.com'],
          ['GitHub ↗', 'https://github.com/sarangp17'],
          ['LinkedIn ↗', 'https://in.linkedin.com/in/sarangpalsutkar'],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="bg-[#c0c0c0] px-2 py-1 text-[#0000ee] underline shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]"
          >
            {label}
          </a>
        ))}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); toggleMute(); }}
        className="pointer-events-auto absolute right-3 top-3 bg-[#c0c0c0] px-3 py-2 text-[9px] text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]"
        aria-label="Toggle music"
      >
        {muted ? '🔇 MUSIC OFF' : '🔊 MUSIC ON'}
      </button>

      {!zoomed ? (
        <button
          onClick={(e) => { e.stopPropagation(); startMusic(); onStart(); }}
          className="pulse-start pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#c0c0c0] px-6 py-3 text-[12px] text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#0a0a0a]"
        >
          ▶ START
        </button>
      ) : (
        <div className="absolute bottom-2 right-3 text-[8px] text-[#6b6459]">ESC = back to desk</div>
      )}
    </div>
  );
}

export default function App() {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setZoomed(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className="fixed inset-0"
      style={{ cursor: zoomed ? 'default' : 'pointer' }}
      onClick={() => { if (!zoomed) { startMusic(); setZoomed(true); } }}
    >
      <Scene zoomed={zoomed}>
        <RetroOS zoomed={zoomed} onExit={() => setZoomed(false)} />
      </Scene>
      <Hud zoomed={zoomed} onStart={() => setZoomed(true)} />
    </div>
  );
}
