import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import LoginIllustration from "@/components/LoginIllustration";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/bookmarks");
  }

  return (
    <main className="min-h-screen flex">
      {/* Left: login form */}
      <div className="w-full lg:w-[48%] min-h-screen flex flex-col items-center justify-center px-8 py-16 relative bg-[#0b0f1a]">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        <div className="w-full max-w-[360px]">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            Welcome
          </h1>
          <p className="text-slate-300 mb-10 text-base leading-relaxed font-medium">
            Sign in with Google to save and sync your bookmarks—private and in one place.
          </p>
          <LoginForm />
          <p className="mt-8 text-sm text-slate-400 leading-relaxed">
            We use Google OAuth only. We don’t store your password.
          </p>
        </div>
      </div>

      {/* Right: illustration panel - full dark, no white */}
      <div className="hidden lg:flex lg:w-[52%] min-h-screen overflow-hidden bg-[#0f172a]">
        <LoginIllustration />
      </div>
    </main>
  );
}
