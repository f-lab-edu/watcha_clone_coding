import Button from "./Button";

interface ThemeTabProps {
  list: Array<{ name: string }>;
}

const ThemeTab = ({ list }: ThemeTabProps) => {
  return (
    <section className="theme-tab">
      <ul className="tab-list">
        {list.map((item) => (
          <li key={item.name} className="tab-item tab-item-active">
            <Button value={item.name} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ThemeTab;
