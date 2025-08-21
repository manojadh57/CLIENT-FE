// /src/pages/MessagesPage.jsx

import { useEffect, useState } from "react";
import { messagesAPI } from "../api/messages";
import { Link } from "react-router-dom";

export default function MessagesPage() {
  const [inbox, setInbox] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [inboxRes, outboxRes] = await Promise.all([
          messagesAPI.inbox(),
          messagesAPI.outbox(),
        ]);
        if (!mounted) return;
        setInbox(inboxRes.messages || []);
        setOutbox(outboxRes.messages || []);
      } catch {
        setErr("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <p className="text-center mt-4">Loading messages...</p>;
  if (err) return <p className="text-red-500 text-center mt-4">{err}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h2 className="text-xl font-bold mb-2">Inbox</h2>
      {inbox.length === 0 ? (
        <p className="text-gray-500 mb-4">No received messages.</p>
      ) : (
        inbox.map((msg) => (
          <Link
            key={msg.id}
            to={`/messages/${msg.from?.id || msg.fromUserId}`}
            className="block border rounded p-3 bg-white mb-2 hover:bg-gray-50"
          >
            <p className="text-sm font-medium mb-1">
              From: {msg.from?.username || "Unknown"} —{" "}
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-800">{msg.body}</p>
          </Link>
        ))
      )}

      <h2 className="text-xl font-bold mb-4 mt-6">Sent</h2>
      {outbox.length === 0 ? (
        <p className="text-gray-500">No sent messages.</p>
      ) : (
        outbox.map((msg) => (
          <Link
            key={msg.id}
            to={`/messages/${msg.to?.id || msg.toUserId}`}
            className="block border rounded p-3 bg-white mb-2 hover:bg-gray-50"
          >
            <p className="text-sm font-medium mb-1">
              To: {msg.to?.username || "Unknown"} —{" "}
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-800">{msg.body}</p>
          </Link>
        ))
      )}
    </div>
  );
}
