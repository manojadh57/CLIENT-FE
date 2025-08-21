// src/pages/BookmarksPage.jsx

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchBookmarks } from "../store/bookmarksSlice";
import { Link } from "react-router-dom";

export default function BookmarksPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.bookmarks);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Bookmarked Posts</h1>

      {status === "loading" && <p>Loading bookmarks…</p>}
      {status === "failed" && (
        <p style={{ color: "red" }}>{error || "Failed to load bookmarks."}</p>
      )}
      {status === "succeeded" && items.length === 0 && (
        <p>You haven’t bookmarked any posts yet.</p>
      )}

      {status === "succeeded" &&
        items.map((post) => (
          <Link
            to={`/posts/${post._id}`}
            key={post._id}
            style={{
              display: "block",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3 style={{ margin: 0 }}>{post.title}</h3>
            <p style={{ margin: "4px 0", color: "#555" }}>
              {post.body?.slice(0, 100)}...
            </p>
            <small style={{ color: "#888" }}>
              by {post.author?.username || "unknown"}
            </small>
          </Link>
        ))}
    </div>
  );
}
