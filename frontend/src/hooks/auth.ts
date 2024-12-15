import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { signIn, getCurrentUser, signOut, signUp } from "@/api/auth";
import {
  signinResolver,
  SignInData,
  SignupData,
  signupResolver,
} from "@/schemas/auth";
import { user } from "@/constants/queryKeys";

export const useSignIn = () => {
  const navigate = useNavigate();

  const form = useForm<SignInData>({
    resolver: signinResolver,
  });

  const mutation = useMutation({
    mutationFn: () => signIn(form.getValues()),
    onSuccess: () => {
      navigate("/");
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

export const useSignup = () => {
  const navigate = useNavigate();

  const form = useForm<SignupData>({
    resolver: signupResolver,
  });

  const mutation = useMutation({
    mutationFn: () => signUp(form.getValues()),
    onSuccess: () => {
      navigate("/sign-in");
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

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: user.current(),
    queryFn: getCurrentUser,
    retry: false,
    retryOnMount: false,
  });

  return query;
};

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
