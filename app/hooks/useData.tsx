import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type MediaResponse<T> = {
  results: T[];
  page: number;
  total_pages: number;
};

const useData = <T,>(
  endpoint: string,
  key: string[],
  queryParams?: Record<string, any>
) => {
  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const { data } = await apiClient.get<MediaResponse<T>>(endpoint, {
          params: {
            page: pageParam,
            ...queryParams,
          },
        });
        return data;
      } catch (error) {
        throw new Error(
          "Sorry, an unexpected error has occurred please try again later."
        );
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },

    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};

export default useData;
