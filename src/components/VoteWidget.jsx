// /src/components/VoteWidget.jsx

import { useEffect, useState } from "react";
import { votesAPI } from "../api/votes";

export default function VoteWidget({ id }) {
  const [vote, setVote] = useState(0); // 1, -1, or 0
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    votesAPI.getPostVotes(id).then((data) => {
      if (mounted && data.ok) {
        setVote(data.myVote || 0);
        setScore(data.score);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleVote = async (dir) => {
    if (loading) return;
    const newVote = dir === vote ? 0 : dir;
    const delta = newVote - vote;

    setVote(newVote);
    setScore((s) => s + delta);

    try {
      setLoading(true);
      await votesAPI.votePost(id, newVote);
    } catch (err) {
      setVote(vote); // revert
      setScore((s) => s - delta);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 text-gray-600">
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={vote === 1 ? "text-blue-600 font-bold" : ""}
      >
        ▲
      </button>
      <span className="text-sm">{score}</span>
      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={vote === -1 ? "text-red-600 font-bold" : ""}
      >
        ▼
      </button>
    </div>
  );
}
