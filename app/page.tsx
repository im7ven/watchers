"use client";

import { Box, Flex, Grid, Tabs, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import usePopularMovie from "./hooks/usePopularMovie";
import useData from "./hooks/useData";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("/movie/popular");
  const [isMovieSelected, setIsMovieSelected] = useState("movie");
  const { data } = useData<Movie>(selectedTab, [selectedTab]);
  const [defaultTabValue, setDefaultTabValue] = useState("/movie/popular");

  const onSelectMovie = () => {
    setIsMovieSelected("movie");
    setSelectedTab("movie/popular");
  };

  const onSelectTv = () => {
    setIsMovieSelected("tv");
    setSelectedTab("tv/popular");
  };

  // useEffect(() => {
  //   const defaultTabValue = isMovieSelected ? "/movie/popular" : "/tv/popular";
  //   setDefaultTabValue(defaultTabValue);
  // }, [isMovieSelected]);

  // console.log(selectedTab);

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
            defaultValue={"/movie/popular"}
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
            defaultValue={"/tv/popular"}
            onValueChange={(value) => setSelectedTab(value)}
          >
            <Tabs.List
              size={{ initial: "1", xs: "2" }}
              className="items-center"
              justify="center"
            >
              <Tabs.Trigger value="/tv/popular">Popular</Tabs.Trigger>
              <Tabs.Trigger value="/trending/tv/week">Trending</Tabs.Trigger>
              <Tabs.Trigger value="/tv/top_rated">Top Rated</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        )}
      </Flex>
      <Grid columns={{ initial: "3", xs: "5", sm: "6" }} gap="1" mx="auto">
        {data?.results.map((movie) => (
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
      </Grid>
    </main>
  );
}
