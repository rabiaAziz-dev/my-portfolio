"use client"

import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { useState } from "react"

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export default function SocialSidebar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/jk647",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/rabiaaziz456/",
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      url: "https://wa.me/923275676026",
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:swe.rabiaaziz@gmail.com",
    },
  ]

  return (
    <div className="hidden lg:flex fixed right-6 top-1/4 bottom-0 z-40 flex-col items-center animate-sidebar-float">

      {/* Top Anchor: The Kunai stabbed into the top of the sidebar */}
      <div className="relative z-20 w-8 h-20 text-slate-900 dark:text-slate-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)] -mb-4 animate-kunai-hover">
        <svg viewBox="0 0 24 80" fill="currentColor" className="w-full h-full">
          {/* Blade & Handle */}
          <path d="M12 0 L18 25 L14 30 V60 C14 62 10 62 10 60 V30 L6 25 Z" />
          {/* Ring */}
          <circle cx="12" cy="68" r="6" fill="transparent" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </div>

      {/* The Taut Ninja Wire */}
      <div className="relative flex-grow flex flex-col items-center w-full min-h-[300px]">
        {/* The actual wire line - Darkened for better visibility */}
        <div className="absolute top-0 bottom-10 w-[1.5px] bg-gradient-to-b from-slate-900 via-slate-600 to-transparent dark:from-slate-300 dark:via-slate-500 shadow-[0_0_8px_rgba(15,23,42,0.6)] z-0"></div>

        {/* Social Icons positioned along the wire */}
        <div className="flex flex-col gap-6 pt-8 pb-12 z-10">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredLink(social.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="group relative w-12 h-12 flex items-center justify-center cursor-pointer"
            >

              {/* Hover Effect: Rapidly spinning monochromatic Shuriken */}
              <div className="absolute inset-0 scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-300 ease-out z-0 text-slate-800/80 dark:text-slate-400/80 drop-shadow-[0_0_10px_rgba(15,23,42,0.5)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-spin-hyper">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                </svg>
              </div>

              {/* The Icon Node - NOW DARK GREY/SLATE FOR HIGH CONTRAST */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 border-[1.5px] border-slate-700 dark:border-slate-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-[0_5px_15px_rgba(15,23,42,0.4)]">
                <social.icon className="w-4 h-4 text-slate-200 dark:text-slate-300 group-hover:text-white transition-colors" />
              </div>

              {/* Anime Paper-Bomb Style Tooltip */}
              <div
                className={`absolute right-14 origin-right px-4 py-2 bg-slate-900 dark:bg-slate-200 text-slate-100 dark:text-slate-900 text-xs font-bold whitespace-nowrap flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out ${hoveredLink === social.label
                  ? "scale-100 opacity-100 translate-x-0"
                  : "scale-50 opacity-0 translate-x-4 pointer-events-none"
                  }`}
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
              >
                {social.label}
                <ExternalLink className="w-3 h-3 opacity-70" />
              </div>

              {/* Connecting thread to tooltip - Darkened to match */}
              <div className={`absolute right-10 top-1/2 w-4 h-[1.5px] bg-slate-900 dark:bg-slate-300 transition-all duration-300 ${hoveredLink === social.label ? "opacity-100" : "opacity-0"
                }`}></div>
            </a>
          ))}
        </div>
      </div>

      {/* Status indicator: Chakra Pulse */}
      <div className="absolute bottom-6 flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-1">
          <div className="absolute w-4 h-4 bg-emerald-500/40 dark:bg-emerald-400/40 rounded-full animate-ping"></div>
          <div className="absolute w-6 h-6 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-full animate-pulse"></div>
          <div className="relative w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        </div>
        <p className="text-[10px] tracking-widest uppercase text-slate-700 dark:text-slate-400 font-bold mt-1">
          Available
        </p>
      </div>

      <style jsx>{`
        /* Hyper-fast spin for the shuriken hover */
        @keyframes spin-hyper {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-hyper {
          animation: spin-hyper 0.8s linear infinite;
        }

        /* Noticeable vertical float for the entire sidebar */
        @keyframes sidebar-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-sidebar-float {
          animation: sidebar-float 5s ease-in-out infinite;
        }

        /* Subtle vertical drift for the Kunai to look like it's holding tension */
        @keyframes kunai-hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-kunai-hover {
          animation: kunai-hover 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}