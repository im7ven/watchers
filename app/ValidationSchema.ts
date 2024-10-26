import { z } from "zod";

export const addMediaSchema = z.object({
  mediaId: z.number(),
  mediaType: z.string(),
  mediaPoster: z.string(),
  mediaTitle: z.string(),
  mediaRating: z.number(),
  mediaRuntime: z.string(),
  mediaRelease: z.string(),
});
