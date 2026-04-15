/** Usernames: letters, digits, underscores only — no spaces. */
export function sanitizeUsername(raw) {
  return String(raw ?? "").replace(/[^a-zA-Z0-9_]/g, "");
}
