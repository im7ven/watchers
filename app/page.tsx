"use client";

import {
  Box,
  Flex,
  Grid,
  Skeleton,
  Tabs,
  Text,
  Container,
  Button,
  Spinner,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useData from "./hooks/useData";
import GridSkeleton from "./components/GridSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

type MediaCover = {
  id: number;
  title: string;
  poster_path: string;
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("/movie/popular");
  const [isMovieSelected, setIsMovieSelected] = useState("movie");
  const { data, isLoading, fetchNextPage, hasNextPage } = useData<MediaCover>(
    selectedTab,
    [selectedTab]
  );

  const onSelectMovie = () => {
    setIsMovieSelected("movie");
    setSelectedTab("/movie/popular");
  };

  const onSelectTv = () => {
    setIsMovieSelected("tv");
    setSelectedTab("/trending/tv/week");
  };

  if (isLoading) {
    return <GridSkeleton />;
  }

  const fetchedMediaCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  console.log(selectedTab);
  return (
    <main>
      <Flex justify="between" align="center">
        <Flex className="flex-1 text-[rgba(255,255,255,.5)]" gap="2">
          <Text
            onClick={onSelectMovie}
            className={`cursor-pointer ${
              isMovieSelected === "movie" ? "font-semibold text-white" : ""
            }`}
          >
            Movie
          </Text>
          |
          <Text
            onClick={onSelectTv}
            className={` cursor-pointer ${
              isMovieSelected === "tv" ? "font-semibold text-white" : ""
            }`}
          >
            TV
          </Text>
        </Flex>
        {isMovieSelected === "movie" && (
          <Tabs.Root
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value)}
          >
            <Tabs.List
              size={{ initial: "1", xs: "2" }}
              className="items-center"
              justify="center"
            >
              <Tabs.Trigger value="/movie/popular">Popular</Tabs.Trigger>
              <Tabs.Trigger value="/movie/now_playing">
                Now Playing
              </Tabs.Trigger>
              <Tabs.Trigger value="/movie/upcoming">Upcoming</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        )}
        {isMovieSelected === "tv" && (
          <Tabs.Root
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value)}
          >
            <Tabs.List
              size={{ initial: "1", xs: "2" }}
              className="items-center"
              justify="center"
            >
              <Tabs.Trigger value="/trending/tv/week">Trending</Tabs.Trigger>
              <Tabs.Trigger value="/tv/popular">Popular</Tabs.Trigger>
              <Tabs.Trigger value="/tv/top_rated">Top Rated</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        )}
      </Flex>
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
                  <Link
                    href={`/${isMovieSelected === "movie" ? "movie" : "tv"}/${
                      movie.id
                    }`}
                  >
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
    </main>
  );
}
