import { Link } from "react-router-dom";
import VoteWidget from "./VoteWidget";
import BookmarkToggle from "./BookmarkToggle";

export default function PostCard({ post }) {
  const { id, title, body, author, createdAt } = post;

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/posts/${id}`}>
            <h3 className="text-lg font-semibold text-blue-700 hover:underline">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mb-1">
            by{" "}
            <span className="font-medium">{author?.username || "unknown"}</span>{" "}
            on {new Date(createdAt).toLocaleString()}
          </p>
          <p className="text-gray-800 whitespace-pre-line">{body}</p>
        </div>

        <div className="ml-4 flex flex-col items-center gap-2">
          <VoteWidget id={post.id} />
          <BookmarkToggle postId={id} />
        </div>
      </div>
    </div>
  );
}
