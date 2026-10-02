import { H1 } from './Win95';
import { SKILLS } from './portfolio';

export default function Skills() {
  return (
    <div className="text-[20px]">
      <H1>Tech stack</H1>
      <p className="mb-3">Languages, frameworks and tools I actually use:</p>
      {SKILLS.map((s) => (
        <fieldset key={s.group} className="bevel-group mb-3 px-3 pb-2 pt-0">
          <legend className="bg-white px-1 font-pixel text-[9px] leading-4">{s.group}</legend>
          <div className="flex flex-wrap gap-2 pt-1">
            {s.items.map((i) => (
              <span key={i} className="bevel-out bg-win-gray px-2 text-[19px] leading-5">{i}</span>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
