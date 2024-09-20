"use client";

import React from "react";
import useGenres from "../hooks/useGenres";
import { Spinner } from "@radix-ui/themes";

const GenrePage = () => {
  const { data, isLoading, isError } = useGenres();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return;
  }

  return (
    <ul className="mx-auto text-center max-w-[80%] sm:max-w-xs">
      {data?.genres.map((genre) => (
        <li className="border-b border-gray-400 py-3" key={genre.id}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenrePage;
