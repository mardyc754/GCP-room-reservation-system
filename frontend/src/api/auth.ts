import { SignupData, userSchema } from "@/schemas/auth";
import { customFetch } from "./fetchConfig";

export const signup = async (data: SignupData) => {
  const response = await customFetch("users/signup", userSchema, {
    body: JSON.stringify(data),
    method: "POST",
  });
  return response;
};
