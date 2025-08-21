import { useState } from "react";
import { messagesAPI } from "../api/messages";
import { stripeAPI } from "../api/stripe";
import { getQuota, incQuota } from "../utils/quota";
import { LIMITS, validateText } from "../utils/validation";

export default function DMComposer({ toUserId, onSuccess }) {
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const quota = getQuota();
  const dmQuotaUsed = !quota.unlimited && quota.dms >= 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (dmQuotaUsed) {
      try {
        const { url } = await stripeAPI.createDMUnlockSession();
        window.location.href = url;
        return;
      } catch (e) {
        return setErr("Payment session failed. Try again.");
      }
    }

    if (!validateText(body, LIMITS.dmBodyMax))
      return setErr("Message too long or empty.");

    try {
      setLoading(true);
      await messagesAPI.send({ toUserId, body });
      if (!quota.unlimited) incQuota("dms");
      setBody("");
      if (onSuccess) onSuccess();
    } catch (e) {
      setErr("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4">
      {err && <p className="text-red-500 mb-2">{err}</p>}
      <textarea
        className="w-full border rounded px-3 py-2 mb-2"
        placeholder="Type your message..."
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={LIMITS.dmBodyMax}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded px-4 py-1 disabled:opacity-50"
      >
        {dmQuotaUsed ? "Unlock for $2" : loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
