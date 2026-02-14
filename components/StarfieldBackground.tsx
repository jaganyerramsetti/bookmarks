"use client";

export default function StarfieldBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 starfield-dots" />
      <div className="absolute inset-0 landing-glow" />
    </div>
  );
}
