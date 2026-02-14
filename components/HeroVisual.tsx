"use client";

export default function HeroVisual() {
  const cards = [
    { title: "Design inspiration", url: "dribbble.com", rotate: -6 },
    { title: "React docs", url: "react.dev", rotate: 2 },
    { title: "Supabase", url: "supabase.com", rotate: 5 },
  ];

  return (
    <section className="relative px-4 pb-24 flex justify-center" aria-hidden>
      <div className="w-full max-w-3xl mx-auto flex items-end justify-center gap-4 sm:gap-6 min-h-[180px]">
        {cards.map((card, i) => (
          <div
            key={i}
            className="w-[140px] sm:w-[160px] rounded-xl glass-panel border border-[var(--border)] shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:z-10 flex-shrink-0"
            style={{
              height: `${140 - i * 20}px`,
              transform: `rotate(${card.rotate}deg)`,
              zIndex: i,
            }}
          >
            <div className="p-3 h-full flex flex-col">
              <div className="flex gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-slate-500/70" />
                <span className="w-2 h-2 rounded-full bg-slate-500/70" />
                <span className="w-2 h-2 rounded-full bg-slate-500/70" />
              </div>
              <div className="flex-1 rounded-lg bg-white/5 border border-white/5 p-2.5">
                <p className="text-xs font-medium text-[var(--foreground)] truncate">{card.title}</p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{card.url}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
