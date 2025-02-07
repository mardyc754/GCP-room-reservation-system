import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupData = z.infer<typeof signupSchema>;

export const signupResolver = zodResolver(signupSchema);

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInData = z.infer<typeof signinSchema>;

export const signinResolver = zodResolver(signinSchema);

export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  id: z.number().int(),
});

export type User = z.infer<typeof userSchema>;

export const signOutSchema = z.object({
  message: z.literal("Signed out"),
});
