"use client";

import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BackButton from "../components/BackButton";
import genres from "../data/genres";

const GenrePage = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleAddGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId));
    } else {
      setSelectedGenres((prev) => [...prev, genreId]);
    }
  };

  return (
    <Box p="4">
      <Flex mb="4" align="center" justify="between">
        <BackButton />
        <Link href={`/genres/${selectedGenres.join(",")}`}>
          <Button>Search</Button>
        </Link>
      </Flex>
      <Grid gap="2" columns={{ initial: "2", xs: "3", sm: "5" }}>
        {genres.map((genre) => (
          <Box
            onClick={() => handleAddGenre(genre.id)}
            className={` ${
              selectedGenres.includes(genre.id)
                ? "border-2 border-amber-500"
                : "border border-[rgba(255,255,255,.2)]"
            } box-border rounded-lg `}
            key={genre.id}
          >
            <Flex
              align="center"
              justify="center"
              className="max-w-[250px] h-[240px] relative  "
            >
              <Image
                unoptimized
                className="object-cover opacity-20 absolute inset-0 -z-10"
                src={genre.image!}
                alt={genre.name + "background image"}
                fill
                priority
                sizes="(max-width: 768px) 200px, 300px"
              />
              <Text weight={"bold"}>{genre.name}</Text>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default GenrePage;
