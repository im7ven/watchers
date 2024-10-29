"use client";

import BackButton from "@/app/components/BackButton";
import DetailPageSkeleton from "@/app/components/DetailPageSkeleton";
import EmblaCarousel from "@/app/components/EmblaCarousel";
import ImageModal from "@/app/components/ImageModal";
import MediaOptions from "@/app/components/MediaOptions";
import MovieDataList from "@/app/components/MovieDataList";
import ProvidersDialog from "@/app/components/ProvidersDialog";
import Toast from "@/app/components/Toast";
import VideoPlayer from "@/app/components/VideoPlayer";
import useMediaCredits from "@/app/hooks/useMediaCredits";
import useMediaDetails from "@/app/hooks/useMediaDetails";
import moviePlaceholder from "@/public/movie_placeholder.png";
import { Badge, Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  params: { movieId: string };
};

const mediaImgPath = "https://image.tmdb.org/t/p/w500";

const MoviePage = ({ params: { movieId } }: Props) => {
  const { data: movie, isError, isLoading } = useMediaDetails(movieId, "movie");
  const { castSlides, crewSlides, similarMediaSlides } = useMediaCredits(
    movieId,
    "movie"
  );

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  const videoTrailer = movie?.videos.results.find(
    (movie) => movie.type === "Trailer"
  );

  const imagePoster = movie?.poster_path
    ? mediaImgPath + movie.poster_path
    : moviePlaceholder;

  return (
    <main className="p-4">
      <Box pb={{ initial: "2", sm: "3" }}>
        <BackButton />
        <Toast />
      </Box>
      <Container size="2">
        <Flex gap="2" align="start">
          <ImageModal alt={`${movie?.title} poster`} imgSrc={imagePoster} />
          <Box flexGrow="1">
            <Flex gap="2" justify="between">
              <Heading as="h1" weight="light">
                {movie?.title}
              </Heading>
              <MediaOptions
                mediaTitle={movie?.title!}
                mediaPoster={movie?.poster_path!}
                mediaId={movie?.id.toString() + movie?.title!}
                mediaType="movie"
                mediaRating={movie?.vote_average!}
                mediaRelease={movie?.release_date!}
                mediaRuntime={movie?.runtime!}
              />
            </Flex>

            <Flex className="mt-2" align="center" gap="1">
              <FaStar size={20} color="yellow" />
              <Text as="p">{movie?.vote_average.toFixed(1)}</Text>
              <TbPointFilled />
              <Text as="p">{movie?.runtime} min</Text>
              <TbPointFilled />
              <Text>{movie?.release_date.slice(0, 4)}</Text>
            </Flex>
            <Flex wrap="wrap" gap="1" className="mt-3">
              {movie?.genres.map((genre) => (
                <Badge key={genre.id} color="gray" variant="solid" highContrast>
                  {genre.name}
                </Badge>
              ))}
            </Flex>
            {movie?.["watch/providers"].results.US && (
              <ProvidersDialog media={movie} />
            )}
          </Box>
        </Flex>

        <Text className="mt-3" as="p">
          {movie?.overview}
        </Text>
        {videoTrailer && (
          <VideoPlayer videoId={videoTrailer.key} site={videoTrailer.site} />
        )}
        <Heading className="my-3" as="h2">
          Cast
        </Heading>
        <EmblaCarousel slides={castSlides} />

        <Heading className="my-3" as="h2">
          Cast
        </Heading>
        <EmblaCarousel slides={crewSlides} />

        <MovieDataList
          releaseDate={movie?.release_date}
          budget={movie?.budget}
          revenue={movie?.revenue}
          country={movie?.original_language.toUpperCase()}
        />
      </Container>
      <Heading className="mb-3" as="h2">
        Similar Films
      </Heading>
      <EmblaCarousel slides={similarMediaSlides} />
    </main>
  );
};

export default MoviePage;
