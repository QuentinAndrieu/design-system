import { useState } from "react";
import { Slider } from "./Slider";
import { Switch } from "./Switch";
import { Rating } from "./Rating";
import { Dropdown } from "./Dropdown";
import { SheetRow } from "./SheetRow";
import { Glass } from "./Glass";
import { Icon } from "./Icon";

export default { title: "Components / Inputs" };

export const RangeSlider = () => {
  const [v, setV] = useState(70);
  return (
    <div style={{ maxWidth: 360 }}>
      <Slider value={v} min={0} max={100} onChange={(e) => setV(Number(e.target.value))} />
    </div>
  );
};

export const Toggle = () => {
  const [on, setOn] = useState(true);
  return <Switch checked={on} onChange={setOn} label="Notifications" />;
};

export const Select = () => {
  const [sort, setSort] = useState("recent");
  return (
    <Dropdown
      value={sort}
      onChange={setSort}
      options={[
        { value: "recent", label: "Recently added" },
        { value: "score", label: "Highest score" },
        { value: "title", label: "Title (A–Z)" },
      ]}
    />
  );
};

export const RatingSheet = () => {
  const [score, setScore] = useState(8);
  return (
    <Glass style={{ maxWidth: 360, padding: 20 }}>
      <Rating value={score} onChange={setScore} />
    </Glass>
  );
};

export const Menu = () => {
  const [choice, setChoice] = useState("watching");
  return (
    <Glass style={{ maxWidth: 360, padding: 8 }}>
      <SheetRow
        dotColor="rgb(var(--accent))"
        selected={choice === "watching"}
        trailing={choice === "watching" ? <Icon name="check" /> : null}
        onClick={() => setChoice("watching")}
      >
        Watching
      </SheetRow>
      <SheetRow
        dotColor="rgb(var(--success))"
        selected={choice === "completed"}
        trailing={choice === "completed" ? <Icon name="check" /> : null}
        onClick={() => setChoice("completed")}
      >
        Completed
      </SheetRow>
      <SheetRow danger onClick={() => {}}>
        Remove from shelf
      </SheetRow>
    </Glass>
  );
};
