import React, { useMemo, useEffect, useState } from "react";

/** RocketHero: Animated rocket with exhaust particles & starfield */
export default function RocketHero({ className = "" }) {
  const [launched, setLaunched] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLaunched(true), 2400); // after launch animation
    return () => clearTimeout(t);
  }, []);
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        delay: (Math.random() * 1.4).toFixed(2),
        scale: (0.4 + Math.random() * 0.8).toFixed(2),
        x: Math.round(-30 + Math.random() * 60),
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: (Math.random() * 4).toFixed(2),
      })),
    []
  );

  return (
    <div
      className={`relative w-full max-w-sm mx-auto h-80 select-none ${className}`}
    >
      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-primary/60 animate-twinkle"
            style={{
              top: s.top + "%",
              left: s.left + "%",
              width: s.size + "px",
              height: s.size + "px",
              animationDelay: s.delay + "s",
            }}
          />
        ))}
      </div>

      {/* Exhaust particles */}
      <div className="absolute left-1/2 top-1/2 w-0 h-0" aria-hidden>
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute -z-10 block rounded-full bg-gradient-to-b from-aurora-2/70 to-aurora-3/10 animate-exhaust blur-[1px]"
            style={{
              width: 10 * p.scale + "px",
              height: 10 * p.scale + "px",
              transform: `translate(${p.x}px, 40px)`,
              animationDelay: p.delay + "s",
            }}
          />
        ))}
      </div>

      {/* Rocket */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative ${
            launched ? "animate-rocket-float" : "animate-rocket-launch"
          }`}
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            role="img"
            aria-label="Animated rocket"
            className="drop-shadow-glow"
          >
            <defs>
              <linearGradient id="body" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--color-aurora-1))" />
                <stop offset="100%" stopColor="hsl(var(--color-aurora-2))" />
              </linearGradient>
              <linearGradient id="fin" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--color-aurora-3))" />
                <stop offset="100%" stopColor="hsl(var(--color-aurora-4))" />
              </linearGradient>
              <radialGradient id="window" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--color-aurora-2))" />
                <stop offset="100%" stopColor="hsl(var(--color-aurora-1))" />
              </radialGradient>
            </defs>
            <g filter="url(#shadow)">
              <path
                d="M80 18c-16 14-26 44-26 66 0 23 12 42 26 58 14-16 26-35 26-58 0-22-10-52-26-66Z"
                fill="url(#body)"
                stroke="hsl(var(--color-primary) / 0.35)"
                strokeWidth="2"
              />
              <circle
                cx="80"
                cy="80"
                r="18"
                fill="url(#window)"
                stroke="hsl(var(--color-primary) / 0.4)"
                strokeWidth="2"
              />
              <path
                d="M54 92 40 110c8 6 18 11 24 13-4-8-7-18-10-31Z"
                fill="url(#fin)"
                opacity="0.9"
              />
              <path
                d="M106 92c-3 13-6 23-10 31 6-2 16-7 24-13l-14-18Z"
                fill="url(#fin)"
                opacity="0.9"
              />
              <path
                d="M72 138c2 6 5 12 8 18 3-6 6-12 8-18-5 1-11 1-16 0Z"
                fill="hsl(var(--color-aurora-3))"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
