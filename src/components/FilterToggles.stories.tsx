import { useState } from "react";
import { FilterToggles } from "./FilterToggles";
import { SegmentedControl } from "./SegmentedControl";

export default { title: "Components / FilterToggles" };

const ROLES = [
  { value: "fighter", label: "Fighters" },
  { value: "spot", label: "Spots" },
  { value: "moment", label: "Moments" },
];
const KINDS = [
  { value: "car", label: "Cars" },
  { value: "train", label: "Trains" },
  { value: "fauna", label: "Fauna" },
];

/** One at most — tap the lit one to turn it off; nothing lit is everything. */
export const OneAtMost = () => {
  const [on, setOn] = useState<string[]>([]);
  return <FilterToggles options={ROLES} value={on} onChange={setOn} />;
};

/** Several at once. */
export const Several = () => {
  const [on, setOn] = useState<string[]>(["train"]);
  return <FilterToggles multiple options={KINDS} value={on} onChange={setOn} />;
};

/** A filter panel: the roles beside a selection (the full accent), the lit role's kinds under it,
 *  secondary. */
export const Panel = () => {
  const [role, setRole] = useState<string[]>(["fighter"]);
  const [kinds, setKinds] = useState<string[]>([]);
  const [own, setOwn] = useState("caught");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 340 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <FilterToggles
          options={ROLES}
          value={role}
          onChange={(v) => {
            setRole(v);
            setKinds([]);
          }}
        />
        <SegmentedControl options={[{ value: "all", label: "All" }, { value: "caught", label: "Mine" }]} value={own} onChange={setOwn} />
      </div>
      {role[0] === "fighter" && (
        <div style={{ alignSelf: "flex-start" }}>
          <FilterToggles secondary multiple options={KINDS} value={kinds} onChange={setKinds} />
        </div>
      )}
    </div>
  );
};
