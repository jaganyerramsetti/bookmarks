"use client";

import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/lib/types/database";

type Props = {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
};

export default function BookmarkList({ bookmarks, onDelete }: Props) {
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    onDelete(id);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 rounded-xl glass-panel text-slate-400">
        No bookmarks yet. Add one above.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="flex items-center gap-3 p-3 rounded-xl glass-panel hover:bg-white/5 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--foreground)] hover:text-[var(--accent)] truncate block"
            >
              {bookmark.title}
            </a>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 truncate block hover:text-slate-300"
            >
              {bookmark.url}
            </a>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(bookmark.id)}
            className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--danger)] hover:bg-red-500/20 transition-colors"
            aria-label={`Delete ${bookmark.title}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
