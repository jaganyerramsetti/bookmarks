export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
};

export type BookmarkInsert = {
  user_id: string;
  title: string;
  url: string;
};
