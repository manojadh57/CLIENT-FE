import { useMemo } from "react";

function getLocalDateKey() {
  // local date YYYY-MM-DD
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function QuotaBar() {
  const key = useMemo(() => `quota_${getLocalDateKey()}`, []);
  const data = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(key)) || {
          posts: 0,
          comments: 0,
          dms: 0,
          unlimited: false,
        }
      );
    } catch {
      return { posts: 0, comments: 0, dms: 0, unlimited: false };
    }
  }, [key]);

  return (
    <div
      style={{
        fontSize: 14,
        padding: "6px 10px",
        borderBottom: "1px solid #eee",
      }}
    >
      <strong>Quotas:</strong>
      &nbsp;Posts {data.posts}/1 · Comments {data.comments}/3 · DMs {data.dms}/1{" "}
      {data.unlimited ? "(Unlimited)" : ""}
    </div>
  );
}
