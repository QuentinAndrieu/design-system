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
