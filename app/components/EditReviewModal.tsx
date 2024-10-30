import {
  Dialog,
  Box,
  Flex,
  Slider,
  TextArea,
  Button,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { register } from "module";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

type Props = {
  reviewId: string;
  reviewMessage: string;
  reviewRating: number;
};

type UpdatedReview = {
  reviewId: string;
  reviewMessage?: string;
  reviewRating?: number;
};

type FormData = {
  reviewMessage: string;
};

const EditReviewModal = ({ reviewId, reviewMessage, reviewRating }: Props) => {
  const [rating, setRating] = useState([reviewRating]);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      reviewMessage: reviewMessage,
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async (updatedReview: UpdatedReview) => {
      const { data } = await axios.patch("/api/review", updatedReview);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setIsOpen(false);
    },
    onError: () => {
      throw new Error("An error occurred while trying to update the review");
    },
  });

  const onSubmit = (formData: FormData) => {
    const { reviewMessage } = formData;

    const updatedReview: UpdatedReview = {
      reviewId: reviewId,
      reviewRating: rating[0],
      reviewMessage,
    };

    updateReviewMutation.mutate(updatedReview);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button style={{ alignSelf: "flex-start" }} onClick={() => {}}>
          <RiEdit2Fill size={20} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content aria-describedby={undefined} size="3" maxWidth="500px">
        <Dialog.Title>Add Review</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Flex align="center" gap="1">
              <FaRegStar color="#ffcd53" />
              <Text>{rating[0] / 10}</Text>
            </Flex>
            <Slider
              mt="2"
              onValueChange={(value) => setRating(value)}
              defaultValue={rating}
            />
          </Box>

          <TextArea
            resize="vertical"
            {...register("reviewMessage", {
              required: "Review is required",
              maxLength: {
                value: 500,
                message: "Review has a maximum of 500 characters",
              },
              minLength: {
                value: 3,
                message: "Review has a minimum of 3 character",
              },
            })}
            my="3"
            placeholder="Write a review"
          />
          {errors.reviewMessage && (
            <Box mb="3">
              <Text color="red">{errors.reviewMessage.message}</Text>
            </Box>
          )}
          <Button disabled={updateReviewMutation.isPending} type="submit">
            {updateReviewMutation.isPending ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditReviewModal;
