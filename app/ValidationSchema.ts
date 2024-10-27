import { z } from "zod";

export const addMediaSchema = z.object({
  mediaId: z.number(),
  mediaType: z.string(),
  mediaPoster: z.string(),
  mediaTitle: z.string(),
  mediaRating: z.number(),
  mediaRuntime: z.number(),
  mediaRelease: z.string(),
});

export const removeMediaSchema = z.object({
  mediaId: z.number(),
});
