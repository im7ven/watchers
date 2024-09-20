import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type Genre = {
  id: number;
  name: string;
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
};

type Crew = {
  id: number;
  name: string;
  profile_path?: string;
};

type Credit = {
  cast: Cast[];
  crew: Crew[];
};

type Video = {
  key: string;
  site: string;
  type: string;
};

type Videos = {
  results: Video[];
};

type Rating = {
  rating: string;
};

type ContentRating = {
  results: Rating[];
};

type Media = {
  id: number;
  title: string;
  poster_path?: string;
};

type SimilarMedia = {
  results: Media[];
};

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  genres: Genre[];
  budget: number;
  overview: string;
  release_date: string;
  runtime: number;
  revenue: number;
  tagline: string;
  vote_average: number;
  original_language: string;
  credits: Credit;
  videos: Videos;
  content_ratings: ContentRating;
  status: string;
  similar: SimilarMedia;
};

const fetchMovieDetails = async (movieId: string) => {
  try {
    const { data } = await apiClient.get<Movie>(
      `/movie/${movieId}?append_to_response=credits,videos,similar`
    );
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
