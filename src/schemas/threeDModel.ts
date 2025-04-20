import { z } from "zod";

export const ThreeDModelSchema = z.object({
  slug: z.string(),
  resolutions: z.array(z.string()),
  formats: z.array(z.string()),
  usedFormat: z.string(),
  scale: z.number(),
  rotationDegreesX: z.number(),
  rotationDegreesY: z.number(),
  rotationDegreesZ: z.number(),
  name: z.string(),
  description: z.string(),
  userId: z.number(),
  categoryId: z.number(),
  categoryTags: z.array(z.string()),
  price: z.number(),
  license: z.string(),
  credit: z.string().optional(),
  isDownloadable: z.boolean(),
  publishedAt: z.date(),
});
