/**
 * CmpScenes.tsx — Remotion components for "How Compression Shrinks a File"
 * (Humanitarians AI fellow explainer, Tanishaa). Registered in Root.tsx under the folder
 * "HowCompressionWorks".
 *
 * Same look as GpsScenes / QrScenes / MjScenes. 1920x1080 and native 1080x1920 <Name>916.
 * Rules carried over from Tanishaa's notes: every on-screen phrase is Bella's own words and
 * appears on its measured word; each scene's frame (outlines, tracks, grids) shows faintly
 * from the first word so the screen is never empty; no self-running text. Numbers and
 * pictures are real output of youtube/how-compression-works/demo/compress_demo.py
 * (pictures copied to public/compression/).
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
const ACC = '#D97757';
const ACC_TEXT = '#AF4B2D';
const OK = '#3F6B4A';
const SERIF = '"EB Garamond", Georgia, "Times New Roman", serif';
const SANS = '-apple-system, "SF Pro Text", "Segoe UI", "Helvetica Neue", sans-serif';
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace';

const SX = 96;
const PX = 54, PY = 96, PSERIF = 92, PSANS = 72;
const PW = 1080;

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
/** frames (not words) show faintly from the start and fully on their cue */
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
const S = (portrait: boolean, l: number, p: number = PSERIF - 6) => (portrait ? p : l);

// ===========================================================================
// CmpHook — a file that shrinks; "every letter comes back"; "throw away what you won't notice".
// ===========================================================================
export const cmpHookSchema = z.object({
  shrinkAt: z.number(),
  points: z.array(z.object({ text: z.string(), at: z.number(), accent: z.boolean().default(false) })),
  ...dur,
});
const FileIcon: React.FC<{ w: number; color?: string; label?: string; o?: number }> = ({ w, color = INK, label, o = 1 }) => {
  const h = w * 1.3, f = w * 0.28;
  return (
    <svg width={w} height={h} style={{ opacity: o, display: 'block' }}>
      <path d={`M4 4 H${w - f} L${w - 4} ${f} V${h - 4} H4 Z`} fill={CARD} stroke={color} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M${w - f} 4 V${f} H${w - 4}`} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
      {[0.38, 0.5, 0.62, 0.74].map((y, i) => <rect key={i} x={w * 0.18} y={h * y} width={w * (i === 3 ? 0.4 : 0.64)} height={w * 0.05} rx={w * 0.02} fill={BORDER} />)}
      {label ? <text x={w / 2} y={h * 0.27} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={w * 0.2} fill={color}>{label}</text> : null}
    </svg>
  );
};
const HookScene: React.FC<{ p: z.infer<typeof cmpHookSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const so = rise(t, p.shrinkAt, FADE * 2);
  const w = portrait ? 380 : 360;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? (PW - w) / 2 : SX + 120, top: portrait ? 180 : 230, transform: `scale(${1 - 0.4 * so})`,
        transformOrigin: 'center center' }}>
        <FileIcon w={w} label={so > 0.5 ? 'ZIP' : undefined} color={so > 0.5 ? ACC_TEXT : INK} />
      </div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 700, right: portrait ? PX : SX, top: portrait ? 860 : 330 }}>
        {p.points.map((pt, i) => (
          <Line key={i} text={pt.text} o={rise(t, pt.at)} size={S(portrait, 84, PSERIF + 6)} color={pt.accent ? ACC_TEXT : INK}
            style={{ marginBottom: portrait ? 60 : 50 }} />
        ))}
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpHook: React.FC<z.infer<typeof cmpHookSchema>> = (p) => <HookScene p={p} portrait={false} />;
export const CmpHook916: React.FC<z.infer<typeof cmpHookSchema>> = (p) => <HookScene p={p} portrait />;

// ===========================================================================
// CmpColumns — two labelled columns (no ticks or crosses: neither side is "wrong"),
// items on their words, optional card at the bottom.
// ===========================================================================
const col = z.object({ header: z.string(), at: z.number(), items: z.array(z.object({ text: z.string(), at: z.number() })) });
export const cmpColumnsSchema = z.object({ left: col, right: col, card: z.string().default(''), cardAt: z.number().default(0.99), ...dur });
const ColumnsScene: React.FC<{ p: z.infer<typeof cmpColumnsSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const colEl = (c: z.infer<typeof col>, color: string) => {
    const ho = rise(t, c.at);
    return (
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: SERIF, fontSize: S(portrait, 92, PSERIF + 10), color, opacity: ho, height: portrait ? 120 : 116 }}>{c.header}</div>
        <div style={{ height: 5, background: color, opacity: ghost(ho), marginBottom: portrait ? 30 : 30 }} />
        {c.items.map((it, i) => (
          <Line key={i} text={it.text} o={rise(t, it.at)} size={S(portrait, 68)} style={{ marginBottom: portrait ? 26 : 30 }} />
        ))}
      </div>
    );
  };
  const co = rise(t, p.cardAt);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 30 : 190, display: 'flex',
        flexDirection: portrait ? 'column' : 'row', gap: portrait ? 90 : 120 }}>
        {colEl(p.left, INK)}
        {colEl(p.right, ACC_TEXT)}
      </div>
      {p.card ? (
        <div style={{ position: 'absolute', left: portrait ? PX : SX + 200, right: portrait ? PX : SX + 200, top: portrait ? 1450 : 800, border: `4px solid ${ACC_TEXT}`,
          borderRadius: 18, padding: portrait ? '24px 30px' : '20px 30px', textAlign: 'center', fontFamily: SERIF, fontSize: S(portrait, 58), color: ACC_TEXT,
          background: CARD, opacity: co }}>{p.card}</div>
      ) : null}
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpColumns: React.FC<z.infer<typeof cmpColumnsSchema>> = (p) => <ColumnsScene p={p} portrait={false} />;
export const CmpColumns916: React.FC<z.infer<typeof cmpColumnsSchema>> = (p) => <ColumnsScene p={p} portrait />;

// ===========================================================================
// CmpRepeat — "Merrily, merrily, merrily, merrily,": the first letters are written out,
// the rest becomes one note: go back 9, copy 25 (real LZ77 output from the demo).
// ===========================================================================
export const cmpRepeatSchema = z.object({
  source: z.string(), line: z.string(), literals: z.number(), back: z.number(), len: z.number(),
  lineAt: z.number(), literalsAt: z.number(), noteAt: z.number(), tailAt: z.number(), tail: z.string(),
  ...dur,
});
const RepeatScene: React.FC<{ p: z.infer<typeof cmpRepeatSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const lo = rise(t, p.lineAt), li = rise(t, p.literalsAt), no = rise(t, p.noteAt), to = rise(t, p.tailAt);
  const fs = portrait ? 92 : 76;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 20 : 90 }}>
        <Line text={`from “${p.source}”`} o={lo} size={S(portrait, 54)} color={SOFT} />
        <div style={{ marginTop: portrait ? 50 : 40, background: CARD, border: `3px solid ${BORDER}`, borderRadius: 22, padding: portrait ? '30px 30px' : '34px 40px',
          opacity: ghost(lo), display: 'flex', flexWrap: 'wrap', fontFamily: MONO, fontSize: fs, lineHeight: 1.4 }}>
          {(p.line.match(/\S+\s*/g) || []).map((word, wi, arr) => {
            const start = arr.slice(0, wi).join('').length;
            return (
              <span key={wi} style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                {word.split('').map((ch, ci) => {
            const i = start + ci;
            const lit = i < p.literals;
            return (
              <span key={i} style={{ whiteSpace: 'pre', opacity: lo < 0.5 ? 0 : lit ? 1 : 1 - 0.72 * no,
                color: lit && li > 0.5 ? ACC_TEXT : INK, fontWeight: 600, borderBottom: lit && li > 0.5 ? `6px solid ${ACC_TEXT}` : '6px solid transparent' }}>{ch}</span>
            );
                })}
              </span>
            );
          })}
        </div>
        <div style={{ marginTop: portrait ? 50 : 40, display: 'flex', flexDirection: portrait ? 'column' : 'row', gap: portrait ? 30 : 50, alignItems: portrait ? 'flex-start' : 'center' }}>
          <Line text={`the first ${p.literals} letters`} o={li} size={S(portrait, 58)} color={ACC_TEXT} />
          <div style={{ opacity: no, background: ACC_TEXT, color: CARD, borderRadius: 18, padding: portrait ? '18px 34px' : '14px 34px',
            fontFamily: SERIF, fontSize: S(portrait, 64, PSERIF), transform: `scale(${0.9 + 0.1 * no})` }}>
            then one note: go back {p.back}, copy {p.len}</div>
        </div>
        <Line text={p.tail} o={to} size={S(portrait, 58)} style={{ marginTop: portrait ? 60 : 50 }} />
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpRepeat: React.FC<z.infer<typeof cmpRepeatSchema>> = (p) => <RepeatScene p={p} portrait={false} />;
export const CmpRepeat916: React.FC<z.infer<typeof cmpRepeatSchema>> = (p) => <RepeatScene p={p} portrait />;

// ===========================================================================
// CmpMorse — E is common: one dot. Q is rare: four signals. Common → short, rare → long.
// ===========================================================================
export const cmpMorseSchema = z.object({ introAt: z.number(), eAt: z.number(), qAt: z.number(), ruleAt: z.number(), ...dur });
const Signals: React.FC<{ code: string; u: number; color: string }> = ({ code, u, color }) => (
  <div style={{ display: 'flex', gap: u * 0.7, alignItems: 'center' }}>
    {code.split('').map((c, i) => <div key={i} style={{ width: c === '.' ? u : u * 3, height: u, borderRadius: u / 2, background: color }} />)}
  </div>
);
const MorseScene: React.FC<{ p: z.infer<typeof cmpMorseSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const io = rise(t, p.introAt), eo = rise(t, p.eAt), qo = rise(t, p.qAt), ro = rise(t, p.ruleAt);
  const u = portrait ? 56 : 52;
  const row = (letter: string, code: string, label: string, o: number, color: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: portrait ? 40 : 60, marginBottom: portrait ? 40 : 40, opacity: ghost(o) }}>
      <div style={{ width: portrait ? 150 : 150, height: portrait ? 150 : 150, borderRadius: 24, border: `4px solid ${o > 0.5 ? color : BORDER}`, background: CARD,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: portrait ? 110 : 100, color: INK }}>
        <span style={{ opacity: o }}>{letter}</span></div>
      <div>
        <div style={{ opacity: o }}><Signals code={code} u={u} color={color} /></div>
        <Line text={label} o={o} size={S(portrait, 58)} color={color} style={{ marginTop: portrait ? 20 : 16 }} />
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 40, right: portrait ? PX : SX, top: portrait ? PY + 20 : 80 }}>
        <Line text="like Morse code" o={io} size={S(portrait, 70, PSERIF + 6)} style={{ marginBottom: portrait ? 70 : 50 }} />
        {row('E', '.', 'E is common: one dot', eo, OK)}
        {row('Q', '--.-', 'Q is rare: four signals', qo, ACC_TEXT)}
        <Line text={portrait ? 'Common things get short codes,\nrare things get long ones.' : 'Common things get short codes, and rare things get long ones.'}
          o={ro} size={S(portrait, 58)} style={{ marginTop: portrait ? 50 : 30, whiteSpace: 'pre-line' }} />
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpMorse: React.FC<z.infer<typeof cmpMorseSchema>> = (p) => <MorseScene p={p} portrait={false} />;
export const CmpMorse916: React.FC<z.infer<typeof cmpMorseSchema>> = (p) => <MorseScene p={p} portrait />;

// ===========================================================================
// CmpLossless — real zlib result: the rhyme 424 → 87 bytes, identical when unzipped;
// random bytes 424 → 435, bigger.
// ===========================================================================
export const cmpLosslessSchema = z.object({
  rhymeBytes: z.number(), rhymeZip: z.number(), randomBytes: z.number(), randomZip: z.number(), identical: z.boolean(),
  rhymeAt: z.number(), zipAt: z.number(), sameAt: z.number(), randomAt: z.number(), biggerAt: z.number(), footnote: z.string(),
  ...dur,
});
const LosslessScene: React.FC<{ p: z.infer<typeof cmpLosslessSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const ro = rise(t, p.rhymeAt), zo = rise(t, p.zipAt), so = rise(t, p.sameAt), xo = rise(t, p.randomAt), bo = rise(t, p.biggerAt);
  const W = portrait ? 880 : 1100;
  const unit = W / Math.max(p.randomZip, p.rhymeBytes);
  const bar = (n: number, o: number, color: string, label: string) => (
    <div style={{ display: 'flex', flexDirection: portrait ? 'column' : 'row', alignItems: portrait ? 'flex-start' : 'center', gap: portrait ? 10 : 30, marginBottom: portrait ? 26 : 22 }}>
      <div style={{ width: W, height: portrait ? 60 : 56, borderRadius: 12, border: `3px dashed ${BORDER}`, position: 'relative', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', left: -3, top: -3, height: portrait ? 60 : 56, width: n * unit * o, borderRadius: 12, background: color }} />
      </div>
      <Line text={label} o={o} size={S(portrait, 56)} color={color} />
    </div>
  );
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 20 : 80 }}>
        <Line text="four verses of the rhyme" o={ghost(ro)} size={S(portrait, 58)} style={{ marginBottom: 20 }} />
        {bar(p.rhymeBytes, ro, INK, `${p.rhymeBytes} bytes`)}
        {bar(p.rhymeZip, zo, OK, `${p.rhymeZip} bytes, about a fifth`)}
        <Line text={p.identical ? 'Unzipped: identical' : ''} o={so} size={S(portrait, 58)} color={OK} style={{ marginBottom: portrait ? 60 : 50 }} />
        <Line text="random bytes" o={ghost(xo)} size={S(portrait, 58)} style={{ marginBottom: 20 }} />
        {bar(p.randomBytes, xo, INK, `${p.randomBytes} bytes`)}
        {bar(p.randomZip, bo, ACC_TEXT, `${p.randomZip} bytes: they got bigger`)}
      </div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX + 200, bottom: portrait ? PY + 200 : 66, fontFamily: SANS,
        fontSize: S(portrait, 44, PSANS), color: SOFT, opacity: ghost(ro) }}>{portrait ? 'Real result: demo/compress_demo.py' : p.footnote}</div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpLossless: React.FC<z.infer<typeof cmpLosslessSchema>> = (p) => <LosslessScene p={p} portrait={false} />;
export const CmpLossless916: React.FC<z.infer<typeof cmpLosslessSchema>> = (p) => <LosslessScene p={p} portrait />;

// ===========================================================================
// CmpCounting — more long files than short ones: 8 three-bit files, only 4 two-bit names.
// ===========================================================================
export const cmpCountingSchema = z.object({ longAt: z.number(), ruleAt: z.number(), patternAt: z.number(), source: z.string(), ...dur });
const CountingScene: React.FC<{ p: z.infer<typeof cmpCountingSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const lo = rise(t, p.longAt), ro = rise(t, p.ruleAt), po = rise(t, p.patternAt);
  const long = ['000', '001', '010', '011', '100', '101', '110', '111'], short = ['00', '01', '10', '11'];
  const box = (s: string, i: number, color: string, o: number) => (
    <div key={i} style={{ fontFamily: MONO, fontSize: portrait ? 76 : 56, padding: portrait ? '10px 20px' : '8px 18px', border: `3px solid ${color}`, borderRadius: 14,
      background: CARD, color: INK, opacity: o }}>{s}</div>
  );
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 20 : 80 }}>
        <Line text="more long files than short ones" o={lo} size={S(portrait, 64)} style={{ marginBottom: portrait ? 40 : 30 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: portrait ? 18 : 18, marginBottom: portrait ? 18 : 14 }}>{long.map((s, i) => box(s, i, INK, ghost(lo)))}</div>
        <Line text="8 three-bit files" o={lo} size={S(portrait, 54)} color={SOFT} style={{ marginBottom: portrait ? 40 : 30 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: portrait ? 18 : 14 }}>{short.map((s, i) => box(s, i, ACC_TEXT, ghost(lo)))}</div>
        <Line text="only 4 two-bit files" o={lo} size={S(portrait, 54)} color={SOFT} style={{ marginBottom: portrait ? 50 : 40 }} />
        <Line text="No compressor can shrink every file." o={ro} size={S(portrait, 64)} color={ACC_TEXT} />
        <Line text="It only wins when there's a pattern." o={po} size={S(portrait, 64)} style={{ marginTop: 16 }} />
      </div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX + 200, bottom: portrait ? PY + 200 : 66, fontFamily: SANS,
        fontSize: S(portrait, 44, PSANS), color: SOFT, opacity: ro }}>{portrait ? 'Source: RFC 1951 (DEFLATE)' : p.source}</div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpCounting: React.FC<z.infer<typeof cmpCountingSchema>> = (p) => <CountingScene p={p} portrait={false} />;
export const CmpCounting916: React.FC<z.infer<typeof cmpCountingSchema>> = (p) => <CountingScene p={p} portrait />;

// ===========================================================================
// CmpBlocks — JPEG cuts the photo into 8×8 blocks (grid drawn over the real test picture);
// keeps broad changes, drops fine detail; brightness over colour.
// ===========================================================================
export const cmpBlocksSchema = z.object({ photo: z.string(), blocksAt: z.number(), keepAt: z.number(), dropAt: z.number(), colourAt: z.number(), ...dur });
const BlocksScene: React.FC<{ p: z.infer<typeof cmpBlocksSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const bo = rise(t, p.blocksAt), ko = rise(t, p.keepAt), dro = rise(t, p.dropAt), co = rise(t, p.colourAt);
  const size = portrait ? 780 : 720;
  const n = 512 / 8; // blocks per side
  const step = size / n;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? (PW - size) / 2 : SX + 20, top: portrait ? PY + 40 : 150, width: size, height: size }}>
        <Img src={staticFile(p.photo)} style={{ width: size, height: size, borderRadius: 14, display: 'block' }} />
        <svg width={size} height={size} style={{ position: 'absolute', left: 0, top: 0, opacity: bo }}>
          {Array.from({ length: n + 1 }, (_, i) => (
            <React.Fragment key={i}>
              <line x1={i * step} y1={0} x2={i * step} y2={size} stroke={CARD} strokeWidth={1} opacity={0.55} />
              <line x1={0} y1={i * step} x2={size} y2={i * step} stroke={CARD} strokeWidth={1} opacity={0.55} />
            </React.Fragment>
          ))}
        </svg>
      </div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX + 20 + size + 80, right: portrait ? PX : SX, top: portrait ? 1000 : 190 }}>
        <Line text="8 × 8 blocks" o={bo} size={S(portrait, 70, PSERIF + 6)} style={{ marginBottom: portrait ? 36 : 40 }} />
        <Line text="keeps the broad changes" o={ko} size={S(portrait, 58)} color={OK} style={{ marginBottom: 16 }} />
        <Line text="drops fine detail" o={dro} size={S(portrait, 58)} color={ACC_TEXT} style={{ marginBottom: portrait ? 36 : 40 }} />
        <Line text={portrait ? 'your eyes notice brightness\nmore than colour' : 'your eyes notice brightness more than colour'} o={co}
          size={S(portrait, 54)} style={{ whiteSpace: 'pre-line' }} />
      </div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpBlocks: React.FC<z.infer<typeof cmpBlocksSchema>> = (p) => <BlocksScene p={p} portrait={false} />;
export const CmpBlocks916: React.FC<z.infer<typeof cmpBlocksSchema>> = (p) => <BlocksScene p={p} portrait />;

// ===========================================================================
// CmpPhoto — the real picture test: raw pixels, PNG, JPEG 50, JPEG 10 (sizes measured).
// ===========================================================================
export const cmpPhotoSchema = z.object({
  tiles: z.array(z.object({ img: z.string(), label: z.string(), size: z.string(), at: z.number(), note: z.string().optional(), noteAt: z.number().optional() })),
  testAt: z.number(), footnote: z.string(),
  ...dur,
});
const PhotoScene: React.FC<{ p: z.infer<typeof cmpPhotoSchema>; portrait: boolean }> = ({ p, portrait }) => {
  const t = useT();
  const tsize = portrait ? 300 : 390;
  if (portrait) {
    return (
      <AbsoluteFill style={{ background: BG }}>
        <div style={{ position: 'absolute', left: PX, right: PX, top: PY + 20 }}>
          {p.tiles.map((tl, i) => {
            const o = rise(t, tl.at), no = tl.noteAt != null ? rise(t, tl.noteAt) : 0;
            return (
              <div key={i} style={{ display: 'flex', gap: 36, marginBottom: 34, alignItems: 'flex-start' }}>
                <div style={{ width: tsize, height: tsize, flex: 'none', borderRadius: 14, border: `3px dashed ${BORDER}`, boxSizing: 'border-box', overflow: 'hidden' }}>
                  <Img src={staticFile(tl.img)} style={{ width: tsize, height: tsize, display: 'block', opacity: o }} />
                </div>
                <div>
                  <Line text={tl.label} o={o} size={PSERIF - 4} color={SOFT} />
                  <Line text={tl.size} o={o} size={PSERIF + 6} color={i >= 2 ? ACC_TEXT : INK} />
                  {tl.note ? <Line text={tl.note} o={no} size={PSERIF - 4} color={OK} /> : null}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', left: PX, right: PX, bottom: PY + 200, fontFamily: SANS, fontSize: PSANS, color: SOFT,
          opacity: ghost(rise(t, p.testAt)) }}>Demo test picture.</div>
        <PBug />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX, top: portrait ? PY + 10 : 70, display: 'grid',
        gridTemplateColumns: portrait ? `repeat(2, ${tsize}px)` : `repeat(4, ${tsize}px)`, columnGap: portrait ? 92 : 22, rowGap: portrait ? 30 : 0 }}>
        {p.tiles.map((tl, i) => {
          const o = rise(t, tl.at), no = tl.noteAt != null ? rise(t, tl.noteAt) : 0;
          return (
            <div key={i}>
              <div style={{ width: tsize, height: tsize, borderRadius: 14, border: `3px dashed ${BORDER}`, boxSizing: 'border-box', overflow: 'hidden' }}>
                <Img src={staticFile(tl.img)} style={{ width: tsize, height: tsize, display: 'block', opacity: o, imageRendering: 'pixelated' }} />
              </div>
              <Line text={tl.label} o={o} size={S(portrait, 50, PSERIF - 10)} color={SOFT} style={{ marginTop: 12 }} />
              <Line text={tl.size} o={o} size={S(portrait, 70, PSERIF + 6)} color={i >= 2 ? ACC_TEXT : INK} />
              {tl.note ? <Line text={tl.note} o={no} size={S(portrait, 46, PSERIF - 10)} color={OK} style={{ marginTop: 6 }} /> : null}
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: portrait ? PX : SX, right: portrait ? PX : SX + 200, bottom: portrait ? PY + 200 : 66, fontFamily: SANS,
        fontSize: S(portrait, 44, PSANS), color: SOFT, opacity: ghost(rise(t, p.testAt)) }}>{portrait ? 'Test picture made for this demo.' : p.footnote}</div>
      <Bug portrait={portrait} />
    </AbsoluteFill>
  );
};
export const CmpPhoto: React.FC<z.infer<typeof cmpPhotoSchema>> = (p) => <PhotoScene p={p} portrait={false} />;
export const CmpPhoto916: React.FC<z.infer<typeof cmpPhotoSchema>> = (p) => <PhotoScene p={p} portrait />;
