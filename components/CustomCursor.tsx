'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  maxAlpha: number;
  age: number;
  maxAge: number;
  ci: number;
  type: 0 | 1 | 2 | 3 | 4 | 5;
  active: boolean;
  grav: number;
  angle: number;
  av: number;
  phase: number;
  drag: number;
  rot: number;
}

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  size: number;
  ci: number;
  alpha: number;
  active: boolean;
}

const MAX_PARTICLES = 180;
const MAX_RIPPLES = 8;

// Palette intentionally preserved:
// black · slate-600 · silver · ice-blue · slate-200 · white
const C: [number, number, number][] = [
  [0, 0, 0],
  [71, 85, 105],
  [148, 163, 184],
  [191, 219, 254],
  [226, 232, 240],
  [255, 255, 255],
];

const CS_RGB = [
  'rgb(0,0,0)',
  'rgb(71,85,105)',
  'rgb(148,163,184)',
  'rgb(191,219,254)',
  'rgb(226,232,240)',
  'rgb(255,255,255)',
];

function createWispSprites(): HTMLCanvasElement[] {
  return C.map(([r, g, b]) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.65)`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},0.16)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    return canvas;
  });
}

function createCometSprites(): HTMLCanvasElement[] {
  return C.map(([r, g, b], i) => {
    const next = C[Math.min(i + 1, 5)];
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const grad = ctx.createLinearGradient(32, 0, 32, 128);
    grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},0.46)`);
    grad.addColorStop(0.82, `rgba(${next[0]},${next[1]},${next[2]},0.82)`);
    grad.addColorStop(1, `rgba(${next[0]},${next[1]},${next[2]},1.0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(32, 70, 16, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    return canvas;
  });
}

export default function NarutoCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const mxR = useRef(-400);
  const myR = useRef(-400);
  const pmx = useRef(-400);
  const pmy = useRef(-400);

  const velX = useRef(0);
  const velY = useRef(0);
  const filteredSpeed = useRef(0);

  const aX = useRef(-400);
  const aY = useRef(-400);

  const hovering = useRef(false);
  const clicking = useRef(false);
  const textMode = useRef(false);
  const visible = useRef(true);
  const isTch = useRef(false);
  const lastMove = useRef(0);
  const cursorEntered = useRef(false);

  const lastTarget = useRef<EventTarget | null>(null);
  const lastVisualState = useRef(-1);
  const lastHeadEntered = useRef(false);
  const canvasClean = useRef(false);

  const pool = useRef<Particle[]>([]);
  const poolHead = useRef(0);
  const ripples = useRef<Ripple[]>([]);
  const rippleHead = useRef(0);

  // Pre-allocated typed arrays for zero-GC render loops
  const glitterIndices = useRef(new Int32Array(MAX_PARTICLES));
  const cometIndices = useRef(new Int32Array(MAX_PARTICLES));
  const wispIndices = useRef(new Int32Array(MAX_PARTICLES));
  const echoIndices = useRef(new Int32Array(MAX_PARTICLES));

  const initPool = useCallback(() => {
    pool.current = Array.from({ length: MAX_PARTICLES }, (): Particle => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      alpha: 0,
      maxAlpha: 0,
      age: 0,
      maxAge: 50,
      ci: 0,
      type: 0,
      active: false,
      grav: 0,
      angle: 0,
      av: 0,
      phase: 0,
      drag: 0.96,
      rot: 0,
    }));
    poolHead.current = 0;
  }, []);

  const initRipples = useCallback(() => {
    ripples.current = Array.from({ length: MAX_RIPPLES }, (): Ripple => ({
      x: 0,
      y: 0,
      age: 0,
      maxAge: 40,
      size: 0,
      ci: 5,
      alpha: 0,
      active: false,
    }));
    rippleHead.current = 0;
  }, []);

  // O(1) instant particle acquisition via ring buffer
  const getParticle = useCallback((): Particle => {
    const p = pool.current;
    const particle = p[poolHead.current];
    poolHead.current = (poolHead.current + 1) % MAX_PARTICLES;
    return particle;
  }, []);

  // O(1) instant ripple acquisition via ring buffer
  const getRipple = useCallback((): Ripple => {
    const r = ripples.current;
    const rip = r[rippleHead.current];
    rippleHead.current = (rippleHead.current + 1) % MAX_RIPPLES;
    return rip;
  }, []);

  const randomColor = useCallback((bright = false): number => {
    const r = Math.random();

    if (bright) {
      if (r < 0.36) return 5;
      if (r < 0.65) return 4;
      if (r < 0.84) return 3;
      return 2;
    }

    if (r < 0.10) return 0;
    if (r < 0.24) return 1;
    if (r < 0.48) return 2;
    if (r < 0.70) return 3;
    if (r < 0.88) return 4;
    return 5;
  }, []);

  const spawnParticle = useCallback((
    p: Particle,
    x: number,
    y: number,
    vx: number,
    vy: number,
    radius: number,
    alpha: number,
    age: number,
    maxAge: number,
    ci: number,
    type: Particle['type'],
    grav = 0,
    drag = 0.96,
  ) => {
    p.x = x;
    p.y = y;
    p.vx = vx;
    p.vy = vy;
    p.r = radius;
    p.alpha = alpha;
    p.maxAlpha = alpha;
    p.age = age;
    p.maxAge = maxAge;
    p.ci = ci;
    p.type = type;
    p.grav = grav;
    p.angle = Math.random() * Math.PI * 2;
    p.av = (Math.random() - 0.5) * 0.24;
    p.phase = Math.random() * Math.PI * 2;
    p.drag = drag;
    p.rot = Math.random() * Math.PI * 2;
    p.active = true;
  }, []);

  const emitTrail = useCallback((
    x: number,
    y: number,
    evx: number,
    evy: number,
    intensity: number,
    hoverBoost = false,
  ) => {
    const speed = Math.hypot(evx, evy);
    const direction = Math.atan2(evy, evx);

    // Deliberately denser near the head, lighter on the far tail.
    const count =
      2 +
      Math.min(4, Math.floor(speed * 0.35)) +
      (hoverBoost ? 2 : 0);

    const spread = 8 + Math.min(26, speed * 1.1);

    for (let i = 0; i < count; i++) {
      const p = getParticle();
      const a = direction + Math.PI + (Math.random() - 0.5) * 1.9;
      const throwSpeed = 0.25 + Math.random() * 1.25 + speed * 0.045;

      spawnParticle(
        p,
        x + (Math.random() - 0.5) * spread,
        y + (Math.random() - 0.5) * spread,
        Math.cos(a) * throwSpeed - evx * 0.022,
        Math.sin(a) * throwSpeed - evy * 0.022,
        0.7 + Math.random() * (hoverBoost ? 2.2 : 1.7),
        (0.35 + Math.random() * 0.55) * intensity,
        0,
        55 + Math.floor(Math.random() * 45),
        randomColor(false),
        Math.random() > 0.22 ? 0 : 2,
        0,
        0.965 + Math.random() * 0.015,
      );
    }

    // Fine dust — creates the “silky” fill between obvious sparkles.
    const dustCount = 1;
    for (let i = 0; i < dustCount; i++) {
      const p = getParticle();
      spawnParticle(
        p,
        x + (Math.random() - 0.5) * 14,
        y + (Math.random() - 0.5) * 14,
        -evx * 0.012 + (Math.random() - 0.5) * 0.2,
        -evy * 0.012 + (Math.random() - 0.5) * 0.2,
        5 + Math.random() * 6,
        0.035 + Math.random() * 0.05,
        0,
        65 + Math.floor(Math.random() * 40),
        randomColor(true),
        2,
        0,
        0.978,
      );
    }

    // Occasional needle-like comet, aligned with the movement direction.
    if (speed > 3.2 && Math.random() > 0.38) {
      const p = getParticle();
      const reverse = direction + Math.PI;
      const side = (Math.random() - 0.5) * 0.5;

      spawnParticle(
        p,
        x + (Math.random() - 0.5) * 8,
        y + (Math.random() - 0.5) * 8,
        Math.cos(reverse + side) * (0.8 + speed * 0.05),
        Math.sin(reverse + side) * (0.8 + speed * 0.05),
        2 + Math.random() * 2.5,
        0.44 + Math.random() * 0.34,
        0,
        50 + Math.floor(Math.random() * 35),
        randomColor(true),
        1,
        0.003,
        0.988,
      );
      p.angle = reverse + side + Math.PI / 2;
    }
  }, [getParticle, randomColor, spawnParticle]);

  const emitBurst = useCallback((bx: number, by: number) => {
    const burstCount = 45;
    for (let i = 0; i < burstCount; i++) {
      const p = getParticle();
      const a =
        (i / burstCount) * Math.PI * 2 +
        (Math.random() - 0.5) * 0.18;
      const spd = 2.4 + Math.random() * 6.8;

      spawnParticle(
        p,
        bx + (Math.random() - 0.5) * 2,
        by + (Math.random() - 0.5) * 2,
        Math.cos(a) * spd,
        Math.sin(a) * spd,
        0.8 + Math.random() * 2.9,
        0.62 + Math.random() * 0.38,
        0,
        60 + Math.floor(Math.random() * 50),
        randomColor(false),
        Math.random() > 0.15 ? 0 : 5,
        0.015 + Math.random() * 0.045,
        0.958 + Math.random() * 0.022,
      );
      p.av = (Math.random() - 0.5) * 0.5;
    }

    // Brighter “hero” streaks
    for (let i = 0; i < 8; i++) {
      const p = getParticle();
      const a = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.24;
      const spd = 4 + Math.random() * 5.4;

      spawnParticle(
        p,
        bx,
        by,
        Math.cos(a) * spd,
        Math.sin(a) * spd,
        2.2 + Math.random() * 2.5,
        0.72 + Math.random() * 0.26,
        0,
        55 + Math.floor(Math.random() * 35),
        randomColor(true),
        1,
        0.018,
        0.965,
      );
      p.angle = a + Math.PI / 2;
    }

    // Concentric ripples
    for (let i = 0; i < 3; i++) {
      const r = getRipple();
      r.x = bx;
      r.y = by;
      r.age = i * 4;
      r.maxAge = 45 + i * 10;
      r.size = 7 + i * 11;
      r.ci = [5, 4, 3][i];
      r.alpha = 0.62 - i * 0.11;
      r.active = true;
    }

    // Soft flash core
    for (let i = 0; i < 3; i++) {
      const p = getParticle();
      spawnParticle(
        p,
        bx,
        by,
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.28,
        16 + i * 10,
        0.16 - i * 0.02,
        0,
        30 + i * 5,
        i % 2 === 0 ? 3 : 5,
        2,
        0,
        0.985,
      );
    }
  }, [getParticle, getRipple, randomColor, spawnParticle]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTch.current = true;
      return;
    }

    const canvas = canvasRef.current;
    const head = headRef.current;
    const hover = hoverRef.current;

    if (!canvas || !head || !hover) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Pre-render GPU offscreen sprites for wisps and comets
    const wispSprites = createWispSprites();
    const cometSprites = createCometSprites();

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    initPool();
    initRipples();

    const isInteractive = (target: EventTarget | null) => {
      const t = target as HTMLElement | null;
      return !!t?.closest(
        'a,button,[role="button"],input,textarea,select,[data-cursor-hover],.cursor-pointer'
      );
    };

    const isTextual = (target: EventTarget | null) => {
      const t = target as HTMLElement | null;
      return !!t?.closest(
        'p,h1,h2,h3,h4,h5,h6,span,label,article,li,strong,em,blockquote'
      );
    };

    const onMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;

      if (!cursorEntered.current) {
        cursorEntered.current = true;
        pmx.current = cx;
        pmy.current = cy;
        aX.current = cx;
        aY.current = cy;
      }

      mxR.current = cx;
      myR.current = cy;
      lastMove.current = performance.now();

      // Only check DOM hierarchy when the target element actually changes
      if (e.target !== lastTarget.current) {
        lastTarget.current = e.target;
        hovering.current = isInteractive(e.target);
        textMode.current = !hovering.current && isTextual(e.target);
      }
    };

    const onDown = (e: MouseEvent) => {
      clicking.current = true;
      emitBurst(e.clientX, e.clientY);
    };

    const onUp = () => {
      clicking.current = false;
    };

    const onLeave = () => {
      cursorEntered.current = false;
      mxR.current = -400;
      myR.current = -400;
      hovering.current = false;
      textMode.current = false;
      lastTarget.current = null;
    };

    const onVis = () => {
      visible.current = !document.hidden;
      if (!visible.current) {
        const p = pool.current;
        for (let i = 0; i < p.length; i++) p[i].active = false;
        const r = ripples.current;
        for (let i = 0; i < r.length; i++) r[i].active = false;
      }
    };

    const onRes = () => resize();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onRes);

    const tick = () => {
      if (!visible.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();
      const cmx = mxR.current;
      const cmy = myR.current;
      const cpx = pmx.current;
      const cpy = pmy.current;

      const dx = cmx - cpx;
      const dy = cmy - cpy;

      velX.current += (dx - velX.current) * 0.42;
      velY.current += (dy - velY.current) * 0.42;

      const speed = Math.hypot(velX.current, velY.current);
      filteredSpeed.current += (speed - filteredSpeed.current) * 0.18;

      pmx.current = cmx;
      pmy.current = cmy;

      const speedForShape = Math.min(filteredSpeed.current, 24);
      const angle = Math.atan2(velY.current, velX.current) || 0;
      const idle = now - lastMove.current > 1400;

      // ── CORE DOT ─────────────────────────────────────────────────
      if (head) {
        let scale = 1;
        if (clicking.current) {
          scale = 0.54;
        } else if (hovering.current) {
          scale = 1.22;
        } else if (textMode.current) {
          scale = 0.78;
        } else {
          scale = 1 + Math.min(speedForShape * 0.008, 0.12);
        }

        const squash = 1 + Math.min(speedForShape * 0.014, 0.18);
        const stretch = 1 - Math.min(speedForShape * 0.007, 0.10);

        head.style.transform =
          `translate3d(${cmx}px,${cmy}px,0) ` +
          `rotate(${angle}rad) ` +
          `scale(${scale * squash},${scale * stretch})`;

        if (lastHeadEntered.current !== cursorEntered.current) {
          lastHeadEntered.current = cursorEntered.current;
          head.style.opacity = cursorEntered.current ? '1' : '0';
        }
      }

      // ── FOLLOWER / MAGNETIC RING ─────────────────────────────────
      const followEase = hovering.current ? 0.22 : 0.16;
      aX.current += (cmx - aX.current) * followEase;
      aY.current += (cmy - aY.current) * followEase;

      if (hover) {
        let sx = 1;
        let sy = 1;

        if (hovering.current) {
          sx = 1.72;
          sy = 1.72;
        } else if (clicking.current) {
          sx = 0.66;
          sy = 0.66;
        } else if (textMode.current) {
          sx = 0.42;
          sy = 1.36;
        } else {
          const stretch = Math.min(speedForShape * 0.025, 0.38);
          sx = 1 + stretch;
          sy = 1 - stretch * 0.4;
        }

        const ringRotation = (angle * 180) / Math.PI;

        hover.style.transform =
          `translate3d(${aX.current}px,${aY.current}px,0) ` +
          `rotate(${ringRotation}deg) ` +
          `scale(${sx},${sy})`;

        // Only modify CSS classes/styles when interactive states change
        const currentVisualState =
          (cursorEntered.current ? 1 : 0) |
          (hovering.current ? 2 : 0) |
          (clicking.current ? 4 : 0) |
          (textMode.current ? 8 : 0) |
          (idle ? 16 : 0);

        if (currentVisualState !== lastVisualState.current) {
          lastVisualState.current = currentVisualState;

          hover.style.borderColor = hovering.current
            ? 'rgba(191,219,254,0.98)'
            : 'rgba(148,163,184,0.56)';

          hover.style.boxShadow = hovering.current
            ? '0 0 0 1px rgba(191,219,254,0.10), 0 0 22px rgba(191,219,254,0.34), inset 0 0 10px rgba(255,255,255,0.08)'
            : '0 0 0 1px rgba(148,163,184,0.06)';

          hover.style.opacity = cursorEntered.current
            ? idle
              ? '0.18'
              : hovering.current
                ? '1'
                : '0.54'
            : '0';
        }
      }

      // ── TRAIL EMISSION ────────────────────────────────────────────
      if (cursorEntered.current && speed > 0.2) {
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(2, Math.max(1, Math.floor(dist / 22)));

        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          emitTrail(
            cpx + dx * t,
            cpy + dy * t,
            velX.current,
            velY.current,
            hovering.current ? 1.12 : 0.9,
            hovering.current,
          );
        }
      }

      // ── RENDER ────────────────────────────────────────────────────
      const particles = pool.current;

      // Check if any particles or ripples are active
      let hasActive = false;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (particles[i].active) {
          hasActive = true;
          break;
        }
      }
      if (!hasActive) {
        const activeRipples = ripples.current;
        for (let i = 0; i < MAX_RIPPLES; i++) {
          if (activeRipples[i].active) {
            hasActive = true;
            break;
          }
        }
      }

      // When idle with no active elements, skip drawing passes entirely
      if (!hasActive) {
        if (!canvasClean.current) {
          ctx.clearRect(0, 0, W, H);
          canvasClean.current = true;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      canvasClean.current = false;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      const gIdx = glitterIndices.current;
      const cIdx = cometIndices.current;
      const wIdx = wispIndices.current;
      const eIdx = echoIndices.current;

      let glitterCount = 0;
      let cometCount = 0;
      let wispCount = 0;
      let echoCount = 0;

      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i];
        if (!p.active) continue;

        p.age++;
        if (p.age >= p.maxAge) {
          p.active = false;
          continue;
        }

        const prog = p.age / p.maxAge;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.grav;
        p.angle += p.av;
        p.rot += p.av * 0.5;

        const fadeIn = Math.min(1, prog / 0.05);
        const fadeOut = Math.pow(1 - Math.max(0, (prog - 0.15) / 0.85), 1.25);
        let alpha = p.maxAlpha * fadeIn * fadeOut;

        if (p.type === 0 || p.type === 5) {
          alpha *= 0.28 + 0.72 * Math.abs(Math.sin(p.age * 0.42 + p.phase));
        }

        p.alpha = alpha;
        if (alpha < 0.004) {
          p.active = false;
          continue;
        }

        if (p.type === 3) {
          const rr = p.r * (1 + prog * 6.5);
          const ra = p.maxAlpha * Math.pow(1 - prog, 2.0);
          if (ra > 0.004) {
            ctx.strokeStyle = CS_RGB[p.ci];
            ctx.globalAlpha = ra;
            ctx.lineWidth = 1.5 * Math.pow(1 - prog, 0.8);
            ctx.beginPath();
            ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
            ctx.stroke();
          }
          continue;
        }

        if (p.type === 0) gIdx[glitterCount++] = i;
        else if (p.type === 1) cIdx[cometCount++] = i;
        else if (p.type === 2) wIdx[wispCount++] = i;
        else if (p.type === 5) eIdx[echoCount++] = i;
      }

      // Soft wisps (GPU sprite blitting)
      for (let k = 0; k < wispCount; k++) {
        const p = particles[wIdx[k]];
        const pulse = 1 + Math.sin(p.age * 0.08 + p.phase) * 0.08;
        const radius = p.r * pulse;
        const size = radius * 2;
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(wispSprites[p.ci], p.x - radius, p.y - radius, size, size);
      }

      // Delicate after-image echoes
      for (let k = 0; k < echoCount; k++) {
        const p = particles[eIdx[k]];
        const radius = Math.max(0.7, p.r * (1 - p.age / p.maxAge));
        ctx.fillStyle = CS_RGB[p.ci];
        ctx.globalAlpha = p.alpha * 0.24;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Star glints (Optimized direct trigonometry, zero save/restore matrix stack overhead)
      for (let k = 0; k < glitterCount; k++) {
        const p = particles[gIdx[k]];
        const progress = p.age / p.maxAge;
        const radius = p.r * (1 - progress * 0.34);
        const length = radius * 3.1;
        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);
        const lx = length * cos;
        const ly = length * sin;
        const sx = length * 0.62 * -sin;
        const sy = length * 0.62 * cos;

        // Long and short star axis
        ctx.strokeStyle = CS_RGB[p.ci];
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = Math.max(0.45, radius * 0.22);
        ctx.beginPath();
        ctx.moveTo(p.x - lx, p.y - ly);
        ctx.lineTo(p.x + lx, p.y + ly);
        ctx.moveTo(p.x - sx, p.y - sy);
        ctx.lineTo(p.x + sx, p.y + sy);
        ctx.stroke();

        // Star core
        const core = Math.max(0.45, radius * 0.42);
        ctx.fillStyle = CS_RGB[Math.min(p.ci + 1, 5)];
        ctx.globalAlpha = Math.min(1, p.alpha * 0.95);
        ctx.beginPath();
        ctx.arc(p.x, p.y, core, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fluid comets (GPU pre-rendered gradient sprite)
      for (let k = 0; k < cometCount; k++) {
        const p = particles[cIdx[k]];
        const progress = p.age / p.maxAge;
        const radius = p.r * (1 - progress * 0.24);
        const length = radius * (5.8 + speedForShape * 0.14);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        const w = radius * 0.84;
        const h = length * 1.52;
        ctx.drawImage(cometSprites[p.ci], -w * 0.5, -h * 0.78, w, h);
        ctx.restore();
      }

      // Constellation links (Single batched path, zero array allocations)
      if (glitterCount > 3) {
        const sampleCount = Math.min(glitterCount, 26);
        const maxD = hovering.current ? 58 : 44;
        const maxDSq = maxD * maxD;

        ctx.strokeStyle = 'rgb(148,163,184)';
        ctx.globalAlpha = 0.13;
        ctx.lineWidth = 0.38;
        ctx.beginPath();

        for (let i = 0; i < sampleCount; i++) {
          const a = particles[gIdx[i]];
          for (let j = i + 1; j < sampleCount; j++) {
            const b = particles[gIdx[j]];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (dx * dx + dy * dy < maxDSq) {
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
            }
          }
        }
        ctx.stroke();
      }

      // Click ripples
      const activeRipples = ripples.current;
      for (let i = 0; i < activeRipples.length; i++) {
        const r = activeRipples[i];
        if (!r.active) continue;

        r.age++;
        if (r.age >= r.maxAge) {
          r.active = false;
          continue;
        }

        const progress = r.age / r.maxAge;
        const ease = 1 - Math.pow(1 - progress, 2.6);
        const radius = r.size + ease * 70;
        const alpha = r.alpha * Math.pow(1 - progress, 1.75);

        ctx.strokeStyle = CS_RGB[r.ci];
        ctx.globalAlpha = alpha;
        ctx.lineWidth = Math.max(0.55, 1.7 * (1 - progress));
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onRes);
    };
  }, [emitBurst, emitTrail, initPool, initRipples]);

  if (isTch.current) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 99990,
          contain: 'strict',
        }}
      />

      {/* Primary cursor core */}
      <div
        ref={headRef}
        className="fixed top-0 left-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 99999,
          width: '10px',
          height: '10px',
          marginLeft: '-5px',
          marginTop: '-5px',
          borderRadius: '999px',
          background:
            'radial-gradient(circle at 38% 35%, #fff 0 18%, rgba(255,255,255,0.98) 42%, rgba(255,255,255,0.76) 70%, rgba(255,255,255,0) 100%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.32), 0 0 12px rgba(191,219,254,0.22)',
          willChange: 'transform, opacity',
          mixBlendMode: 'difference',
          transition: 'opacity 120ms ease-out',
        }}
      />

      {/* Magnetic hover ring */}
      <div
        ref={hoverRef}
        className="fixed top-0 left-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 99998,
          width: '42px',
          height: '42px',
          marginLeft: '-21px',
          marginTop: '-21px',
          borderRadius: '999px',
          border: '1.25px solid rgba(148,163,184,0.56)',
          background:
            'radial-gradient(circle, rgba(191,219,254,0.035), rgba(191,219,254,0) 68%)',
          willChange: 'transform, opacity, box-shadow, border-color',
          transition:
            'opacity 180ms ease, border-color 180ms ease, box-shadow 220ms ease',
        }}
      />
    </>
  );
}
