"use client";

import React from "react";
import useGenres from "../hooks/useGenres";
import { Box, Flex, Grid, Spinner, Text } from "@radix-ui/themes";
import Image from "next/image";
import sonicImg from "@/public/sonicCover.png";
import genres from "../data/genres";
import Link from "next/link";

const GenrePage = () => {
  const { data, isLoading, isError } = useGenres();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return;
  }

  return (
    <Grid p="4" gap="2" columns={{ initial: "2", xs: "3", sm: "5" }}>
      {genres.map((genre) => (
        <Link
          className="hover:border-amber-500 hover:border border-[rgba(255,255,255,.2)] border rounded-lg "
          key={genre.id}
          href={`/genres/${genre.id}`}
        >
          <Flex
            align="center"
            justify="center"
            className="p-2 max-w-[250px] h-[240px] relative  "
          >
            <Image
              className="object-cover opacity-20 absolute inset-0 -z-10"
              src={genre.image!}
              alt="Sonic movie cover"
              fill
            />
            <Text weight={"bold"}>{genre.name}</Text>
          </Flex>
        </Link>
      ))}
    </Grid>
  );
};

export default GenrePage;
