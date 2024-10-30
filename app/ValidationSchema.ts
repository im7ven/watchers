import { z } from "zod";

export const addMediaSchema = z.object({
  mediaId: z.string(),
  mediaType: z.string(),
  mediaPoster: z.string(),
  mediaTitle: z.string(),
  mediaRating: z.number(),
  mediaRuntime: z.number().optional(),
  mediaRelease: z.string(),
  mediaSeasons: z.number().optional(),
});

export const removeMediaSchema = z.object({
  mediaId: z.string(),
});

export const addMediaReviewSchema = z.object({
  reviewId: z.string(),
  reviewPoster: z.string(),
  reviewTitle: z.string(),
  reviewMessage: z
    .string()
    .min(3, { message: "Review must be at least 3 characters" })
    .max(500, { message: "Review has a maximum of 500 characters." }),
  reviewRating: z.number().min(1).max(100),
});

export const removeReviewSchema = z.object({
  reviewId: z.string(),
});

export const editReviewSchema = z.object({
  reviewId: z.string(),
  reviewMessage: z.string().optional(),
  reviewRating: z.number().optional(),
});
