"use client";

import VideoPlayer from "@/app/components/VideoPlayer";
import useMovieDetails from "@/app/hooks/useMovieDetails";
import {
  Badge,
  Box,
  Button,
  Container,
  DataList,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import placeholder from "@/public/headshot-placeholder.png";
import EmblaCarousel from "@/app/components/EmblaCarousel";
import { CiHeart } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import MovieDataList from "@/app/components/MovieDataList";

type Props = {
  params: { movieId: string };
};

const posterPath = "https://image.tmdb.org/t/p/w500";

const MoviePage = ({ params: { movieId } }: Props) => {
  const { data: movie, isError, isLoading } = useMovieDetails(movieId);

  if (isLoading) {
    return <Skeleton />;
  }
  const videoTrailer = movie?.videos.results.find(
    (movie) => movie.type === "Trailer"
  );

  const castSlides =
    movie?.credits.cast.map((cast) => ({
      id: cast.id,
      name: cast.name,
      character: cast.character,
      src: cast.profile_path ? posterPath + cast.profile_path : placeholder,
      alt: cast.name,
    })) || [];

  const crewSlides =
    movie?.credits.crew.map((crew) => ({
      id: crew.id,
      name: crew.name,
      src: crew.profile_path ? posterPath + crew.profile_path : placeholder,
      alt: crew.name,
    })) || [];

  const similarFilmSlides =
    movie?.similar.results.map((media) => ({
      id: media.id,
      name: media.title,
      src: posterPath + media.poster_path,
      alt: media.title,
    })) || [];

  return (
    <main className="p-4">
      <Container size="2">
        <Flex gap="3">
          <Image
            className="rounded"
            width={100}
            height={100}
            alt={`${movie?.title} poster`}
            src={`${posterPath}${movie?.poster_path}`}
          />
          <Box flexGrow="1">
            <Flex gap="2" justify="between">
              <Heading as="h1" weight="light">
                {movie?.title}
              </Heading>
              <Button style={{ gap: "4px" }}>
                <CiHeart color="#fff" size="20" />
                <span className="hidden md:block">Add to Queue</span>
              </Button>
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
          </Box>
        </Flex>

        <Text className="mt-3" as="p">
          {movie?.overview}
        </Text>
        {videoTrailer && (
          <VideoPlayer videoId={videoTrailer.key} site={videoTrailer.site} />
        )}
        <Heading className="mt-3" as="h2">
          Cast
        </Heading>
        <EmblaCarousel slides={castSlides} />

        <Heading className="mt-3" as="h2">
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
      <EmblaCarousel slides={similarFilmSlides} />
    </main>
  );
};

export default MoviePage;
