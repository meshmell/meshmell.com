import { z } from "zod";

export const ApiKeySchema = z.object({
  key: z
    .string()
    .min(10)
    .max(50, "API key must be between 10 and 50 characters long"),
  id: z.number().optional(),
  isActive: z.boolean(),
  name: z.string().min(1).max(50),
});
