'use client';

import { useEffect, useRef } from 'react';

/* =====================================================================
   CROW CANVAS v3 — Itachi Genjutsu Crow Animation
   =====================================================================
   Complete rewrite with:
   • Realistic bird silhouettes drawn as layered shapes:
     wings (with 5 scalloped feather fingers) → tail fan → body → head → beak
   • Large crow sizes (50–100px desktop) so you can SEE the bird shape
   • Slower, more cinematic timing (8.2 seconds total)
   • TikTok-style seamless transition: crows gradually shrink + fade while
     DOM text fades in underneath. No blob morphing. The overlap is so
     gradual you can't pinpoint when crows end and text begins.
   ===================================================================== */

// ─── Types ───────────────────────────────────────────────────────────

interface CrowParticle {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  size: number; baseSize: number;
  wingPhase: number; wingSpeed: number;
  rotation: number;
  opacity: number;
  spawnDelay: number;
  dissolveDelay: number;  // staggered fade-out
  active: boolean;
}

interface FeatherParticle {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  size: number; life: number;
}

// ─── Phase timing (ms) — much slower than v2 ────────────────────────

const SWARM_END    = 2500;   // 2.5s of chaotic swarming
const CONVERGE_END = 5800;   // 3.3s of spiraling convergence
const DISSOLVE_END = 8200;   // 2.4s of seamless cross-fade
// Total: 8.2 seconds

// ─── Component ───────────────────────────────────────────────────────

interface Props {
  active: boolean;
  onComplete: () => void;
  onRevealProgress: (progress: number) => void;
}

export default function CrowCanvas({ active, onComplete, onRevealProgress }: Props) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const rafRef        = useRef(0);
  const t0Ref         = useRef(0);
  const doneRef       = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onRevealRef   = useRef(onRevealProgress);

  useEffect(() => { onCompleteRef.current = onComplete; });
  useEffect(() => { onRevealRef.current = onRevealProgress; });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // ── Sample hero text → target pixel positions ──
    const allPts  = sampleText(W, H);
    const mobile  = W < 768;
    const N       = Math.min(allPts.length, mobile ? 50 : 75);
    const targets = shuffle(allPts).slice(0, N);

    // ── Create crows ──
    const crows: CrowParticle[] = targets.map(pt => {
      // Spawn from random screen edge
      const edge = Math.random();
      let sx: number, sy: number;
      if      (edge < 0.25) { sx = rand(0, W);        sy = -rand(60, 200); }
      else if (edge < 0.5)  { sx = W + rand(60, 200); sy = rand(0, H); }
      else if (edge < 0.75) { sx = rand(0, W);        sy = H + rand(60, 200); }
      else                  { sx = -rand(60, 200);     sy = rand(0, H); }

      const angle = Math.atan2(H * 0.4 - sy, W * 0.5 - sx) + rand(-1.2, 1.2);
      const spd   = rand(1.5, 4);

      // Size categories for depth illusion
      const cat = Math.random();
      let sz: number;
      if      (cat < 0.15) sz = mobile ? rand(40, 60) : rand(70, 100);   // large foreground
      else if (cat < 0.75) sz = mobile ? rand(26, 40) : rand(45, 70);    // medium
      else                 sz = mobile ? rand(16, 26) : rand(28, 45);    // small background

      return {
        x: sx, y: sy,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        tx: pt.x, ty: pt.y,
        size: sz, baseSize: sz,
        wingPhase: rand(0, Math.PI * 2),
        wingSpeed: rand(5, 11),
        rotation: angle,
        opacity: 0,
        spawnDelay: rand(0, 700),
        dissolveDelay: rand(0, 600), // random stagger for seamless fade
        active: false,
      };
    });

    const feathers: FeatherParticle[] = [];
    t0Ref.current  = performance.now();
    doneRef.current = false;

    // ── Main animation loop ──
    const tick = (now: number) => {
      if (doneRef.current) return;

      const t = now - t0Ref.current;
      ctx.clearRect(0, 0, W, H);

      // ── Feather particles ──
      for (let i = feathers.length - 1; i >= 0; i--) {
        const f = feathers[i];
        f.x += f.vx; f.y += f.vy;
        f.vy += 0.025; f.vx *= 0.997;
        f.rot += f.rotV;
        f.life -= 0.008;
        if (f.life <= 0) { feathers.splice(i, 1); continue; }
        drawFeather(ctx, f);
      }

      // ── Crows ──
      for (const c of crows) {
        if (!c.active) {
          if (t >= c.spawnDelay) c.active = true;
          else continue;
        }

        // Smooth fade-in
        const age = t - c.spawnDelay;

        if (t < SWARM_END) {
          // ── SWARM ──
          c.opacity = Math.min(1, age / 400);
          c.wingPhase += c.wingSpeed * 0.016;
          phaseSwarm(c, W, H);
          if (Math.random() < 0.015) emitFeather(feathers, c);

        } else if (t < CONVERGE_END) {
          // ── CONVERGE ──
          const p = (t - SWARM_END) / (CONVERGE_END - SWARM_END);
          c.opacity = Math.min(1, age / 400);
          c.wingSpeed = lerp(c.wingSpeed, lerp(8, 3, p), 0.02);
          c.wingPhase += c.wingSpeed * 0.016;
          phaseConverge(c, p);
          if (Math.random() < 0.01 * (1 - p)) emitFeather(feathers, c);

        } else {
          // ── DISSOLVE (seamless cross-fade) ──
          const rawP = (t - CONVERGE_END) / (DISSOLVE_END - CONVERGE_END);
          // Per-crow stagger: each crow starts fading at its own delay
          const crowP = Math.min(1, Math.max(0,
            (rawP - c.dissolveDelay / (DISSOLVE_END - CONVERGE_END)) * 1.3
          ));

          // Crow shrinks and fades
          c.size = c.baseSize * lerp(1, 0.04, easeInQuad(crowP));
          c.opacity = lerp(1, 0, easeInQuad(crowP));
          c.wingSpeed = lerp(3, 0, crowP);
          c.wingPhase += c.wingSpeed * 0.016;

          // Gentle drift toward target (keeps position stable)
          c.x += (c.tx - c.x) * 0.08;
          c.y += (c.ty - c.y) * 0.08;

          // Slow rotation decay
          c.rotation *= (1 - crowP * 0.03);
        }

        drawCrow(ctx, c);
      }

      // ── Text reveal progress (sent to HeroSection for DOM text opacity) ──
      if (t >= CONVERGE_END) {
        const rawP = (t - CONVERGE_END) / (DISSOLVE_END - CONVERGE_END);
        // Text starts fading in slightly after crows start fading
        const revealP = Math.min(1, Math.max(0, (rawP - 0.08) / 0.92));
        onRevealRef.current(easeOutCubic(revealP));
      }

      // ── Done? ──
      if (t >= DISSOLVE_END && !doneRef.current) {
        doneRef.current = true;
        onRevealRef.current(1);
        onCompleteRef.current();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 25, width: '100%', height: '100%' }}
    />
  );
}


// ═══════════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════════

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInQuad(t: number) { return t * t; }
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


// ═══════════════════════════════════════════════════════════════════
//  TEXT PIXEL SAMPLING
// ═══════════════════════════════════════════════════════════════════

function sampleText(W: number, H: number): { x: number; y: number }[] {
  const oc = document.createElement('canvas');
  oc.width = W; oc.height = H;
  const c = oc.getContext('2d')!;
  const ff = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  c.fillStyle = '#000';
  c.textAlign = 'center';
  c.textBaseline = 'middle';

  let hs: number, rs: number, ps: number;
  if      (W < 640) { hs = 36; rs = 18; ps = 13; }
  else if (W < 768) { hs = 45; rs = 22; ps = 16; }
  else              { hs = 58; rs = 28; ps = 18; }

  const cx = W / 2, y0 = H * 0.35;
  c.font = `bold ${hs}px ${ff}`;
  c.fillText("Hi, I'm Rabia Aziz", cx, y0);

  const y1 = y0 + hs * 1.5;
  c.font = `600 ${rs}px ${ff}`;
  c.fillText('Flutter App Developer', cx, y1);

  const y2 = y1 + rs * 2.8;
  c.font = `500 ${ps}px ${ff}`;
  const maxLW = Math.min(W * 0.85, 640);
  const lines = wrapText(c, 'Building beautiful, high-performance Flutter apps with modern development practices. Passionate about clean code, smooth UI, and meaningful user experiences.', maxLW);
  lines.forEach((l, i) => c.fillText(l, cx, y2 + i * ps * 1.7));

  const data = c.getImageData(0, 0, W, H).data;
  const pts: { x: number; y: number }[] = [];
  const step = W < 768 ? 9 : 7;
  for (let y = 0; y < H; y += step)
    for (let x = 0; x < W; x += step)
      if (data[(y * W + x) * 4 + 3] > 80) pts.push({ x, y });
  return pts;
}

function wrapText(ctx: CanvasRenderingContext2D, txt: string, maxW: number): string[] {
  const words = txt.split(' ');
  const lines: string[] = [];
  let cur = words[0];
  for (let i = 1; i < words.length; i++) {
    const test = cur + ' ' + words[i];
    if (ctx.measureText(test).width > maxW) { lines.push(cur); cur = words[i]; }
    else cur = test;
  }
  lines.push(cur);
  return lines;
}


// ═══════════════════════════════════════════════════════════════════
//  PHASE: SWARM — Chaotic multi-directional flight
// ═══════════════════════════════════════════════════════════════════

function phaseSwarm(c: CrowParticle, W: number, H: number) {
  c.vx += rand(-0.4, 0.4);
  c.vy += rand(-0.4, 0.4);

  // Gentle center gravity
  const dx = W * 0.5 - c.x;
  const dy = H * 0.42 - c.y;
  const d  = Math.max(Math.hypot(dx, dy), 1);
  c.vx += (dx / d) * 0.1;
  c.vy += (dy / d) * 0.1;

  // Occasional banking turns (realistic crow behavior)
  if (Math.random() < 0.01) {
    const turn = rand(-1.5, 1.5);
    const cos = Math.cos(turn), sin = Math.sin(turn);
    const nvx = c.vx * cos - c.vy * sin;
    const nvy = c.vx * sin + c.vy * cos;
    c.vx = nvx; c.vy = nvy;
  }

  // Speed: smaller crows faster (perspective)
  const maxSpd = 2.5 + (1 - c.baseSize / 100) * 3;
  const spd = Math.hypot(c.vx, c.vy);
  if (spd > maxSpd) { c.vx *= maxSpd / spd; c.vy *= maxSpd / spd; }
  if (spd < 1)      { c.vx *= 1.5; c.vy *= 1.5; }

  c.x += c.vx;
  c.y += c.vy;
  c.rotation = Math.atan2(c.vy, c.vx);

  // Soft edge bounce
  const m = c.baseSize * 0.5;
  if (c.x < -m)    c.vx += 0.6;
  if (c.x > W + m) c.vx -= 0.6;
  if (c.y < -m)    c.vy += 0.6;
  if (c.y > H + m) c.vy -= 0.6;
}


// ═══════════════════════════════════════════════════════════════════
//  PHASE: CONVERGE — Spring-damper + spiral toward text
// ═══════════════════════════════════════════════════════════════════

function phaseConverge(c: CrowParticle, p: number) {
  const dx = c.tx - c.x;
  const dy = c.ty - c.y;
  const d  = Math.max(Math.hypot(dx, dy), 1);

  const spring = 0.003 + p * p * 0.1;
  const damp   = 0.92 - p * 0.06;

  // Spiral force (fades with convergence)
  const spiralK = (1 - p) * 0.5;
  const px = -dy / d, py = dx / d;

  c.vx = (c.vx + dx * spring + px * spiralK) * damp;
  c.vy = (c.vy + dy * spring + py * spiralK) * damp;
  c.x += c.vx;
  c.y += c.vy;

  // Smooth heading
  const target = Math.atan2(c.vy, c.vx);
  let diff = target - c.rotation;
  if (diff >  Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;
  c.rotation += diff * 0.1;
}


// ═══════════════════════════════════════════════════════════════════
//  FEATHER SYSTEM
// ═══════════════════════════════════════════════════════════════════

function emitFeather(feathers: FeatherParticle[], crow: CrowParticle) {
  if (feathers.length >= 35) return;
  feathers.push({
    x:    crow.x + rand(-crow.size * 0.2, crow.size * 0.2),
    y:    crow.y + rand(-crow.size * 0.2, crow.size * 0.2),
    vx:   crow.vx * 0.15 + rand(-1.2, 1.2),
    vy:   crow.vy * 0.15 + rand(-0.2, 0.8),
    rot:  rand(0, Math.PI * 2),
    rotV: rand(-0.06, 0.06),
    size: rand(6, 14),
    life: rand(0.6, 1),
  });
}

function drawFeather(ctx: CanvasRenderingContext2D, f: FeatherParticle) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rot);
  ctx.globalAlpha = Math.max(0, f.life * 0.55);
  ctx.fillStyle = '#000';

  // Elongated teardrop
  ctx.beginPath();
  ctx.moveTo(0, -f.size * 0.5);
  ctx.bezierCurveTo( f.size * 0.14, -f.size * 0.12,  f.size * 0.1,  f.size * 0.2,  0, f.size * 0.5);
  ctx.bezierCurveTo(-f.size * 0.1,   f.size * 0.2,  -f.size * 0.14, -f.size * 0.12, 0, -f.size * 0.5);
  ctx.fill();

  // Center vein
  ctx.strokeStyle = 'rgba(30,30,30,0.3)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -f.size * 0.35);
  ctx.lineTo(0, f.size * 0.35);
  ctx.stroke();
  ctx.restore();
}


// ═══════════════════════════════════════════════════════════════════
//  DRAW CROW — Realistic bird silhouette
// ═══════════════════════════════════════════════════════════════════
//
//  Layered drawing order: Wings → Tail → Body → Head → Beak
//  Each layer is filled black. Body covers the wing-body seam.
//
//  Orientation: head at +X (direction of flight), wings at ±Y.
//  After ctx.rotate(c.rotation), the crow faces its velocity direction.
//
//  Each wing has:
//   • Smooth curved leading edge (bezier)
//   • 5 scalloped feather "fingers" at the tip
//   • Smooth curved trailing edge (bezier) back to body
//
//  Wing flap: sinusoidal displacement of wing tips.
//  Tips move ±12% of crow size. Base stays at body.

function drawCrow(ctx: CanvasRenderingContext2D, c: CrowParticle) {
  if (!c.active || c.opacity <= 0.01 || c.size < 2) return;

  const s = c.size;

  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.rotate(c.rotation);
  ctx.globalAlpha = c.opacity;
  ctx.fillStyle = '#000000';

  const flap    = Math.sin(c.wingPhase);
  const tipDisp = flap * s * 0.12; // wing tip displacement from neutral

  // ────────────────────────────────────────────────
  //  WINGS (drawn first so body covers the seam)
  // ────────────────────────────────────────────────
  for (const side of [-1, 1] as const) {
    const wingSpan = s * 0.48;
    const tipY     = side * wingSpan + tipDisp * side;

    ctx.beginPath();

    // Wing root (where wing meets body)
    ctx.moveTo(s * 0.12, side * s * 0.055);

    // ── Leading edge: smooth curve from body to wing tip ──
    ctx.bezierCurveTo(
      s * 0.10,  tipY * 0.28,       // near body, curves out
      s * 0.04,  tipY * 0.62,       // mid-wing
      -s * 0.04, tipY               // arrives at wing tip
    );

    // ── 5 Feather fingers (scalloped bumps at wing tip) ──
    // Each finger: bump OUTWARD (further from body), notch INWARD
    const fOut = side * s * 0.04;   // outward bump distance
    const fIn  = -side * s * 0.025; // inward notch distance

    for (let i = 0; i < 5; i++) {
      const t  = i / 4;                       // 0 → 1 (outer → inner)
      const fx = -s * (0.04 + i * 0.046);     // X progresses backward
      // Inner fingers are slightly closer to body (natural wing taper)
      const baseY = tipY * (1 - t * 0.12);
      const out = fOut * (1 - t * 0.25);       // outer fingers bump more
      const inn = fIn  * (1 + t * 0.2);        // inner notches deeper

      ctx.lineTo(fx - s * 0.012, baseY + out); // finger tip
      if (i < 4) {
        ctx.lineTo(fx - s * 0.034, baseY + inn); // notch between fingers
      }
    }

    // ── Trailing edge: smooth curve back to body ──
    const lastFx = -s * (0.04 + 4 * 0.046);   // where last finger ends
    ctx.bezierCurveTo(
      lastFx - s * 0.02, tipY * (1 - 0.12 * 0.5) * 0.5,
      -s * 0.14,  side * s * 0.08,
      -s * 0.1,   side * s * 0.04
    );

    ctx.closePath();
    ctx.fill();
  }

  // ────────────────────────────────────────────────
  //  TAIL (3-feather fan)
  // ────────────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(-s * 0.17, -s * 0.012);
  ctx.lineTo(-s * 0.28, -s * 0.045);
  ctx.lineTo(-s * 0.24, -s * 0.006);
  ctx.lineTo(-s * 0.3,  0);
  ctx.lineTo(-s * 0.24, s * 0.006);
  ctx.lineTo(-s * 0.28, s * 0.045);
  ctx.lineTo(-s * 0.17, s * 0.012);
  ctx.closePath();
  ctx.fill();

  // ────────────────────────────────────────────────
  //  BODY (ellipse — covers wing-body seam)
  // ────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.2, s * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  // ────────────────────────────────────────────────
  //  HEAD
  // ────────────────────────────────────────────────
  ctx.beginPath();
  ctx.arc(s * 0.19, 0, s * 0.05, 0, Math.PI * 2);
  ctx.fill();

  // ────────────────────────────────────────────────
  //  BEAK
  // ────────────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(s * 0.24, -s * 0.012);
  ctx.lineTo(s * 0.32, 0);
  ctx.lineTo(s * 0.24, s * 0.012);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
