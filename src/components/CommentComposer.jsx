// /src/components/CommentComposer.jsx

import { useState } from "react";
import { commentsAPI } from "../api/comments";
import { getQuota, incQuota } from "../utils/quota";
import { LIMITS, validateText } from "../utils/validation";

export default function CommentComposer({
  postId,
  parentCommentId = null,
  onSuccess,
}) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const quota = getQuota();
  const quotaUsed = !quota.unlimited && quota.comments >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (quotaUsed) return setErr("Comment limit reached for today.");
    if (!validateText(body, LIMITS.commentBodyMax))
      return setErr("Comment is too long or empty.");

    try {
      setLoading(true);
      await commentsAPI.create({ postId, body, parentCommentId });
      incQuota("comments");
      setBody("");
      if (onSuccess) onSuccess();
    } catch {
      setErr("Failed to post comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-4">
      {err && <p className="text-red-500 mb-2">{err}</p>}
      <textarea
        className="w-full border rounded px-3 py-2 mb-2"
        placeholder="Write your comment..."
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={LIMITS.commentBodyMax}
      />
      <button
        type="submit"
        disabled={loading || quotaUsed}
        className="bg-blue-600 text-white rounded px-4 py-1 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Comment"}
      </button>
    </form>
  );
}
