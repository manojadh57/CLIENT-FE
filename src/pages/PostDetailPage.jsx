import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById, clearSelectedPost } from "../store/postsSlice";
import { commentsAPI } from "../api/comments";
import VoteWidget from "../components/VoteWidget";
import BookmarkToggle from "../components/BookmarkToggle";
import CommentThread from "../components/CommentThread";
import CommentComposer from "../components/CommentComposer";

export default function PostDetailPage() {
  const { id: postId } = useParams();
  const dispatch = useDispatch();
  const { selected: post, loading, error } = useSelector((s) => s.posts);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    dispatch(fetchPostById(postId));

    commentsAPI
      .get(postId)
      .then((data) => {
        if (data.ok) setComments(data.comments);
      })
      .finally(() => setLoadingComments(false));

    return () => dispatch(clearSelectedPost());
  }, [dispatch, postId]);

  if (loading) return <p className="text-center mt-4">Loading post...</p>;
  if (error)
    return <p className="text-red-500 mt-4 text-center">Error: {error}</p>;
  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-1">
          by {post.author?.username || "unknown"} on{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-800 whitespace-pre-line">{post.body}</p>

        <div className="flex items-center gap-4 mt-4">
          <VoteWidget id={post.id} />
          <BookmarkToggle postId={post.id} />
        </div>
      </div>

      <CommentComposer
        postId={postId}
        onSuccess={() => window.location.reload()}
      />

      {loadingComments ? (
        <p className="text-center">Loading comments...</p>
      ) : (
        <CommentThread comments={comments} postId={postId} />
      )}
    </div>
  );
}
