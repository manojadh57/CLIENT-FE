const BASE_KEY = "quota_";

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${BASE_KEY}${y}-${m}-${dd}`;
}

export function getQuota() {
  const k = todayKey();
  try {
    return (
      JSON.parse(localStorage.getItem(k)) || {
        posts: 0,
        comments: 0,
        dms: 0,
        unlimited: false,
      }
    );
  } catch {
    return { posts: 0, comments: 0, dms: 0, unlimited: false };
  }
}

export function setQuota(q) {
  localStorage.setItem(todayKey(), JSON.stringify(q));
}

export function incQuota(field) {
  const q = getQuota();
  q[field] = (q[field] || 0) + 1;
  setQuota(q);
}

export function setUnlimitedDM(val = true) {
  const q = getQuota();
  q.unlimited = !!val;
  setQuota(q);
}
