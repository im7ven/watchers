import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type TvSeries = {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  status: string;
  first_air_date: string;
  number_of_seasons: string;
  genres: { id: number; name: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }[];
    crew: { id: number; name: string; profile_path?: string }[];
  };
  videos: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
};

const useTvSeriesDetails = (tvId: string) => {
  return useQuery<TvSeries>({
    queryKey: ["tv", tvId],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get(
          `tv/${tvId}?append_to_response=videos,credits,similar`
        );
        return data;
      } catch (error) {
        throw new Error("Sorry an unexpected error has occurred.");
      }
    },
  });
};

export default useTvSeriesDetails;
