import { useState } from "react";
import { WeekStrip } from "./WeekStrip";
import { Glass } from "./Glass";

export default { title: "Components / WeekStrip" };

const DAYS = [
  { key: "mon", label: "MON", num: 7 },
  { key: "tue", label: "TUE", num: 8 },
  { key: "wed", label: "WED", num: 9 },
  { key: "thu", label: "THU", num: 10 },
  { key: "fri", label: "FRI", num: 11 },
  { key: "sat", label: "SAT", num: 12 },
  { key: "sun", label: "SUN", num: 13 },
];

export const Selector = () => {
  const [day, setDay] = useState("thu");
  return (
    <Glass style={{ padding: 12, maxWidth: 440 }}>
      <WeekStrip days={DAYS} active={day} onChange={setDay} />
    </Glass>
  );
};
