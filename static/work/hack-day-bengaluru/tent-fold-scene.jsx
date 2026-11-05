const { useComposition, Easing, clamp, CompositionStage } = window;
const FW = 1400, FH = 788, FLOOR = 640, PX = 3.7795;
const INK = '#10201d';
const MONO = "'Martian Mono',ui-monospace,Menlo,monospace";
const MOTION = {
  fold: (T, s, e) => Easing.easeInOutCubic(clamp((T - s) / (e - s), 0, 1)),
  pop: (T, s, e) => Easing.easeOutBack(clamp((T - s) / (e - s), 0, 1)),
  drop: (T, s, e) => Easing.easeOutCubic(clamp((T - s) / (e - s), 0, 1)),
};
const rad = d => d * Math.PI / 180;
const lerp = (a, b, t) => a + (b - a) * t;
function makeProj(yaw, pitch) {
  const cy = Math.cos(rad(yaw)), sy = Math.sin(rad(yaw)), cp = Math.cos(rad(pitch)), sp = Math.sin(rad(pitch));
  return ([x, y, z]) => { const x1 = x * cy + z * sy, z1 = -x * sy + z * cy; return [x1, y * cp - z1 * sp]; };
}
const P3 = makeProj(-26, -14);
const dir = a => [0, Math.cos(rad(a)), Math.sin(rad(a))];
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];

const Piece = React.memo(function Piece({ html, w, h }) {
  return <div style={{ position: 'absolute', left: 0, top: 0, width: `${w}mm`, height: `${h}mm`, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: html }}></div>;
});

const THICK = 2.4;
function Face({ seg, w, origin, Vdir, s, cx, top, z }) {
  const U = P3([1, 0, 0]), V = P3(Vdir), O = P3(origin);
  const n = [0, -Vdir[2], Vdir[1]];
  const E = P3(origin.map((v, i) => v - n[i] * THICK * s));
  const k = s / PX;
  const det = U[0] * V[1] - U[1] * V[0];
  const box = { position: 'absolute', left: 0, top: 0, width: `${w}mm`, height: `${seg.h}mm`, transformOrigin: '0 0' };
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, zIndex: z }}>
      <div style={{ ...box, transform: `matrix(${U[0] * k},${U[1] * k},${V[0] * k},${V[1] * k},${cx + O[0]},${top + O[1]})`, outline: `${0.5 / k}px solid rgba(16,32,29,0.35)`, boxShadow: '0.7mm 0 0 #a9aea1, -0.7mm 0 0 #a9aea1' }}>
        <Piece html={seg.html} w={w} h={seg.h} />
        {det <= 0 && <div style={{ position: 'absolute', inset: 0, background: '#f4f4ef' }}></div>}
      </div>
    </div>
  );
}

function Shadow({ cx, top, s, w, Pl, th, placed }) {
  if (placed < 0.01) return null;
  const y = Pl * Math.cos(rad(th)), z = Pl * Math.sin(rad(th));
  const pt = (x, zz) => { const p = P3([x, y, zz].map(v => v * s)); return [cx + p[0], top + p[1]]; };
  const quad = pad => [pt(-w / 2 - pad, -z - pad), pt(w / 2 + pad, -z - pad), pt(w / 2 + pad, z + pad), pt(-w / 2 - pad, z + pad)].map(p => p.join(',')).join(' ');
  const c = pt(0, 0);
  return (
    <svg width={FW} height={FH} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <defs>
        <filter id={'sb' + Math.round(cx)} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={14 + (1 - placed) * 22} /></filter>
        <filter id={'cb' + Math.round(cx)} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      <ellipse cx={c[0] + 26 + (1 - placed) * 20} cy={c[1] + 8} rx={w * s * (0.72 + (1 - placed) * 0.25)} ry={z * s * 0.9 + 30 + (1 - placed) * 14} fill="#10201d" opacity={0.05 * placed} filter={`url(#sb${Math.round(cx)})`} />
      <polygon points={quad(4)} fill="#10201d" opacity={0.13 * placed * placed} filter={`url(#cb${Math.round(cx)})`} />
    </svg>
  );
}

function Tent({ T, C, data, cx, s, delay }) {
  const [tab, A, B, base] = data.segs, Pl = A.h, w = data.w;
  const th = Math.asin(base.h / (2 * Pl)) * 180 / Math.PI;
  const unfold = MOTION.fold(T, C.Reset + 0.25, C.Reset + 0.85);
  const fApex = MOTION.fold(T, C.Fold + 0.25 + delay, C.Fold + 1.35 + delay) * (1 - unfold);
  const fTab = MOTION.fold(T, C.Fold + 1.35 + delay, C.Stick + delay) * (1 - unfold);
  const fBase = MOTION.fold(T, C.Stick + delay, C.Stick + 0.5 + delay) * (1 - unfold);
  const press = Math.sin(clamp((T - C.Stick - 0.5 - delay) / 0.3, 0, 1) * Math.PI) * (1 - unfold);
  const placed = MOTION.drop(T, C.Place + delay, C.Place + 0.6 + delay) * (1 - MOTION.fold(T, C.Reset - 0.05, C.Reset + 0.35));
  const aB = lerp(0, th, fApex), aA = lerp(-180, -th, fApex);
  const dB = dir(aB), dA = dir(aA);
  const dBase = dir(lerp(aB, -90, fBase));
  const dTab = dir(lerp(aA, 90, fTab));
  const apex = [-w / 2, 0, 0];
  const EB = add(apex, dB, Pl), EA = add(apex, dA, Pl);
  const flatTop = (tab.h + A.h) * s;
  const liftedApexY = 40 + flatTop;
  const placedApexY = FLOOR - P3([0, Pl * Math.cos(rad(th)), 0])[1] * s;
  const apexY = lerp(liftedApexY, placedApexY, placed) + press * 4;
  const neg = v => [-v[0], -v[1], -v[2]];
  const floor = P3([0, Pl * Math.cos(rad(th)), 0]);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0 }}>
      <Shadow cx={cx} top={placedApexY} s={s} w={w} Pl={Pl} th={th} placed={placed} />
      <Face seg={A} w={w} origin={add(apex, dA, Pl).map(v => v * s)} Vdir={neg(dA)} s={s} cx={cx} top={apexY} z={1} />
      <Face seg={tab} w={w} origin={add(EA, dTab, tab.h).map(v => v * s)} Vdir={neg(dTab)} s={s} cx={cx} top={apexY - fTab * fBase * 2} z={fBase > 0.98 ? 3 : 1} />
      <Face seg={base} w={w} origin={EB.map(v => v * s)} Vdir={dBase} s={s} cx={cx} top={apexY} z={2} />
      <Face seg={B} w={w} origin={apex.map(v => v * s)} Vdir={dB} s={s} cx={cx} top={apexY} z={4} />
    </div>
  );
}

function Steps({ T, C }) {
  const steps = ['Fold', 'Stick', 'Place'];
  const active = T >= C.Place ? 2 : T >= C.Stick ? 1 : 0;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center', gap: 28, fontFamily: MONO, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {steps.map((n, i) => (
        <React.Fragment key={n}>
          {i > 0 && <span style={{ color: '#b9bcb0' }}>|</span>}
          <span style={{ color: i === active && T < C.Reset ? INK : '#9aa39f' }}>{`0${i + 1} ${n}`}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function TentPiece() {
  const { T, CUES } = useComposition();
  const D = window.TENT_PIECES;
  const C = CUES;
  const unfold = MOTION.fold(T, C.Reset + 0.25, C.Reset + 0.85);
  // Starts with the later tent, so the zoom can't crop it while it's still tall.
  const fF = MOTION.fold(T, C.Fold + 0.45, C.Fold + 2.05) * (1 - unfold);
  const pl = MOTION.drop(T, C.Place, C.Place + 0.6) * (1 - MOTION.fold(T, C.Reset - 0.05, C.Reset + 0.35));
  const cam = [[712, 343, 1.2], [712, 392, 1.58], [715, 463, 1.45]];
  const mix = (i) => lerp(lerp(cam[0][i], cam[1][i], fF), cam[2][i], pl);
  const camX = mix(0), camY = mix(1), z = mix(2);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#e4e5da', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: FW, height: FH, transformOrigin: '0 0', transform: `translate(${FW / 2}px,${FH / 2}px) scale(${z}) translate(${-camX}px,${-camY}px)` }}>
      <div style={{ position: 'absolute', left: -1500, right: -1500, top: FLOOR - 50, height: 2000, background: '#d5d7cb', borderTop: `3px solid ${INK}` }}></div>
      {D && <Tent T={T} C={CUES} data={D.main} cx={590} s={1.25} delay={0} />}
      {D && <Tent T={T} C={CUES} data={D.team} cx={830} s={1.25} delay={0.25} />}
      </div>
    </div>
  );
}
window.TentFoldAnimation = function TentFoldAnimation() {
  return (
    <CompositionStage width={FW} height={FH} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#e4e5da">
      <TentPiece />
    </CompositionStage>
  );
};
