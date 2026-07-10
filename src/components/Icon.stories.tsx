import { Icon, iconNames } from "./Icon";

export default { title: "Components / Icon" };

export const Gallery = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
      gap: 12,
      maxWidth: 520,
    }}
  >
    {iconNames.map((name) => (
      <div
        key={name}
        style={{
          display: "grid",
          justifyItems: "center",
          gap: 8,
          padding: 14,
          borderRadius: 14,
          border: "1px solid var(--glass-border)",
        }}
      >
        <Icon name={name} size={22} />
        <code style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--fg-faint)" }}>
          {name}
        </code>
      </div>
    ))}
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Icon name="heart" size={14} />
    <Icon name="heart" size={20} />
    <Icon name="heart" size={28} />
    <Icon name="heart" size={28} filled style={{ color: "rgb(var(--accent))" }} />
  </div>
);
