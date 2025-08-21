import { useState } from "react";
import { bookmarksAPI } from "../api/bookmarks";

export default function BookmarkToggle({ postId }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleBookmark = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await bookmarksAPI.toggle(postId);
      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error("Bookmark toggle failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className="text-sm text-yellow-500 hover:text-yellow-600"
    >
      {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
}
