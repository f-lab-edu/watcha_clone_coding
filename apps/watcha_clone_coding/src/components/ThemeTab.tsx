import { useEffect, useState } from 'react';
import useSearchMovie from '@/hooks/useSearchMovie';
import Button from '@/components/Button';

interface ThemeTabProps {
  list: Array<{
    name: string;
    id?: number;
  }>;
}

const ThemeTab = ({ list }: ThemeTabProps) => {
  const [activeName, setActiveName] = useState<string>(list[0]?.name ?? '');
  const { genreId, searchByGenre } = useSearchMovie();

  // genreId에 해당하는 아이템 찾기
  const selectedItem = list.find((item) => item.id?.toString() === genreId);

  useEffect(() => {
    if (genreId && selectedItem) {
      setActiveName(selectedItem.name);
    }
  }, [genreId, selectedItem]);

  const handleTabClick = (tabName: string) => {
    setActiveName(tabName);

    // 클릭한 탭에 해당하는 아이템 찾기
    const clickedItem = list.find((item) => item.name === tabName);

    if (clickedItem && clickedItem.id) {
      searchByGenre(clickedItem.id.toString());
    }
  };

  return (
    <section className="theme-tab">
      <ul className="tab-list">
        {list.map((item) => {
          const isActive = activeName === item.name;
          return (
            <li key={item.name} className={`tab-item${isActive ? ' tab-item-active' : ''}`}>
              <Button onClick={() => handleTabClick(item.name)}>{item.name} </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ThemeTab;
