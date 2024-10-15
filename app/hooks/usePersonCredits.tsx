import usePerson from "./usePerson";
import placeholder from "@/public/movie_placeholder.png";

const posterPath = "https://image.tmdb.org/t/p/w500";

const usePersonCredits = (personId: string) => {
  const { data: person } = usePerson(personId);

  const mediaCastSlides =
    person?.combined_credits.cast?.map((media) => ({
      id: media.id,
      name: media.title,
      src: media.poster_path ? posterPath + media.poster_path : placeholder,
      alt: media.title + "Poster",
      media_type: media.media_type,
    })) || [];

  const mediaCrewSlides =
    person?.combined_credits.crew?.map((media) => ({
      id: media.id,
      name: media.title,
      src: media.poster_path ? posterPath + media.poster_path : placeholder,
      alt: media.title + "Poster",
      media_type: media.media_type,
    })) || [];

  return { mediaCastSlides, mediaCrewSlides };
};

export default usePersonCredits;
