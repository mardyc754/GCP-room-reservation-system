import { Button } from "./Button";
import { LabelWithInput } from "./LabelWithInput";
import { useSignup } from "@/hooks/useSignup";

export const SignupForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
  } = useSignup();

  return (
    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <LabelWithInput
        label="Username"
        labelProps={{
          htmlFor: "username",
        }}
        inputProps={{
          ...register("username", { required: true }),
        }}
        errorLabel={errors.username?.message}
      />
      <LabelWithInput
        label="Email"
        labelProps={{
          htmlFor: "email",
        }}
        inputProps={{
          type: "email",
          ...register("email", { required: true }),
        }}
        errorLabel={errors.email?.message}
      />
      <LabelWithInput
        label="Password"
        labelProps={{
          htmlFor: "password",
        }}
        inputProps={{
          type: "password",
          ...register("password", { required: true }),
        }}
        errorLabel={errors.password?.message}
      />
      <Button type="submit">Sign up</Button>
    </form>
  );
};
