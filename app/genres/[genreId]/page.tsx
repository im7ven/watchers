"use client";

import BackButton from "@/app/components/BackButton";
import useData from "@/app/hooks/useData";
import { Spinner, Grid, Box } from "@radix-ui/themes";
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
  const { data, hasNextPage, fetchNextPage } = useData<MediaCover>(
    "/discover/movie",
    ["movie genre", genreId],
    {
      with_genres: genreId,
    }
  );

  const fetchedMediaCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <Box pt={{ initial: "1", sm: "3" }}>
      <BackButton />
      <InfiniteScroll
        dataLength={fetchedMediaCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
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
