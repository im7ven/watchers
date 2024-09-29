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

type MediaDetail = {
  id: number;
  title: string;
  name?: string;
  first_air_date: string;
  number_of_seasons: string;
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

const fetchMediaDetails = async (mediaId: string, mediaType: string) => {
  try {
    const { data } = await apiClient.get<MediaDetail>(
      `/${mediaType}/${mediaId}`,
      {
        params: {
          append_to_response: "credits,videos,similar",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(
      "Sorry, an error has occurred while trying to retrieve the details of this movie"
    );
  }
};

const useMediaDetails = (mediaId: string, mediaType: string) => {
  return useQuery({
    queryKey: ["movie", mediaId],
    queryFn: () => fetchMediaDetails(mediaId, mediaType),
  });
};

export default useMediaDetails;
