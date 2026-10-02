import { useEffect, useState } from 'react';
import { playChime, playPostBeep } from './chiptune';

/** Screen when the machine is idle on the desk. */
export function PowerOff({ zoomed }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#04100b] text-center">
      {!zoomed && (
        <>
          <div className="font-pixel text-[34px] leading-[56px] text-[#39ff88]" style={{ textShadow: '0 0 14px #39ff88' }}>
            CLICK
            <br />
            TO START
          </div>
          <div className="mt-6 font-body text-[30px] text-[#1f9c5a]">sarang@desk:~$ <span className="blink">_</span></div>
        </>
      )}
    </div>
  );
}

const BIOS_LINES = [
  'SARANG-BIOS v2026.10  (C) Sarang Palsutkar',
  'CPU : B.Tech CSE @ VIT Bhopal ........ OK',
  'RAM : 640K ............................ OK',
  'Detecting drives: python, sql, pytorch, react',
  'Mounting /projects ..... footballiq  fusionnet  focusflow',
  'Checking football.sys ................. OK',
  'Starting SARANG 95 ...',
];

export function Bios({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => { playPostBeep(); }, []);
  useEffect(() => {
    if (n >= BIOS_LINES.length) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setN((x) => x + 1), 170);
    return () => clearTimeout(t);
  }, [n, onDone]);
  return (
    <div className="h-full w-full bg-black p-6 text-[24px] leading-7 text-[#c8c8c8]">
      {BIOS_LINES.slice(0, n).map((l) => (
        <div key={l}>{l}</div>
      ))}
      <span className="blink">▮</span>
    </div>
  );
}

export function Splash({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => { playChime(); }, []);
  useEffect(() => {
    if (p >= 100) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setP((x) => Math.min(100, x + 6)), 90);
    return () => clearTimeout(t);
  }, [p, onDone]);
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center"
      style={{ background: 'linear-gradient(#0a2a7a, #3b82c8 70%, #bcd9f5)' }}
    >
      <div className="font-pixel text-[30px] text-white" style={{ textShadow: '3px 3px #000080' }}>
        SARANG<span className="text-[#ffd84a]"> 95</span>
      </div>
      <div className="mt-3 font-body text-[24px] text-white">Portfolio Edition · Data / ML / AI</div>
      <div className="bevel-in mt-10 h-5 w-[320px] bg-win-gray p-[2px]">
        <div className="h-full bg-win-navy" style={{ width: `${p}%`, backgroundImage: 'repeating-linear-gradient(90deg,#000080 0 10px,transparent 10px 12px)' }} />
      </div>
    </div>
  );
}

export function ShutdownScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black text-center">
      <div className="font-body text-[30px] text-[#ff9a1f]">It's now safe to turn off</div>
      <div className="font-body text-[30px] text-[#ff9a1f]">your computer.</div>
    </div>
  );
}
