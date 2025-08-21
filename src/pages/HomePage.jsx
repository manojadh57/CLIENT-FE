import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchPosts } from "../store/postsSlice";
import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { all: posts, loading, error } = useAppSelector((s) => s.posts);

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: 20 }));
  }, [dispatch]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="mb-10 text-center border border-black rounded-md py-12 px-6 bg-[#fefefe] shadow-lg animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 text-black leading-tight">
          Study. <span className="text-blue-600">Connect.</span>{" "}
          <span className="text-red-600">Build.</span>
        </h1>
        <p className="text-md md:text-lg text-gray-700 tracking-widest font-mono">
          A brutalist forum for students, dreamers & builders.
        </p>
      </section>

      {/* Composer */}
      <PostComposer />

      {/* Posts */}
      {loading && <p className="text-gray-500 mt-4">Loading posts…</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <section className="mt-8 space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-800 font-semibold">
            No posts yet. Be the first to share something!
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </main>
  );
}
