"use client";

import placeholderImg from "@/public/movie_placeholder.png";
import {
  Box,
  Flex,
  Grid,
  SegmentedControl,
  Spinner,
  Tabs,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GridSkeleton from "./components/GridSkeleton";
import ScrollToTopBtn from "./components/ScrollToTopBtn";
import useData from "./hooks/useData";

type MediaCover = {
  id: number;
  title: string;
  poster_path: string;
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>("/movie/popular");
  const [mediaType, setMediaType] = useState<string>("movie");
  const { data, isLoading, fetchNextPage, hasNextPage } = useData<MediaCover>(
    selectedTab,
    [selectedTab]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTab = localStorage.getItem("tabSelected") || "/movie/popular";
      const storedMediaType =
        localStorage.getItem("mediaTypeSelected") || "movie";

      setSelectedTab(storedTab);
      setMediaType(storedMediaType);

      if (!localStorage.getItem("mediaTypeSelected")) {
        localStorage.setItem("mediaTypeSelected", "movie");
      }
      if (!localStorage.getItem("tabSelected")) {
        localStorage.setItem("tabSelected", "/movie/popular");
      }
    }
  }, []);

  const onSelectMovie = () => {
    localStorage.setItem("mediaTypeSelected", "movie");
    localStorage.setItem("tabSelected", "/movie/popular");
    setMediaType("movie");
    setSelectedTab("/movie/popular");
  };

  const onSelectTv = () => {
    localStorage.setItem("mediaTypeSelected", "tv");
    localStorage.setItem("tabSelected", "/trending/tv/week");
    setMediaType("tv");
    setSelectedTab("/trending/tv/week");
  };

  const onChangeTab = (tabValue: string) => {
    localStorage.setItem("tabSelected", tabValue);
    setSelectedTab(tabValue);
  };

  const fetchedMediaCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  if (isLoading) {
    return <GridSkeleton />;
  }

  return (
    <main>
      <ScrollToTopBtn />
      <Flex justify="between" align="center">
        <SegmentedControl.Root
          my={{ initial: "2", xs: "0" }}
          ml="1"
          radius="full"
          size="1"
          value={mediaType}
        >
          <SegmentedControl.Item onClick={onSelectMovie} value="movie">
            Movie
          </SegmentedControl.Item>
          <SegmentedControl.Item onClick={onSelectTv} value="tv">
            TV
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        {mediaType === "movie" && (
          <Tabs.Root
            mt={{ initial: "2", xs: "0" }}
            value={selectedTab}
            onValueChange={(value) => onChangeTab(value)}
          >
            <Tabs.List size={{ initial: "1", xs: "2" }} justify="center">
              <Tabs.Trigger value="/movie/popular">Popular</Tabs.Trigger>
              <Tabs.Trigger value="/movie/now_playing">
                Now Playing
              </Tabs.Trigger>
              <Tabs.Trigger value="/movie/upcoming">Upcoming</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        )}
        {mediaType === "tv" && (
          <Tabs.Root
            mt={{ initial: "2", xs: "0" }}
            value={selectedTab}
            onValueChange={(value) => onChangeTab(value)}
          >
            <Tabs.List size={{ initial: "1", xs: "2" }} justify="center">
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
                  <Link href={`/${mediaType}/${movie.id}`}>
                    <Image
                      width={165}
                      height={300}
                      src={
                        movie.poster_path
                          ? posterUrl + movie.poster_path
                          : placeholderImg
                      }
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
