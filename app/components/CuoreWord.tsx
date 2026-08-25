"use client";

const LETTERS = ["c", "u", "o", "r", "e"] as const;

/**
 * The crafted wordmark. Each letter is its own element so GSAP can
 * animate rises, wiggles and the heartbeat on the "o" independently.
 * The resting tilt/baseline offsets live in CSS (.cuore-word .letter).
 * The outer .cuore-mask clips the letters during rise animations.
 */
export default function CuoreWord({
  className = "",
  neon = false,
}: {
  className?: string;
  neon?: boolean;
}) {
  return (
    <span className={`cuore-mask ${className}`} aria-label="cuore" role="text">
      <span className={`cuore-word ${neon ? "cuore-neon" : ""}`} aria-hidden="true">
        {LETTERS.map((letter, i) => (
          <span key={i} className={`letter ${letter === "o" ? "letter-o" : ""}`}>
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
}
