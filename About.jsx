import { A, H1, Rule } from './Win95';
import { ABOUT, PROFILE } from './portfolio';

const ROWS = [
  ['Name', PROFILE.name],
  ['Status', PROFILE.status],
  ['School', `${PROFILE.school} (${PROFILE.years})`],
  ['CGPA', PROFILE.cgpa],
  ['Looking for', PROFILE.targets],
  ['Availability', PROFILE.availability],
  ['Based in', PROFILE.location],
  ['Hobbies', 'Football, and building things with sports data'],
];

export default function About() {
  return (
    <div className="text-[20px] leading-[22px]">
      <div className="bevel-in mb-3 overflow-hidden bg-black py-1 font-pixel text-[10px] text-[#39ff88]">
        <span className="marquee-run">*** WELCOME TO MY HOMEPAGE *** WELCOME TO MY HOMEPAGE *** WELCOME TO MY HOMEPAGE ***</span>
      </div>
      <H1>Hi, I'm Sarang!</H1>
      <p className="mb-2">{ABOUT.intro}</p>

      <H1>What I do</H1>
      <ul className="mb-2 ml-5 list-disc">
        {ABOUT.focus.map(([t, d]) => (
          <li key={t}><b>{t}</b>: {d}</li>
        ))}
      </ul>
      <div className="bevel-in my-2 bg-[#ffffe0] p-2">
        <b>📢 Open to work:</b> {ABOUT.availability}
      </div>

      <table className="my-3 w-full border-collapse text-[19px]">
        <tbody>
          {ROWS.map(([k, v]) => (
            <tr key={k}>
              <th className="w-[120px] border border-win-dark bg-win-light px-2 py-[1px] text-left font-normal">{k}</th>
              <td className="border border-win-dark px-2 py-[1px]">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <H1>Off the keyboard</H1>
      <p>⚽ {ABOUT.hobbies}</p>

      <Rule />
      <H1>Experience</H1>
      <p><b>{ABOUT.experience.role}</b></p>
      <p className="text-win-dark">{ABOUT.experience.org} · {ABOUT.experience.when}</p>
      <ul className="ml-5 mt-1 list-disc">
        {ABOUT.experience.points.map((p) => <li key={p}>{p}</li>)}
      </ul>

      <Rule />
      <H1>Certifications</H1>
      <ul className="ml-5 list-disc">
        {ABOUT.certs.map((c) => <li key={c}>{c}</li>)}
      </ul>

      <Rule />
      <p>
        Find me on <A href={PROFILE.github}>GitHub</A> or <A href={PROFILE.linkedin}>LinkedIn</A>.
      </p>
    </div>
  );
}
