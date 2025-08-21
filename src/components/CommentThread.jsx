// /src/components/CommentThread.jsx

import { useState } from "react";
import CommentComposer from "./CommentComposer";

function buildTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c.id] = { ...c, children: [] };
  });

  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.children.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

function CommentNode({ comment, postId, level = 0 }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={`ml-${level * 4} mb-4`}>
      <div className="border rounded p-3 bg-white shadow-sm">
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">
            {comment.author?.username || "user"}
          </span>{" "}
          — {new Date(comment.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-800 whitespace-pre-line">{comment.body}</p>
        <button
          onClick={() => setShowReply(!showReply)}
          className="text-blue-500 text-sm mt-1 hover:underline"
        >
          {showReply ? "Cancel" : "Reply"}
        </button>

        {showReply && (
          <CommentComposer
            postId={postId}
            parentCommentId={comment.id}
            onSuccess={() => window.location.reload()}
          />
        )}
      </div>

      {comment.children?.map((child) => (
        <CommentNode
          key={child.id}
          comment={child}
          postId={postId}
          level={level + 1}
        />
      ))}
    </div>
  );
}

export default function CommentThread({ comments, postId }) {
  const tree = buildTree(comments);

  return (
    <div>
      {tree.length === 0 ? (
        <p className="text-center text-gray-500">No comments yet.</p>
      ) : (
        tree.map((c) => <CommentNode key={c.id} comment={c} postId={postId} />)
      )}
    </div>
  );
}
