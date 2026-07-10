export default { title: "Foundations / Colors" };

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: value,
          border: "1px solid var(--glass-border)",
        }}
      />
      <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{name}</code>
    </div>
  );
}

export const Tokens = () => (
  <div style={{ display: "grid", gap: 12 }}>
    <Swatch name="--bg" value="rgb(var(--bg))" />
    <Swatch name="--bg-raised" value="rgb(var(--bg-raised))" />
    <Swatch name="--fg" value="rgb(var(--fg))" />
    <Swatch name="--accent" value="rgb(var(--accent))" />
    <Swatch name="--accent-focus" value="rgb(var(--accent-focus))" />
  </div>
);
