import { useState } from "react";
import { Chip, ChipGroup } from "./Chip";

export default { title: "Components / Chip" };

export const Filters = () => {
  const [active, setActive] = useState("all");
  return (
    <ChipGroup>
      {["all", "airing", "movies", "rated", "on hold"].map((c) => (
        <Chip key={c} selected={active === c} onClick={() => setActive(c)}>
          {c}
        </Chip>
      ))}
    </ChipGroup>
  );
};
