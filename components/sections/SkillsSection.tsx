'use client';

import { RevealContainer, RevealItem } from '@/components/ui/scroll_reveal';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'App Development',
      gradient: 'from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100',
      skills: ['Flutter', 'Dart', 'Android', 'iOS', 'Flutter Web', 'Desktop Apps', 'Cross-Platform'],
    },
    {
      title: 'Backend & Cloud',
      gradient: 'from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400',
      skills: ['Supabase', 'Firebase', 'Cloud Firestore', 'Supabase Auth', 'Supabase Storage', 'Supabase RPC', 'REST APIs', 'HTTP Networking'],
    },
    {
      title: 'State & Architecture',
      gradient: 'from-slate-600 to-slate-900 dark:from-slate-400 dark:to-slate-100',
      skills: ['Provider', 'BLoC / Cubit', 'MVVM', 'Clean Architecture'],
    },
    {
      title: 'AI / ML Integration',
      gradient: 'from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300',
      skills: ['Groq LLM API', 'Google ML Kit', 'OCR (Text Recognition)', 'Speech-to-Text', 'AI Chat Systems', 'Prompt Engineering'],
    },
    {
      title: 'Data & Storage',
      gradient: 'from-slate-700 to-slate-800 dark:from-slate-300 dark:to-slate-200',
      skills: ['Drift ORM', 'SQFlite', 'Shared Preferences', 'DB Migrations'],
    },
    {
      title: 'Tools & Ecosystem',
      gradient: 'from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-100',
      skills: ['Git / GitHub', 'VS Code', 'Android Studio', 'Google Maps', 'Localization (i18n)', 'In-App Purchases', 'Google Ads', 'App Deployment'],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealContainer>
          {/* Header */}
          <RevealItem className="text-center mb-10 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display mb-4 sm:mb-8 text-center tracking-tight">
              Technical{" "}
              <span
                className="relative inline-block px-3 sm:px-4 py-1 rounded-xl overflow-hidden group cursor-pointer translate-y-1 sm:translate-y-4 shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                style={{
                  backgroundImage: "url('/messageContainerBG.jpeg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 rounded-xl"></span>
                <span className="absolute inset-0 rounded-xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full animate-pulse-glow"></span>
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-white/60 rounded-full animate-pulse-glow-delayed"></span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 blur-3xl rounded-full animate-pulse-glow"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></span>
                <span className="relative z-10 inline-block transform group-hover:scale-105 transition-transform duration-300">
                  <span className="absolute top-[2px] sm:top-[3px] left-[2px] sm:left-[3px] text-slate-900/40 font-black select-none" aria-hidden="true">Skills</span>
                  <span className="absolute top-[1.5px] sm:top-[2px] left-[1.5px] sm:left-[2px] text-slate-800/50 font-black select-none" aria-hidden="true">Skills</span>
                  <span className="absolute top-[1px] left-[1px] text-slate-700/60 font-black select-none" aria-hidden="true">Skills</span>
                  <span
                    className="relative text-white font-black select-none"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                    }}
                  >
                    Skills
                  </span>
                  <span className="absolute top-[-1px] left-0 text-white/40 font-black select-none blur-[0.5px]" aria-hidden="true">Skills</span>
                </span>
                <span className="absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[inset_0_0_50px_rgba(255,255,255,0.15)] transition-all duration-500"></span>
              </span>
            </h2>

            {/* Sword draw underline effect */}
            <div className="relative w-24 sm:w-32 h-[3px] bg-slate-800 dark:bg-slate-200 mx-auto overflow-hidden rounded-full mt-2 mb-4 sm:mb-8">
              <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-sword-draw"></div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              Battle-tested across production apps — from AI-powered tools to multi-panel ecosystems
            </p>
          </RevealItem>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((category) => (
              <RevealItem
                key={category.title}
                className="group relative p-5 sm:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md transform-gpu border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-r-2 border-slate-300/50 dark:border-slate-700/50 rounded-tr-2xl group-hover:border-slate-400 dark:group-hover:border-slate-600 transition-colors"></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl`}
                />

                <h3
                  className={`text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${category.gradient} mb-4 sm:mb-6`}
                >
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 sm:px-4 sm:py-2.5 bg-slate-100/90 dark:bg-slate-800/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 border border-slate-300/80 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 transition-all cursor-pointer hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </RevealItem>
            ))}
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

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes pulse-glow-delayed {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-pulse-glow-delayed {
          animation: pulse-glow-delayed 2s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
}
