import { useState } from "react";
import { TabBar } from "./TabBar";
import { Icon } from "./Icon";

export default { title: "Components / TabBar" };

export const Bottom = () => {
  const [active, setActive] = useState("home");
  return (
    <TabBar
      active={active}
      onChange={setActive}
      tabs={[
        { id: "home", label: "Home", icon: <Icon name="home" /> },
        { id: "search", label: "Search", icon: <Icon name="search" /> },
        { id: "lib", label: "Library", icon: <Icon name="lib" /> },
        { id: "weekly", label: "Weekly", icon: <Icon name="cal" /> },
        { id: "you", label: "You", icon: <Icon name="user" /> },
      ]}
    />
  );
};

/** A dot (something ready) and a count (unread). */
export const Badges = () => {
  const [active, setActive] = useState("home");
  return (
    <TabBar
      active={active}
      onChange={setActive}
      tabs={[
        { id: "home", label: "Home", icon: <Icon name="home" />, badge: true },
        { id: "search", label: "Search", icon: <Icon name="search" /> },
        { id: "lib", label: "Library", icon: <Icon name="lib" /> },
        { id: "weekly", label: "Weekly", icon: <Icon name="cal" /> },
        { id: "you", label: "You", icon: <Icon name="user" />, badge: 3 },
      ]}
    />
  );
};
