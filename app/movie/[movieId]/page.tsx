"use client";

import EmblaCarousel from "@/app/components/EmblaCarousel";
import MovieDataList from "@/app/components/MovieDataList";
import ProvidersDialog from "@/app/components/ProvidersDialog";
import VideoPlayer from "@/app/components/VideoPlayer";
import useMediaCredits from "@/app/hooks/useMediaCredits";
import useMediaDetails from "@/app/hooks/useMediaDetails";
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";

type Props = {
  params: { movieId: string };
};

const mediaImgPath = "https://image.tmdb.org/t/p/w500";

const MoviePage = ({ params: { movieId } }: Props) => {
  const { data: movie, isError, isLoading } = useMediaDetails(movieId, "movie");
  const { castSlides, crewSlides, similarMediaSlides } = useMediaCredits(
    movieId,
    "movie"
  );

  if (isLoading) {
    return <Skeleton />;
  }
  const videoTrailer = movie?.videos.results.find(
    (movie) => movie.type === "Trailer"
  );

  return (
    <main className="p-4">
      <Container size="2">
        <Flex gap="3">
          <Image
            className="rounded md:w-[150px]"
            width={100}
            height={100}
            alt={`${movie?.title} poster`}
            src={`${mediaImgPath}${movie?.poster_path}`}
          />
          <Box flexGrow="1">
            <Flex gap="2" justify="between">
              <Heading as="h1" weight="light">
                {movie?.title}
              </Heading>
              <MdFavorite size="25" color="#FF8A95" />
            </Flex>

            <Flex className="mt-2" align="center" gap="1">
              <FaStar size={20} color="yellow" />
              <Text as="p">{movie?.vote_average.toFixed(1)}</Text>
              <TbPointFilled />
              <Text as="p">{movie?.runtime} min</Text>
              <TbPointFilled />
              <Text>{movie?.release_date.slice(0, 4)}</Text>
            </Flex>
            <Flex wrap="wrap" gap="1" className="mt-3">
              {movie?.genres.map((genre) => (
                <Badge key={genre.id} color="gray" variant="solid" highContrast>
                  {genre.name}
                </Badge>
              ))}
            </Flex>
            {movie?.["watch/providers"].results.US && (
              <ProvidersDialog media={movie} />
            )}
          </Box>
        </Flex>

        <Text className="mt-3" as="p">
          {movie?.overview}
        </Text>
        {videoTrailer && (
          <VideoPlayer videoId={videoTrailer.key} site={videoTrailer.site} />
        )}
        <Heading className="my-3" as="h2">
          Cast
        </Heading>
        <EmblaCarousel slides={castSlides} />

        <Heading className="my-3" as="h2">
          Cast
        </Heading>
        <EmblaCarousel slides={crewSlides} />

        <MovieDataList
          releaseDate={movie?.release_date}
          budget={movie?.budget}
          revenue={movie?.revenue}
          country={movie?.original_language.toUpperCase()}
        />
      </Container>
      <Heading className="mb-3" as="h2">
        Similar Films
      </Heading>
      <EmblaCarousel slides={similarMediaSlides} />
    </main>
  );
};

export default MoviePage;
