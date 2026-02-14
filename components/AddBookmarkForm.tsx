"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import type { Bookmark } from "@/lib/types/database";

type Props = {
  userId: string;
  onAdd: (bookmark: Bookmark) => void;
};

function isValidUrl(s: string): boolean {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

export default function AddBookmarkForm({ userId, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedUrl = url.trim();
    const trimmedTitle = title.trim() || trimmedUrl;
    if (!trimmedUrl) {
      setError("URL is required.");
      return;
    }
    if (!isValidUrl(trimmedUrl)) {
      setError("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    const { data, error: insertError } = await supabase
      .from("bookmarks")
      .insert({
        user_id: userId,
        title: trimmedTitle,
        url: trimmedUrl.startsWith("http") ? trimmedUrl : `https://${trimmedUrl}`,
      })
      .select()
      .single();
    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    if (data) {
      onAdd(data as Bookmark);
      setTitle("");
      setUrl("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-xl glass-panel mb-6"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="My bookmark"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[var(--border)] text-[var(--foreground)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-1">
            URL
          </label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[var(--border)] text-[var(--foreground)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[var(--accent)]/90 text-white font-medium hover:bg-[var(--accent)] backdrop-blur-sm transition-colors disabled:opacity-60"
          >
            {loading ? "Adding…" : "Add"}
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
