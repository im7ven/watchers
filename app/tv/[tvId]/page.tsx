"use client";

import DetailPageSkeleton from "@/app/components/DetailPageSkeleton";
import EmblaCarousel from "@/app/components/EmblaCarousel";
import ImageModal from "@/app/components/ImageModal";
import ProvidersDialog from "@/app/components/ProvidersDialog";
import VideoPlayer from "@/app/components/VideoPlayer";
import useMediaCredits from "@/app/hooks/useMediaCredits";
import useMediaDetails from "@/app/hooks/useMediaDetails";
import mediaPlaceholder from "@/public/movie_placeholder.png";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";

type Props = {
  params: { tvId: string };
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

const TvSeriesDetailPage = ({ params: { tvId } }: Props) => {
  const { data: tvSeries, isLoading, isError } = useMediaDetails(tvId, "tv");
  const { castSlides, crewSlides, similarMediaSlides } = useMediaCredits(
    tvId,
    "tv"
  );

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const videoTrailer = tvSeries?.videos?.results?.find(
    (tv) => tv.type === "Trailer"
  );

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  const imagePoster = tvSeries?.poster_path
    ? posterUrl + tvSeries.poster_path
    : mediaPlaceholder;

  return (
    <main className="p-4">
      <Button size="1" variant="outline" onClick={handleGoBack} mb="3">
        <IoReturnUpBackOutline size="20" />
        Go Back
      </Button>
      <Container size="2">
        <Flex gap="3">
          <ImageModal imgSrc={imagePoster} alt={tvSeries?.name + "Poster"} />
          <Box flexGrow="1">
            <Flex gap="2" justify="between">
              <Heading as="h1" weight="light">
                {tvSeries?.name}
              </Heading>
              <MdFavorite size="25" color="#FF8A95" />
            </Flex>

            <Flex className="mt-2" align="center" gap="1">
              <FaStar size={20} color="yellow" />
              <Text as="p">{tvSeries?.vote_average.toFixed(1)}</Text>
              <TbPointFilled />
              <Text>{tvSeries?.first_air_date.slice(0, 4)}</Text>
              <TbPointFilled />
              <Text as="p">
                {tvSeries?.number_of_seasons}{" "}
                {`${
                  Number(tvSeries?.number_of_seasons) < 2 ? "Season" : "Seasons"
                }`}
              </Text>
            </Flex>
            <Flex wrap="wrap" gap="1" className="mt-3">
              {tvSeries?.genres.map((genre) => (
                <Badge key={genre.id} color="gray" variant="solid" highContrast>
                  {genre.name}
                </Badge>
              ))}
            </Flex>
            {tvSeries?.["watch/providers"].results.US && (
              <ProvidersDialog media={tvSeries} />
            )}
          </Box>
        </Flex>

        <Text className="mt-3" as="p">
          {tvSeries?.overview}
        </Text>
        {videoTrailer && (
          <VideoPlayer videoId={videoTrailer.key} site={videoTrailer.site} />
        )}
        {castSlides.length > 1 && (
          <>
            <Heading className="my-3" as="h2">
              Cast
            </Heading>
            <EmblaCarousel slides={castSlides} />
          </>
        )}

        {crewSlides.length > 1 && (
          <>
            <Heading className="my-3" as="h2">
              Crew
            </Heading>
            <EmblaCarousel slides={crewSlides} />
          </>
        )}
      </Container>
      {similarMediaSlides.length > 1 && (
        <>
          <Heading className="my-3" as="h2">
            Similar Series
          </Heading>
          <EmblaCarousel slides={similarMediaSlides} />
        </>
      )}
    </main>
  );
};

export default TvSeriesDetailPage;
