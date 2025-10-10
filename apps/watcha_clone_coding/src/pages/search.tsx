import SearchHomePage from './SearchHomePage';
import SearchResultPage from './SearchResultPage';

import useSearchMovie from '@/hooks/useSearchMovie';

const SearchPage = () => {
  const { query, genreId } = useSearchMovie();

  if (query || genreId) {
    return <SearchResultPage />;
  }

  return <SearchHomePage />;
};

export default SearchPage;
