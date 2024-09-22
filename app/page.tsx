"use client";

import { useEffect, useState } from "react";
import { Button, Grid, Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import apiClient from "./services/api-client";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

export default function Home() {
  const { data: sessionData } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getPopularMovies = async () => {
    try {
      const { data: popularMovies } = await apiClient.get("/movie/popular");
      setMovies(popularMovies.results); // Assuming `results` is the array of movies from the API response
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <main>
      {sessionData && <p>Welcome, {sessionData.user?.name}</p>}
      <Button>Testing Radix</Button>
      <Link href="api/auth/signin">Login</Link>
      <Link href="api/auth/signout">Logout</Link>

      <Grid
        columns={{ initial: "3", sm: "5", md: "6" }}
        gap="1"
        maxWidth={{ initial: "450px", sm: "800px", md: "1000px" }}
        mx="auto"
      >
        {movies.map((movie) => (
          <Box key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <Image
                width={150}
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
