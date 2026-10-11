'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * SwordReturnEffect v3.1 — "Chakra Blade Awakening" (polished)
 *
 * Refined Naruto-authentic effect:
 *   - Smoother easing & fade curves on all effects
 *   - Chidori lightning with branching sub-arcs
 *   - Cleaner chakra particles (fewer, better sized)
 *   - Tighter timing so nothing feels cluttered
 *   - Crows with smoother flight paths
 */

// ─── Easing helpers ───
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOutQuad(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
function smoothFade(t: number, fadeIn: number, fadeOut: number) {
  if (t < fadeIn) return easeOutCubic(t / fadeIn);
  if (t > 1 - fadeOut) return easeOutCubic((1 - t) / fadeOut);
  return 1;
}

export default function SwordReturnEffect({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // ─── Chidori lightning arc with branching ───
  const generateChidoriArc = useCallback((
    x1: number, y1: number, x2: number, y2: number,
    segments: number, jitter: number, depth: number = 0
  ): { points: { x: number; y: number }[]; branches: { x: number; y: number }[][] } => {
    const points: { x: number; y: number }[] = [{ x: x1, y: y1 }];
    const branches: { x: number; y: number }[][] = [];

    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const px = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
      const py = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
      points.push({ x: px, y: py });

      // Branch off at random points (only depth 0)
      if (depth === 0 && Math.random() < 0.3 && i > 1 && i < segments - 1) {
        const branchAngle = (Math.random() - 0.5) * Math.PI * 0.6;
        const branchLen = 15 + Math.random() * 30;
        const bx = px + Math.cos(branchAngle) * branchLen;
        const by = py + Math.sin(branchAngle) * branchLen;
        const branchPts: { x: number; y: number }[] = [{ x: px, y: py }];
        const bSegs = 3;
        for (let b = 1; b <= bSegs; b++) {
          const bt = b / bSegs;
          branchPts.push({
            x: px + (bx - px) * bt + (Math.random() - 0.5) * jitter * 0.5,
            y: py + (by - py) * bt + (Math.random() - 0.5) * jitter * 0.5,
          });
        }
        branches.push(branchPts);
      }
    }
    points.push({ x: x2, y: y2 });
    return { points, branches };
  }, []);

  // ─── Draw path helper ───
  const drawPath = useCallback((ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[]) => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
  }, []);

  // ─── Crow silhouette (matching CrowCanvas style) ───
  const drawCrow = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    size: number, rotation: number,
    wingPhase: number, alpha: number
  ) => {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#000000';

    const s = size;
    const flap = Math.sin(wingPhase);
    const tipDisp = flap * s * 0.15;

    for (const side of [-1, 1]) {
      const wingSpan = s * 0.5;
      const tipY = side * wingSpan + tipDisp * side;
      ctx.beginPath();
      ctx.moveTo(s * 0.1, side * s * 0.05);
      ctx.bezierCurveTo(s * 0.08, tipY * 0.3, s * 0.02, tipY * 0.65, -s * 0.05, tipY);
      for (let i = 0; i < 4; i++) {
        const t = i / 3;
        const fx = -s * (0.05 + i * 0.04);
        const baseY = tipY * (1 - t * 0.15);
        ctx.lineTo(fx, baseY + side * s * 0.03 * (1 - t * 0.3));
        if (i < 3) ctx.lineTo(fx - s * 0.025, baseY - side * s * 0.015);
      }
      ctx.bezierCurveTo(-s * 0.2, tipY * 0.3, -s * 0.12, side * s * 0.06, -s * 0.08, side * s * 0.03);
      ctx.closePath();
      ctx.fill();
    }

    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.18, s * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(s * 0.17, 0, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(s * 0.21, -s * 0.01);
    ctx.lineTo(s * 0.28, 0);
    ctx.lineTo(s * 0.21, s * 0.01);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, []);

  // ─── Types ───
  interface ChakraParticle {
    x: number; y: number;
    vx: number; vy: number;
    life: number; maxLife: number;
    size: number;
    type: 'chakra' | 'wind';
    radius?: number;
    startAngle?: number;
  }

  interface Crow {
    x: number; y: number;
    vx: number; vy: number;
    size: number;
    rotation: number; targetRotation: number;
    wingPhase: number; wingSpeed: number;
    life: number; maxLife: number;
  }

  const particlesRef = useRef<ChakraParticle[]>([]);
  const crowsRef = useRef<Crow[]>([]);

  const initEffects = useCallback((canvas: HTMLCanvasElement) => {
    const w = canvas.width;
    const swordY = 40;
    const cx = w / 2;
    const bladeLeft = w * 0.22;
    const bladeRight = w * 0.96;

    // ─── Chakra flow particles (fewer, cleaner) ───
    const particles: ChakraParticle[] = [];
    for (let i = 0; i < 40; i++) {
      const startX = bladeLeft + Math.random() * (bladeRight - bladeLeft) * 0.4;
      particles.push({
        x: startX,
        y: swordY + 18 + (Math.random() - 0.5) * 10,
        vx: 2.5 + Math.random() * 4,
        vy: (Math.random() - 0.5) * 0.8,
        life: -(Math.random() * 25),
        maxLife: 35 + Math.random() * 20,
        size: 1.2 + Math.random() * 2,
        type: 'chakra',
      });
    }

    // ─── Wind release arcs (3, cleaner) ───
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: cx + (Math.random() - 0.5) * w * 0.2,
        y: swordY + 20,
        vx: 0, vy: 0,
        life: -(3 + i * 8),
        maxLife: 40,
        size: 0,
        type: 'wind',
        radius: 40 + i * 30,
        startAngle: -0.7 + (Math.random() - 0.5) * 0.3,
      });
    }

    // ─── Crows (4, smoother flight) ───
    const crows: Crow[] = [];
    for (let i = 0; i < 4; i++) {
      const spawnX = bladeLeft + 0.2 * (bladeRight - bladeLeft) + Math.random() * (bladeRight - bladeLeft) * 0.6;
      const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.5;
      const speed = 2.5 + Math.random() * 2;
      crows.push({
        x: spawnX,
        y: swordY + 15,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 22 + Math.random() * 18,
        rotation: angle,
        targetRotation: angle,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 7 + Math.random() * 3,
        life: -(8 + i * 5),
        maxLife: 55 + Math.random() * 25,
      });
    }

    particlesRef.current = particles;
    crowsRef.current = crows;
  }, []);

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (startTimeRef.current === 0) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const swordY = 40;
    const bladeLeft = w * 0.22;
    const bladeRight = w * 0.96;
    const bladeCenterY = swordY + 20;
    const totalDuration = 1800;
    const globalT = Math.min(1, elapsed / totalDuration);

    // ═══════════════════════════════════════════
    //  CHAKRA BLADE AURA — smooth pulsing shroud
    // ═══════════════════════════════════════════
    if (elapsed > 20 && elapsed < 1600) {
      const auraT = (elapsed - 20) / 1580;
      const auraAlpha = smoothFade(auraT, 0.12, 0.4);
      const pulse = 0.75 + Math.sin(elapsed * 0.01) * 0.25;
      const intensity = auraAlpha * pulse;

      // Soft wide aura
      const auraGrad = ctx.createLinearGradient(bladeLeft, bladeCenterY - 35, bladeLeft, bladeCenterY + 35);
      auraGrad.addColorStop(0, 'rgba(130, 175, 255, 0)');
      auraGrad.addColorStop(0.25, `rgba(140, 180, 255, ${intensity * 0.06})`);
      auraGrad.addColorStop(0.45, `rgba(175, 205, 255, ${intensity * 0.18})`);
      auraGrad.addColorStop(0.5, `rgba(210, 230, 255, ${intensity * 0.3})`);
      auraGrad.addColorStop(0.55, `rgba(175, 205, 255, ${intensity * 0.18})`);
      auraGrad.addColorStop(0.75, `rgba(140, 180, 255, ${intensity * 0.06})`);
      auraGrad.addColorStop(1, 'rgba(130, 175, 255, 0)');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(bladeLeft - 15, bladeCenterY - 35, (bladeRight - bladeLeft) + 30, 70);

      // Tight hot core
      const coreGrad = ctx.createLinearGradient(bladeLeft, bladeCenterY - 10, bladeLeft, bladeCenterY + 10);
      coreGrad.addColorStop(0, 'rgba(200, 220, 255, 0)');
      coreGrad.addColorStop(0.35, `rgba(210, 230, 255, ${intensity * 0.12})`);
      coreGrad.addColorStop(0.5, `rgba(240, 245, 255, ${intensity * 0.25})`);
      coreGrad.addColorStop(0.65, `rgba(210, 230, 255, ${intensity * 0.12})`);
      coreGrad.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(bladeLeft - 5, bladeCenterY - 10, (bladeRight - bladeLeft) + 10, 20);
    }

    // ═══════════════════════════════════════════
    //  CHIDORI LIGHTNING — branching arcs with crackling
    // ═══════════════════════════════════════════
    if (elapsed > 50 && elapsed < 1500) {
      const ltT = (elapsed - 50) / 1450;
      const ltAlpha = smoothFade(ltT, 0.08, 0.35);

      // Regenerate arcs every 2 frames for that alive crackle
      if (Math.floor(elapsed / 33) !== Math.floor((elapsed - 16.67) / 33)) {
        const numArcs = 2 + Math.floor(Math.random() * 2);

        for (let a = 0; a < numArcs; a++) {
          const arcStartX = bladeLeft + Math.random() * (bladeRight - bladeLeft) * 0.65;
          const arcLen = 60 + Math.random() * 140;
          const arcEndX = arcStartX + arcLen;
          const arcY = bladeCenterY + (Math.random() - 0.5) * 8;
          const arcEndY = arcY + (Math.random() - 0.5) * 16;

          const { points, branches } = generateChidoriArc(
            arcStartX, arcY, Math.min(arcEndX, bladeRight + 20), arcEndY,
            5 + Math.floor(Math.random() * 3), 10, 0
          );

          // Draw all paths (main + branches)
          const allPaths = [points, ...branches];

          for (let pi = 0; pi < allPaths.length; pi++) {
            const path = allPaths[pi];
            const isBranch = pi > 0;
            const pathAlpha = isBranch ? ltAlpha * 0.5 : ltAlpha;

            // Outer glow
            ctx.save();
            ctx.globalAlpha = pathAlpha * (0.25 + Math.random() * 0.15);
            ctx.strokeStyle = 'rgba(130, 175, 255, 0.7)';
            ctx.lineWidth = isBranch ? 3 : 4 + Math.random() * 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            // OPTIMIZATION: Removed shadowBlur and shadowColor for performance
            drawPath(ctx, path);

            // Bright core
            ctx.globalAlpha = pathAlpha * (0.5 + Math.random() * 0.4);
            ctx.strokeStyle = 'rgba(215, 230, 255, 0.95)';
            ctx.lineWidth = isBranch ? 0.6 : 1 + Math.random() * 0.5;
            // OPTIMIZATION: Removed shadowBlur and shadowColor for performance
            drawPath(ctx, path);

            ctx.restore();
          }
        }
      }
    }

    // ═══════════════════════════════════════════
    //  CHAKRA PARTICLES — smooth wisps along blade
    // ═══════════════════════════════════════════
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      if (p.life < 0) continue;

      const lifeRatio = p.life / p.maxLife;
      if (lifeRatio >= 1) { particles.splice(i, 1); continue; }

      if (p.type === 'chakra') {
        const alpha = smoothFade(lifeRatio, 0.15, 0.5);

        p.x += p.vx;
        p.y += p.vy + Math.sin(p.life * 0.2) * 0.2;
        p.vy -= 0.015;

        // Blue glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle = 'rgba(150, 195, 255, 1)';
        // OPTIMIZATION: Removed shadowBlur
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + 0.6 * (1 - lifeRatio * 0.4)), 0, Math.PI * 2);
        ctx.fill();

        // White-hot center
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle = 'rgba(245, 250, 255, 0.95)';
        // OPTIMIZATION: Removed shadowBlur
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.3 * (1 - lifeRatio * 0.25), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else if (p.type === 'wind') {
        const alpha = smoothFade(lifeRatio, 0.08, 0.6);
        const expandedRadius = (p.radius || 50) + easeOutCubic(lifeRatio) * 60;
        const arcStart = (p.startAngle || 0) - lifeRatio * 0.2;
        const arcEnd = arcStart + 1.0 + lifeRatio * 0.6;

        ctx.save();
        ctx.globalAlpha = alpha * 0.3;
        ctx.strokeStyle = 'rgba(170, 200, 240, 0.75)';
        ctx.lineWidth = 2 * (1 - lifeRatio * 0.5);
        ctx.lineCap = 'round';
        // OPTIMIZATION: Removed shadowBlur
        ctx.beginPath();
        ctx.arc(p.x, p.y, expandedRadius, arcStart, arcEnd);
        ctx.stroke();

        // Inner bright arc
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = 'rgba(215, 230, 255, 0.9)';
        ctx.lineWidth = 0.8;
        // OPTIMIZATION: Removed shadowBlur
        ctx.beginPath();
        ctx.arc(p.x, p.y, expandedRadius - 1.5, arcStart + 0.08, arcEnd - 0.08);
        ctx.stroke();
        ctx.restore();
      }
    }

    // ═══════════════════════════════════════════
    //  CROWS — smooth flight, gradual emergence
    // ═══════════════════════════════════════════
    const crows = crowsRef.current;
    for (let i = crows.length - 1; i >= 0; i--) {
      const crow = crows[i];
      crow.life++;
      if (crow.life < 0) continue;

      const lifeRatio = crow.life / crow.maxLife;
      if (lifeRatio >= 1) { crows.splice(i, 1); continue; }

      crow.x += crow.vx;
      crow.y += crow.vy;
      crow.vy -= 0.025;

      // Smooth banking — lerp rotation toward velocity direction
      crow.targetRotation = Math.atan2(crow.vy, crow.vx);
      let rotDiff = crow.targetRotation - crow.rotation;
      if (rotDiff > Math.PI) rotDiff -= Math.PI * 2;
      if (rotDiff < -Math.PI) rotDiff += Math.PI * 2;
      crow.rotation += rotDiff * 0.08;

      crow.wingPhase += crow.wingSpeed * 0.016;

      // Smooth fade in / out
      const alpha = smoothFade(lifeRatio, 0.12, 0.3) * 0.8;
      drawCrow(ctx, crow.x, crow.y, crow.size, crow.rotation, crow.wingPhase, alpha);
    }

    // ═══════════════════════════════════════════
    //  INITIAL CHAKRA FLASH — brief, clean
    // ═══════════════════════════════════════════
    if (elapsed < 250) {
      const flashT = elapsed / 250;
      const flashAlpha = smoothFade(flashT, 0.08, 0.7);

      ctx.save();
      ctx.globalAlpha = flashAlpha * 0.25;
      const flashGrad = ctx.createRadialGradient(
        w / 2, bladeCenterY, 0,
        w / 2, bladeCenterY, Math.min(w * 0.3, 300)
      );
      flashGrad.addColorStop(0, 'rgba(175, 205, 255, 0.8)');
      flashGrad.addColorStop(0.25, 'rgba(140, 180, 255, 0.3)');
      flashGrad.addColorStop(0.6, 'rgba(120, 160, 240, 0.05)');
      flashGrad.addColorStop(1, 'rgba(120, 160, 240, 0)');
      ctx.fillStyle = flashGrad;
      ctx.fillRect(0, 0, w, Math.min(h, 350));
      ctx.restore();
    }

    // Continue?
    if (elapsed < totalDuration || particles.length > 0 || crows.length > 0) {
      animFrameRef.current = requestAnimationFrame(animate);
    }
  }, [generateChidoriArc, drawPath, drawCrow]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    startTimeRef.current = 0;
    initEffects(canvas);

    animFrameRef.current = requestAnimationFrame(animate);

    // Trigger the powerful whole-website impact shake on document.body via GPU Compositor
    document.body.classList.remove('sword-impact-shaking');
    void document.body.offsetWidth; // Force reflow so animation restarts reliably
    document.body.classList.add('sword-impact-shaking');

    const shakeTimer = setTimeout(() => {
      document.body.classList.remove('sword-impact-shaking');
    }, 480);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(shakeTimer);
      document.body.classList.remove('sword-impact-shaking');
    };
  }, [isActive, animate, initEffects]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}
