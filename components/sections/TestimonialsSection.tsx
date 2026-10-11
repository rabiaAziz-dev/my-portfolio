'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Linkedin, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { RevealContainer, RevealItem } from '@/components/ui/scroll_reveal';

const testimonials = [
  {
    id: 1,
    author: "Afaq Zahir",
    role: "Team Lead & Software Engineer @ Apptex Software Solutions",
    subRole: "Flutter Trainer | Mobile App Development",
    linkedin: "https://www.linkedin.com/in/afaqxdev/",
    image: "/images/afaq_zahir.png",
    badge: "Senior Team Lead & Mentor",
    company: "Apptex Software Solutions",
    content: "Working with Rabia has been an absolute pleasure. As her mentor and team lead, I've watched her tackle complex Flutter challenges with remarkable speed and dedication. She writes clean, maintainable code, grasps complex UI/UX designs effortlessly, and consistently delivers high-performance mobile features ahead of schedule. She is an outstanding engineer with immense potential."
  },
  {
    id: 2,
    author: "Muhammad Uzair",
    role: "Lead Software Engineer @ Metasense",
    subRole: "Senior Flutter & AI Mobile Architect",
    linkedin: "https://www.linkedin.com/in/uzairxdev/",
    image: "/images/muhammad_uzair.png",
    badge: "Lead Software Engineer",
    company: "Metasense",
    content: "Collaborating with Rabia in our remote team has been fantastic. She is an exceptionally skilled Flutter developer with strong technical initiative. Whenever she builds an application and walks through its implementation, her attention to clean code, modular architecture, and rapid execution always stands out. She communicates proactively and consistently ships dependable, high-quality mobile apps."
  },
  {
    id: 3,
    author: "Ubaid Ullah",
    role: "Flutter Team Lead @ Trisol Technologies",
    subRole: "Mobile Enterprise & Development Coordination",
    linkedin: "https://www.linkedin.com/in/ubaidxdev/",
    image: "/images/ubaidullah.png",
    badge: "Engineering Manager & Team Lead",
    company: "Trisol Technologies",
    content: "Working with Rabia has been an absolute pleasure. She brings extraordinary dedication and craftsmanship to every application she builds, consistently maintaining high engineering standards. What truly sets her apart is her natural flair for UI design and silky-smooth animations—she crafts fluid, visually captivating mobile experiences that feel lively, intuitive, and modern."
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    hiddenRight: { x: 80, opacity: 0, skewX: -3 },
    hiddenLeft: { x: -80, opacity: 0, skewX: 3 },
    visible: { x: 0, opacity: 1, skewX: 0, transition: { duration: 0.5, type: 'spring' as const, bounce: 0.25 } },
    exitRight: { x: -80, opacity: 0, skewX: 3, transition: { duration: 0.35 } },
    exitLeft: { x: 80, opacity: 0, skewX: -3, transition: { duration: 0.35 } },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealContainer>
          <RevealItem className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 text-center tracking-tight">
              <span
                className="relative inline-block px-3 sm:px-4 py-1 rounded-xl overflow-hidden group cursor-pointer translate-y-1 sm:translate-y-2 shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                style={{
                  backgroundImage: "url('/messageContainerBG.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 rounded-xl"></span>
                <span className="absolute inset-0 rounded-xl border-2 border-slate-400/30 group-hover:border-slate-200/60 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]"></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-slate-200/60 rounded-full animate-pulse-glow"></span>
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-slate-200/60 rounded-full animate-pulse-glow-delayed"></span>
                <span className="absolute inset-0 bg-gradient-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></span>

                <span className="relative z-10 inline-block transform group-hover:scale-105 transition-transform duration-300">
                  <span className="absolute top-[2px] sm:top-[3px] left-[2px] sm:left-[3px] text-slate-900/40 font-black select-none" aria-hidden="true">Testimonials</span>
                  <span className="absolute top-[1.5px] sm:top-[2px] left-[1.5px] sm:left-[2px] text-slate-800/50 font-black select-none" aria-hidden="true">Testimonials</span>
                  <span className="absolute top-[1px] left-[1px] text-slate-700/60 font-black select-none" aria-hidden="true">Testimonials</span>
                  <span
                    className="relative text-white font-black select-none"
                    style={{
                      textShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                    }}
                  >
                    Testimonials
                  </span>
                </span>
              </span>
            </h2>
            <div className="relative w-24 sm:w-32 h-[3px] bg-slate-800 dark:bg-slate-200 mx-auto overflow-hidden rounded-full mb-4">
              <div className="absolute inset-0 bg-white w-full h-full -translate-x-full animate-sword-draw"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base font-medium max-w-xl mx-auto px-2">
              Recommendations and endorsements from engineering leads and seniors I work under.
            </p>
          </RevealItem>

          {/* Quick Senior Switcher Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto w-full px-1">
            {testimonials.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 w-full ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-700 dark:bg-white dark:text-slate-900 dark:border-white shadow-lg transform -translate-y-0.5'
                      : 'bg-white/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/70'
                  }`}
                  aria-label={`Show recommendation from ${item.author}`}
                >
                  <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 border-2 ${
                    isActive ? 'border-cyan-400 ring-2 ring-cyan-400/30' : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    <Image
                      src={item.image}
                      alt={item.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xs sm:text-sm leading-tight truncate">
                      {item.author}
                    </p>
                    <p className={`text-[10px] sm:text-xs truncate ${
                      isActive ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {item.company}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative flex items-center justify-center">
            {/* Desktop Left Button (Kunai Style) */}
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute -left-6 lg:-left-12 z-20 group transform -translate-y-1/2 top-1/2 p-2 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <div className="w-11 h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 flex items-center justify-center shadow-lg transform rotate-45 group-hover:scale-110 transition-transform duration-300">
                <ChevronLeft size={22} className="text-white dark:text-slate-900 -rotate-45 -translate-x-0.5" />
              </div>
            </button>

            {/* Testimonial Card (Manga Panel Style) */}
            <div className="w-full max-w-3xl">
              <div
                className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.25)] min-h-[360px] flex items-center group p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-none"
                style={{ clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)' }}
              >
                {/* Glowing edge on hover */}
                <div className="absolute left-0 top-0 w-[4px] h-full bg-slate-800 dark:bg-slate-200 transition-all duration-500 ease-out shadow-[0_0_15px_currentColor]"></div>

                {/* Decorative Quote Icon (Shuriken style placement) */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-10 text-slate-400/20 dark:text-slate-600/15 transform -rotate-12 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                  <Quote size={50} className="sm:w-20 sm:h-20" />
                </div>

                {/* Fast slash highlight effect */}
                <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-700/50 w-[150%] h-full -translate-x-full skew-x-[-45deg] group-hover:animate-fast-slash z-0 pointer-events-none"></div>

                <div className="relative z-10 w-full overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      variants={slideVariants}
                      initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                      animate="visible"
                      exit={direction > 0 ? "exitRight" : "exitLeft"}
                      custom={direction}
                      className="w-full flex flex-col items-center text-center px-1 sm:px-2"
                    >
                      {/* Senior Photo with animated ring */}
                      <div className="relative mb-4 sm:mb-5 flex flex-col items-center">
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.55)] transition-all duration-300">
                          <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-950 border-2 border-white/20">
                            <Image
                              src={testimonials[currentIndex].image}
                              alt={testimonials[currentIndex].author}
                              fill
                              sizes="(max-width: 640px) 80px, 112px"
                              className="object-cover"
                              priority
                            />
                          </div>
                        </div>

                        {/* Endorsement badge */}
                        <div className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                          <Sparkles size={12} className="text-emerald-500 animate-pulse" />
                          <span>{testimonials[currentIndex].badge}</span>
                        </div>
                      </div>

                      {/* Content Quote */}
                      <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium italic mb-5 sm:mb-6 leading-relaxed max-w-2xl">
                        "{testimonials[currentIndex].content}"
                      </p>

                      {/* Senior Name and Roles */}
                      <div className="flex flex-col items-center max-w-xl">
                        <div className="inline-flex items-center gap-1.5 flex-wrap justify-center">
                          <h4 className="text-slate-900 dark:text-white font-black text-lg sm:text-2xl tracking-wider uppercase">
                            {testimonials[currentIndex].author}
                          </h4>
                          <CheckCircle2 size={16} className="text-cyan-500 dark:text-cyan-400" />
                        </div>

                        <p className="text-slate-700 dark:text-slate-300 font-bold tracking-wide text-xs sm:text-sm mt-1">
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mt-0.5">
                          {testimonials[currentIndex].subRole}
                        </p>

                        {/* Direct LinkedIn Button */}
                        <a
                          href={testimonials[currentIndex].linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(10,102,194,0.5)] transform hover:-translate-y-0.5 active:translate-y-0"
                          aria-label={`View ${testimonials[currentIndex].author}'s LinkedIn Profile`}
                        >
                          <Linkedin size={14} className="fill-white" />
                          <span>View LinkedIn Profile</span>
                          <ExternalLink size={12} className="opacity-80" />
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Desktop Right Button (Kunai Style) */}
            <button
              onClick={handleNext}
              className="hidden md:flex absolute -right-6 lg:-right-12 z-20 group transform -translate-y-1/2 top-1/2 p-2 focus:outline-none"
              aria-label="Next testimonial"
            >
              <div className="w-11 h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 flex items-center justify-center shadow-lg transform rotate-45 group-hover:scale-110 transition-transform duration-300">
                <ChevronRight size={22} className="text-white dark:text-slate-900 -rotate-45 translate-x-0.5" />
              </div>
            </button>
          </div>

          {/* Navigation Controls: Mobile Arrows + Indicators */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow active:scale-95 transition-transform"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-500 rounded-none transform skew-x-[-20deg] ${
                    index === currentIndex
                    ? 'w-8 sm:w-10 h-2 bg-slate-800 dark:bg-slate-200 shadow-[0_0_10px_currentColor]'
                    : 'w-3.5 sm:w-4 h-2 bg-slate-400 dark:bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow active:scale-95 transition-transform"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
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

        /* Fast slash highlight */
        @keyframes fast-slash {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(150%) skewX(-45deg); }
        }
        .animate-fast-slash {
          animation: fast-slash 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}
