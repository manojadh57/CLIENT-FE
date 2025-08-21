// src/utils/validation.js

// Limits (you can tweak later)
export const LIMITS = {
  titleCharMax: 120,
  postCharMax: 5000,
  commentCharMax: 1000,
  dmCharMax: 1000,
  postWordMax: 200,
  commentWordMax: 300,
  dmWordMax: 500,
};

// Basic word count (for any language using spaces)
export function wordCount(text = "") {
  return (text.trim().split(/\s+/) || []).filter(Boolean).length;
}

// Clamp to character length
export function clampLen(text = "", max = Infinity) {
  return typeof text === "string" && text.length > max
    ? text.slice(0, max)
    : text;
}

// Normalize whitespace
export function normalizeWhitespace(text = "") {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Validation function for post/comment/DM text
export function validateText(text = "", { charMax, wordMax } = {}) {
  const value = normalizeWhitespace(String(text));
  const charCount = value.length;
  const wordCounted = wordCount(value);
  const errors = [];

  if (charMax && charCount > charMax) {
    errors.push(`Too long: ${charCount}/${charMax} characters.`);
  }

  if (wordMax && wordCounted > wordMax) {
    errors.push(`Too many words: ${wordCounted}/${wordMax} allowed.`);
  }

  return {
    ok: errors.length === 0,
    value,
    counts: { chars: charCount, words: wordCounted },
    errors,
  };
}
