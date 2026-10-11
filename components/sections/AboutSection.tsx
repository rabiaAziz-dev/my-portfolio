'use client';

import { Code2, Smartphone, Zap } from 'lucide-react';
import { RevealContainer, RevealItem } from '@/components/ui/scroll_reveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealContainer>
          {/* Header */}
          <RevealItem className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-center tracking-tight">
              About{" "}
              <span
                className="relative inline-block px-3 sm:px-4 py-1 rounded-xl overflow-hidden group cursor-pointer translate-y-1 sm:translate-y-3 shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                style={{
                  backgroundImage: "url('/messageContainerBG.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 rounded-xl"></span>
                <span className="absolute inset-0 rounded-xl border-2 border-slate-400/30 group-hover:border-slate-200/60 transition-all duration-500"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-slate-200/60 rounded-full animate-pulse-glow"></span>
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-slate-200/60 rounded-full animate-pulse-glow-delayed"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></span>

                <span className="relative z-10 inline-block transform group-hover:scale-105 transition-transform duration-300">
                  <span className="absolute top-[2px] sm:top-[3px] left-[2px] sm:left-[3px] text-slate-900/40 font-black select-none" aria-hidden="true">Me</span>
                  <span className="absolute top-[1.5px] sm:top-[2px] left-[1.5px] sm:left-[2px] text-slate-800/50 font-black select-none" aria-hidden="true">Me</span>
                  <span className="absolute top-[1px] left-[1px] text-slate-700/60 font-black select-none" aria-hidden="true">Me</span>
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

            {/* Sword draw underline effect */}
            <div className="relative w-24 sm:w-32 h-[3px] bg-slate-800 dark:bg-slate-200 mx-auto overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-sword-draw"></div>
            </div>
          </RevealItem>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Left Column: Text Content & Stats */}
            <RevealItem className="space-y-6 sm:space-y-8">

              {/* Text block with Katana-edge border */}
              <div className="relative pl-4 sm:pl-6 border-l-4 border-slate-300 dark:border-slate-700 group">
                {/* Glowing edge on hover */}
                <div className="absolute left-[-4px] top-0 w-1 h-0 bg-slate-800 dark:bg-slate-200 group-hover:h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(15,23,42,0.5)] dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>

                <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-3 sm:mb-4">
                  I'm a Flutter developer who builds production-grade, cross-platform apps for mobile, web, and desktop. I love turning complex ideas into clean, high-performance products that people actually enjoy using.
                </p>
                <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  My focus areas include AI-powered features, Supabase & Firebase backends, advanced state management, real-time systems, and multi-language support. I care about writing clean code and building apps that feel smooth and polished.
                </p>
              </div>

              {/* Stats section: Ninja Info Plates */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2 sm:pt-4">
                {[
                  { value: '10+', label: 'Projects' },
                  { value: '2+', label: 'Years Dev' },
                  { value: '100%', label: 'Passion' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="relative p-3 sm:p-5 glass-card text-center group overflow-hidden border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50"
                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                  >
                    {/* Fast slash highlight */}
                    <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-700/50 w-[150%] h-full -translate-x-full skew-x-[-45deg] group-hover:animate-fast-slash z-0"></div>

                    <div className="relative z-10 text-xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 drop-shadow-md">
                      {stat.value}
                    </div>
                    <p className="relative z-10 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 sm:mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealItem>

            {/* Right Column: Features section (Manga Panels) */}
            <div className="space-y-4 sm:space-y-5">
              {[
                { icon: Smartphone, title: 'Multi-Platform', desc: 'Mobile, web & desktop from a single codebase' },
                { icon: Zap, title: 'AI-Powered', desc: 'LLM integration, ML Kit & intelligent features' },
                { icon: Code2, title: 'Scalable Architecture', desc: 'MVVM, clean code & modular design patterns' },
              ].map((feature, i) => (
                <RevealItem
                  key={feature.title}
                  className="p-4 sm:p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 group cursor-pointer relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-slate-400 dark:hover:border-slate-500"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
                >
                  {/* Subtle Shuriken Background (Only visible on hover) */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 text-slate-300/30 dark:text-slate-600/20 opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow pointer-events-none transition-opacity duration-500">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                    </svg>
                  </div>

                  {/* Corner Accent Brackets */}
                  <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-slate-400 dark:border-slate-500 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-slate-400 dark:border-slate-500 pointer-events-none"></div>

                  <div className="flex gap-3.5 sm:gap-5 items-center relative z-10">
                    {/* Icon Container: Diamond Shape */}
                    <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 flex items-center justify-center shadow-md transform rotate-45 group-hover:rotate-90 transition-transform duration-500 flex-shrink-0">
                      {/* Counter-rotate the icon so it stands straight */}
                      <div className="transform -rotate-45 group-hover:-rotate-90 transition-transform duration-500">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-slate-900" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-black tracking-wide text-slate-900 dark:text-slate-100 mb-0.5 sm:mb-1 text-base sm:text-lg group-hover:text-black dark:group-hover:text-white transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        {feature.desc}
                      </p>
                    </div>
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
