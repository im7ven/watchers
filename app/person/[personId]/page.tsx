"use client";

import BackButton from "@/app/components/BackButton";
import DetailPageSkeleton from "@/app/components/DetailPageSkeleton";
import EmblaCarousel from "@/app/components/EmblaCarousel";
import ImageModal from "@/app/components/ImageModal";
import usePerson from "@/app/hooks/usePerson";
import usePersonCredits from "@/app/hooks/usePersonCredits";
import placeholder from "@/public/headshot-placeholder.png";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { TbPointFilled } from "react-icons/tb";

type Props = {
  params: { personId: string };
};

const posterPath = "https://image.tmdb.org/t/p/w500";

const PersonDetailsPage = ({ params: { personId } }: Props) => {
  const { data: person, isLoading } = usePerson(personId);
  const { mediaCastSlides, mediaCrewSlides } = usePersonCredits(personId);

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  const personImage = person?.profile_path
    ? posterPath + person?.profile_path
    : placeholder;

  return (
    <Box p="4">
      <Box pb={{ initial: "2" }}>
        <BackButton />
      </Box>
      <Flex gap="2" align="start">
        <ImageModal imgSrc={personImage} alt={person?.name + "headshot"} />
        <Box>
          <Heading>{person?.name}</Heading>
          <Flex align="center" gap="1">
            {person?.birthday && (
              <>
                <Text>
                  {new Date(person?.birthday + "T00:00")
                    .toDateString()
                    .slice(4)}
                </Text>
              </>
            )}
            {person?.deathday &&
              "- " +
                new Date(person.deathday + "T00:00").toDateString().slice(4)}
            {person?.birthday && !person.deathday && (
              <>
                <TbPointFilled />
                {new Date().getFullYear() -
                  Number(new Date(person?.birthday).getFullYear()) +
                  "yrs"}
              </>
            )}
          </Flex>
          <Text as="p">{person?.place_of_birth}</Text>
        </Box>
      </Flex>
      <Text mt="4" as="p">
        {person?.biography}
      </Text>
      {mediaCastSlides.length > 0 && (
        <Box my="5">
          <Heading>Cast In</Heading>
          <EmblaCarousel slides={mediaCastSlides} />
        </Box>
      )}
      {mediaCrewSlides.length > 0 && (
        <Box>
          <Heading>Crewed On</Heading>
          <EmblaCarousel slides={mediaCrewSlides} />
        </Box>
      )}
    </Box>
  );
};

export default PersonDetailsPage;
