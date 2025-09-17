import useSearchMovie from "@/hooks/useSearchMovie";
import SearchHomePage from "./SearchHomePage";
import SearchResultPage from "./SearchResultPage";

const SearchPage = () => {
  const { query, genreId } = useSearchMovie();

  if (query || genreId) {
    return <SearchResultPage />;
  }

  return <SearchHomePage />;
};

export default SearchPage;
