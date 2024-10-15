import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type PersonCredits = {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
};

type Person = {
  id: number;
  name: string;
  profile_path: string;
  birthday: string;
  deathday?: string;
  biography: string;
  place_of_birth: string;
  combined_credits: { crew: PersonCredits[]; cast: PersonCredits[] };
};

const usePerson = (personId: string) => {
  return useQuery({
    queryKey: ["person", personId],
    queryFn: async () => {
      try {
        const res = await apiClient.get<Person>(`/person/${personId}`, {
          params: {
            append_to_response: "combined_credits",
          },
        });
        return res.data;
      } catch (error) {
        throw new Error("Sorry an unexpected error has occurred.");
      }
    },
  });
};

export default usePerson;
