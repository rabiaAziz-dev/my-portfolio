'use client';

import { useState } from "react"
import { BookOpen, Award, Briefcase, ChevronRight, User } from "lucide-react"
import { RevealContainer, RevealItem } from '@/components/ui/scroll_reveal';

export default function Experience() {
  const [activeSection, setActiveSection] = useState<"education" | "experience" | "currentRole" | "certifications">("education")

  // EXACT Data Preserved 100%
  const experiences = {
    education: {
      title: "Education",
      icon: BookOpen,
      subtitle: "Academic Background",
      items: [
        {
          title: "Bachelor of Science in Software Engineering",
          organization: "Virtual University of Pakistan",
          period: "Ongoing",
          description: "Focused on modern software development and architecture.",
        },
      ],
    },
    experience: {
      title: "Experience",
      icon: Briefcase,
      subtitle: "Training & Development",
      items: [
        {
          title: "Flutter App Development",
          organization: "Arfa Karim Technology Incubator, Peshawar",
          period: "Sept 2025",
          description: "Completed a 3-month Flutter app development training focused on building cross-platform mobile applications from scratch. Gained hands-on experience with Firebase integration, state management using Provider and BLoC, OOPs, local storage solutions (Hive & SQLite), and API integration. Worked extensively on UI/UX design, implementing full CRUD features, clean architecture, and optimized performance. Developed production-ready applications while practicing comprehensive error and exception handling, debugging complex issues, and following best practices for scalable and modular development.",
          reference: {
            name: "Afaq Zahir",
            role: "Flutter Development Instructor",
            contact: "afaqxdev@gmail.com",
            linkedin: "linkedin.com/in/afaqxdev"
          }
        },
      ],
    },
    currentRole: {
      title: "Current Role",
      icon: User,
      subtitle: "Active Position",
      items: [
        {
          title: "Junior Flutter Developer",
          organization: "X dev Soft",
          period: "2025 - Present",
          description: "As a Junior Flutter Developer at X Dev Soft, I’m working closely with experienced developers to build clean, scalable, and efficient mobile applications. My role includes writing responsive UI, integrating APIs, maintaining app performance, and following modern Flutter development practices. I collaborate with the team to understand requirements, implement new features, fix bugs, and improve existing codebases. Every day teaches me something new real-world development experience, stronger problem-solving skills, and a better understanding of professional workflows like writing clean code, following proper project architecture, team communication, and structured development practices.",
        },
      ],
    },
    certifications: {
      title: "Certifications",
      icon: Award,
      subtitle: "Professional Credentials",
      items: [
        {
          title: "Flutter App Development",
          organization: "Arfa Karim Technology Incubator, Peshawar",
          period: "September 2025",
          description: "Comprehensive training in Flutter app development ...",
          link: "https://drive.google.com/file/d/1ijFu3gM1LyHCRmF-GZIEpS7sWjomJO-h/view?usp=drive_link"
        },
        {
          title: "Digital Skills & Freelancing",
          organization: "KP-TEVTA, Helvetas Pakistan, GWVTC Khar Bajaur",
          period: "Sept - Nov 2021",
          description: "Professional development in digital skills ...",
          link: "https://drive.google.com/file/d/1gWelAdcbBW8ASqDKt0pPVh3ddkSegHqH/view?usp=drive_link"
        },
        {
          title: "NCVQ IT - Computer Operator",
          organization: "Khyber Pakhtunkhwa Trade Testing Board",
          period: "December 2021",
          description: "National vocational qualification in IT ...",
          link: "https://drive.google.com/file/d/1Dw__bzWv21zNoH5ePuU2MwZeXoDhGVn-/view?usp=drive_link"
        },
      ],
    },
  }

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealContainer>
          {/* --- HEADER --- */}
          <RevealItem className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display mb-4 text-center tracking-tight">
              Professional{" "}
              <span
                className="neu-header-badge rounded-2xl px-4 sm:px-5 py-1.5 inline-block group cursor-pointer translate-y-1 sm:translate-y-3"
                style={{
                  backgroundImage: "url('/messageContainerBG.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 rounded-2xl"></span>
                <span className="absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.15)]"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full animate-pulse-glow"></span>
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-white/60 rounded-full animate-pulse-glow-delayed"></span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 blur-3xl rounded-full animate-pulse-glow"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></span>
                <span className="relative z-10 inline-block transform group-hover:scale-105 transition-transform duration-300">
                  <span
                    className="relative text-white font-black select-none"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                    }}
                  >
                    Journey
                  </span>
                </span>
              </span>
            </h2>
            <div className="relative w-24 sm:w-32 h-[3px] bg-slate-800 dark:bg-slate-200 mx-auto overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-sword-draw"></div>
            </div>
          </RevealItem>

          {/* --- MAIN CONTENT LAYOUT --- */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            {/* SIDEBAR TABS (Neumorphic Segmented Control) */}
            <RevealItem direction="left" className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-3.5 self-start content-start h-fit">
              {(Object.keys(experiences) as Array<keyof typeof experiences>).map((key) => {
                const section = experiences[key];
                const Icon = section.icon;
                const isActive = activeSection === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all duration-200 outline-none cursor-pointer ${
                      isActive
                        ? 'neu-button-primary shadow-lg scale-[1.02]'
                        : 'neu-button'
                    }`}
                  >
                    {/* Icon Container */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'neu-inset text-slate-700 dark:text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Title */}
                    <div className="text-left z-10 min-w-0 flex-1">
                      <div className="font-extrabold uppercase tracking-wider text-xs sm:text-sm truncate">
                        {section.title}
                      </div>
                    </div>
                  </button>
                )
              })}
            </RevealItem>

            {/* CONTENT AREA */}
            <RevealItem direction="right" className="relative">
              <div className="space-y-4 sm:space-y-6">
                {experiences[activeSection].items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="neu-flat-interactive rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
                    >
                      {/* Subtle Ambient Shuriken (Soft watermark on hover) */}
                      <div className="absolute -right-8 -top-8 w-32 h-32 text-slate-400/20 dark:text-slate-600/15 opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow pointer-events-none transition-opacity duration-500">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 14.5L0 12L9.5 9.5L12 0ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                        </svg>
                      </div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
                          <div>
                            <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide text-slate-900 dark:text-slate-100">
                              {item.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 font-bold mt-1 uppercase text-xs sm:text-sm tracking-widest">
                              {item.organization}
                            </p>
                          </div>
                          <span className="self-start sm:self-auto neu-pill rounded-full px-3.5 py-1 text-slate-800 dark:text-slate-200 text-[11px] font-bold uppercase tracking-wider shrink-0">
                            {item.period}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-4">
                          {item.description}
                        </p>

                        {/* Certificate link */}
                        {item.link && (
                          <div className="mt-5">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 neu-button rounded-full px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group/btn"
                            >
                              <span className="w-7 h-7 neu-button-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover/btn:translate-x-0.5 transition-transform">
                                <ChevronRight className="w-4 h-4 text-white" />
                              </span>
                              <span>View Certificate</span>
                            </a>
                          </div>
                        )}

                        {/* Reference Section */}
                        {item.reference && (
                          <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/80">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Reference</p>
                            <div className="neu-inset rounded-2xl p-4 sm:p-5 space-y-1.5">
                              <p className="text-sm">
                                <span className="font-black text-slate-900 dark:text-slate-100">{item.reference.name}</span>
                                <span className="text-slate-500 font-semibold"> • {item.reference.role}</span>
                              </p>
                              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                                Email: <a href={`mailto:${item.reference.contact}`} className="hover:text-slate-900 dark:hover:text-white transition-colors underline decoration-1 underline-offset-2">{item.reference.contact}</a>
                              </p>
                              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                                LinkedIn: <a href={`https://${item.reference.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors underline decoration-1 underline-offset-2">{item.reference.linkedin}</a>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </RevealItem>

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

        /* Slow ambient spin for the background shuriken */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Existing Pulse Animations for Header */
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes pulse-glow-delayed {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-glow-delayed { animation: pulse-glow-delayed 2s ease-in-out infinite 1s; }
      `}</style>
    </section>
  )
}
