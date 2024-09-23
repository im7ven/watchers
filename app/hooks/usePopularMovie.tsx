import useData from "./useData";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const usePopularMovie = () =>
  useData<Movie>("movie/popular", ["popular-movie"]);

export default usePopularMovie;
