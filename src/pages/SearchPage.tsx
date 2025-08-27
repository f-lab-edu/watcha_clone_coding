import Carousel from "../components/Carousel";
import useSearchMovies from "../hooks/useSearchMovies ";

const SearchPage = () => {
  const { trendingList, genresList } = useSearchMovies();

  return (
    <div>
      <section className="popular-keyword"></section>
      <section className="category-type"></section>
    </div>
  );
};

export default SearchPage;
