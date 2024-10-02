import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type MediaData = {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
};

type MediaResponse = {
  results: MediaData[];
  page: number;
  total_pages: number;
};

const useSearchData = (searchValue: string) => {
  return useQuery<MediaResponse>({
    queryKey: [searchValue],
    queryFn: () => {
      return apiClient
        .get("search/multi", {
          params: {
            query: searchValue,
          },
        })
        .then((res) => res.data);
    },

    enabled: !!searchValue,
  });
};

export default useSearchData;
