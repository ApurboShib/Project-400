import { useEffect, useState, useRef } from "react";

// Unicode / simplified SVG-ish text representations of symbols.
// Swastika note: using a benign geometric variant. Ensure cultural context is respectful.
const SYMBOLS = [
  { id: "om", label: "Om", display: "ॐ" },
  { id: "swastik", label: "Swastika", display: "卐" },
  { id: "trishul", label: "Trishul", display: "🔱" },
  { id: "lotus", label: "Lotus", display: "🪷" },
  { id: "conch", label: "Shankha", display: "🌀" },
];

export default function SacredSymbolCycler({ interval = 500 }) {
  const [index, setIndex] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % SYMBOLS.length);
      setFlipKey((k) => k + 1);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [interval]);

  const current = SYMBOLS[index];

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div
        key={flipKey}
        className="animate-symbol-flip will-change-transform text-6xl md:text-7xl font-semibold tracking-tight text-primary drop-shadow"
        aria-label={current.label}
      >
        {current.display}
      </div>
      {/* Subtle pulsing ring */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-primary/20 animate-pulse-soft" />
      </div>
      {/* Ambient gradient dots */}
      <div
        aria-hidden
        className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-aurora-2/40 blur-sm"
      />
      <div
        aria-hidden
        className="absolute -bottom-5 left-10 w-8 h-8 rounded-full bg-aurora-3/30 blur-md"
      />
      <div
        aria-hidden
        className="absolute top-6 -right-3 w-5 h-5 rounded-full bg-aurora-4/40 blur"
      />
    </div>
  );
}
