import Link from "next/link";
import BookmarkLogo from "@/components/BookmarkLogo";
import StarfieldBackground from "@/components/StarfieldBackground";
import HeroVisual from "@/components/HeroVisual";

export default function LandingPage() {
  return (
    <main className="min-h-screen app-bg overflow-hidden relative">
      <StarfieldBackground />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-0 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[var(--foreground)] font-semibold">
            <BookmarkLogo size="sm" />
            <span>Smart Bookmark</span>
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-8 px-4 text-center">
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-400 mb-6 border border-[var(--border)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Private · Real-time · Google sign-in
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] tracking-tight mb-6">
            Your links,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              one place
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Save and sync your bookmarks privately across devices. No passwords—just sign in with Google and start saving.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <HeroVisual />

      {/* Features */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Private by design",
              desc: "Your bookmarks are yours only. Row-level security keeps them isolated.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
            },
            {
              title: "Real-time sync",
              desc: "Open two tabs—add or delete in one, see it update in the other instantly.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
            },
            {
              title: "Google only",
              desc: "One tap to sign in. No extra passwords or signup forms.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              ),
            },
          ].map((f) => (
            <div
              key={f.title}
              className="glass-panel rounded-xl p-6 text-left hover:bg-white/5 transition-all duration-200 hover:border-slate-500/20"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center glass-panel rounded-2xl p-10 border border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Ready to save your links?</h2>
          <p className="text-slate-400 mb-6">Sign in with Google and get started in seconds.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-[var(--foreground)] font-medium border border-[var(--border)] hover:bg-white/15 hover:border-slate-500/30 transition-all"
          >
            Sign in with Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 text-center text-slate-500 text-sm">
        Smart Bookmark · Private bookmarks with real-time sync
      </footer>
    </main>
  );
}
