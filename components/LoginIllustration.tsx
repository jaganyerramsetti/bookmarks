"use client";

const items = [
  { title: "Design inspiration", url: "dribbble.com" },
  { title: "React docs", url: "react.dev" },
  { title: "Supabase", url: "supabase.com" },
];

export default function LoginIllustration() {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center p-10 overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 login-panel-bg" />

      {/* Blue corner accent - fills top-right corner */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-600/35 via-blue-500/15 to-transparent pointer-events-none [clip-path:ellipse(90%_70%_at_100%_0%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Big card - centered */}
      <div
        className="relative w-full max-w-[420px] animate-fade-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="rounded-2xl border border-slate-600/50 bg-slate-800/95 shadow-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-600/50 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">My Bookmarks</span>
          </div>
          <div className="p-5 space-y-4">
            {items.map((item, i) => (
              <div
                key={item.title}
                className="flex items-center gap-4 py-4 px-4 rounded-xl bg-slate-700/50 border border-slate-600/30 hover:bg-slate-700/70 transition-colors animate-fade-slide-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-white truncate">{item.title}</p>
                  <p className="text-sm text-slate-300 truncate mt-0.5">{item.url}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-base font-medium text-slate-400">Your links, one place</p>
      </div>
    </div>
  );
}
