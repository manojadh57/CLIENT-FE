export default function ForumRules({ compact = false }) {
  const Item = ({ children }) => (
    <li style={{ marginBottom: compact ? 4 : 8 }}>{children}</li>
  );
  return (
    <section aria-labelledby="rules-title" style={{ marginTop: 8 }}>
      <h2 id="rules-title" style={{ fontSize: 18, marginBottom: 8 }}>
        Forum Rules
      </h2>
      <ol style={{ paddingLeft: 18, color: "#333" }}>
        <Item>
          English-only text for posts, comments, and DMs (no images/video).
        </Item>
        <Item>
          Daily quotas: Posts 1/day, Comments 3/day, DMs 1/day free. A one-time
          AU$2 unlock grants unlimited DMs.
        </Item>
        <Item>Be respectful — no harassment, hate speech, or spam.</Item>
        <Item>
          Academic integrity: no cheating, piracy, or illegal content.
        </Item>
        <Item>Usernames are immutable after onboarding. Choose carefully.</Item>
      </ol>
    </section>
  );
}
