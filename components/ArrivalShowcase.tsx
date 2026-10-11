'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function BossArrivalShowcase() {
  const [isActive, setIsActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const isPlayingRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const handleDismiss = useCallback(() => {
    clearAllTimers();
    setIsFadingOut(true);
    const unmountTimer = setTimeout(() => {
      setIsActive(false);
      setIsFadingOut(false);
      isPlayingRef.current = false;
    }, 700); // Matches Apple-style 700ms smooth transition
    timersRef.current = [unmountTimer];
  }, [clearAllTimers]);

  const startShowcase = useCallback(() => {
    // Strictly prevent double-triggers: if already playing, ignore all subsequent calls
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    clearAllTimers();
    setAnimKey((prev) => prev + 1);
    setIsFadingOut(false);
    setIsActive(true);

    // Sequence runs for 6s, then smoothly dissolves back to the website automatically
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 6000);

    const closeTimer = setTimeout(() => {
      setIsActive(false);
      setIsFadingOut(false);
      isPlayingRef.current = false;
    }, 6700); // 6000ms + 700ms smooth fade transition

    timersRef.current = [fadeTimer, closeTimer];
  }, [clearAllTimers]);

  const startShowcaseRef = useRef(startShowcase);
  const handleDismissRef = useRef(handleDismiss);

  useEffect(() => {
    startShowcaseRef.current = startShowcase;
    handleDismissRef.current = handleDismiss;
  });

  useEffect(() => {
    const handleTrigger = () => {
      startShowcaseRef.current();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlayingRef.current) {
        handleDismissRef.current();
      }
    };

    window.addEventListener('boss-arrival-trigger', handleTrigger);
    window.addEventListener('ninja-easter-egg', handleTrigger);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('boss-arrival-trigger', handleTrigger);
      window.removeEventListener('ninja-easter-egg', handleTrigger);
      window.removeEventListener('keydown', handleKeyDown);
      clearAllTimers();
    };
  }, [clearAllTimers]);

  if (!isActive) return null;

  return (
    <div
      key={animKey}
      role="dialog"
      aria-modal="true"
      aria-label="Animation Showcase"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[99995] flex items-center justify-center overflow-hidden cursor-pointer select-none transition-all duration-700 ${isFadingOut
        ? 'opacity-0 scale-[1.02] backdrop-blur-none pointer-events-none'
        : 'opacity-100 scale-100 backdrop-blur-2xl pointer-events-auto'
        }`}
      style={{
        backgroundColor: 'rgba(2, 6, 23, 0.65)',
        backdropFilter: isFadingOut ? 'blur(0px)' : 'blur(24px)',
        WebkitBackdropFilter: isFadingOut ? 'blur(0px)' : 'blur(24px)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >


      {/* Container with camera-shake — exact match to SharedBackground */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center animate-camera-shake"
        style={{ contain: 'strict', transform: 'translateZ(0)' }}
      >
        {/* --- BACKGROUND LAYER: Manga Grid & Speed Lines --- */}
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.3]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(148 163 184 / 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(148 163 184 / 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_rgba(0,0,0,0.8)_100%)] animate-dynamic-speedlines" />
        </div>

        {/* --- ACT 1: THE HIGH-SPEED CLASH --- */}
        {/* Fighter 1 Streak (Left to Center) */}
        <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-gradient-to-r from-transparent to-slate-800 dark:to-slate-200 animate-streak-left rounded-full shadow-[0_0_15px_currentColor]" />

        {/* Fighter 2 Streak (Right to Center) */}
        <div className="absolute top-1/2 right-0 w-1/2 h-1 bg-gradient-to-l from-transparent to-slate-600 dark:to-slate-400 animate-streak-right rounded-full shadow-[0_0_15px_currentColor]" />

        {/* Impact Frame Flash */}
        <div className="absolute inset-0 bg-white/60 dark:bg-white/10 animate-impact-flash z-10 pointer-events-none" />

        {/* Explosive Shockwave Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-[8px] border-slate-800 dark:border-slate-200 rounded-full animate-shockwave z-0" />

        {/* --- ACT 2: THE 3-HIT COMBO SLASHES (The Z-Slash) --- */}
        {/* Screen dims for the slashes */}
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/40 animate-slash-dimmer z-0" />

        {/* Slash 1: Diagonal Down */}
        <div className="absolute top-1/2 left-1/2 w-[150vw] h-[2px] bg-white dark:bg-slate-100 animate-slash-1 shadow-[0_0_20px_2px_rgba(148,163,184,0.8)] z-20" />

        {/* Slash 2: Horizontal Cut */}
        <div className="absolute top-[40%] left-1/2 w-[150vw] h-[2px] bg-white dark:bg-slate-100 animate-slash-2 shadow-[0_0_20px_2px_rgba(148,163,184,0.8)] z-20" />

        {/* Slash 3: Massive Upward Cleave */}
        <div className="absolute top-1/2 left-1/2 w-[200vw] h-[4px] bg-white dark:bg-slate-50 animate-slash-3 shadow-[0_0_30px_4px_rgba(148,163,184,0.9)] z-20" />

        {/* --- ACT 3: THE PROJECTILE DODGE --- */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 text-slate-300/40 dark:text-slate-400/60 animate-shuriken-flyby z-10">
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L58 35 L95 20 L65 42 L100 50 L65 58 L95 80 L58 65 L50 100 L42 65 L5 80 L35 58 L0 50 L35 42 L5 20 L42 35 Z" />
            <circle cx="50" cy="50" r="18" fill="transparent" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="8" fill="currentColor" className="opacity-60" />
          </svg>
        </div>

        {/* --- ACT 4: AFTERMATH (Sparks & Leaves) --- */}
        <div className="absolute top-1/2 left-1/2 w-2 h-1 bg-slate-700 dark:bg-slate-300 rounded-full animate-spark-1 shadow-[0_0_8px_currentColor]" />
        <div className="absolute top-1/2 left-1/2 w-3 h-1 bg-slate-600 dark:bg-slate-400 rounded-full animate-spark-2 shadow-[0_0_8px_currentColor]" />
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-slate-800 dark:bg-slate-200 rounded-full animate-spark-3 shadow-[0_0_8px_currentColor]" />

        {/* Falling Leaves */}
        <div
          className="absolute -top-10 left-[15%] w-6 h-6 text-slate-400/40 dark:text-slate-500/40 animate-falling-leaf-1"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </div>
        <div
          className="absolute -top-10 left-[80%] w-8 h-8 text-slate-400/30 dark:text-slate-500/30 animate-falling-leaf-2"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </div>
      </div>

      {/* --- Exact Animations from SharedBackground --- */}
      <style jsx>{`
        /* Camera Shake on Impact */
        @keyframes camera-shake {
          0%, 36% { transform: translate(0, 0); }
          38% { transform: translate(-10px, 8px) rotate(-1deg); }
          40% { transform: translate(10px, -8px) rotate(1deg); }
          42% { transform: translate(-5px, 5px) rotate(-0.5deg); }
          44%, 100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* High Speed Streaks */
        @keyframes streak-left {
          0%, 30% { transform: translate(-100vw, 0) scaleX(1); opacity: 0; }
          32% { transform: translate(-50vw, 0) scaleX(5); opacity: 1; }
          38% { transform: translate(0, 0) scaleX(1); opacity: 1; }
          40%, 100% { opacity: 0; }
        }
        @keyframes streak-right {
          0%, 30% { transform: translate(100vw, 0) scaleX(1); opacity: 0; }
          32% { transform: translate(50vw, 0) scaleX(5); opacity: 1; }
          38% { transform: translate(0, 0) scaleX(1); opacity: 1; }
          40%, 100% { opacity: 0; }
        }

        /* Impact Flash Frame */
        @keyframes impact-flash {
          0%, 37.8% { opacity: 0; }
          38% { opacity: 1; }
          42%, 100% { opacity: 0; }
        }

        /* Shockwave Ring */
        @keyframes shockwave {
          0%, 37.8% { transform: translate(-50%, -50%) scale(0); opacity: 0; border-width: 20px; }
          38% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; border-width: 40px; }
          46% { transform: translate(-50%, -50%) scale(5); opacity: 0; border-width: 0px; }
          100% { opacity: 0; }
        }

        /* Screen Dimmer during slashes to make them pop */
        @keyframes slash-dimmer {
          0%, 40% { opacity: 0; }
          44%, 56% { opacity: 1; }
          64%, 100% { opacity: 0; }
        }

        /* Slash 1: Top Left to Bottom Right */
        @keyframes slash-1 {
          0%, 42% { transform: translate(-50%, -50%) rotate(35deg) scaleX(0); opacity: 0; }
          43% { transform: translate(-50%, -50%) rotate(35deg) scaleX(1); opacity: 1; }
          45%, 100% { transform: translate(-50%, -50%) rotate(35deg) scaleX(0); opacity: 0; }
        }

        /* Slash 2: Right to Left */
        @keyframes slash-2 {
          0%, 46% { transform: translate(-50%, -50%) rotate(-5deg) scaleX(0); opacity: 0; }
          47% { transform: translate(-50%, -50%) rotate(-5deg) scaleX(1); opacity: 1; }
          49%, 100% { transform: translate(-50%, -50%) rotate(-5deg) scaleX(0); opacity: 0; }
        }

        /* Slash 3: Massive Cleave Bottom to Top */
        @keyframes slash-3 {
          0%, 50% { transform: translate(-50%, -50%) rotate(-60deg) scaleX(0); opacity: 0; }
          51% { transform: translate(-50%, -50%) rotate(-60deg) scaleX(1); opacity: 1; }
          54%, 100% { transform: translate(-50%, -50%) rotate(-60deg) scaleX(0); opacity: 0; }
        }

        /* Shuriken flying at camera */
        @keyframes shuriken-flyby {
          0%, 54% { transform: translate(-20vw, 10vh) scale(0) rotate(0deg); opacity: 0; }
          56% { transform: translate(-15vw, 5vh) scale(0.5) rotate(180deg); opacity: 1; }
          72% { transform: translate(30vw, -20vh) scale(15) rotate(1080deg); opacity: 1; }
          76%, 100% { transform: translate(50vw, -40vh) scale(20) rotate(1440deg); opacity: 0; }
        }

        /* Embers scattering from the impact */
        @keyframes spark-1 {
          0%, 36% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0; }
          38% { opacity: 1; }
          60%, 100% { transform: translate(-250px, -150px) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes spark-2 {
          0%, 36% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0; }
          38% { opacity: 1; }
          64%, 100% { transform: translate(200px, -200px) scale(0) rotate(-180deg); opacity: 0; }
        }
        @keyframes spark-3 {
          0%, 36% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0; }
          38% { opacity: 1; }
          70%, 100% { transform: translate(-100px, 250px) scale(0) rotate(360deg); opacity: 0; }
        }

        /* Speed lines reacting to the beats */
        @keyframes dynamic-speedlines {
          0%, 36% { opacity: 0.1; transform: scale(1); }
          38% { opacity: 0.8; transform: scale(1.05); }
          40% { opacity: 0.2; transform: scale(1); }
          51% { opacity: 0.6; transform: scale(1.02); }
          54% { opacity: 0.2; transform: scale(1); }
          72% { opacity: 0.7; transform: scale(1.05); }
          76%, 100% { opacity: 0.1; transform: scale(1); }
        }

        /* Leaves */
        @keyframes falling-leaf-1 {
          0% { transform: translate(0vw, -10vh) rotate(0deg); opacity: 0; }
          10%, 90% { opacity: 0.8; }
          100% { transform: translate(-20vw, 110vh) rotate(540deg); opacity: 0; }
        }
        @keyframes falling-leaf-2 {
          0% { transform: translate(0vw, -10vh) rotate(45deg) scale(0.8); opacity: 0; }
          15%, 85% { opacity: 0.6; }
          100% { transform: translate(15vw, 110vh) rotate(-360deg) scale(0.8); opacity: 0; }
        }

        .animate-camera-shake { animation: camera-shake 6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards; }
        .animate-streak-left { animation: streak-left 6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }
        .animate-streak-right { animation: streak-right 6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }
        .animate-impact-flash { animation: impact-flash 6s step-end forwards; }
        .animate-shockwave { animation: shockwave 6s ease-out forwards; }
        .animate-slash-dimmer { animation: slash-dimmer 6s ease-in-out forwards; }
        .animate-slash-1 { animation: slash-1 6s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .animate-slash-2 { animation: slash-2 6s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .animate-slash-3 { animation: slash-3 6s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .animate-shuriken-flyby { animation: shuriken-flyby 6s cubic-bezier(0.5, 0, 0.8, 1) forwards; }
        .animate-spark-1 { animation: spark-1 6s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
        .animate-spark-2 { animation: spark-2 6s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
        .animate-spark-3 { animation: spark-3 6s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
        .animate-dynamic-speedlines { animation: dynamic-speedlines 6s ease-in-out forwards; }

        .animate-falling-leaf-1 { animation: falling-leaf-1 15s linear infinite; }
        .animate-falling-leaf-2 { animation: falling-leaf-2 18s linear infinite 3s; }
      `}</style>
    </div>
  );
}
