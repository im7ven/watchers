import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type Person = {
  id: number;
  name: string;
  profile_path: string;
  birthday: string;
  deathday?: string;
  biography: string;
};

const usePerson = (personId: string) => {
  return useQuery({
    queryKey: ["person", personId],
    queryFn: async () => {
      try {
        const res = await apiClient.get<Person>(`/person/${personId}`);
        return res.data;
      } catch (error) {
        throw new Error("Sorry an unexpected error has occurred.");
      }
    },
  });
};

export default usePerson;
