import {
  Box,
  Button,
  Dialog,
  Flex,
  Slider,
  Spinner,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

type ReviewForm = {
  reviewMessage: string;
};

type ReviewProps = {
  reviewPoster: string;
  reviewId: string;
  reviewTitle: string;
};

type ReviewData = ReviewProps & ReviewForm;

const ReviewModal = forwardRef<HTMLDivElement, ReviewProps>(
  ({ reviewId, reviewPoster, reviewTitle }, ref) => {
    const router = useRouter();
    const { status } = useSession();
    const [rating, setRating] = useState<number[]>([50]);
    const [isOpen, setIsOpen] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ReviewForm>();

    const validateUser = () => {
      if (status !== "authenticated") {
        router.push("/auth/signin");
      }
    };

    const addReviewMutation = useMutation({
      mutationKey: ["reviews"],
      mutationFn: async (reviewData: ReviewData) => {
        try {
          const { data } = await axios.post("/api/review", reviewData);
          return data;
        } catch (error) {
          throw new Error("There was an issue trying to create the review");
        }
      },
      onSuccess: () => {
        router.push("/review");
      },
    });

    const onSubmit = (data: ReviewForm) => {
      const formData = { ...data, reviewRating: rating[0] };

      const reviewData: ReviewData = {
        ...formData,
        reviewId,
        reviewPoster,
        reviewTitle,
      };

      addReviewMutation.mutate(reviewData);
    };

    return (
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger onClick={validateUser}>
          <span className="flex px-[12px] gap-x-2 items-center text-sm hover:bg-[#ffc53d] py-1 hover:text-[#21201c] rounded transition cursor-default">
            <MdRateReview size="22" />
            Add review
          </span>
        </Dialog.Trigger>
        <Dialog.Content
          ref={ref}
          aria-describedby={undefined}
          size="3"
          maxWidth="500px"
        >
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
                defaultValue={[50]}
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
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== "" ||
                    "Review cannot be empty or whitespace",
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
            <Flex gap="2">
              <Button color="gray" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button disabled={addReviewMutation.isPending} type="submit">
                {addReviewMutation.isPending ? <Spinner /> : "Submit"}
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    );
  }
);

ReviewModal.displayName = "ReviewModal";

export default ReviewModal;
