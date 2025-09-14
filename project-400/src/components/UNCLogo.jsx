import React from "react";

/**
 * UNCLogo - Reusable brand mark.
 * Props:
 *  size: tailwind size number (default 40 -> h-10 w-10 equivalent via inline style)
 *  showText: whether to render BRAND text (default false here; parent decides)
 *  className: extra classes for outer wrapper
 */
export default function UNCLogo({
  size = 40,
  showText = false,
  className = "",
}) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: px, height: px }}
      aria-label="UNC Portal Logo"
      role="img"
    >
      <div
        className="absolute inset-0 rounded-[28%] bg-gradient-to-br from-primary/25 via-aurora-2/20 to-aurora-4/30 blur-md"
        aria-hidden
      />
      <div
        className="absolute inset-0 rounded-[28%] border border-primary/30 shadow-inner shadow-primary/10 bg-surface/60 backdrop-blur-sm"
        aria-hidden
      />
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 w-[60%] h-[60%] drop-shadow-sm"
        aria-hidden
      >
        <defs>
          <linearGradient id="unc-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="60%" stopColor="hsl(var(--aurora-3))" />
            <stop offset="100%" stopColor="hsl(var(--aurora-4))" />
          </linearGradient>
        </defs>
        <path
          d="M15 20 Q15 10 25 10 L40 10 Q50 10 50 20 L50 55 Q50 70 35 70 L25 70 Q15 70 15 60 Z"
          fill="url(#unc-g)"
        />
        <path
          d="M55 20 Q55 10 65 10 L75 10 Q85 10 85 20 L85 45 Q85 55 75 55 L70 55 Q60 55 55 45 Z"
          fill="url(#unc-g)"
        />
        <circle cx="70" cy="72" r="8" fill="url(#unc-g)" />
      </svg>
      {showText && (
        <span className="ml-2 font-extrabold tracking-tight text-base leading-none bg-clip-text text-transparent bg-gradient-to-r from-primary via-aurora-2 to-aurora-4">
          UNC
        </span>
      )}
      <span
        className="absolute inset-0 rounded-[28%] ring-1 ring-primary/40 animate-pulse-soft"
        aria-hidden
      />
    </div>
  );
}
