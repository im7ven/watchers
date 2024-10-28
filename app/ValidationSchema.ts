import { z } from "zod";

export const addMediaSchema = z.object({
  mediaId: z.number(),
  mediaType: z.string(),
  mediaPoster: z.string(),
  mediaTitle: z.string(),
  mediaRating: z.number(),
  mediaRuntime: z.number().optional(),
  mediaRelease: z.string(),
  mediaSeasons: z.number().optional(),
});

export const removeMediaSchema = z.object({
  mediaId: z.number(),
});
