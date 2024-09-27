import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type MediaResponse<T> = {
  results: T[];
};

const useData = <T,>(endpoint: string, key: string[]) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<MediaResponse<T>>(endpoint);
        return data;
      } catch (error) {
        throw new Error(
          "Sorry, an unexpected error has occurred please try again later."
        );
      }
    },
  });
};

export default useData;
