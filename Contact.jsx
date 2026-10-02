import { useState } from 'react';
import { A, Btn, Dialog, Field, H1, fieldClass } from './Win95';
import { PROFILE } from './portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1500); };
    try { navigator.clipboard.writeText(PROFILE.email).then(done, done); } catch { done(); }
  };
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [dialog, setDialog] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setDialog({ icon: '⚠️', title: 'Missing fields', text: 'Please fill in your name, e-mail and message.' });
      return;
    }
    // Mock send: nothing leaves the browser.
    setDialog({
      icon: 'ℹ️',
      title: 'Message queued',
      text: `Thanks, ${form.name}! This is a demo form, so nothing was actually sent. Please e-mail me directly at ${PROFILE.email}.`,
    });
  };

  return (
    <div className="text-[20px]">
      <H1>Sign my guestbook</H1>
      <p className="mb-3">Open to internships, entry-level roles and collaborations. I'm based in {PROFILE.location}.</p>

      <form onSubmit={send} className="bevel-group p-3">
        <Field label="Your name:"><input className={fieldClass} value={form.name} onChange={set('name')} /></Field>
        <Field label="E-mail address:"><input type="email" className={fieldClass} value={form.email} onChange={set('email')} /></Field>
        <Field label="Message:"><textarea rows={4} className={`${fieldClass} resize-none`} value={form.message} onChange={set('message')} /></Field>
        <div className="flex gap-2">
          <Btn type="submit" className="!px-5">Send</Btn>
          <Btn type="button" onClick={() => setForm({ name: '', email: '', message: '' })}>Reset</Btn>
        </div>
      </form>

      <div className="mt-3 flex flex-col gap-2 text-[20px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-[100px]">✉ E-mail:</span>
          <A href={`mailto:${PROFILE.email}`}>{PROFILE.email}</A>
          <Btn type="button" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</Btn>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-[100px]">🐙 GitHub:</span>
          <A href={PROFILE.github}>github.com/sarangp17</A>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-[100px]">💼 LinkedIn:</span>
          <A href={PROFILE.linkedin}>linkedin.com/in/sarangpalsutkar</A>
        </div>
      </div>

      {dialog && (
        <Dialog
          title={dialog.title}
          icon={dialog.icon}
          onClose={() => setDialog(null)}
          buttons={<Btn className="!px-6" onClick={() => setDialog(null)}>OK</Btn>}
        >
          {dialog.text}
        </Dialog>
      )}
    </div>
  );
}
