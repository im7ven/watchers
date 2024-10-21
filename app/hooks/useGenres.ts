import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type Genre = {
  id: number;
  name: string;
};

type GenreResponse = {
  genres: Genre[];
};

const fetchGenres = async () => {
  try {
    const { data } = await apiClient.get<GenreResponse>("/genre/tv/list");
    return data;
  } catch (error) {
    throw new Error(
      "Sorry an unexpected error occurred while fetching the genres."
    );
  }
};

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
};

export default useGenres;
