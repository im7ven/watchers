"use client";

import { Flex, Box, Text, Button, Container, Badge } from "@radix-ui/themes";
import React from "react";
import useSearchData from "../hooks/useSearchData";
import { useSearchValue } from "../contexts/SearchContext";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/movie_placeholder.png";

const SearchResultsPage = () => {
  const { searchVal } = useSearchValue();
  const { data } = useSearchData(searchVal);

  const filteredData = data?.results.filter(
    (media) => media.media_type !== "person"
  );
  return (
    <>
      <Flex p="3" direction="column" gap="2">
        {filteredData?.map((media) => (
          <Link key={media.id} href={`/${media.media_type}/${media.id}}`}>
            <Flex gap="3">
              <Container className="max-w-[100px] md:max-w-[120px] relative h-[150px] md:h-[180px]">
                <Image
                  src={
                    media.poster_path
                      ? "https://image.tmdb.org/t/p/w500" + media.poster_path
                      : placeholder
                  }
                  fill
                  alt={media.title || "Movie cover"}
                />
              </Container>
              <Flex className="flex-1" direction="column" align="start">
                <Text>
                  {media.media_type === "tv" ? media.name : media.title}
                </Text>
                <Badge>
                  {media.media_type === "tv" ? "TV Series" : "Movie"}
                </Badge>
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default SearchResultsPage;
