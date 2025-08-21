import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, fetchPosts } from "../store/postsSlice";
import { getQuota, incQuota } from "../utils/quota";
import { LIMITS, validateText } from "../utils/validation";

export default function PostComposer() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const quota = getQuota();
  const quotaReached = !quota.unlimited && quota.posts >= 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (quotaReached) return setError("Post limit reached for today.");
    if (!title.trim() || !body.trim())
      return setError("Title and body are required.");
    if (!validateText(title, LIMITS.postTitleMax))
      return setError("Title too long.");
    if (!validateText(body, LIMITS.postBodyMax))
      return setError("Body too long.");

    try {
      setLoading(true);
      await dispatch(createPost({ title, body })).unwrap();
      dispatch(fetchPosts()); // 🔁 Force refresh the post list
      incQuota("posts");
      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-bold text-lg mb-2">Create a Post</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-2"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={LIMITS.postTitleMax}
      />

      <textarea
        className="w-full border rounded px-3 py-2 mb-2"
        placeholder="Post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        maxLength={LIMITS.postBodyMax}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
        disabled={loading || quotaReached}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
