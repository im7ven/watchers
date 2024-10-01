"use client";

import { Flex, Box, Text, Button } from "@radix-ui/themes";
import React from "react";
import useSearchData from "../hooks/useSearchData";
import { useSearchValue } from "../contexts/SearchContext";
import Image from "next/image";
import Link from "next/link";

const SearchResultsPage = () => {
  const { searchVal } = useSearchValue();
  const { data, fetchNextPage } = useSearchData(searchVal);
  return (
    <>
      <Flex direction="column">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((media) => (
              <Link key={media.id} href={`/${media.media_type}/${media.id}}`}>
                <Flex>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    width="150"
                    height="300"
                    alt={media.title}
                  />
                  <Text>{media.title}</Text>
                </Flex>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </Flex>
      <Button onClick={() => fetchNextPage()}>Load More</Button>
    </>
  );
};

export default SearchResultsPage;
