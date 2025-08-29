import Button from "./Button";
import { useState } from "react";

interface ThemeTabProps {
  list: Array<{ name: string }>;
}

const ThemeTab = ({ list }: ThemeTabProps) => {
  const [activeName, setActiveName] = useState<string>(list[0]?.name ?? "");

  return (
    <section className="theme-tab">
      <ul className="tab-list">
        {list.map((item) => {
          const isActive = activeName === item.name;
          return (
            <li
              key={item.name}
              className={`tab-item${isActive ? " tab-item-active" : ""}`}
              onClick={() => setActiveName(item.name)}
            >
              <Button value={item.name} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ThemeTab;
