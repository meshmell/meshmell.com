import { z, ZodType } from "zod";

import { AuthFormRegister, AuthFormSignIn } from "../types/auth";

export const RegisterSchema: ZodType<AuthFormRegister> = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInSchema: ZodType<AuthFormSignIn> = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
