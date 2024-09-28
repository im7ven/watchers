"use client";

import EmblaCarousel from "@/app/components/EmblaCarousel";
import MovieDataList from "@/app/components/MovieDataList";
import VideoPlayer from "@/app/components/VideoPlayer";
import useTvSeriesDetails from "@/app/hooks/useTvSeriesDetails";
import {
  Flex,
  Box,
  Heading,
  Button,
  Badge,
  Container,
  Text,
  Skeleton,
} from "@radix-ui/themes";
import React, { use } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import Image from "next/image";
import useMediaCredits from "@/app/hooks/useTvSeriesCredits";

type Props = {
  params: { tvId: string };
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

const TvSeriesDetailPage = ({ params: { tvId } }: Props) => {
  const { data: tvSeries, isLoading, isError } = useTvSeriesDetails(tvId);
  const { castSlides, crewSlides } = useMediaCredits(tvId, false);

  const videoTrailer = tvSeries?.videos?.results?.find(
    (tv) => tv.type === "Trailer"
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  console.log(crewSlides);
  return (
    <main className="p-4">
      <Container size="2">
        <Flex gap="3">
          <Image
            className="rounded"
            width={100}
            height={100}
            alt={`${tvSeries?.name} poster`}
            src={`${posterUrl}${tvSeries?.poster_path}`}
          />
          <Box flexGrow="1">
            <Flex gap="2" justify="between">
              <Heading as="h1" weight="light">
                {tvSeries?.name}
              </Heading>
              <Button style={{ gap: "4px" }}>
                <CiHeart color="#fff" size="20" />
                <span className="hidden md:block">Add to Queue</span>
              </Button>
            </Flex>

            <Flex className="mt-2" align="center" gap="1">
              <FaStar size={20} color="yellow" />
              <Text as="p">{tvSeries?.vote_average.toFixed(1)}</Text>
              <TbPointFilled />
              <Text>{tvSeries?.first_air_date.slice(0, 4)}</Text>
              <TbPointFilled />
              <Text as="p">
                {tvSeries?.number_of_seasons}{" "}
                {`${
                  Number(tvSeries?.number_of_seasons) < 2 ? "Season" : "Seasons"
                }`}
              </Text>
            </Flex>
            <Flex wrap="wrap" gap="1" className="mt-3">
              {tvSeries?.genres.map((genre) => (
                <Badge key={genre.id} color="gray" variant="solid" highContrast>
                  {genre.name}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Flex>

        <Text className="mt-3" as="p">
          {tvSeries?.overview}
        </Text>
        {videoTrailer && (
          <VideoPlayer videoId={videoTrailer.key} site={videoTrailer.site} />
        )}
        {castSlides.length > 1 && (
          <>
            <Heading className="mt-3" as="h2">
              Cast
            </Heading>
            <EmblaCarousel slides={castSlides} />
          </>
        )}

        {crewSlides.length > 1 && (
          <>
            <Heading className="mt-3" as="h2">
              Cast
            </Heading>
            <EmblaCarousel slides={crewSlides} />
          </>
        )}
        {/* 
        <MovieDataList
          releaseDate={movie?.release_date}
          budget={movie?.budget}
          revenue={movie?.revenue}
          country={movie?.original_language.toUpperCase()}
        /> */}
      </Container>
      {/* <EmblaCarousel slides={similarFilmSlides} /> */}
    </main>
  );
};

export default TvSeriesDetailPage;
