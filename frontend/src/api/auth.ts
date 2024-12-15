import {
  SignInData,
  signOutSchema,
  SignupData,
  userSchema,
} from "@/schemas/auth";
import { customFetch } from "./fetchConfig";

export const signUp = async (data: SignupData) => {
  const response = await customFetch("auth/sign-up", userSchema, {
    body: JSON.stringify(data),
    method: "POST",
    credentials: "include",
  });
  return response;
};

export const signIn = async (data: SignInData) => {
  const response = await customFetch("auth/sign-in", userSchema, {
    body: JSON.stringify(data),
    method: "POST",
    credentials: "include",
  });
  return response;
};

export const getCurrentUser = async () => {
  const response = await customFetch("auth/user", userSchema, {
    method: "GET",
    credentials: "include",
  });
  return response;
};

export const signOut = async () => {
  const response = await customFetch("auth/sign-out", signOutSchema, {
    method: "POST",
    credentials: "include",
  });
  return response;
};
