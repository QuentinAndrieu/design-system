import { useState } from "react";
import { SearchField } from "./SearchField";

export default { title: "Components / SearchField" };

export const Default = () => {
  const [q, setQ] = useState("");
  return (
    <div style={{ maxWidth: 440 }}>
      <SearchField value={q} onValueChange={setQ} placeholder="Search the library…" />
    </div>
  );
};

export const WithQuery = () => {
  const [q, setQ] = useState("cartier-bresson");
  return (
    <div style={{ maxWidth: 440 }}>
      <SearchField value={q} onValueChange={setQ} placeholder="Search…" />
    </div>
  );
};
