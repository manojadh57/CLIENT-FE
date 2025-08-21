// /src/pages/HomePage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postsSlice";
import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";
import QuotaBar from "../components/QuotaBar";

export default function HomePage() {
  const dispatch = useDispatch();
  const { all: posts, loading, error } = useSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <QuotaBar />
      <PostComposer />

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
