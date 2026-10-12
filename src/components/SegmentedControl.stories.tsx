import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

export default { title: "Components / SegmentedControl" };

export const ThreeUp = () => {
  const [value, setValue] = useState("week");
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "all", label: "All" },
      ]}
    />
  );
};

export const MultiSelect = () => {
  const [on, setOn] = useState<string[]>(["a"]);
  return (
    <SegmentedControl
      options={[{ value: "a", label: "Cars" }, { value: "b", label: "Trains" }, { value: "c", label: "Fauna" }]}
      value={on}
      onChange={(v) => setOn((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : [...xs, v]))}
    />
  );
};
