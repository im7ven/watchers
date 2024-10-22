"use client";

import React, { useState } from "react";
import useGenres from "../hooks/useGenres";
import { Box, Button, Card, Flex, Grid, Spinner, Text } from "@radix-ui/themes";
import Image from "next/image";
import sonicImg from "@/public/sonicCover.png";
import genres from "../data/genres";
import Link from "next/link";
import BackButton from "../components/BackButton";

type SelectedGenres = {};

const GenrePage = () => {
  const { data, isLoading, isError } = useGenres();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleAddGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== genreId));
    } else {
      setSelectedGenres((prev) => [...prev, genreId]);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return;
  }

  console.log(selectedGenres.join("&&"));

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
            // href={`/genres/${genre.id}`}
          >
            <Flex
              align="center"
              justify="center"
              className="max-w-[250px] h-[240px] relative  "
            >
              <Image
                className="object-cover opacity-20 absolute inset-0 -z-10"
                src={genre.image!}
                alt="Sonic movie cover"
                fill
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
