'use client';

import { useState, useEffect } from 'react';

import { Code2, Smartphone, Zap } from 'lucide-react';
import { RevealContainer, RevealItem } from '@/components/ui/scroll_reveal';

export default function AboutSection() {
  const [maskStyle, setMaskStyle] = useState<string>('none');

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      if (!heroEl) return;
      const heroHeight = heroEl.offsetHeight || window.innerHeight;
      const scrollY = window.scrollY;

      // Dynamic circular portal aperture when entering from Hero
      if (scrollY < heroHeight * 0.95) {
        const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.85)));
        const radius = 35 + progress * 75; // 35% to 110%
        setMaskStyle(`circle(${radius}% at 50% 0%)`);
      } else {
        setMaskStyle('none');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden" style={{ clipPath: maskStyle, transition: "clip-path 0.1s ease-out" }}>
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealContainer>
          {/* Header */}
          <RevealItem className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-center tracking-tight">
              About{" "}
              <span
                className="neu-header-badge rounded-2xl px-4 sm:px-5 py-1.5 inline-block group cursor-pointer translate-y-1 sm:translate-y-2"
                style={{
                  backgroundImage: "url('/messageContainerBG.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 rounded-2xl"></span>
                <span className="absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.15)]"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-slate-200/60 rounded-full animate-pulse-glow"></span>
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-slate-200/60 rounded-full animate-pulse-glow-delayed"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></span>

                <span className="relative z-10 inline-block transform group-hover:scale-105 transition-transform duration-300">
                  <span
                    className="relative text-white font-black select-none"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                    }}
                  >
                    Me
                  </span>
                </span>
              </span>
            </h2>

            {/* Soft underline effect */}
            <div className="relative w-24 sm:w-32 h-[3px] bg-slate-800 dark:bg-slate-200 mx-auto overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-sword-draw"></div>
            </div>
          </RevealItem>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left Column: Text Content & Stats */}
            <RevealItem className="space-y-6 sm:space-y-8">

              {/* Text block in soft card */}
              <div className="neu-flat p-6 sm:p-7 rounded-3xl relative group border border-white/70 dark:border-white/10">
                <div className="space-y-3.5">
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    I'm a Flutter developer who builds production-grade, cross-platform apps for mobile, web, and desktop. I love turning complex ideas into clean, high-performance products that people actually enjoy using.
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    My focus areas include AI-powered features, Supabase & Firebase backends, advanced state management, real-time systems, and multi-language support. I care about writing clean code and building apps that feel smooth and polished.
                  </p>
                </div>
              </div>

              {/* Stats section: Soft Neumorphic Info Plates */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
                {[
                  { value: '10+', label: 'Projects' },
                  { value: '1+', label: 'Years Dev' },
                  { value: '100%', label: 'Passion' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="neu-flat-interactive p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-center group relative overflow-hidden"
                  >
                    <div className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 drop-shadow-sm">
                      {stat.value}
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 sm:mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealItem>

            {/* Right Column: Features section (Neumorphic Soft Panels) */}
            <div className="space-y-4 sm:space-y-5">
              {[
                { icon: Smartphone, title: 'Multi-Platform', desc: 'Mobile, web & desktop from a single codebase' },
                { icon: Zap, title: 'AI-Powered', desc: 'LLM integration, ML Kit & intelligent features' },
                { icon: Code2, title: 'Scalable Architecture', desc: 'MVVM, clean code & modular design patterns' },
              ].map((feature) => (
                <RevealItem
                  key={feature.title}
                  className="neu-flat-interactive p-5 sm:p-6 rounded-3xl group cursor-pointer relative overflow-hidden flex items-center gap-4 sm:gap-5"
                >
                  {/* Icon Container: Soft Neumorphic Squircle */}
                  <div className="neu-icon-btn w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 dark:text-slate-200" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-black tracking-wide text-slate-900 dark:text-slate-100 mb-0.5 sm:mb-1 text-base sm:text-lg group-hover:text-black dark:group-hover:text-white transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                      {feature.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </RevealContainer>
      </div>

      <style jsx>{`
        /* Sword draw animation for the header */
        @keyframes sword-draw {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-sword-draw {
          animation: sword-draw 2.5s ease-in-out infinite;
        }

        /* Fast slash highlight for stat plates */
        @keyframes fast-slash {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(150%) skewX(-45deg); }
        }
        .animate-fast-slash {
          animation: fast-slash 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Slow ambient spin for the background shuriken */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
