const { useComposition, Easing, clamp, CompositionStage } = window;
const FW = 1400, FH = 788;
const INK = '#10201d', FOREST = '#3d5f58', PAPER = '#f7f7f2', MUTED = '#52635f';
const MONO = "'Martian Mono',ui-monospace,Menlo,monospace", BARLOW = "'Barlow Semi Condensed','Arial Narrow',Arial,sans-serif";
const MOTION = {
  fall: (T, s, e) => Easing.easeInQuad(clamp((T - s) / (e - s), 0, 1)),
  settle: (T, s, e) => Easing.easeOutCubic(clamp((T - s) / (e - s), 0, 1)),
  fan: (T, s, e) => Easing.easeOutBack(clamp((T - s) / (e - s), 0, 1)),
};
const STYLES = { Team: ['#f5b726', '#8a5d13', '#671912'], Mentor: ['#8bb2de', '#1f4e6b', '#671912'], 'Write-in': ['#f2f2eb', INK, '#8bb2de'] };

const Sticker = React.memo(function Sticker({ v, name, role }) {
  const [bg, rc, sh] = STYLES[v];
  return (
    <div style={{ width: 387, height: 185, boxSizing: 'border-box', padding: 23.2, background: bg, border: `2.2px solid ${INK}`, boxShadow: `8.9px 8.9px 0 ${sh}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: BARLOW, color: INK }}>
      {v === 'Write-in' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 34, paddingTop: 30 }}><div style={{ height: 2.2, background: INK }}></div><div style={{ height: 2.2, background: INK }}></div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 10, borderBottom: `2.2px solid ${INK}` }}>
          <span style={{ fontSize: 44.5, fontWeight: 700, lineHeight: '45px', letterSpacing: '-0.89px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{name}</span>
          <span style={{ fontFamily: MONO, fontSize: 14.5, fontWeight: 700, letterSpacing: '0.87px', textTransform: 'uppercase', color: rc, whiteSpace: 'nowrap', overflow: 'hidden' }}>{role}</span>
        </div>
      )}
      <div style={{ height: 30, display: 'flex', gap: 23 }}>
        <div style={{ boxSizing: 'border-box', width: 118, height: '100%', padding: '5px 8px', background: FOREST, border: `2.2px solid ${INK}`, display: 'flex', alignItems: 'center' }}><img src="assets/wordmark-light.svg" alt="" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} /></div>
        <div style={{ boxSizing: 'border-box', height: '100%', padding: '5px 8px', background: PAPER, border: `2.2px solid ${INK}`, boxShadow: '2.3px 2.3px 0 #2e4742', display: 'flex', alignItems: 'center', gap: 5 }}><img src="assets/mlh-logo.svg" alt="" style={{ display: 'block', width: 34, height: 14, objectFit: 'contain' }} /><span style={{ fontFamily: MONO, fontSize: 7, fontWeight: 700, color: MUTED }}>×</span><img src="assets/dev-logo.svg" alt="" style={{ display: 'block', width: 14, height: 14, objectFit: 'contain' }} /></div>
        <div style={{ boxSizing: 'border-box', height: '100%', padding: '5px 8px', background: PAPER, border: `2.2px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ fontFamily: MONO, fontSize: 5.1, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', color: MUTED, whiteSpace: 'nowrap' }}>Hosted by</span><img src="assets/flo101-on-light.png" alt="" style={{ display: 'block', width: 35, height: 9, objectFit: 'contain' }} /></div>
      </div>
    </div>
  );
});

let seed = 11;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const TEAM = [['Aditya Oberai', 'DevRel Lead, Appwrite'], ['Varsha U N', 'Student / OSS contributor'], ['Avneer Bhadauria', 'Founder, Flo101'], ['Anandita Wagh', 'Designer, Rupeezy']];
const MENT = [['Jyothish Vijay', 'Founding Engineer, Flo101'], ['Ahan M R', 'Applied Scientist, Microsoft'], ['Jyoti Bisht', 'DevRel, pyannoteAI'], ['Ashish Jha', 'FDE, DevRev'], ['Ankita Tripathi', 'Technical PM, GE Healthcare'], ['Adyasha Mohanty', 'Founder, Anyaa Labs'], ['Pooja Gera', 'Software Engineer, Google']];
const S = 0.62, SW = 387 * S, SH = 185 * S, FLOOR = FH - 6, COL = 10;
const named = [...TEAM.map(p => ['Team', ...p]), ...MENT.map(p => ['Mentor', ...p])];
const ORDER = [];
for (let i = 0; i < 40; i++) ORDER.push(['Write-in']);
named.forEach(n => ORDER.splice(ORDER.length - Math.floor(rnd() * 4), 0, n));
const surf = new Array(Math.ceil(FW / COL) + 40).fill(FLOOR);
const PILE = ORDER.map(([v, name, role], i) => {
  const x = Math.round((((i + 1) * 0.6180339) % 1) * (FW - SW + 80) - 40 + (rnd() - 0.5) * 40);
  const c0 = Math.max(0, Math.floor((x + 20) / COL)), c1 = Math.min(surf.length - 1, Math.floor((x + SW - 20) / COL));
  let top = FLOOR; for (let c = c0; c <= c1; c++) top = Math.min(top, surf[c]);
  const y = top - SH;
  const rise = SH * (v === 'Write-in' ? 0.22 + rnd() * 0.08 : 0.5 + rnd() * 0.12);
  for (let c = c0; c <= c1; c++) surf[c] = Math.min(surf[c], y + SH - rise);
  return { x, y, r: (rnd() - 0.5) * 34, v, name, role };
});

function Falling({ it, i, T, C }) {
  const t0 = C.Drop + 0.1 + i * 0.075, t1 = t0 + 0.32 + (it.y + 260) / 2600;
  const f = MOTION.fall(T, t0, t1);
  const b = clamp((T - t1) / 0.2, 0, 1);
  const bounce = Math.sin(b * Math.PI) * 10 * (1 - b);
  const out = MOTION.fall(T, C.Reset, C.Reset + 0.55);
  const y = -260 + (it.y + 260) * f - bounce + out * 700;
  return (
    <div style={{ position: 'absolute', left: it.x, top: y, width: SW, height: SH, transform: `rotate(${it.r + (1 - f) * (i % 2 ? 24 : -24)}deg)`, visibility: T < t0 ? 'hidden' : 'visible', filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.25))' }}>
      <div style={{ transform: `scale(${S})`, transformOrigin: '0 0' }}><Sticker v={it.v} name={it.name} role={it.role} /></div>
    </div>
  );
}

function StickersPiece() {
  const { T, CUES } = useComposition();
  const C = CUES;
  return (
    <div style={{ position: 'absolute', inset: 0, background: FOREST, overflow: 'hidden' }}>
      {PILE.map((it, i) => <Falling key={i} it={it} i={i} T={T} C={C} />)}
    </div>
  );
}
window.NameStickersAnimation = function NameStickersAnimation() {
  return (
    <CompositionStage width={FW} height={FH} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={FOREST}>
      <StickersPiece />
    </CompositionStage>
  );
};
