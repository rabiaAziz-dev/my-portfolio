'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// --- CUSTOM ANIME CIPHER TEXT (Untouched) ---
const CipherGlitchText = ({ words, delay = 3500 }: { words: string[], delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);

  useEffect(() => {
    let scrambleInterval: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      const nextWord = words[(index + 1) % words.length];
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテト";

      let iterations = 0;
      scrambleInterval = setInterval(() => {
        setDisplayText((prev) =>
          nextWord.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < iterations) return nextWord[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iterations >= nextWord.length) {
          clearInterval(scrambleInterval);
          setIndex((prev) => (prev + 1) % words.length);
        }

        iterations += 1 / 2;
      }, 40);

    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (scrambleInterval) clearInterval(scrambleInterval);
    };
  }, [index, words, delay]);

  return (
    <span className="inline-block min-w-[260px] sm:min-w-[320px] md:min-w-[400px] text-white font-mono tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
      {displayText}
    </span>
  );
};

export default function HeroSection({ animReady = false }: { animReady?: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && videoRef.current) {
      try { videoRef.current.pause(); } catch (e) { /* noop */ }
    }
    const handleChange = () => {
      if (mq.matches && videoRef.current) videoRef.current.pause();
      else if (videoRef.current) videoRef.current.play().catch(() => { });
    };
    mq.addEventListener?.('change', handleChange);
    return () => mq.removeEventListener?.('change', handleChange);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- THE UPGRADE: Awwwards-Style Agency Animations ---
  // This curve creates a very fast start that dramatically slows down at the end
  const premiumEase: [number, number, number, number] = [0.85, 0, 0.15, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Fast ripple effect
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      y: "120%",     // Starts pushed way down
      rotateZ: 15,   // Slightly angled
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: "0%",
      rotateZ: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: premiumEase
      }
    },
  };

  const roleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number], // Expo ease out
        delay: 0.8
      }
    },
  };

  const paraVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: premiumEase,
        delay: 1.1
      }
    },
  };

  const headingText = "Hi, I'm Rabia Aziz";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-10 transform-gpu"
      >
        <source src="/liveBackground.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center" style={{ perspective: '1000px' }}>
        {animReady && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]">

              <motion.span
                variants={wordContainerVariants}
                className="inline-flex justify-center flex-wrap gap-x-2 sm:gap-x-3.5 animate-glow-text"
              >
                {headingText.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className="inline-block overflow-hidden pb-1 -mb-1"
                      >
                        <motion.span
                          variants={letterVariants}
                          style={{
                            display: 'inline-block',
                            transformOrigin: 'bottom left'
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                ))}
              </motion.span>
              <br />

              <motion.div variants={roleVariants} className="mt-3 sm:mt-4 h-12 sm:h-16 text-lg sm:text-2xl md:text-3xl">
                <span className="inline-block bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-shimmer">
                  <CipherGlitchText
                    words={[
                      'Flutter App Developer',
                      'AI-Powered Apps',
                      'Supabase & Firebase',
                      'UI/UX Enthusiast'
                    ]}
                    delay={2000}
                  />
                </span>
              </motion.div>
            </h1>

            <motion.p
              variants={paraVariants}
              className="text-sm sm:text-lg md:text-xl text-white mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto font-medium px-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] [text-shadow:_0_2px_15px_rgb(0_0_0_/_80%),_0_0_30px_rgb(255_255_255_/_20%)]"
            >
              I build AI-powered experiences, scalable Flutter applications, and solid Supabase backends that work across mobile, web, and desktop. From idea to deployment, I make it happen.
            </motion.p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {animReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: premiumEase, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 w-full max-w-md mx-auto sm:max-w-none"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all border border-white/30 overflow-hidden hover:scale-105 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm sm:text-base w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></span>
              <span className="relative z-10">Explore My Journey</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://drive.google.com/file/d/15ybKpKaNNWWWRCr4juTa1-ocgLG9_YlV/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold bg-white text-slate-900 rounded-lg transition-all border border-white/50 overflow-hidden hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></span>
              <Download className="w-4 h-4 relative z-10 group-hover:-translate-y-1 transition-transform" />
              <span className="relative z-10">View Resume</span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
