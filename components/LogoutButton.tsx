"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-[var(--foreground)] border border-[var(--border)] transition-colors backdrop-blur-sm"
    >
      Log out
    </button>
  );
}
