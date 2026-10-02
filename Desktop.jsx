import { useEffect, useState } from 'react';
import { A, Btn, Dialog, TitleBar } from './Win95';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import { PROFILE } from './portfolio';
import { toggleMute } from './chiptune';
import { useMuted } from './useMuted';

const PAGES = {
  about: { label: 'About', icon: '📄', file: 'about.htm', C: About },
  skills: { label: 'Skills', icon: '🛠️', file: 'skills.htm', C: Skills },
  projects: { label: 'Projects', icon: '📁', file: 'projects.htm', C: Projects },
  contact: { label: 'Contact', icon: '✉️', file: 'contact.htm', C: Contact },
};

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return <span>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>;
}

function DesktopIcon({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex w-[72px] flex-col items-center gap-[2px] p-1 text-white focus:bg-win-navy/70">
      <span className="text-[30px] leading-8">{icon}</span>
      <span className="text-[17px] leading-4" style={{ textShadow: '1px 1px #000' }}>{label}</span>
    </button>
  );
}

export default function Desktop({ onShutdown }) {
  const muted = useMuted();
  const [hist, setHist] = useState(['about']);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(true);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const page = hist[idx];
  const { C, file } = PAGES[page];

  const flash = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 450);
  };
  const go = (p) => {
    setOpen(true);
    setStart(false);
    if (p === page) return;
    const h = [...hist.slice(0, idx + 1), p];
    setHist(h);
    setIdx(h.length - 1);
    flash();
  };
  const back = () => { if (idx > 0) { setIdx(idx - 1); flash(); } };
  const fwd = () => { if (idx < hist.length - 1) { setIdx(idx + 1); flash(); } };

  return (
    <div className="relative h-full w-full overflow-hidden bg-win-teal" onClick={() => start && setStart(false)}>
      {/* desktop icons */}
      <div className="absolute left-1 top-1 flex flex-col gap-1">
        {Object.entries(PAGES).map(([k, p]) => (
          <DesktopIcon key={k} icon={p.icon} label={p.label} onClick={() => go(k)} />
        ))}
        <DesktopIcon icon="🗑️" label="Recycle Bin" onClick={() => setConfirm('bin')} />
      </div>

      {/* browser window */}
      {open && (
        <div className="bevel-out absolute bottom-[38px] left-[84px] right-2 top-2 flex flex-col bg-win-gray p-[3px]">
          <TitleBar
            title={`Sarang's Homepage - ${file}`}
            icon="🌐"
            onMin={() => setOpen(false)}
            onClose={() => setOpen(false)}
          />
          {/* menu bar */}
          <div className="flex gap-4 px-2 text-[18px] leading-5">
            {['File', 'Edit', 'View', 'Go', 'Favorites', 'Help'].map((m) => <span key={m}>{m}</span>)}
          </div>
          {/* toolbar */}
          <div className="flex items-center gap-1 border-t border-win-dark px-1 py-[3px]">
            <Btn onClick={back} disabled={idx === 0} className="disabled:text-win-dark">◀ Back</Btn>
            <Btn onClick={fwd} disabled={idx >= hist.length - 1} className="disabled:text-win-dark">Forward ▶</Btn>
            <Btn onClick={() => go('about')}>🏠 Home</Btn>
            <Btn onClick={flash}>⟳ Refresh</Btn>
          </div>
          {/* address bar */}
          <div className="flex items-center gap-2 px-1 pb-1 text-[18px]">
            <span>Address:</span>
            <div className="bevel-in flex-1 bg-white px-2 leading-5">http://sarang.local/{file}</div>
          </div>

          {/* always-visible contact links */}
          <div className="flex flex-wrap items-center gap-x-3 border-t border-win-dark px-2 py-[2px] text-[17px] leading-5">
            <span className="text-win-dark">Links:</span>
            <A href={`mailto:${PROFILE.email}`}>✉ {PROFILE.email}</A>
            <A href={PROFILE.github}>🐙 github.com/sarangp17</A>
            <A href={PROFILE.linkedin}>💼 linkedin.com/in/sarangpalsutkar</A>
          </div>

          <div className="flex min-h-0 flex-1 gap-[3px]">
            {/* sidebar */}
            <nav className="bevel-in w-[138px] shrink-0 bg-win-light p-2 text-[20px]">
              <div className="mb-2 font-pixel text-[8px] leading-4 text-win-navy">NAVIGATE</div>
              {Object.entries(PAGES).map(([k, p]) => (
                <div key={k} className="mb-[3px] whitespace-nowrap">
                  <span className="mr-1">{p.icon}</span>
                  <a href={`#${k}`} onClick={(e) => { e.preventDefault(); go(k); }} style={{ fontWeight: page === k ? 700 : 400 }}>
                    {p.label}
                  </a>
                </div>
              ))}
              <hr className="my-2 border-win-dark" />
              <div className="mb-1 font-pixel text-[8px] leading-4 text-win-navy">LINKS</div>
              <div className="mb-[3px]"><A href={PROFILE.github}>GitHub</A></div>
              <div className="mb-[3px]"><A href={PROFILE.linkedin}>LinkedIn</A></div>
              <div><A href={`mailto:${PROFILE.email}`}>E-mail</A></div>
            </nav>

            {/* page content */}
            <main className="bevel-in win-scroll relative min-w-0 flex-1 bg-white p-3">
              <C />
            </main>
          </div>

          {/* status bar */}
          <div className="mt-[3px] flex items-center gap-2 px-1 text-[17px] leading-5">
            <div className="bevel-flat flex-1 px-2">{loading ? 'Opening page…' : 'Done'}</div>
            <div className="bevel-flat h-3 w-[120px] bg-win-gray p-[1px]">
              {loading && <div className="h-full w-2/3 bg-win-navy" />}
            </div>
            <div className="bevel-flat px-2">🌐 Local intranet</div>
          </div>
        </div>
      )}

      {/* start menu */}
      {start && (
        <div className="bevel-out absolute bottom-[34px] left-[2px] z-30 flex w-[210px] bg-win-gray p-[3px]" onClick={(e) => e.stopPropagation()}>
          <div className="flex w-7 items-end justify-center bg-win-navy pb-2">
            <span className="font-pixel text-[11px] text-white [writing-mode:vertical-rl] rotate-180">SARANG 95</span>
          </div>
          <ul className="flex-1 py-1 text-[21px]">
            {Object.entries(PAGES).map(([k, p]) => (
              <li key={k}>
                <button className="flex w-full items-center gap-2 px-2 py-[2px] text-left hover:bg-win-navy hover:text-white" onClick={() => go(k)}>
                  <span>{p.icon}</span>{p.label}
                </button>
              </li>
            ))}
            <li><hr className="my-1 border-win-dark" /></li>
            <li>
              <button className="flex w-full items-center gap-2 px-2 py-[2px] text-left hover:bg-win-navy hover:text-white" onClick={() => { setStart(false); setConfirm('shutdown'); }}>
                <span>⏻</span>Shut Down…
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* taskbar */}
      <div className="bevel-out absolute bottom-0 left-0 right-0 z-20 flex h-[34px] items-center gap-1 bg-win-gray px-[3px]">
        <button
          onClick={(e) => { e.stopPropagation(); setStart((s) => !s); }}
          className={`${start ? 'bevel-in' : 'bevel-out'} flex items-center gap-1 bg-win-gray px-2 font-pixel text-[10px] leading-6`}
        >
          <span className="grid h-3 w-3 grid-cols-2 gap-[1px]"><i className="bg-[#f25022]" /><i className="bg-[#7fba00]" /><i className="bg-[#00a4ef]" /><i className="bg-[#ffb900]" /></span>
          Start
        </button>
        <div className="mx-1 h-6 w-[2px] bg-win-dark shadow-[1px_0_0_#fff]" />
        <button
          onClick={() => setOpen((o) => !o)}
          className={`${open ? 'bevel-in' : 'bevel-out'} flex w-[190px] items-center gap-1 truncate bg-win-gray px-2 text-[18px] leading-6`}
        >
          🌐 <span className="truncate">Sarang's Homepage</span>
        </button>
        <div className="flex-1" />
        <div className="bevel-in flex items-center gap-2 px-3 text-[18px] leading-6"><button onClick={toggleMute} title="Toggle music" aria-label="Toggle music">{muted ? '🔇' : '🔊'}</button> <Clock /></div>
      </div>

      {confirm === 'shutdown' && (
        <Dialog
          title="Shut Down Windows" icon="⏻" onClose={() => setConfirm(false)}
          buttons={<>
            <Btn className="!px-5" onClick={() => { setConfirm(false); onShutdown(); }}>Yes</Btn>
            <Btn className="!px-5" onClick={() => setConfirm(false)}>No</Btn>
          </>}
        >
          Are you sure you want to shut down the computer and go back to the desk?
        </Dialog>
      )}
      {confirm === 'bin' && (
        <Dialog title="Recycle Bin" icon="🗑️" onClose={() => setConfirm(false)} buttons={<Btn className="!px-6" onClick={() => setConfirm(false)}>OK</Btn>}>
          Nothing to see here. All the bugs have already been fixed.
        </Dialog>
      )}
    </div>
  );
}
