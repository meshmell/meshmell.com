import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  currentPassword: z
    .string()
    .min(6, { message: "Current password must be at least 6 characters" })
    .max(50, { message: "Current password must be less than 50 characters" }),
  newPassword: z
    .string()
    .max(50, { message: "New password must be less than 50 characters" })
    .nullable()
    .optional()
    .refine(
      (value) =>
        value === null ||
        value === undefined ||
        value === "" ||
        value.length >= 6,
      {
        message: "New password must be at least 6 characters",
      },
    ),
});
