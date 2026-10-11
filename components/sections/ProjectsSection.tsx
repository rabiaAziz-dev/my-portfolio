'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, Download, X, Play, ExternalLink } from 'lucide-react';
import { RevealContainer, RevealItem } from '@/components/ui/scroll_reveal';

export default function ProjectsSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

  const projects = [
    {
      title: 'Health Tracker — Vitals & BP Monitor',
      desc: 'A personal health companion app to track blood pressure, pulse rate, temperature, and blood glucose with weekly summaries and trend charts.',
      tags: ['Flutter', 'Health & Vitals', 'Provider', 'Charts'],
      github: null,
      download: null,
      playstore: 'https://play.google.com/store/apps/details?id=com.vitals.bp.family.health.tracker&hl=en',
      initial: 'H',
      showcase: '/images/health_trackor showcase.jpg',
      showcaseAlt: 'Health Tracker showcase',
    },
    {
      title: 'Coming Soon',
      desc: 'New Flutter projects are currently in progress. Stay tuned for upcoming releases!',
      tags: ['Flutter', 'Mobile Apps'],
      github: null,
      download: null,
      initial: '?',
      comingSoon: true,
    },
  ];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  useEffect(() => {
    if (lightboxOpen) {
      const btn = document.getElementById('lightbox-close-btn');
      btn?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxOpen]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt || 'Preview');
    setLightboxOpen(true);
  };

  return (
    <section id="projects" className="relative py-20 md:py-32 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-10">
        <RevealContainer>
          {/* Header */}
          <RevealItem className="text-center mb-10 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display mb-4 sm:mb-8 text-center tracking-tight">
              Featured{' '}
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
                  <span className="absolute top-[2px] sm:top-[3px] left-[2px] sm:left-[3px] text-slate-900/40 font-black select-none" aria-hidden="true">Projects</span>
                  <span className="absolute top-[1.5px] sm:top-[2px] left-[1.5px] sm:left-[2px] text-slate-800/50 font-black select-none" aria-hidden="true">Projects</span>
                  <span className="absolute top-[1px] left-[1px] text-slate-700/60 font-black select-none" aria-hidden="true">Projects</span>
                  <span className="relative text-white font-black select-none" style={{ textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>Projects</span>
                  <span className="absolute top-[-1px] left-0 text-white/40 font-black select-none blur-[0.5px]" aria-hidden="true">Projects</span>
                </span>
                <span className="absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[inset_0_0_50px_rgba(255,255,255,0.15)] transition-all duration-500"></span>
              </span>
            </h2>

            {/* Sword draw underline effect */}
            <div className="relative w-24 sm:w-32 h-[3px] bg-slate-800 dark:bg-slate-200 mx-auto overflow-hidden rounded-full mt-2 mb-4 sm:mb-8">
              <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-sword-draw"></div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              A collection of Flutter apps I've built, showcasing my UI skills and App development experience.
            </p>
          </RevealItem>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
            {projects.map((project, i) => (
              <RevealItem
                key={i}
                className="p-5 sm:p-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 group relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-slate-400 dark:hover:border-slate-500 flex flex-col h-full hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
              >
                {/* Subtle Shuriken Background (Only visible on hover, identical to About) */}
                <div className="absolute -right-12 -top-12 w-48 h-48 text-slate-300/30 dark:text-slate-600/20 opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow pointer-events-none transition-opacity duration-500 z-0">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                  </svg>
                </div>

                {/* Corner Accent Brackets (Identical to About) */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-400 dark:border-slate-500 pointer-events-none z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-400 dark:border-slate-500 pointer-events-none z-10"></div>

                {/* Image / Showcase Area */}
                <div
                  className="relative z-10 h-44 bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 mb-6 flex items-center justify-center overflow-hidden"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                >
                  {project.showcase ? (
                    <img
                      src={project.showcase}
                      alt={project.showcaseAlt || project.title}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                      onClick={() => openLightbox(project.showcase!, project.showcaseAlt || project.title)}
                    />
                  ) : (
                    <span className="text-4xl font-black text-slate-300 dark:text-slate-700">{project.initial}</span>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3 flex-grow">
                  <h3 className="font-black text-xl tracking-wide text-slate-900 dark:text-slate-100 mb-1 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 py-5">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 text-xs font-bold text-slate-700 dark:text-slate-300"
                      style={{ clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700 w-full items-center">
                  {!project.comingSoon ? (
                    <>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/btn">
                          <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 flex items-center justify-center shadow-md transform rotate-45 group-hover/btn:rotate-90 transition-transform duration-500">
                            <div className="transform -rotate-45 group-hover/btn:-rotate-90 transition-transform duration-500">
                              <Github className="w-4 h-4 text-white dark:text-slate-900" />
                            </div>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 group-hover/btn:text-slate-900 dark:group-hover/btn:text-white transition-colors">Code</span>
                        </a>
                      )}
                      {project.download && (
                        <a href={project.download} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/btn">
                          <div className="w-8 h-8 bg-white dark:bg-slate-900 border-2 border-slate-700 dark:border-slate-300 flex items-center justify-center shadow-md transform rotate-45 group-hover/btn:rotate-90 transition-transform duration-500">
                            <div className="transform -rotate-45 group-hover/btn:-rotate-90 transition-transform duration-500">
                              <Download className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                            </div>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 group-hover/btn:text-slate-900 dark:group-hover/btn:text-white transition-colors">App</span>
                        </a>
                      )}
                      {project.playstore && !project.github && !project.download ? (
                        <a
                          href={project.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full flex items-center justify-between gap-3.5 py-3 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/85 to-slate-900/90 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/90 backdrop-blur-md border border-slate-300/30 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-400 shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.06)] transition-all duration-300 group/play overflow-hidden"
                        >
                          {/* Top architectural light highlight */}
                          <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                          {/* Light sweep on hover */}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] dark:via-white/[0.12] to-transparent -translate-x-full group-hover/play:translate-x-full transition-transform duration-700 rounded-2xl pointer-events-none" />

                          {/* Left: Monochromatic Icon Container */}
                          <div className="flex items-center gap-3 sm:gap-3.5 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover/play:scale-105 group-hover/play:bg-white/15 dark:group-hover/play:bg-white/10 transition-all duration-300 shadow-inner">
                              {/* Real Official Google Play Vector */}
                              <svg className="w-[22px] h-[22px] flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24" fill="none">
                                <path d="M3.609 1.814L13.793 12 3.61 22.186A2.372 2.372 0 0 1 3 20.505V3.495c0-.65.231-1.246.609-1.681z" fill="#00D2FF" />
                                <path d="M3.609 1.814c.328-.377.818-.614 1.391-.614.502 0 .973.184 1.385.42l10.843 6.195-3.435 3.435L3.609 1.814z" fill="#00E676" />
                                <path d="M17.228 8.565l-3.435 3.435 3.435 3.435 3.864-2.208c1.1-.628 1.1-1.826 0-2.454l-3.864-2.208z" fill="#FFD200" />
                                <path d="M13.793 12l3.435 3.435-10.843 6.195c-.412.236-.883.42-1.385.42-.573 0-1.063-.237-1.391-.614L13.793 12z" fill="#FF3A44" />
                              </svg>
                            </div>

                            {/* Center: Architectural Typography */}
                            <div className="flex flex-col text-left leading-tight">
                              <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-slate-400 group-hover/play:text-slate-300 transition-colors">
                                GET IT ON
                              </span>
                              <span className="text-sm font-black tracking-wider text-slate-100 group-hover/play:text-white transition-colors">
                                Google Play
                              </span>
                            </div>
                          </div>

                          {/* Right: Architectural Live Indicator & Arrow */}
                          <div className="flex items-center gap-2 relative z-10">
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-300 group-hover/play:border-white/25 transition-colors">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Live
                            </span>
                            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover/play:text-white group-hover/play:translate-x-0.5 group-hover/play:border-white/25 transition-all">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </a>
                      ) : project.playstore ? (
                        <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/btn">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                              <path d="M3.609 1.814L13.793 12 3.61 22.186A2.372 2.372 0 0 1 3 20.505V3.495c0-.65.231-1.246.609-1.681z" fill="#00D2FF" />
                              <path d="M3.609 1.814c.328-.377.818-.614 1.391-.614.502 0 .973.184 1.385.42l10.843 6.195-3.435 3.435L3.609 1.814z" fill="#00E676" />
                              <path d="M17.228 8.565l-3.435 3.435 3.435 3.435 3.864-2.208c1.1-.628 1.1-1.826 0-2.454l-3.864-2.208z" fill="#FFD200" />
                              <path d="M13.793 12l3.435 3.435-10.843 6.195c-.412.236-.883.42-1.385.42-.573 0-1.063-.237-1.391-.614L13.793 12z" fill="#FF3A44" />
                            </svg>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 group-hover/btn:text-slate-900 dark:group-hover/btn:text-white transition-colors">Play Store</span>
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 flex items-center justify-center transform rotate-45">
                        <div className="transform -rotate-45">
                          <X className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Coming Soon</span>
                    </div>
                  )}
                </div>

              </RevealItem>
            ))}
          </div>
        </RevealContainer>
      </div>

      {/* Lightbox / Modal (Original logic preserved entirely) */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 pointer-events-none opacity-0"
        animate={lightboxOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        onClick={() => setLightboxOpen(false)}
      >
        <div
          className="relative max-w-[95vw] max-h-[95vh] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            id="lightbox-close-btn"
            onClick={() => setLightboxOpen(false)}
            className="absolute -top-12 right-0 z-50 inline-flex items-center justify-center rounded-full p-3 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label="Close preview"
          >
            <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-2 shadow-2xl">
            <img
              src={lightboxSrc}
              alt={lightboxAlt}
              className="max-w-full max-h-[85vh] object-contain rounded"
            />
          </div>
          <div className="mt-4 text-center">
            <div className="inline-block bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-white">{lightboxAlt}</p>
            </div>
          </div>
        </div>
      </motion.div>

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

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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
