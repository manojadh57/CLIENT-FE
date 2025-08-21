import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { messagesAPI } from "../api/messages";
import DMComposer from "../components/DMComposer";

export default function ThreadPage() {
  const { userId } = useParams();
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadThread() {
      try {
        const res = await messagesAPI.thread(userId);
        if (mounted && res.ok) setThread(res.messages || []);
      } catch (e) {
        setErr("Failed to load thread.");
      } finally {
        setLoading(false);
      }
    }

    loadThread();
    return () => (mounted = false);
  }, [userId]);

  const refresh = () => {
    messagesAPI.thread(userId).then((res) => {
      if (res.ok) setThread(res.messages || []);
    });
  };

  if (loading) return <p className="text-center mt-4">Loading messages...</p>;
  if (err) return <p className="text-red-500 text-center mt-4">{err}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Conversation</h2>

      <div className="space-y-4 mb-6">
        {thread.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded shadow-sm ${
              msg.isMine
                ? "bg-blue-100 text-right ml-auto"
                : "bg-gray-100 mr-auto"
            }`}
          >
            <p className="text-sm text-gray-600 mb-1">
              {msg.author?.username || (msg.isMine ? "You" : "User")} —{" "}
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-800">{msg.body}</p>
          </div>
        ))}
      </div>

      <DMComposer toUserId={userId} onSuccess={refresh} />
    </div>
  );
}
