import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { signup } from "@/api/auth";
import { SignupData, signupResolver } from "@/schemas/auth";

export const useSignup = () => {
  const form = useForm<SignupData>({
    resolver: signupResolver,
  });

  const mutation = useMutation({
    mutationFn: () => signup(form.getValues()),
    onSuccess: () => {
      redirect("/sign-in");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = form.handleSubmit(() => {
    mutation.mutate();
  });

  return { form, onSubmit };
};
