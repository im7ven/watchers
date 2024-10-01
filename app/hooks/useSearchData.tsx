import { useInfiniteQuery } from "@tanstack/react-query";
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
  return useInfiniteQuery<MediaResponse>({
    queryKey: [searchValue],
    queryFn: ({ pageParam = 1 }) => {
      return apiClient
        .get("search/multi", {
          params: {
            page: pageParam,
            query: searchValue,
          },
        })
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: !!searchValue,
  });
};

export default useSearchData;
