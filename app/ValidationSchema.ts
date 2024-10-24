import { z } from "zod";

export const addMediaSchema = z.object({
  mediaId: z.number(),
  mediaType: z.string(),
});
