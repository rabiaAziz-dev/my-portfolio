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
                    className={`font-semibold ${isUser ? 'text-white' : 'text-slate-900'}`}
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
                          md:rounded-[32px] border-0 md:border md:border-slate-800/80
                          shadow-[0_25px_80px_rgba(0,0,0,0.4),0_0_30px_rgba(15,23,42,0.3)]"
              style={{
                background: '#0b1220',
              }}
            >
              {/* ─── 1. Header with Interactive 3D Avatar ─── */}
              <div className="relative w-full shrink-0 z-20" style={{ height: '80px' }}>
                <svg
                  viewBox="0 0 430 80"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
                >
                  <defs>
                    <linearGradient id="assistantHeaderDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#060913" />
                      <stop offset="40%" stopColor="#0f172a" />
                      <stop offset="80%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#090e1a" />
                    </linearGradient>
                    <linearGradient id="assistantEdgeGleamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                      <stop offset="25%" stopColor="#cbd5e1" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="75%" stopColor="#e2e8f0" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 0,0 L 430,0 L 430,34 L 290,34 C 250,34 235,80 195,80 L 0,80 Z"
                    fill="url(#assistantHeaderDarkGrad)"
                  />
                  <path
                    d="M 0,80 L 195,80 C 235,80 250,34 290,34 L 430,34"
                    fill="none"
                    stroke="url(#assistantEdgeGleamGrad)"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* Header Content */}
                <div className="relative z-10 w-full h-full px-5 pt-3.5 pb-2 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-slate-400 via-white to-slate-500 shadow-[0_0_8px_rgba(255,255,255,0.7)] shrink-0" />

                    {/* Interactive 3D Avatar in Header */}
                    <div
                      onClick={triggerHeaderSpin}
                      className="relative cursor-pointer group"
                      title="Click for a spin!"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-slate-300/80 bg-slate-900/90 shadow-[0_0_16px_rgba(148,163,184,0.3)] overflow-hidden transition-all ${
                          headerAvatarSpin ? 'animate-joy-spin' : 'group-hover:scale-105'
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
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    </div>

                    <div>
                      <h3 className="text-white font-black text-base tracking-tight leading-tight flex items-center gap-2">
                        Rabia&apos;s AI Assistant
                        <span className="text-xs text-slate-300 font-normal">✦</span>
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5 font-medium">
                        <span className="text-emerald-400 font-semibold">● Online</span>
                        <span>•</span>
                        <span>{currentTime} PKT</span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Close Button */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-300 transition-all shadow-md group mt-0.5"
                    aria-label="Close chat"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ─── 2. Main White Body ─── */}
              <div
                className="relative flex-1 flex flex-col min-h-0 z-10"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                }}
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
                      <div className="flex items-center gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-slate-700/70">
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
                            <p className="text-sm font-extrabold text-white tracking-tight">
                              Hey there! 👋 I&apos;m Rabia&apos;s AI Assistant.
                            </p>
                            <span className="text-slate-400 text-xs">✦ ✧</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mt-1">
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
                            className={`bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex flex-col items-start transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group text-left cursor-pointer ${
                              btn.fullWidth ? 'col-span-2' : ''
                            }`}
                          >
                            <span className="text-base mb-1">{btn.emoji}</span>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                              {btn.label}
                            </span>
                            <span className="text-[11px] text-slate-400 mt-0.5">
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
                        <div className="relative w-8 h-8 shrink-0 rounded-full bg-slate-900 border border-slate-700/80 shadow-sm flex items-center justify-center mt-0.5 mr-2.5 overflow-hidden">
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
                        className={`max-w-[82%] text-[13px] leading-relaxed p-3.5 ${
                          msg.role === 'user'
                            ? `rounded-2xl rounded-br-sm text-white ${
                                sendFlash && msg.id === messages[messages.length - 1]?.id ? 'send-flash' : ''
                              }`
                            : 'rounded-2xl rounded-tl-sm text-slate-700'
                        }`}
                        style={
                          msg.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                border: '1px solid rgba(30,41,59,0.8)',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                              }
                            : {
                                background: '#ffffff',
                                border: '1px solid rgba(226, 232, 240, 0.9)',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                              }
                        }
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
                      <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center bg-white border border-slate-200/90 shadow-sm">
                        <div className="chakra-dot" />
                        <div className="chakra-dot" />
                        <div className="chakra-dot" />
                        <span className="text-[11px] text-slate-500 ml-2 font-medium">
                          AI Assistant is thinking...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── 3. Floating Pill Input Area ─── */}
                <div className="relative shrink-0 px-4 pt-2 pb-3 bg-transparent">
                  <div className="relative flex items-center bg-white border border-slate-200/90 rounded-full shadow-[0_2px_14px_rgba(0,0,0,0.05)] pl-4 pr-1.5 py-1.5">
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
                      className="flex-1 bg-transparent text-slate-800 text-sm placeholder:text-slate-400 outline-none pr-2 disabled:opacity-40"
                    />
                    <button
                      onClick={() => handleSend(input)}
                      disabled={isLoading || !input.trim()}
                      className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm shrink-0"
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



