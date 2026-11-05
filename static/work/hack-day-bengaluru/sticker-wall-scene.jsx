const { useComposition, Easing, clamp, CompositionStage } = window;
const FW = 1400, FH = 788;
const INK = '#10201d', FOREST = '#3d5f58', PAPER = '#f7f7f2', OCHRE = '#f5b726', CORAL = '#e97b77', SKY = '#8bb2de', PINK = '#f6c4c1';
const MONO = "'Martian Mono',ui-monospace,Menlo,monospace", BARLOW = "'Barlow Semi Condensed','Arial Narrow',Arial,sans-serif", SCRIPT = "'Caveat','Segoe Print',cursive";
const MOTION = {
  fly: (T, s, e) => Easing.easeOutCubic(clamp((T - s) / (e - s), 0, 1)),
  slap: (T, s, e) => clamp((T - s) / (e - s), 0, 1),
  out: (T, s, e) => Easing.easeInCubic(clamp((T - s) / (e - s), 0, 1)),
};
const lerp = (a, b, t) => a + (b - a) * t;

function Postcard({ text, stamp }) {
  return (
    <div style={{ width: 178, height: 178, boxSizing: 'border-box', padding: '22px 18px 16px', background: stamp, backgroundImage: 'linear-gradient(180deg, rgba(16,32,29,0.07) 0, rgba(16,32,29,0.07) 26px, transparent 26px), linear-gradient(135deg, transparent 78%, rgba(255,255,255,0.28) 92%, rgba(16,32,29,0.10) 100%)', boxShadow: '0 14px 16px -10px rgba(16,32,29,0.45), 0 1px 2px rgba(16,32,29,0.18)', fontFamily: SCRIPT, fontSize: 30, fontWeight: 600, lineHeight: 1.02, color: INK, textWrap: 'pretty' }}>{text}</div>
  );
}
const stk = { boxSizing: 'border-box', border: `4px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const monoTxt = (fs, c = INK) => ({ fontFamily: MONO, fontSize: fs, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: c, textAlign: 'center', lineHeight: 1.05 });
const ITEMS = [
  { x: 250, y: 255, r: -5, el: <Postcard text="We’re hiring 2 backend devs. Ping @meera_k" stamp="#f9d36a" /> },
  { x: 650, y: 190, r: 4, el: <Postcard text="Let’s build together → gh/arjun-r" stamp={PINK} /> },
  { x: 120, y: 470, r: -8, el: <div style={{ ...stk, padding: '12px 16px', background: PAPER }}><img src="assets/mlh-logo.svg" alt="MLH" style={{ display: 'block', height: 44, width: 'auto' }} /></div> },
  { x: 1070, y: 300, r: -3, el: <Postcard text="Design intern role at a friend’s startup. Ask me! — Kavya" stamp={SKY} /> },
  { x: 320, y: 590, r: 5, el: <Postcard text="Looking for a co-founder in AI infra. in/rohanv" stamp={PAPER} /> },
  { x: 960, y: 520, r: 6, el: <div style={{ ...stk, padding: '14px 26px', borderRadius: 60, background: CORAL }}><span style={monoTxt(22)}>ship it</span></div> },
  { x: 1300, y: 430, r: 8, el: <div style={{ ...stk, padding: 10, background: PAPER }}><img src="assets/dev-logo.svg" alt="DEV" style={{ display: 'block', height: 56, width: 'auto' }} /></div> },
  { x: 780, y: 575, r: -4, el: <Postcard text="Open to freelance work | @dhruv.codes" stamp="#f9d36a" /> },
  { x: 720, y: 380, r: -6, el: <div style={{ ...stk, padding: '16px 20px', background: FOREST }}><img src="assets/wordmark-light.svg" alt="Hacktoberfest" style={{ display: 'block', width: 250, height: 'auto' }} /></div> },
  { x: 1180, y: 650, r: 3, el: <Postcard text="Hiring ML engineers in Bengaluru. Find Sana at table 4" stamp={PINK} /> },
  { x: 470, y: 715, r: -12, el: <div style={{ ...stk, padding: '10px 18px', background: SKY }}><span style={monoTxt(26)}>LGTM</span></div> },
  { x: 120, y: 690, r: 7, el: <div style={{ ...stk, width: 100, height: 100, background: '#2e4742', padding: 16 }}><img src="assets/hf-monogram-light.svg" alt="" style={{ display: 'block', width: '100%', height: 'auto' }} /></div> },
  { x: 1000, y: 730, r: 4, el: <div style={{ ...stk, padding: '10px 16px', background: PAPER }}><span style={monoTxt(17)}>&lt;/&gt; open source</span></div> },
];

function Item({ it, i, T, C }) {
  const t0 = C.Fill + 0.25 + i * 0.24, t1 = t0 + 0.42;
  const fx = it.x < 330 ? -1 : it.x > 1080 ? 1 : 0;
  const fy = fx ? (it.y - 394) / 394 * 0.6 : (it.y < 394 ? -1 : 1);
  const dx = fx * 1000, dy = fy * 800;
  const f = MOTION.fly(T, t0, t1);
  const slap = MOTION.slap(T, t1, t1 + 0.2);
  const sc = f < 1 ? lerp(1.35, 1.08, f) : (slap < 0.4 ? lerp(1.08, 0.95, slap / 0.4) : lerp(0.95, 1, (slap - 0.4) / 0.6));
  const out = MOTION.out(T, C.Reset + i * 0.02, C.Reset + 0.45 + i * 0.02);
  const rot = it.r + (1 - f) * (i % 2 ? 50 : -50);
  return (
    <div style={{ position: 'absolute', left: it.x, top: it.y, transform: `translate(-50%,-50%) translate(${dx * (1 - f)}px,${dy * (1 - f)}px) rotate(${rot}deg) scale(${sc * (1 - out * 0.15)})`, opacity: (T < t0 ? 0 : 1) * (1 - out), zIndex: i }}>
      {it.el}
    </div>
  );
}

function WallPiece() {
  const { T, CUES } = useComposition();
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAPER, backgroundImage: 'linear-gradient(rgba(16,32,29,0.08) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(16,32,29,0.08) 1.5px,transparent 1.5px)', backgroundSize: '56px 56px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 36, top: 30, padding: '8px 14px', background: INK, color: PAPER, fontFamily: MONO, fontSize: 18, fontWeight: 700, zIndex: 0 }}>start anywhere</div>
      {ITEMS.map((it, i) => <Item key={i} it={it} i={i} T={T} C={CUES} />)}
    </div>
  );
}
window.StickerWallAnimation = function StickerWallAnimation() {
  return (
    <CompositionStage width={FW} height={FH} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={PAPER}>
      <WallPiece />
    </CompositionStage>
  );
};
