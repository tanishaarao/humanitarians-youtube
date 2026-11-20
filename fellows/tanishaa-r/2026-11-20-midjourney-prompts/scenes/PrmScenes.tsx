/**
 * PrmScenes.tsx — Remotion components for "What I Learned About Midjourney Prompts"
 * (Humanitarians AI fellow progress update, Tanishaa). Registered in Root.tsx under the
 * folder "MidjourneyPrompts".
 *
 * Same look as CmpScenes / MjScenes. Every on-screen phrase is Bella's own words and appears
 * on its measured word; frames show faintly from the first word; no self-running text.
 * Quotes come from Midjourney's Prompt Basics page and handbook 6.4; B05 quotes the GPS script.
 */
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { z } from 'zod';
import { HaiBug } from './RagScenes';

const BG = '#FAF9F5';
const INK = '#3D3929';
const SOFT = '#6C6959';
const CARD = '#FFFFFF';
const BORDER = '#E5E2D9';
const ACC_TEXT = '#AF4B2D';
const OK = '#3F6B4A';
const SERIF = '"EB Garamond", Georgia, "Times New Roman", serif';
const SANS = '-apple-system, "SF Pro Text", "Segoe UI", "Helvetica Neue", sans-serif';
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace';
/** one colour per Midjourney question (all >= 4.5:1 on cream) */
const QCOL: Record<string, string> = {
  subject: INK, medium: ACC_TEXT, environment: OK, lighting: '#7A5A12', colour: '#5B4B8A', mood: '#2B6474', composition: '#7A3E5C',
};

const SX = 96;
const PX = 54, PY = 96, PSERIF = 92, PSANS = 72;

const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
let FADE = 0.03;
const rise = (t: number, a: number, len = FADE) => {
  const p = cl(interpolate(t, [a, a + len], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return 1 - Math.pow(1 - p, 3);
};
const useT = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  FADE = (0.35 * fps) / Math.max(1, durationInFrames);
  return frame / Math.max(1, durationInFrames - 1);
};
const dur = { durationSeconds: z.number().optional() };
const ghost = (o: number) => 0.4 + 0.6 * o;
const PBug: React.FC = () => (
  <Img src={staticFile('logos/humanitarians/humanitarians-logo-1.svg')}
    style={{ position: 'absolute', right: PX, bottom: PY, height: 60, opacity: 0.32 }} />
);
const Bug: React.FC<{ portrait: boolean }> = ({ portrait }) => (portrait ? <PBug /> : <HaiBug />);
const Line: React.FC<{ text: string; o: number; size: number; color?: string; font?: string; style?: React.CSSProperties }> =
  ({ text, o, size, color = INK, font = SERIF, style }) => (
    <div style={{ fontFamily: font, fontSize: size, lineHeight: 1.15, color, opacity: o, transform: `translateY(${(1 - o) * 18}px)`, ...style }}>{text}</div>
  );
const S = (portrait: boolean, l: number, p: number = PSERIF - 4) => (portrait ? p : l);
const MjLogo: React.FC<{ h: number; o?: number }> = ({ h, o = 1 }) => (
  <Img src={staticFile('logos/midjourney/midjourney-01.svg')} style={{ height: h, width: h, opacity: o, display: 'block' }} />
);
const Source: React.FC<{ text: string; o: number; portrait: boolean }> = ({ text, o, portrait }) => (
  <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX + 200, bottom: portrait ? PY + 200 : 66, fontFamily: SANS,
    fontSize: portrait ? PSANS : 44, color: SOFT, opacity: o }}>{text}</div>
);

// ===========================================================================
// PrmThought — "give Midjourney more information / and you get better pictures / That's half right."
// ===========================================================================
export const prmThoughtSchema = z.object({
  points: z.array(z.object({ text: z.string(), at: z.number(), accent: z.boolean().default(false) })), ...dur,
});
const ThoughtScene: React.FC<{ p: z.infer<typeof prmThoughtSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 40, top: portrait ? PY + 60 : 120 }}><MjLogo h={portrait ? 200 : 150} /></div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 40, right: portrait ? PX : SX, top: portrait ? 480 : 360 }}>
        {p.points.map((pt, i) => (
          <Line key={i} text={pt.text} o={rise(t, pt.at)} size={S(portrait, 84, PSERIF + 6)} color={pt.accent ? ACC_TEXT : INK}
            style={{ marginBottom: portrait ? 50 : 30 }} />
        ))}
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmThought: React.FC<z.infer<typeof prmThoughtSchema>> = (p) => <ThoughtScene p={p} portrait={false} />;
export const PrmThought916: React.FC<z.infer<typeof prmThoughtSchema>> = (p) => <ThoughtScene p={p} portrait />;

// ===========================================================================
// PrmExample — Midjourney's own example: the long request vs the one-line prompt.
// ===========================================================================
export const prmExampleSchema = z.object({
  guideAt: z.number(), shortLabel: z.string(), shortAt: z.number(), longLabel: z.string(), longAt: z.number(),
  longPrompt: z.string(), shortPrompt: z.string(), exampleAt: z.number(), source: z.string(), ...dur,
});
const ExampleScene: React.FC<{ p: z.infer<typeof prmExampleSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const go = rise(t, p.guideAt), so = rise(t, p.shortAt), lo = rise(t, p.longAt), eo = rise(t, p.exampleAt);
  const card = (text: string, o: number, border: string, faded: boolean) => (
    <div style={{ background: CARD, border: `4px solid ${border}`, borderRadius: 22, padding: portrait ? '24px 30px' : '26px 34px',
      fontFamily: SANS, fontSize: portrait ? PSANS : 44, lineHeight: 1.3, color: faded ? SOFT : INK, opacity: o }}>{text}</div>
  );
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 20 : 70 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: ghost(go), marginBottom: portrait ? 40 : 30 }}>
          <MjLogo h={portrait ? 120 : 84} />
          <Line text="Midjourney's own guide" o={go} size={S(portrait, 60)} />
        </div>
        <Line text={p.shortLabel} o={so} size={S(portrait, 60)} color={OK} style={{ marginBottom: portrait ? 20 : 12 }} />
        <Line text={p.longLabel} o={lo} size={S(portrait, 60)} color={ACC_TEXT} style={{ marginBottom: portrait ? 40 : 34 }} />
        <div style={{ display: 'flex', flexDirection: portrait ? 'column' : 'row', gap: portrait ? 30 : 40, alignItems: 'stretch' }}>
          <div style={{ flex: 1.3 }}>{card(portrait ? p.longPrompt.split(', and draw')[0].replace(/, make them bright.*$/, ', make them bright…') : p.longPrompt, ghost(lo) * (eo > 0.5 ? 0.75 : 1), BORDER, true)}</div>
          <div style={{ flex: 1 }}>{card(p.shortPrompt, ghost(eo), eo > 0.5 ? OK : BORDER, false)}</div>
        </div>
        {portrait ? <div style={{ fontFamily: SANS, fontSize: PSANS, color: SOFT, opacity: ghost(go), marginTop: 24 }}>Midjourney, Prompt Basics</div> : null}
      </div>
      {portrait ? null : <Source text={p.source} o={ghost(go)} portrait={portrait} />}
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmExample: React.FC<z.infer<typeof prmExampleSchema>> = (p) => <ExampleScene p={p} portrait={false} />;
export const PrmExample916: React.FC<z.infer<typeof prmExampleSchema>> = (p) => <ExampleScene p={p} portrait />;

// ===========================================================================
// PrmSlider — fewer details mean more variety, but less control → the right details, not more words.
// ===========================================================================
export const prmSliderSchema = z.object({
  fewerAt: z.number(), lessAt: z.number(), rightAt: z.number(), fewer: z.string(), less: z.string(), right: z.string(), ...dur,
});
const SliderScene: React.FC<{ p: z.infer<typeof prmSliderSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const fo = rise(t, p.fewerAt), lo = rise(t, p.lessAt), ro = rise(t, p.rightAt);
  const W = portrait ? 972 : 1500;
  const knob = 0.15 + 0.35 * lo + 0.2 * ro;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 60, top: portrait ? PY + 60 : 140, width: W }}>
        <Line text={p.fewer} o={fo} size={S(portrait, 66)} style={{ marginBottom: 12 }} />
        <Line text={p.less} o={lo} size={S(portrait, 66)} color={ACC_TEXT} style={{ marginBottom: portrait ? 80 : 70 }} />
        <div style={{ position: 'relative', height: 40, opacity: ghost(fo) }}>
          <div style={{ position: 'absolute', top: 16, left: 0, right: 0, height: 8, borderRadius: 4, background: BORDER }} />
          <div style={{ position: 'absolute', top: 16, left: 0, width: W * knob, height: 8, borderRadius: 4, background: OK }} />
          <div style={{ position: 'absolute', top: 0, left: W * knob - 20, width: 40, height: 40, borderRadius: 20, background: OK }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, opacity: ghost(fo) }}>
          <Line text="variety" o={fo} size={S(portrait, 54, PSERIF - 10)} color={SOFT} />
          <Line text="control" o={lo} size={S(portrait, 54, PSERIF - 10)} color={SOFT} />
        </div>
        <Line text={p.right} o={ro} size={S(portrait, 80, PSERIF + 6)} color={OK} style={{ marginTop: portrait ? 120 : 90 }} />
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmSlider: React.FC<z.infer<typeof prmSliderSchema>> = (p) => <SliderScene p={p} portrait={false} />;
export const PrmSlider916: React.FC<z.infer<typeof prmSliderSchema>> = (p) => <SliderScene p={p} portrait />;

// ===========================================================================
// PrmSeven — the seven questions, each chip on its word.
// ===========================================================================
export const prmSevenSchema = z.object({
  items: z.array(z.object({ text: z.string(), at: z.number() })), guessAt: z.number(), guess: z.string(), source: z.string(), ...dur,
});
const SevenScene: React.FC<{ p: z.infer<typeof prmSevenSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const go = rise(t, p.guessAt);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 40 : 120, display: 'flex', flexWrap: 'wrap',
        gap: portrait ? 26 : 30 }}>
        {p.items.map((it, i) => {
          const o = rise(t, it.at);
          const c = QCOL[it.text] ?? INK;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: portrait ? 18 : 16, minWidth: portrait ? 440 : 360, height: portrait ? 110 : 96 }}>
              <div style={{ width: portrait ? 34 : 30, height: portrait ? 34 : 30, borderRadius: 999, background: c, opacity: ghost(o) }} />
              <span style={{ fontFamily: SERIF, fontSize: S(portrait, 70, PSERIF + 2), color: c, opacity: o }}>{it.text}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? 1180 : 640 }}>
        <Line text={p.guess} o={go} size={S(portrait, 64)} color={ACC_TEXT} />
      </div>
      <Source text={p.source} o={ghost(rise(t, p.items[0]?.at ?? 0))} portrait={portrait} />
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmSeven: React.FC<z.infer<typeof prmSevenSchema>> = (p) => <SevenScene p={p} portrait={false} />;
export const PrmSeven916: React.FC<z.infer<typeof prmSevenSchema>> = (p) => <SevenScene p={p} portrait />;

// ===========================================================================
// PrmScript — a real scene from the GPS script; the key words light up as Bella names them.
// ===========================================================================
export const prmScriptSchema = z.object({
  label: z.string(), labelAt: z.number(), lines: z.array(z.string()), marks: z.array(z.object({ text: z.string(), at: z.number() })), ...dur,
});
const ScriptScene: React.FC<{ p: z.infer<typeof prmScriptSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const lo = rise(t, p.labelAt);
  // split the text into plain and marked runs
  const runsOf = (text: string) => {
    const runs: { s: string; m: number }[] = [];
    const order = p.marks.map((m, i) => ({ ...m, i, pos: text.indexOf(m.text) })).filter((m) => m.pos >= 0).sort((a, b) => a.pos - b.pos);
    let cursor = 0;
    for (const m of order) {
      if (m.pos > cursor) runs.push({ s: text.slice(cursor, m.pos), m: -1 });
      runs.push({ s: m.text, m: m.i });
      cursor = m.pos + m.text.length;
    }
    if (cursor < text.length) runs.push({ s: text.slice(cursor), m: -1 });
    return runs;
  };
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 60, right: portrait ? PX : SX + 60, top: portrait ? PY + 60 : 140 }}>
        <Line text={p.label} o={lo} size={S(portrait, 54)} color={SOFT} style={{ marginBottom: 30 }} />
        <div style={{ background: CARD, border: `3px solid ${BORDER}`, borderRadius: 22, padding: portrait ? '36px 36px' : '44px 54px', opacity: ghost(lo),
          fontFamily: SERIF, fontSize: S(portrait, 70, PSERIF + 2), lineHeight: 1.35, color: INK }}>
          {p.lines.map((ln, li) => (
            <div key={li} style={{ marginBottom: li < p.lines.length - 1 ? 18 : 0 }}>
              {runsOf(ln).map((r, i) => {
                if (r.m < 0) return <span key={i} style={{ opacity: lo }}>{r.s}</span>;
                const o = rise(t, p.marks[r.m].at);
                return <span key={i} style={{ opacity: lo, color: o > 0.5 ? ACC_TEXT : INK, borderBottom: `6px solid ${o > 0.5 ? ACC_TEXT : 'transparent'}` }}>{r.s}</span>;
              })}
            </div>
          ))}
        </div>
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmScript: React.FC<z.infer<typeof prmScriptSchema>> = (p) => <ScriptScene p={p} portrait={false} />;
export const PrmScript916: React.FC<z.infer<typeof prmScriptSchema>> = (p) => <ScriptScene p={p} portrait />;

// ===========================================================================
// PrmBuild — the prompt grows from one word as each question is answered (parts tinted by question).
// ===========================================================================
export const prmBuildSchema = z.object({
  start: z.string(), startAt: z.number(), answeredAt: z.number(), note: z.string(),
  parts: z.array(z.object({ text: z.string(), q: z.string(), at: z.number() })), ...dur,
});
const BuildScene: React.FC<{ p: z.infer<typeof prmBuildSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const so = rise(t, p.startAt), ao = rise(t, p.answeredAt);
  const firstPart = p.parts[0]?.at ?? 1;
  const startFade = rise(t, firstPart);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 10 : 90 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: portrait ? 26 : 30 }}>
          <MjLogo h={portrait ? 110 : 80} o={ghost(so)} />
          <Line text={ao > 0.5 ? 'I answered the questions from the script' : 'one word leaves almost everything to guess'} o={so}
            size={S(portrait, 56)} color={ao > 0.5 ? OK : ACC_TEXT} />
        </div>
        <div style={{ background: CARD, border: `4px solid ${BORDER}`, borderRadius: 28, padding: portrait ? '30px 34px' : '30px 40px', opacity: ghost(so),
          fontFamily: SERIF, fontSize: S(portrait, 60, PSERIF - 6), lineHeight: portrait ? 1.28 : 1.4 }}>
          <span style={{ opacity: so * (1 - 0.7 * startFade), color: INK, textDecoration: startFade > 0.5 ? 'line-through' : 'none' }}>{p.start}</span>
          {p.parts.map((pt, i) => {
            const o = rise(t, pt.at);
            return <span key={i} style={{ color: QCOL[pt.q] ?? INK, opacity: o }}>{(i === 0 ? '  ' : ', ') + pt.text}</span>;
          })}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: portrait ? 14 : 16, marginTop: portrait ? 28 : 30 }}>
          {p.parts.filter((pt, i, a) => a.findIndex((x) => x.q === pt.q) === i).map((pt, i) => (
            <span key={i} style={{ fontFamily: SANS, fontSize: portrait ? PSANS : 44, color: QCOL[pt.q] ?? INK, border: `3px solid ${QCOL[pt.q] ?? INK}`,
              borderRadius: 999, padding: portrait ? '6px 26px' : '4px 22px', opacity: rise(t, pt.at) }}>{pt.q}</span>
          ))}
        </div>
        {portrait ? <div style={{ fontFamily: SANS, fontSize: PSANS, color: SOFT, marginTop: 26,
          opacity: ghost(rise(t, p.parts[p.parts.length - 1]?.at ?? 1)) }}>{p.note}</div> : null}
      </div>
      {portrait ? null : <Source text={p.note} o={ghost(rise(t, p.parts[p.parts.length - 1]?.at ?? 1))} portrait={portrait} />}
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmBuild: React.FC<z.infer<typeof prmBuildSchema>> = (p) => <BuildScene p={p} portrait={false} />;
export const PrmBuild916: React.FC<z.infer<typeof prmBuildSchema>> = (p) => <BuildScene p={p} portrait />;

// ===========================================================================
// PrmTips — two cards: name the colour, not the feeling; say what you want, then --no.
// ===========================================================================
export const prmTipsSchema = z.object({
  cards: z.array(z.object({ title: z.string(), titleAt: z.number(), body: z.string(), bodyAt: z.number(),
    extra: z.string().optional(), extraAt: z.number().optional() })), ...dur,
});
const TipsScene: React.FC<{ p: z.infer<typeof prmTipsSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 30 : 110, display: 'flex',
        flexDirection: portrait ? 'column' : 'row', gap: portrait ? 40 : 50 }}>
        {p.cards.map((c, i) => {
          const to = rise(t, c.titleAt), bo = rise(t, c.bodyAt), eo = c.extraAt != null ? rise(t, c.extraAt) : 0;
          return (
            <div key={i} style={{ flex: 1, background: CARD, border: `4px solid ${to > 0.5 ? ACC_TEXT : BORDER}`, borderRadius: 24,
              padding: portrait ? '30px 34px' : '36px 40px', opacity: ghost(to), minHeight: portrait ? 0 : 520, boxSizing: 'border-box' }}>
              <Line text={c.title} o={to} size={S(portrait, 64)} color={ACC_TEXT} style={{ marginBottom: portrait ? 24 : 30 }} />
              <Line text={c.body} o={bo} size={S(portrait, 56)} style={{ marginBottom: 20 }} />
              {c.extra ? <div style={{ fontFamily: MONO, fontSize: portrait ? PSANS + 6 : 52, color: OK, opacity: eo }}>{c.extra}</div> : null}
            </div>
          );
        })}
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmTips: React.FC<z.infer<typeof prmTipsSchema>> = (p) => <TipsScene p={p} portrait={false} />;
export const PrmTips916: React.FC<z.infer<typeof prmTipsSchema>> = (p) => <TipsScene p={p} portrait />;

// ===========================================================================
// PrmNext — next week's experiment, step by step on her words.
// ===========================================================================
export const prmNextSchema = z.object({ headAt: z.number(), steps: z.array(z.object({ text: z.string(), at: z.number() })), ...dur });
const NextScene: React.FC<{ p: z.infer<typeof prmNextSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const ho = rise(t, p.headAt);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 60, right: portrait ? PX : SX, top: portrait ? PY + 60 : 150 }}>
        <Line text="Next week" o={ho} size={S(portrait, 84, PSERIF + 10)} color={ACC_TEXT} style={{ marginBottom: portrait ? 60 : 50 }} />
        {p.steps.map((st, i) => (
          <div key={i} style={{ display: 'flex', gap: 28, alignItems: 'baseline', marginBottom: portrait ? 36 : 30, opacity: ghost(rise(t, st.at)) }}>
            <span style={{ fontFamily: SERIF, fontSize: S(portrait, 64), color: ACC_TEXT, opacity: rise(t, st.at) }}>{i + 1}.</span>
            <Line text={st.text} o={rise(t, st.at)} size={S(portrait, 64)} />
          </div>
        ))}
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const PrmNext: React.FC<z.infer<typeof prmNextSchema>> = (p) => <NextScene p={p} portrait={false} />;
export const PrmNext916: React.FC<z.infer<typeof prmNextSchema>> = (p) => <NextScene p={p} portrait />;
