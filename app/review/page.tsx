"use client";

import placeholderImg from "@/public/movie_placeholder.png";
import { Box, Button, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { TbTrashFilled } from "react-icons/tb";
import EditReviewModal from "../components/EditReviewModal";
import PlaceholderAlert from "../components/PlaceholderAlert";

type Review = {
  reviewId: string;
  reviewPoster: string;
  reviewTitle: string;
  reviewMessage: string;
  reviewRating: number;
};

const mediaImgPath = "https://image.tmdb.org/t/p/w500";

const ReviewPage = () => {
  const queryClient = useQueryClient();
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Review[]>("/api/review");
        return data;
      } catch (error) {
        throw new Error("Unable to retrieve the reviews");
      }
    },
  });

  const removeReviewMutation = useMutation({
    mutationFn: async (reviewId: { reviewId: string }) => {
      await axios.delete("/api/review", { data: reviewId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const handleDeleteItem = (reviewId: string) => {
    removeReviewMutation.mutate({ reviewId });
  };

  if (reviews && reviews.length < 1) {
    return (
      <Box px="4">
        <PlaceholderAlert
          marginTop="4"
          message="You currently have no reviewed items"
        />
      </Box>
    );
  }

  return (
    <Box className="space-y-2" p="4">
      {reviews?.map((review) => (
        <Box key={review.reviewId}>
          <Flex gap="3">
            <Image
              src={
                review.reviewPoster
                  ? mediaImgPath + review.reviewPoster
                  : placeholderImg
              }
              className="w-[100px] md:w-[150px] h-auto "
              width={100}
              height={150}
              alt={review.reviewTitle + "poster"}
            />
            <Box className="flex-grow">
              <Flex mb="3" justify="between" gap="5">
                <Heading weight="medium" as="h2" size={{ initial: "3" }}>
                  {review.reviewTitle}
                </Heading>
                <Flex gap="1">
                  <Button
                    style={{ alignSelf: "flex-start" }}
                    disabled={removeReviewMutation.isPending}
                    onClick={() => handleDeleteItem(review.reviewId)}
                  >
                    {removeReviewMutation.isPending ? (
                      <Spinner />
                    ) : (
                      <TbTrashFilled size={20} />
                    )}
                  </Button>
                  <EditReviewModal
                    reviewId={review.reviewId}
                    reviewMessage={review.reviewMessage}
                    reviewRating={review.reviewRating}
                  />
                </Flex>
              </Flex>
              <Flex wrap={"wrap"} align="center" gap="1" mb="1">
                <FaRegStar color="#ffc53d" />
                <Text size="4">{review.reviewRating / 10}</Text>
              </Flex>
              <Flex gap="1">
                <GoDash className="pt-1" />
                <Text>{review.reviewMessage}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewPage;
