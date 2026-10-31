'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useAIChat } from '../hooks/useAIChat';
import FloatingRobotAssistant from './FloatingRobotAssistant';

function renderCleanMessageContent(content: string, isUser: boolean) {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) return <div key={lineIdx} className="h-1" />;

        // Clean out leading bullets like "* " or "- "
        let cleanedLine = line.replace(/^\s*[\*\-]\s+/, '• ');

        // Split by bold tokens **...**
        const parts = cleanedLine.split(/(\*\*[^*]+?\*\*)/g);

        return (
          <p key={lineIdx} className="leading-relaxed">
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                const inner = part.slice(2, -2);
                return (
                  <strong
                    key={partIdx}
                    className={`font-semibold ${isUser ? 'text-white' : 'text-slate-900 dark:text-white'}`}
                  >
                    {inner}
                  </strong>
                );
              }
              // Strip any stray asterisks
              const cleanPart = part.replace(/\*\*/g, '').replace(/\s\*\s/g, ' • ');
              return <span key={partIdx}>{cleanPart}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function AIChatWidget({ splashDone }: { splashDone?: boolean }) {
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isLoading,
    currentTime,
    sendFlash,
    messagesContainerRef,
    inputRef,
    handleSend,
    quickActions,
  } = useAIChat();

  const [headerAvatarSpin, setHeaderAvatarSpin] = useState(false);

  const triggerHeaderSpin = () => {
    setHeaderAvatarSpin(true);
    setTimeout(() => setHeaderAvatarSpin(false), 800);
  };

  useEffect(() => {
    const handleAnimationShowcase = () => {
      // Temporarily minimize chat window so full screen animation is completely unobstructed
      setIsOpen(false);
    };
    window.addEventListener('ninja-easter-egg', handleAnimationShowcase);
    return () => window.removeEventListener('ninja-easter-egg', handleAnimationShowcase);
  }, [setIsOpen]);

  if (!splashDone) return null;

  return (
    <>
      <style jsx>{`
        /* ═══ CHAT PANEL ENTRANCE ═══ */
        .chat-panel-enter {
          animation: aura-burst-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes aura-burst-in {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        /* Avatar Spin Easter Egg */
        @keyframes avatar-joy-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-joy-spin {
          animation: avatar-joy-spin 0.75s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ═══ MESSAGES ═══ */
        .msg-enter {
          animation: msg-appear 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes msg-appear {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* User message send flash */
        .send-flash {
          animation: flash-burst 0.4s ease-out forwards;
        }
        @keyframes flash-burst {
          0% { box-shadow: 0 0 0 0 rgba(148, 163, 184, 0.5); }
          50% { box-shadow: 0 0 20px 4px rgba(148, 163, 184, 0.3); }
          100% { box-shadow: 0 0 0 0 rgba(148, 163, 184, 0); }
        }

        /* ═══ TYPING DOTS ═══ */
        .chakra-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #334155, #64748b);
          animation: chakra-bounce 1.4s ease-in-out infinite both;
        }
        .chakra-dot:nth-child(1) { animation-delay: -0.32s; }
        .chakra-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes chakra-bounce {
          0%, 80%, 100% { transform: scale(0.3); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* ═══ SCROLLBAR & SCROLL CONTAINMENT ═══ */
        .ninja-scroll {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.5) transparent;
        }
        .ninja-scroll::-webkit-scrollbar { width: 6px; }
        .ninja-scroll::-webkit-scrollbar-track { background: transparent; }
        .ninja-scroll::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.4);
          border-radius: 4px;
        }
        .ninja-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }

        /* ═══ OVERLAY BACKDROP ═══ */
        .chat-backdrop {
          animation: fade-in 0.25s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          1. FLOATING 3D AI COMPANION (ANCHORED BOTTOM-LEFT)
      ═══════════════════════════════════════════════════════════════ */}
      <FloatingRobotAssistant
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        splashDone={splashDone}
      />

      {/* ═══════════════════════════════════════════════════════════════
          2. CHAT PANEL (ANCHORED BOTTOM-LEFT)
      ═══════════════════════════════════════════════════════════════ */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="chat-backdrop fixed inset-0 z-[9997] bg-black/40 md:bg-transparent md:pointer-events-none"
            onClick={() => {
              setIsOpen(false);
            }}
          />

          <div className="fixed inset-0 md:inset-auto md:bottom-6 md:left-8 z-[9998] flex flex-col justify-end pointer-events-none">
            <div
              onWheel={(e) => {
                e.stopPropagation();
                if (messagesContainerRef.current && !messagesContainerRef.current.contains(e.target as Node)) {
                  messagesContainerRef.current.scrollTop += e.deltaY;
                }
              }}
              className="chat-panel-enter w-full md:w-[430px] h-[100dvh] md:h-[610px] md:max-h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden pointer-events-auto
                          md:rounded-[32px] neu-flat border border-slate-200/50 dark:border-slate-800/80"
              style={{
                background: '#0b1220',
              }}
            >
              {/* ─── 1. Header with Interactive 3D Avatar (Manga Sticker Header) ─── */}
              <div
                className="relative w-full shrink-0 z-20 px-4 sm:px-5 py-3 flex items-center justify-between select-none overflow-hidden rounded-t-[28px] md:rounded-t-[32px] rounded-b-none border-b border-slate-700/60 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25)] group/header"
                style={{
                  height: '80px',
                  backgroundImage: "url('/messageContainerBG.jpeg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Dark Gradient Overlay for optimal manga illustration contrast & text clarity */}
                <span className="absolute inset-0 bg-gradient-to-br from-black/75 via-slate-950/70 to-black/85 pointer-events-none" />

                {/* Die-Cut Vinyl Sticker Top Gloss */}
                <span className="absolute top-0 inset-x-0 h-[45%] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />

                {/* Subtle Inner Bevel Glow */}
                <span className="absolute inset-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25)] pointer-events-none" />

                {/* Sticker Corner Rivet / Glow Nodes - Top Corners Only */}
                <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse-glow pointer-events-none" />
                <span className="absolute top-2.5 left-3 w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse-glow-delayed pointer-events-none" />

                {/* Center Ambient Core Aura */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-3xl rounded-full animate-pulse-glow pointer-events-none" />

                {/* Holographic Light Sweep Across Sticker Surface */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/header:translate-x-full transition-transform duration-700 pointer-events-none" />

                {/* Smooth, subtle hairline bottom divider */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/15 to-transparent pointer-events-none" />

                {/* Header Content */}
                <div className="relative z-10 w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Katana Accent Bar */}
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-slate-300 via-white to-slate-400 shadow-[0_0_8px_rgba(255,255,255,0.7)] shrink-0" />

                    {/* Interactive 3D Avatar in Header */}
                    <div
                      onClick={triggerHeaderSpin}
                      className="relative cursor-pointer group/avatar"
                      title="Click for a spin!"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/40 bg-slate-900/90 shadow-[0_0_14px_rgba(255,255,255,0.25)] overflow-hidden transition-all ${
                          headerAvatarSpin ? 'animate-joy-spin' : 'group-hover/avatar:scale-105'
                        }`}
                      >
                        <div className="relative w-10 h-10">
                          <Image
                            src="/images/robot-standing.png"
                            alt="Rabia's AI Assistant"
                            width={40}
                            height={40}
                            unoptimized
                            priority
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                    </div>

                    <div>
                      <h3
                        className="text-white font-black text-base tracking-tight leading-tight flex items-center gap-2 select-none"
                        style={{
                          textShadow: '0 0 16px rgba(255,255,255,0.35), 0 2px 4px rgba(0,0,0,0.8)',
                        }}
                      >
                        Rabia&apos;s AI Assistant
                        <span className="text-xs text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse">✦</span>
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5 font-medium select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Online
                        </span>
                        <span>•</span>
                        <span>{currentTime} PKT</span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Close Button with Dark Glass / Sticker Match */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 transition-all shadow-md group/close cursor-pointer"
                    aria-label="Close chat"
                    title="Close chat"
                  >
                    <svg className="w-4 h-4 group-hover/close:scale-110 transition-transform drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ─── 2. Main Body ─── */}
              <div
                className="relative flex-1 flex flex-col min-h-0 z-10 bg-slate-100 dark:bg-slate-900"
              >
                {/* ─── Messages Area ─── */}
                <div
                  ref={messagesContainerRef}
                  className="relative flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-2 space-y-3 ninja-scroll overscroll-contain"
                >
                  {/* Welcome message & 2-Column Action Cards */}
                  {messages.length === 0 && (
                    <div className="msg-enter space-y-3">
                      {/* Hero Welcome Card with 3D Character */}
                      <div className="flex items-center gap-4 neu-flat rounded-3xl p-4 text-slate-800 dark:text-slate-100">
                        <div className="relative w-20 h-20 md:w-22 md:h-22 shrink-0">
                          <Image
                            src="/images/robot-welcome.png"
                            alt="Welcome AI Assistant"
                            width={88}
                            height={88}
                            unoptimized
                            priority
                            className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                              Hey there! 👋 I&apos;m Rabia&apos;s AI Assistant.
                            </p>
                            <span className="text-slate-400 text-xs">✦ ✧</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                            I know everything about her Flutter apps and tech stack. Ask me anything or tap below!
                          </p>
                        </div>
                      </div>

                      {/* 2-Column Quick Action Cards Grid */}
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        {quickActions.map((btn, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(btn.val)}
                            className={`neu-button rounded-2xl p-3 flex flex-col items-start transition-all duration-200 group text-left cursor-pointer ${
                              btn.fullWidth ? 'col-span-2' : ''
                            }`}
                          >
                            <span className="text-base mb-1">{btn.emoji}</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                              {btn.label}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {btn.subtitle}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message list */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex msg-enter ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="relative w-8 h-8 shrink-0 rounded-full neu-inset flex items-center justify-center mt-0.5 mr-2.5 overflow-hidden">
                          <Image
                            src="/images/robot-dots.png"
                            alt="Assistant Avatar"
                            width={32}
                            height={32}
                            unoptimized
                            priority
                            className="object-contain p-0.5"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] text-[13px] leading-relaxed p-3.5 rounded-2xl ${
                          msg.role === 'user'
                            ? `neu-button-primary rounded-br-sm text-white ${
                                sendFlash && msg.id === messages[messages.length - 1]?.id ? 'send-flash' : ''
                              }`
                            : 'neu-flat rounded-tl-sm text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {renderCleanMessageContent(msg.content, msg.role === 'user')}
                      </div>
                    </div>
                  ))}

                  {/* ─── Dynamic AI Thinking / Typing State with 3D Character ─── */}
                  {isLoading && (
                    <div className="flex items-center gap-2.5 msg-enter">
                      <div className="relative w-11 h-11 shrink-0">
                        <Image
                          src="/images/robot-typing.png"
                          alt="AI Assistant Typing"
                          width={44}
                          height={44}
                          unoptimized
                          priority
                          className="object-contain animate-bounce"
                          style={{ animationDuration: '1.8s' }}
                        />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center neu-flat">
                        <div className="chakra-dot" />
                        <div className="chakra-dot" />
                        <div className="chakra-dot" />
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 ml-2 font-medium">
                          AI Assistant is thinking...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── 3. Floating Pill Input Area ─── */}
                <div className="relative shrink-0 px-4 pt-2 pb-3 bg-transparent">
                  <div className="relative flex items-center neu-inset rounded-full pl-4 pr-1.5 py-1.5">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend(input);
                        }
                      }}
                      placeholder="Ask about Rabia..."
                      disabled={isLoading}
                      className="flex-1 bg-transparent text-slate-800 dark:text-slate-200 text-sm placeholder:text-slate-400 outline-none pr-2 disabled:opacity-40"
                    />
                    <button
                      onClick={() => handleSend(input)}
                      disabled={isLoading || !input.trim()}
                      className="w-8 h-8 rounded-full neu-button-primary text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                      aria-label="Send message"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px] text-slate-400 tracking-wider">
                    <span>Powered by Rabia&apos;s AI Assistant</span>
                    <span className="text-slate-400">✦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}



