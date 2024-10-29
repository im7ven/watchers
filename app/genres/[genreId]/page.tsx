"use client";

import BackButton from "@/app/components/BackButton";
import PlaceholderAlert from "@/app/components/PlaceholderAlert";
import ScrollToTopBtn from "@/app/components/ScrollToTopBtn";
import useData from "@/app/hooks/useData";
import { Spinner, Grid, Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type MediaCover = {
  id: number;
  title: string;
  poster_path: string;
};

type Props = {
  params: { genreId: string };
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

const MovieGenrePage = ({ params: { genreId } }: Props) => {
  const decodedGenreId = decodeURIComponent(genreId);

  const { data, hasNextPage, fetchNextPage } = useData<MediaCover>(
    "/discover/movie",
    ["movie genre", genreId],
    {
      with_genres: decodedGenreId,
    }
  );

  const totalResults = data?.pages[0].total_results!;

  const fetchedMediaCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <Box px="4">
      <ScrollToTopBtn />
      <Box py="3">
        <BackButton />
      </Box>
      <InfiniteScroll
        dataLength={fetchedMediaCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        {totalResults < 1 && (
          <PlaceholderAlert message="Sorry, no movies results were found." />
        )}

        <Grid columns={{ initial: "3", xs: "5", sm: "6" }} gap="1" mx="auto">
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((movie) => (
                <Box key={movie.id}>
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      width={165}
                      height={300}
                      src={posterUrl + movie.poster_path}
                      alt="poster"
                    />
                  </Link>
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default MovieGenrePage;
