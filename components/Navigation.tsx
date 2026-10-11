'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import SwordReturnEffect from './SwordReturnEffect';

export default function Navigation({ splashDone = false }: { splashDone?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [swordEffect, setSwordEffect] = useState(false);
  const [bladeGleam, setBladeGleam] = useState(false);
  const wasScrolledRef = useRef(false);
  const effectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialFiredRef = useRef(false);

  // ─── Shared trigger for the blade effect ───
  const triggerBladeEffect = useCallback(() => {
    setSwordEffect(true);
    setBladeGleam(true);

    if (effectTimeoutRef.current) clearTimeout(effectTimeoutRef.current);

    effectTimeoutRef.current = setTimeout(() => {
      setSwordEffect(false);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('katana-dock-complete'));
      }
    }, 2000);

    setTimeout(() => {
      setBladeGleam(false);
    }, 1200);
  }, []);

  // ─── Fire after splash + hero text animations finish ───
  useEffect(() => {
    if (!splashDone || initialFiredRef.current) return;
    initialFiredRef.current = true;

    // Hero text animation timeline:
    //   Letters: stagger 0.04 × ~17 chars + 1.2s duration ≈ finishes ~2s
    //   CTA buttons: delay 1.3s + duration 1s = finishes ~2.3s
    // Fire the blade effect right after everything lands:
    const timer = setTimeout(() => {
      triggerBladeEffect();
    }, 2500);

    return () => clearTimeout(timer);
  }, [splashDone, triggerBladeEffect]);

  // ─── Scroll-back-to-top trigger with scroll-settle optimization ───
  useEffect(() => {
    let scrollSettleTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const y = window.scrollY;
      const isScrolledDown = y > 10;
      setScrolled((prev) => (prev !== isScrolledDown ? isScrolledDown : prev));

      if (y > 200) {
        wasScrolledRef.current = true;
      }

      // When returning to top (y <= 5), wait 60ms for scroll momentum / trackpad inertia to settle
      if (y <= 5 && wasScrolledRef.current) {
        if (scrollSettleTimer) clearTimeout(scrollSettleTimer);
        scrollSettleTimer = setTimeout(() => {
          if (window.scrollY <= 10 && wasScrolledRef.current) {
            wasScrolledRef.current = false;
            triggerBladeEffect();
          }
        }, 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (effectTimeoutRef.current) clearTimeout(effectTimeoutRef.current);
      if (scrollSettleTimer) clearTimeout(scrollSettleTimer);
    };
  }, [triggerBladeEffect]);

  // FIXED: Added an offset so the fixed navbar doesn't cover section titles!
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100; // Leaves a clean 100px gap above the section
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Full-screen anime sword effect overlay */}
      <SwordReturnEffect isActive={swordEffect} />

      <nav
        className={`fixed w-full z-50 transition-[top] duration-300 ${
          scrolled ? 'top-0' : 'top-2'
        }`}
      >
        <div className="max-w-[95%] mx-auto px-2 relative py-2">

          {/* --- DESKTOP VIEW: PREMIUM SLIM KATANA --- */}
          {/* Made the sword slimmer (h-10) to take less vertical area */}
          <div className="hidden md:flex relative h-10 w-full items-center justify-center">

            {/* Sword gleam overlay — sweeps across entire sword when effect fires */}
            {bladeGleam && (
              <div className="absolute inset-0 z-[60] pointer-events-none overflow-hidden rounded-sm">
                <div className="sword-gleam-sweep absolute inset-y-0 w-24" />
              </div>
            )}

            {/* Energy pulse ring around the sword */}
            {swordEffect && (
              <div className="absolute inset-0 z-[55] pointer-events-none flex items-center justify-center">
                <div className="sword-energy-ring" />
                <div className="sword-energy-ring" style={{ animationDelay: '150ms' }} />
              </div>
            )}

            {/* 1. Pommel (Kashira) */}
            <div className="h-full w-3 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded-l-md border border-slate-700 z-30 shadow-[0_0_5px_rgba(0,0,0,0.8)]"></div>

            {/* 2. Handle (Tsuka) */}
            <div
              onClick={() => scrollToSection('hero')}
              className="h-full w-56 bg-slate-900 border-y border-slate-800 relative flex items-center justify-center cursor-pointer shadow-[inset_0_0_15px_rgba(0,0,0,1)] z-20 group"
            >
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(45deg, #1e293b 25%, transparent 25%, transparent 75%, #1e293b 75%, #1e293b), 
                               linear-gradient(-45deg, #1e293b 25%, transparent 25%, transparent 75%, #1e293b 75%, #1e293b)`,
                  backgroundSize: `12px 12px`
                }}
              ></div>

              <div className="relative z-10 flex items-center gap-2 px-2 bg-black/40 rounded shadow-md">
                <div
                  className="w-7 h-7 rounded border border-slate-500"
                  style={{ backgroundImage: "url('/messageContainerBG.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="w-full h-full bg-black/50 flex items-center justify-center text-[10px] font-black text-white">RA</div>
                </div>
                <span className="text-white font-black tracking-widest text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,1)] group-hover:text-slate-300 transition-colors">RABIA</span>
              </div>
            </div>

            {/* 3. Guard (Tsuba) - Scaled down slightly */}
            <div className="h-[130%] w-2.5 bg-gradient-to-b from-slate-800 via-slate-500 to-slate-900 rounded-sm border border-black z-30 shadow-[0_0_10px_rgba(0,0,0,1)]"></div>

            {/* 4. Blade Collar (Habaki) */}
            <div className="h-[90%] w-4 bg-gradient-to-b from-slate-300 via-white to-slate-400 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.3)]"></div>

            {/* 5. Blade (Ha) - Slimmer and sharper */}
            <div
              className={`h-[80%] flex-1 bg-gradient-to-b from-slate-400 via-white to-slate-200 relative flex items-center justify-end px-6 md:px-8 lg:px-12 z-10 border-b-2 border-white/80 shadow-[0_8px_15px_rgba(0,0,0,0.4)] ${swordEffect ? 'sword-blade-flash' : ''}`}
              style={{ clipPath: 'polygon(0 0, 98.5% 0, 100% 50%, 98.5% 100%, 0 100%)' }}
            >
              <div className="absolute bottom-0 w-full h-[2px] bg-white opacity-90 shadow-[0_0_8px_#ffffff]"></div>

              <div className="flex gap-4 md:gap-5 lg:gap-8 xl:gap-10 items-center relative z-20 mr-2 lg:mr-4">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'About', id: 'about' },
                  { label: 'Skills', id: 'skills' },
                  { label: 'Projects', id: 'projects' },
                  { label: 'Experience', id: 'experience' },
                  { label: 'Testimonials', id: 'testimonials' },
                  { label: 'Contact', id: 'contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative group font-black tracking-[0.1em] lg:tracking-[0.15em] uppercase text-[11px] lg:text-xs text-slate-800 transition-colors duration-300 hover:text-black py-1 whitespace-nowrap"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_4px_rgba(0,0,0,0.5)]"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- MOBILE VIEW --- */}
          <div className={`md:hidden flex justify-between items-center h-16 rounded-xl px-4 mt-2 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg" style={{ backgroundImage: "url('/messageContainerBG.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-black text-white">RA</div>
              </div>
              <div className="text-lg font-bold text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">Rabia Aziz</div>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm transition-all">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="md:hidden mt-2 pb-4 space-y-2 bg-slate-950/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-slate-800">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Projects', id: 'projects' },
                { label: 'Experience', id: 'experience' },
                { label: 'Testimonials', id: 'testimonials' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-lg font-bold tracking-widest uppercase text-slate-300 hover:text-white hover:bg-slate-800 transition-all border-l-2 border-transparent hover:border-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Sword animation CSS — Naruto chakra theme */}
      <style jsx>{`
        /* Chakra gleam — blue-white sweep across the blade */
        @keyframes sword-gleam-sweep {
          0% {
            left: -120px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: calc(100% + 120px);
            opacity: 0;
          }
        }
        .sword-gleam-sweep {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(140, 180, 255, 0.02) 15%,
            rgba(180, 210, 255, 0.4) 38%,
            rgba(220, 235, 255, 0.85) 46%,
            rgba(255, 255, 255, 1) 50%,
            rgba(220, 235, 255, 0.85) 54%,
            rgba(180, 210, 255, 0.4) 62%,
            rgba(140, 180, 255, 0.02) 85%,
            transparent 100%
          );
          animation: sword-gleam-sweep 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          filter: blur(1px);
          mix-blend-mode: screen;
        }

        /* Chakra energy ring */
        @keyframes sword-energy-expand {
          0% {
            width: 40px;
            height: 15px;
            opacity: 0.8;
            border-width: 2px;
            filter: blur(0px);
          }
          50% {
            opacity: 0.4;
            filter: blur(1px);
          }
          100% {
            width: 80vw;
            height: 180px;
            opacity: 0;
            border-width: 0.3px;
            filter: blur(2px);
          }
        }
        .sword-energy-ring {
          position: absolute;
          border: 2px solid rgba(160, 200, 255, 0.6);
          border-radius: 50%;
          box-shadow: 
            0 0 12px rgba(140, 180, 255, 0.3),
            0 0 30px rgba(140, 180, 255, 0.1),
            inset 0 0 12px rgba(180, 210, 255, 0.1);
          animation: sword-energy-expand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Chakra blade flash — blue-white brightness spike */
        @keyframes sword-blade-flash-kf {
          0% {
            filter: brightness(1) drop-shadow(0 0 0px rgba(140,180,255,0));
          }
          8% {
            filter: brightness(1.8) drop-shadow(0 0 20px rgba(160,200,255,0.85));
          }
          30% {
            filter: brightness(1.3) drop-shadow(0 0 10px rgba(160,200,255,0.4));
          }
          100% {
            filter: brightness(1) drop-shadow(0 0 0px rgba(140,180,255,0));
          }
        }
        .sword-blade-flash {
          animation: sword-blade-flash-kf 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: filter;
        }
      `}</style>
    </>
  );
}