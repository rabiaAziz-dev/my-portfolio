'use client';

import React from 'react';

// ─── Sharingan Icon (Matching Katana Sword & Crimson Sharingan Theme) ───
export const SharinganIcon = ({
  className = '',
  style,
  size = 24,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    width={size}
    height={size}
    fill="none"
  >
    <defs>
      {/* Outer Katana Steel Metallic Gradient */}
      <linearGradient id="katanaSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#cbd5e1" />
        <stop offset="75%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      {/* Crimson Sharingan Iris Radial Gradient */}
      <radialGradient id="sharinganIrisGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="55%" stopColor="#dc2626" />
        <stop offset="85%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>

      {/* Tomoe Shadow */}
      <filter id="tomoeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.6" />
      </filter>
    </defs>

    {/* Outer Metallic Steel Ring (Katana Blade Chrome) */}
    <circle cx="50" cy="50" r="46" stroke="url(#katanaSteelGrad)" strokeWidth="3.5" />

    {/* Deep Red Crimson Iris */}
    <circle cx="50" cy="50" r="42" fill="url(#sharinganIrisGrad)" />

    {/* Inner Tomoe Ring Track */}
    <circle cx="50" cy="50" r="27" stroke="#0f172a" strokeWidth="2" opacity="0.45" />

    {/* Center Obsidian Black Pupil */}
    <circle cx="50" cy="50" r="9" fill="#0f172a" />
    <circle cx="50" cy="50" r="4" fill="#020617" />
    <circle cx="47" cy="47" r="1.5" fill="#ffffff" opacity="0.6" />

    {/* 3 Tomoe Marks */}
    {[0, 120, 240].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 27 * Math.cos(rad);
      const cy = 50 + 27 * Math.sin(rad);
      const rotateTomoe = angle + 90;
      return (
        <g key={i} transform={`rotate(${rotateTomoe}, ${cx}, ${cy})`} filter="url(#tomoeShadow)">
          <circle cx={cx} cy={cy} r="6.5" fill="#0f172a" />
          <path
            d={`M ${cx} ${cy - 6.5} A 6.5 6.5 0 0 1 ${cx + 5.5} ${cy + 3} Q ${cx - 2} ${cy + 1} ${cx - 4.5} ${cy - 4}`}
            fill="#0f172a"
          />
        </g>
      );
    })}
  </svg>
);

export default SharinganIcon;
