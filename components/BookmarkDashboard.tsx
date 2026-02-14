"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import type { Bookmark } from "@/lib/types/database";
import type { User } from "@supabase/supabase-js";
import AddBookmarkForm from "./AddBookmarkForm";
import BookmarkList from "./BookmarkList";
import LogoutButton from "./LogoutButton";

type Props = {
  initialBookmarks: Bookmark[];
  user: User;
};

export default function BookmarkDashboard({
  initialBookmarks,
  user,
}: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const supabase = createClient();

  const refreshBookmarks = useCallback(async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setBookmarks(data);
  }, [supabase, user.id]);

  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          refreshBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user.id, refreshBookmarks]);

  const handleAdd = (bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev]);
  };

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8 glass-panel rounded-xl px-5 py-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            My Bookmarks
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {user.email ?? "Signed in"}
          </p>
        </div>
        <LogoutButton />
      </header>

      <AddBookmarkForm userId={user.id} onAdd={handleAdd} />

      <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
    </div>
  );
}
