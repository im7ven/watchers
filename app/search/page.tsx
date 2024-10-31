"use client";

import placeholder from "@/public/movie_placeholder.png";
import { Badge, Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import PlaceholderAlert from "../components/PlaceholderAlert";
import { useSearchValue } from "../contexts/SearchContext";
import useSearchData from "../hooks/useSearchData";

const SearchResultsPage = () => {
  const { searchVal } = useSearchValue();
  const { data } = useSearchData(searchVal);

  const filteredData = data?.results.filter(
    (media) => media.media_type !== "person"
  );

  if (filteredData && filteredData?.length < 1) {
    return (
      <PlaceholderAlert message={`No result were found for ${searchVal}`} />
    );
  }
  return (
    <>
      <Flex p="3" direction="column" gap="2">
        {filteredData?.map((media) => (
          <Link key={media.id} href={`/${media.media_type}/${media.id}}`}>
            <Flex gap="3">
              <Container className="max-w-[100px] md:max-w-[120px] relative h-[150px] md:h-[180px]">
                <Image
                  unoptimized
                  src={
                    media.poster_path
                      ? "https://image.tmdb.org/t/p/w500" + media.poster_path
                      : placeholder
                  }
                  fill
                  sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, 180px"
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
