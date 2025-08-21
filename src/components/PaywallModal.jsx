// src/components/PaywallModal.jsx

import { useState } from "react";
import { stripeAPI } from "../api/stripe";

export default function PaywallModal({ context = "dm", onClose }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const title = context === "dm" ? "Unlock Unlimited DMs" : "Unlock Feature";

  const desc =
    context === "dm"
      ? "You’ve used your 1 free message for today. Pay a one-time AU$2 to unlock unlimited direct messages forever."
      : "Unlock this feature for AU$2.";

  const handlePurchase = async () => {
    setLoading(true);
    setErr("");
    try {
      const { url } = await stripeAPI.createDMUnlockSession();
      if (url) {
        window.location.href = url; // ✅ redirect to Stripe Checkout
      } else {
        setErr("Stripe session not received.");
      }
    } catch (e) {
      setErr(e?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          width: "100%",
          maxWidth: 400,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{desc}</p>

        {err && <p style={{ color: "red" }}>{err}</p>}

        <button
          onClick={handlePurchase}
          disabled={loading}
          style={{ marginTop: 12 }}
        >
          {loading ? "Redirecting…" : "Pay AU$2"}
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: 8,
            background: "none",
            border: "none",
            textDecoration: "underline",
            color: "#555",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
