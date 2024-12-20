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
  media_type: string;
  gender?: number;
};

type Crew = {
  id: number;
  name: string;
  profile_path?: string;
  media_type: string;
  gender?: number;
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
  media_type: string;
  release_date?: string;
};

type SimilarMedia = {
  results: Media[];
};

type Provider = {
  logo_path: string;
  provider_id: string;
  provider_name: string;
};

type WatchProviderResults = {
  rent: Provider[];
  flatrate: Provider[];
};

type WatchProviders = {
  results: {
    [countryCode: string]: WatchProviderResults;
  };
};

export type MediaDetail = {
  id: number;
  title: string;
  name?: string;
  first_air_date: string;
  number_of_seasons: number;
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
  "watch/providers": WatchProviders;
};

const fetchMediaDetails = async (mediaId: string, mediaType: string) => {
  try {
    const { data } = await apiClient.get<MediaDetail>(
      `/${mediaType}/${mediaId}`,
      {
        params: {
          append_to_response: "credits,videos,similar,watch/providers",
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
