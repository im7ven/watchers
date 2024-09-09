import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  genres: Genre[];
  budget: number;
  overview: string;
};

const fetchMovieDetails = async (movieId: string) => {
  try {
    const { data } = await apiClient.get<Movie>(`/movie/${movieId}`);
    return data;
  } catch (error) {
    throw new Error(
      "Sorry, an error has occurred while trying to retrieve the details of this movie"
    );
  }
};

const useMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });
};

export default useMovieDetails;
