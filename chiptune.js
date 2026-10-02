// Original procedural chiptune, generated live with the Web Audio API (no audio files).
// Am - F - C - G loop at 92 BPM: square arpeggio, triangle bass, soft lead, noise drums.

const BPM = 92;
const STEP = 60 / BPM / 4; // 16th note
const LOOKAHEAD = 0.25;

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

const CHORDS = [
  { bass: 45, tones: [57, 60, 64, 69] }, // Am
  { bass: 41, tones: [53, 57, 60, 65] }, // F
  { bass: 48, tones: [60, 64, 67, 72] }, // C
  { bass: 43, tones: [55, 59, 62, 67] }, // G
];
// 8 eighth-note slots per bar
const LEAD = [
  [76, null, 74, 72, null, 69, null, 72],
  [72, null, 69, null, 65, 69, 72, null],
  [76, null, 79, 76, null, 72, null, 76],
  [74, null, 71, null, 67, 71, 74, null],
];

let ctx = null;
let master = null;
let noiseBuf = null;
let timer = null;
let nextTime = 0;
let step = 0;
let started = false;
let muted = false;
const listeners = new Set();

try { muted = localStorage.getItem('sp-muted') === '1'; } catch { /* ignore */ }

function emit() { listeners.forEach((f) => f()); }
export function subscribeAudio(f) { listeners.add(f); return () => listeners.delete(f); }
export function isMuted() { return muted; }

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.16;
  master.connect(ctx.destination);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return ctx;
}

function tone(type, freq, t, dur, vol, dest = master) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(t, dur, vol, hp = 6000) {
  const s = ctx.createBufferSource();
  s.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = 'highpass';
  f.frequency.value = hp;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(master);
  s.start(t);
  s.stop(t + dur + 0.02);
}

function kick(t) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.setValueAtTime(150, t);
  o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
  g.gain.setValueAtTime(0.9, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.2);
}

function scheduleStep(i, t) {
  const bar = Math.floor(i / 16) % 4;
  const s = i % 16;
  const chord = CHORDS[bar];
  // drums
  if (s === 0 || s === 8 || s === 10) kick(t);
  if (s === 4 || s === 12) noise(t, 0.12, 0.5, 1800);
  if (s % 2 === 0) noise(t, 0.04, s % 4 === 0 ? 0.22 : 0.12, 7000);
  // bass (triangle)
  if (s === 0 || s === 6 || s === 8 || s === 14) tone('triangle', mtof(chord.bass), t, STEP * 3.2, 0.7);
  // arpeggio (square)
  if (s % 2 === 0) {
    const order = [0, 1, 2, 3, 2, 1, 2, 1];
    tone('square', mtof(chord.tones[order[(s / 2) % 8]]), t, STEP * 1.6, 0.16);
  }
  // lead (every 2 steps = eighth notes)
  if (s % 2 === 0) {
    const n = LEAD[bar][s / 2];
    if (n) tone('triangle', mtof(n), t, STEP * 3.6, 0.45);
  }
}

function tick() {
  while (nextTime < ctx.currentTime + LOOKAHEAD) {
    scheduleStep(step, nextTime);
    nextTime += STEP;
    step = (step + 1) % 64;
  }
}

export function startMusic() {
  if (!ensureCtx()) return;
  if (ctx.state === 'suspended') ctx.resume();
  if (started) return;
  started = true;
  nextTime = ctx.currentTime + 0.1;
  step = 0;
  timer = setInterval(tick, 40);
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });
}

export function stopMusic() {
  clearInterval(timer);
  started = false;
}

export function setMuted(m) {
  muted = m;
  try { localStorage.setItem('sp-muted', m ? '1' : '0'); } catch { /* ignore */ }
  if (ctx && master) master.gain.setTargetAtTime(m ? 0 : 0.16, ctx.currentTime, 0.05);
  emit();
}

export function toggleMute() {
  startMusic();
  setMuted(!muted);
}

/* ---------- one-shot UI sounds ---------- */
export function playPostBeep() {
  if (!ctx || muted) return;
  tone('square', 1000, ctx.currentTime, 0.12, 0.25);
}

/** Original rising startup chime for the desktop (not the Windows one). */
export function playChime() {
  if (!ctx || muted) return;
  const t = ctx.currentTime + 0.02;
  [60, 64, 67, 72, 76].forEach((m, i) => tone('triangle', mtof(m), t + i * 0.11, 0.9, 0.5));
  [48, 55].forEach((m) => tone('sine', mtof(m), t, 1.2, 0.5));
}

export function playClick() {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  tone('square', 880, t, 0.04, 0.12);
}
