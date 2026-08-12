import { motion, useReducedMotion, type Transition, type Variants } from 'motion/react';

/**
 * HeroAnimations — thematic hero background decorations, one per section type.
 * All elements are aria-hidden, pointer-events-none decorative layers.
 * Built on `motion` (already a project dependency) instead of ad hoc inline
 * CSS keyframes so every animation shares one easing/stagger vocabulary and
 * one `prefers-reduced-motion` gate (the CSS-only blanket rule in theme.css
 * only silences CSS animations/transitions, not Motion's WAAPI-driven ones).
 */

const EASE_OUT: Transition['ease'] = [0.16, 1, 0.3, 1];
const SPRING_POP: Transition = { type: 'spring', stiffness: 320, damping: 22 };

function useHeroMotion() {
  const reduce = useReducedMotion();
  return {
    reduce,
    draw: (delay = 0): Transition =>
      reduce ? { duration: 0 } : { duration: 1, ease: EASE_OUT, delay },
    pop: (delay = 0): Transition => (reduce ? { duration: 0 } : { ...SPRING_POP, delay }),
    loop: (duration: number, delay = 0): Transition =>
      reduce
        ? { duration: 0 }
        : { duration, delay, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
  };
}

const layer = 'absolute inset-0 overflow-hidden pointer-events-none';

/* ── NETWORK NODES (Partnership / Partners hero) ── */
export function NetworkNodes() {
  const { reduce, draw, pop, loop } = useHeroMotion();
  const nodes = [
    { cx: 15, cy: 25 }, { cx: 35, cy: 55 }, { cx: 55, cy: 20 },
    { cx: 75, cy: 45 }, { cx: 90, cy: 20 }, { cx: 85, cy: 70 },
    { cx: 50, cy: 75 }, { cx: 20, cy: 70 },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 7], [2, 3], [3, 4], [3, 5], [4, 5], [5, 6], [6, 7], [1, 6], [2, 4],
  ];

  return (
    <div className={layer} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full opacity-20">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="white" strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={draw(0.2 + i * 0.1)}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={n.cx} cy={n.cy} r="1.2" fill="white"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={pop(0.1 + i * 0.08)}
            />
            {!reduce && (
              <motion.circle
                cx={n.cx} cy={n.cy} r="2.5" fill="none" stroke="white" strokeWidth="0.2"
                initial={{ scale: 0.6, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={loop(2.5, i * 0.4)}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── HUB BARS (ResearchHubs hero) ── */
export function HubBars() {
  const { pop } = useHeroMotion();
  const bars = [
    { color: '#089EA5', height: '55%', delay: 0.1 },
    { color: '#C97B2E', height: '80%', delay: 0.25 },
    { color: '#7B5EA7', height: '65%', delay: 0.4 },
  ];

  return (
    <div className="absolute right-0 top-0 bottom-0 w-40 flex items-end justify-end gap-3 pr-8 pb-14 pointer-events-none overflow-hidden" aria-hidden="true">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="w-8 rounded-t-lg origin-bottom opacity-30"
          style={{ backgroundColor: b.color, height: b.height }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ ...pop(b.delay), type: 'spring', stiffness: 120, damping: 16 }}
        />
      ))}
    </div>
  );
}

/* ── RISING BUBBLES (Childhood hub) ── */
export function RisingBubbles({ color = '#089EA5' }: { color?: string }) {
  const { loop } = useHeroMotion();
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 8.5) % 90}%`,
    bottom: `${-5 + (i * 3) % 10}%`,
    size: 8 + (i * 7) % 28,
    duration: 4 + (i * 0.9) % 5,
    delay: (i * 0.5) % 4.5,
    opacity: 0.08 + (i % 4) * 0.04,
  }));

  return (
    <div className={layer} aria-hidden="true">
      {bubbles.map(b => (
        <motion.div
          key={b.id}
          className="absolute rounded-full border-2"
          style={{ left: b.left, bottom: b.bottom, width: b.size, height: b.size, borderColor: color, opacity: b.opacity }}
          animate={{ y: [0, -140], opacity: [b.opacity, b.opacity, 0] }}
          transition={loop(b.duration, b.delay)}
        />
      ))}
    </div>
  );
}

/* ── HEARTBEAT LINE (Health hub) ── */
export function HeartbeatLine({ color = '#C97B2E' }: { color?: string }) {
  const { draw, loop } = useHeroMotion();
  const points = '0,20 20,20 30,20 38,5 44,35 50,20 60,20 70,20 78,8 82,32 88,20 100,20 120,20 130,20 138,4 144,36 150,20 160,20 180,20 200,20';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center" aria-hidden="true">
      <svg viewBox="0 0 200 40" preserveAspectRatio="xMidYMid meet" className="w-full opacity-20">
        <motion.polyline
          points={points} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.3)}
        />
        <motion.circle
          cx={138} cy={4} r="2.5" fill={color}
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={loop(1.4, 1.3)}
        />
      </svg>
    </div>
  );
}

/* ── CONSTELLATION (Identity hub) ── */
export function Constellation({ color = '#7B5EA7' }: { color?: string }) {
  const { draw, pop } = useHeroMotion();
  const stars = [
    { x: 10, y: 30 }, { x: 25, y: 15 }, { x: 40, y: 40 },
    { x: 60, y: 20 }, { x: 75, y: 50 }, { x: 85, y: 25 },
    { x: 50, y: 60 }, { x: 20, y: 65 }, { x: 90, y: 65 },
  ];
  const lines: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7], [4, 8], [3, 5]];

  return (
    <div className={layer} aria-hidden="true">
      <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full opacity-25">
        {lines.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
            stroke={color} strokeWidth="0.25"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={draw(0.6 + i * 0.12)}
          />
        ))}
        {stars.map((s, i) => (
          <motion.circle
            key={i} cx={s.x} cy={s.y} r="0.8" fill={color}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={pop(0.1 + i * 0.08)}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── RIPPLE RINGS (Community hero) ── */
export function RippleRings({ count = 5 }: { count?: number }) {
  const { loop } = useHeroMotion();
  const rings = Array.from({ length: count }, (_, i) => ({ id: i, delay: i * 0.8, size: 80 + i * 40 }));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
      {rings.map(r => (
        <motion.div
          key={r.id}
          className="absolute rounded-full border border-white/20"
          style={{ width: r.size, height: r.size }}
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={loop(4, r.delay)}
        />
      ))}
    </div>
  );
}

/* ── TIMELINE BEAM (Timeline / Donate hero) ── */
export function TimelineBeam() {
  const { draw, pop } = useHeroMotion();
  const nodes = [15, 30, 47, 62, 78, 90];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center" aria-hidden="true">
      <div className="relative w-full" style={{ height: 2 }}>
        <motion.div
          className="absolute left-0 right-0 h-px bg-white/20 origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={draw(0.2)}
        />
        {nodes.map((pct, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/40 bg-transparent"
            style={{ left: `${pct}%` }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={pop(0.8 + i * 0.12)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── FILM SCAN (Media hero) ── */
export function FilmScan() {
  const { reduce, loop } = useHeroMotion();
  const lines = Array.from({ length: 3 }, (_, i) => ({ id: i, delay: i * 1.2, opacity: 0.06 - i * 0.015 }));

  return (
    <div className={layer} aria-hidden="true">
      {!reduce && lines.map(l => (
        <motion.div
          key={l.id}
          className="absolute left-0 right-0 h-16 bg-gradient-to-b from-white/0 via-white to-white/0"
          style={{ top: 0, opacity: l.opacity }}
          animate={{ y: ['-10%', '400%'] }}
          transition={loop(2.5, l.delay)}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`l-${i}`} className="absolute left-4 w-3 h-4 rounded-sm border border-white/15"
          style={{ top: `${5 + i * 12}%` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.4, delay: 0.05 + i * 0.05 }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`r-${i}`} className="absolute right-4 w-3 h-4 rounded-sm border border-white/15"
          style={{ top: `${5 + i * 12}%` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.4, delay: 0.1 + i * 0.05 }}
        />
      ))}
    </div>
  );
}

/* ── DATA GRID (ResearchProjects hero) ── */
export function DataGrid() {
  const { pop } = useHeroMotion();
  const cols = 8, rows = 4;
  const dots = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    return { col, row, delay: (col + row) * 0.06 };
  });

  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none flex items-center justify-end pr-8" aria-hidden="true">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {dots.map((d, i) => (
          <motion.div
            key={i} className="w-1.5 h-1.5 rounded-full bg-white/20"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={pop(d.delay)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── KNOWLEDGE FLOW (KnowledgeDissemination hero) ── */
export function KnowledgeFlow() {
  const { loop } = useHeroMotion();
  const words = ['Research', 'Community', 'Justice', 'Knowledge', 'Voices', 'Equity', 'Belonging', 'Impact'];
  const positions = [
    { left: '8%', top: '60%' }, { left: '22%', top: '40%' },
    { left: '38%', top: '70%' }, { left: '52%', top: '30%' },
    { left: '65%', top: '55%' }, { left: '78%', top: '45%' },
    { left: '88%', top: '65%' }, { left: '14%', top: '75%' },
  ];

  return (
    <div className={layer} aria-hidden="true">
      {words.map((word, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] font-bold tracking-[0.2em] uppercase text-white/10"
          style={{ left: positions[i].left, top: positions[i].top }}
          animate={{ y: [0, -16, 0] }}
          transition={loop(3 + i * 0.6, i * 0.4)}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
}

/* ── MEMBER DOTS (MemberBios hero) ── */
export function MemberDots() {
  const { pop } = useHeroMotion();
  const count = 24;
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: ((i % 6) + Math.floor(i / 6)) * 0.07,
  }));

  return (
    <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="grid grid-cols-6 gap-3 opacity-20">
        {dots.map(d => (
          <motion.div
            key={d.id} className="w-4 h-4 rounded-full bg-white"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={pop(d.delay)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── EMBER PARTICLES (Home hero) ── */
export function EmberParticles({ count = 12 }: { count?: number }) {
  const { loop } = useHeroMotion();
  const embers = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${5 + (i * 8.3) % 90}%`,
    bottom: `${5 + (i * 4) % 20}%`,
    size: 3 + (i % 3) * 2,
    duration: 2.5 + (i * 0.4) % 3,
    delay: (i * 0.35) % 4,
    dx: (i % 2 === 0 ? 1 : -1) * (8 + (i * 6) % 20),
  }));

  return (
    <div className={layer} aria-hidden="true">
      {embers.map(e => (
        <motion.div
          key={e.id}
          className="absolute rounded-full bg-white/60"
          style={{ left: e.left, bottom: e.bottom, width: e.size, height: e.size }}
          animate={{ y: [0, -90], x: [0, e.dx], opacity: [0, 0.9, 0] }}
          transition={loop(e.duration, e.delay)}
        />
      ))}
    </div>
  );
}
