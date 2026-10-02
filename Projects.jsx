import { useState } from 'react';
import { A, Btn, H1 } from './Win95';
import { CATEGORIES, PROJECTS } from './portfolio';
import { openLink } from './openLink';

export default function Projects() {
  const [cat, setCat] = useState('all');
  const list = PROJECTS.filter((p) => cat === 'all' || p.category === cat);
  const [sel, setSel] = useState(PROJECTS[0].id);
  const current = list.find((p) => p.id === sel) || list[0];

  return (
    <div className="text-[19px]">
      <H1>My projects</H1>

      {/* tab strip */}
      <div className="flex gap-[2px] pl-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCat(c.id); }}
            className={`whitespace-nowrap px-2 text-[18px] leading-5 ${cat === c.id ? 'bevel-out -mb-[2px] bg-win-gray pb-[2px]' : 'bevel-out bg-win-gray/90 text-win-dark'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="bevel-out flex gap-2 bg-win-gray p-2">
        {/* file list */}
        <ul className="bevel-in win-scroll h-[300px] w-[190px] shrink-0 bg-white p-1">
          {list.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSel(p.id)}
                className={`flex w-full items-center gap-1 px-1 text-left text-[19px] leading-6 ${current?.id === p.id ? 'bg-win-navy text-white' : 'text-black'}`}
              >
                <span>{p.icon}</span>
                <span className="truncate">{p.name}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* properties */}
        {current && (
          <div className="bevel-in win-scroll h-[300px] flex-1 bg-white p-3">
            <div className="font-pixel text-[11px] leading-4 text-win-navy">{current.icon} {current.name}</div>
            <div className="mb-2 text-win-dark">[{current.tag}]</div>
            <p className="mb-2 font-bold leading-5">{current.summary}</p>
            <ul className="ml-5 list-disc leading-5">
              {current.points.map((pt) => <li key={pt} className="mb-1">{pt}</li>)}
            </ul>
            <div className="mt-2 flex flex-wrap gap-1">
              {current.stack.map((s) => (
                <span key={s} className="bevel-out bg-win-gray px-1 text-[17px] leading-5">{s}</span>
              ))}
            </div>
            <div className="mt-3">
              {current.url ? (
                <>
                  <Btn onClick={() => openLink(current.url)}>Open on GitHub ↗</Btn>
                  <div className="mt-1 text-[16px] text-win-dark"><A href={current.url}>{current.url.replace('https://', '')}</A></div>
                </>
              ) : (
                <span className="text-win-dark">Source: not published yet.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
