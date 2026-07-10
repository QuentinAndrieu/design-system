import { Thumbnail } from "./Thumbnail";

export default { title: "Components / Thumbnail" };

export const Rail = () => (
  <div style={{ display: "flex", gap: 11, overflowX: "auto" }}>
    <Thumbnail title="Frieren: Beyond Journey's End" badge="8.9" />
    <Thumbnail title="Vinland Saga" badge="8.7" />
    <Thumbnail title="Monster" badge="9.0" />
  </div>
);

export const Grid = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
      gap: 11,
      maxWidth: 380,
    }}
  >
    <Thumbnail title="Show One" badge="7.8" fill />
    <Thumbnail title="Show Two" badge="8.1" fill />
    <Thumbnail fill />
  </div>
);
